const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');
const http = require('http');

const errors = [];
const warnings = [];

function fetch(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        const req = client.get(url, {
            headers: {
                'User-Agent': 'JSPT-Theme-Validator/1.0'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve({ ok: true, status: res.statusCode, data, headers: res.headers });
                } else {
                    resolve({ ok: false, status: res.statusCode, data, headers: res.headers });
                }
            });
        });
        req.on('error', reject);
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

async function validateThemeSubmission() {
    console.log('Starting theme submission validation...');
    
    try {
        const changedFiles = execSync('git diff --name-only origin/$BASE_REF HEAD', { encoding: 'utf8' }).trim().split('\n');
        
        console.log('Changed files:', changedFiles);
        
        if (changedFiles.length !== 1 || changedFiles[0] !== 'themes_list.json') {
            errors.push('❌ **Only `themes_list.json` should be modified**');
            errors.push(`   Found changes in: ${changedFiles.join(', ')}`);
        }
        
    } catch (err) {
        errors.push(`❌ **Failed to check changed files**: ${err.message}`);
    }
    
    let currentThemes = {};
    let newThemes = {};
    
    try {
        const baseContent = execSync('git show origin/$BASE_REF:themes_list.json', { encoding: 'utf8' });
        currentThemes = JSON.parse(baseContent);
    } catch (err) {
        errors.push(`❌ **Failed to read base themes_list.json**: ${err.message}`);
        return;
    }
    
    try {
        const newContent = fs.readFileSync('themes_list.json', 'utf8');
        newThemes = JSON.parse(newContent);
    } catch (err) {
        errors.push('❌ **Invalid JSON in themes_list.json**');
        errors.push(`   ${err.message}`);
        return;
    }
    
    const currentKeys = Object.keys(currentThemes);
    const newKeys = Object.keys(newThemes);
    
    const addedKeys = newKeys.filter(k => !currentKeys.includes(k));
    const removedKeys = currentKeys.filter(k => !newKeys.includes(k));
    const modifiedKeys = currentKeys.filter(k => newKeys.includes(k) && currentThemes[k] !== newThemes[k]);
    
    if (removedKeys.length > 0) {
        errors.push('❌ **Themes were removed** (not allowed)');
        errors.push(`   Removed: ${removedKeys.join(', ')}`);
    }
    
    if (modifiedKeys.length > 0) {
        errors.push('❌ **Existing themes were modified** (not allowed)');
        errors.push(`   Modified: ${modifiedKeys.join(', ')}`);
    }
    
    if (addedKeys.length === 0) {
        errors.push('❌ **No new themes were added**');
        return;
    }
    
    if (addedKeys.length > 1) {
        warnings.push(`⚠️ **Multiple themes added**: ${addedKeys.join(', ')}`);
        warnings.push('   Consider submitting one theme per PR for easier review');
    }
    
    console.log('Added themes:', addedKeys);
    
    for (const themeName of addedKeys) {
        await validateTheme(themeName, newThemes[themeName]);
    }
}

async function validateTheme(themeName, configUrl) {
    console.log(`Validating theme: ${themeName}`);
    
    if (!/^[a-z0-9-]+$/.test(themeName)) {
        errors.push(`❌ **Theme name "${themeName}" is invalid**`);
        errors.push('   Theme names must be lowercase letters, numbers, and hyphens only');
    }
    
    if (!configUrl.startsWith('http://') && !configUrl.startsWith('https://')) {
        errors.push(`❌ **Invalid config URL for "${themeName}"**`);
        errors.push(`   Must start with http:// or https://`);
        return;
    }
    
    let config;
    try {
        console.log(`Fetching config from: ${configUrl}`);
        const response = await fetch(configUrl);
        
        if (!response.ok) {
            errors.push(`❌ **Config URL not accessible for "${themeName}"**`);
            errors.push(`   ${configUrl} returned status ${response.status}`);
            return;
        }
        
        config = JSON.parse(response.data);
    } catch (err) {
        errors.push(`❌ **Failed to fetch or parse config for "${themeName}"**`);
        errors.push(`   ${err.message}`);
        return;
    }
    
    const requiredFields = [
        'name', 'display_name', 'description', 'author', 
        'github', 'homepage', 'version', 'license', 
        'theme_url', 'released_on', 'updated_on', 'categories'
    ];
    
    for (const field of requiredFields) {
        if (!config[field]) {
            errors.push(`❌ **Missing required field in config for "${themeName}": \`${field}\`**`);
        }
    }
    
    if (config.name !== themeName) {
        errors.push(`❌ **Theme name mismatch for "${themeName}"**`);
        errors.push(`   themes_list.json key: "${themeName}"`);
        errors.push(`   theme_config.json name: "${config.name}"`);
    }
    
    if (config.github) {
        if (!config.github.startsWith('https://github.com/')) {
            errors.push(`❌ **Invalid GitHub URL for "${themeName}"**`);
            errors.push(`   Must start with https://github.com/`);
        } else {
            try {
                console.log(`Checking GitHub repo: ${config.github}`);
                const repoResponse = await fetch(config.github);
                if (!repoResponse.ok) {
                    errors.push(`❌ **GitHub repository not accessible for "${themeName}"**`);
                    errors.push(`   ${config.github} returned status ${repoResponse.status}`);
                }
            } catch (err) {
                errors.push(`❌ **Failed to verify GitHub repository for "${themeName}"**`);
                errors.push(`   ${err.message}`);
            }
        }
    }
    
    if (config.theme_url) {
        if (!config.theme_url.endsWith('.css')) {
            warnings.push(`⚠️ **Theme URL for "${themeName}" doesn't end with .css**`);
        }
        
        try {
            console.log(`Checking theme CSS: ${config.theme_url}`);
            const cssResponse = await fetch(config.theme_url);
            
            if (!cssResponse.ok) {
                errors.push(`❌ **Theme CSS not accessible for "${themeName}"**`);
                errors.push(`   ${config.theme_url} returned status ${cssResponse.status}`);
            } else {
                const corsHeader = cssResponse.headers['access-control-allow-origin'];
                if (!corsHeader || (corsHeader !== '*' && !corsHeader.includes('jspt.js.org'))) {
                    warnings.push(`⚠️ **Potential CORS issue for "${themeName}"**`);
                    warnings.push(`   Access-Control-Allow-Origin: ${corsHeader || 'not set'}`);
                    warnings.push(`   Theme may not load correctly from jspt.js.org`);
                }
                
                const contentType = cssResponse.headers['content-type'];
                if (contentType && !contentType.includes('text/css') && !contentType.includes('text/plain')) {
                    warnings.push(`⚠️ **Unexpected content-type for "${themeName}": ${contentType}**`);
                }
            }
        } catch (err) {
            errors.push(`❌ **Failed to fetch theme CSS for "${themeName}"**`);
            errors.push(`   ${err.message}`);
        }
    }
    
    if (config.version && !/^\d+\.\d+\.\d+/.test(config.version)) {
        warnings.push(`⚠️ **Version for "${themeName}" doesn't follow semantic versioning**`);
        warnings.push(`   Expected format: X.Y.Z (e.g., 1.0.0)`);
    }
    
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (config.released_on && !dateRegex.test(config.released_on)) {
        errors.push(`❌ **Invalid released_on date for "${themeName}"**`);
        errors.push(`   Expected format: YYYY-MM-DD`);
    }
    
    if (config.updated_on && !dateRegex.test(config.updated_on)) {
        errors.push(`❌ **Invalid updated_on date for "${themeName}"**`);
        errors.push(`   Expected format: YYYY-MM-DD`);
    }
    
    if (config.categories && !Array.isArray(config.categories)) {
        errors.push(`❌ **Categories must be an array for "${themeName}"**`);
    }
}

async function run() {
    await validateThemeSubmission();
    
    let output = '';
    
    if (errors.length > 0) {
        output += '### Errors\n\n';
        output += errors.join('\n') + '\n\n';
    }
    
    if (warnings.length > 0) {
        output += '### Warnings\n\n';
        output += warnings.join('\n') + '\n\n';
    }
    
    if (errors.length === 0 && warnings.length === 0) {
        output = '✅ All validation checks passed!\n';
        fs.writeFileSync('/tmp/validation-success.txt', 'success');
    } else {
        fs.writeFileSync('/tmp/validation-errors.txt', output);
    }
    
    console.log('\n' + output);
    
    if (errors.length > 0) {
        process.exit(1);
    }
}

run().catch(err => {
    console.error('Validation script failed:', err);
    fs.writeFileSync('/tmp/validation-errors.txt', `❌ **Validation script error**: ${err.message}`);
    process.exit(1);
});