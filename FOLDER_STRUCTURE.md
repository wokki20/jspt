# JSPT Folder Structure

This document explains the organization of the JSPT repository.

## Directory Structure

```
jspt/
├── .github/                    # GitHub specific files
│   ├── ISSUE_TEMPLATE/         # Issue templates
│   │   ├── bug_report.md       # Bug report template
│   │   └── feature_request.md  # Feature request template
│   ├── workflows/              # GitHub Actions workflows (optional)
│   └── pull_request_template.md # PR template
│
├── dist/                       # Distribution files (ready to use)
│   ├── jspt.js                 # Main library (development)
│   ├── jspt.min.js            # Minified version (production)
│   ├── jspt.module.js         # ES6 module version
│   ├── jspt.css               # Styles
│   └── jspt.d.ts              # TypeScript definitions
│
├── src/                        # Source files (for development)
│   ├── jspt.js                 # Main source with JSDoc
│   ├── jspt.module.js         # ES module source
│   ├── jspt.css               # Styles source
│   └── jspt.d.ts              # TypeScript definitions
│
├── examples/                   # Example usage files
│   ├── example-script.html    # Traditional script tag usage
│   └── example-module.html    # ES module import usage
│
├── .gitignore                  # Git ignore rules
├── CHANGELOG.md               # Version history
├── CONTRIBUTING.md            # Contribution guidelines
├── LICENSE                    # MIT License
├── README.md                  # Main documentation
├── package.json               # NPM package configuration
└── jsconfig.json              # VS Code JavaScript configuration

```

## Purpose of Each Directory

### `/src` - Source Files
- Contains the original, fully commented source code
- This is where you make changes during development
- Includes JSDoc comments for documentation
- Not minified for readability

### `/dist` - Distribution Files
- Production-ready files
- What users download or import
- Includes minified version for production use
- Automatically generated from `/src` (in a full build pipeline)

### `/examples` - Usage Examples
- Live, working examples
- Shows both traditional and modern usage
- Great for testing changes
- Helps new users understand how to use the library

### `/.github` - GitHub Configuration
- Issue and PR templates for consistent reporting
- GitHub Actions workflows (CI/CD)
- Helps maintain code quality and consistency

## For Contributors

When contributing:
1. Edit files in `/src` directory
2. Test with files in `/examples`
3. Update `/dist` if needed (or let CI do it)
4. Update `CHANGELOG.md`
5. Submit a PR using the template

## For Users

When using the library:
1. Download from `/dist` directory
2. Use `jspt.min.js` for production
3. Check `/examples` for usage patterns
4. Read `README.md` for full API documentation