# 🎨 Theme Submission Guidelines

> **Before you submit:** This guide helps you prepare your theme for submission and understand what will be reviewed.

---

## 📋 Pre-Submission Checklist

Before submitting your theme, make sure:

- [ ] `themes_list.json` is valid JSON and properly formatted
- [ ] Your theme entry uses the correct format (single object, not multiple objects)
- [ ] Your `theme_config.json` URL is accessible and returns valid JSON
- [ ] All required fields in `theme_config.json` are filled
- [ ] Your theme CSS URL is accessible without CORS errors
- [ ] Theme name matches between `themes_list.json` and `theme_config.json`
- [ ] Your theme actually works when tested
- [ ] No external resources from untrusted sources
- [ ] Your GitHub repository is public
- [ ] Basic accessibility requirements are met

---

## 📝 What Gets Reviewed

### 1. JSON Format

**Your `themes_list.json` entry should look like this:**

✅ **Correct format:**
```json
{
    "existing-theme": "https://example.com/theme1.json",
    "your-theme": "https://example.com/your-theme.json",
    "another-theme": "https://example.com/theme3.json"
}
```

❌ **Incorrect format:**
```json
{
    "existing-theme": "https://example.com/theme1.json"
},
{
    "your-theme": "https://example.com/your-theme.json"
}
```

**Common mistakes to avoid:**
- Creating multiple separate JSON objects instead of one object
- Missing commas between entries
- Trailing commas (not allowed in strict JSON)
- Duplicate theme names/keys
- Spaces or special characters in theme keys

**Test your JSON:**
```bash
cat themes_list.json | jq .
```

Or use an online JSON validator like [jsonlint.com](https://jsonlint.com)

---

### 2. Configuration File

**Your `theme_config.json` must contain all these fields:**

| Field | Type | Requirements | Example |
|-------|------|--------------|---------|
| `name` | string | Matches key in themes_list.json, lowercase, no spaces | `"dark-neon"` |
| `display_name` | string | User-friendly name | `"Dark Neon"` |
| `description` | string | Clear, concise description | `"A vibrant neon theme for dark mode lovers"` |
| `author` | string | Your name or username | `"John Doe"` |
| `github` | string | Valid GitHub repository URL | `"https://github.com/user/repo"` |
| `homepage` | string | Valid URL (can be GitHub README) | `"https://github.com/user/repo#readme"` |
| `version` | string | Semantic versioning | `"1.0.0"` |
| `license` | string | Valid license identifier | `"MIT"`, `"Apache-2.0"` |
| `theme_url` | string | Direct link to CSS file | `"https://example.com/theme.css"` |
| `released_on` | string | Date format YYYY-MM-DD | `"2026-02-15"` |
| `updated_on` | string | Date format YYYY-MM-DD | `"2026-02-15"` |
| `categories` | array | Relevant category tags | `["dark", "neon"]` |

**All fields are required!**

**Test your URLs work:**
```bash
curl -I "YOUR_THEME_CONFIG_URL"
curl -I "YOUR_THEME_CSS_URL"
```

Both should return `200 OK`.

---

### 3. Accessibility Requirements

**Your theme must be accessible:**

| Requirement | How to Check | Minimum Standard |
|-------------|--------------|------------------|
| **Text contrast** | [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | 4.5:1 for normal text (WCAG AA) |
| **Error states** | Visual inspection | Clearly distinguishable from normal state |
| **Icons** | Visual inspection | Visible and recognizable |
| **Text readability** | Browser test | No overflow, no cut-off text |

**Tools to help:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)
- Browser DevTools > Accessibility panel

**Quick test:** Can you read all text comfortably? Can you distinguish error states? If not, adjust your colors.

---

### 4. CORS Configuration

**Your theme must be accessible cross-origin!**

This means your hosting must allow other websites to load your CSS file.

**✅ Recommended hosting platforms (CORS enabled by default):**
- **GitHub Pages** - Free, easy setup
- **Netlify** - Free tier available
- **Vercel** - Free tier available
- **Cloudflare Pages** - Free tier available
- **jsDelivr** - CDN for GitHub repos

**❌ Platforms that usually don't work:**
- Dropbox direct links
- Google Drive direct links
- Some shared hosting without proper headers
- Private servers without CORS headers

**Test your CORS setup:**
```bash
curl -I https://yoursite.com/theme.css
```

Look for `Access-Control-Allow-Origin: *` in the response headers.

**Or test in browser console:**
```javascript
fetch('https://yoursite.com/theme.css')
    .then(() => console.log('✅ CORS works!'))
    .catch(() => console.log('❌ CORS error!'));
```

---

### 5. Security Requirements

**🔒 Your theme will be checked for security issues.**

**Avoid these:**
- External resources from unknown/untrusted domains
- Suspicious patterns in your CSS
- Obfuscated code

**❌ Examples of what NOT to do:**
```css
.toast {
    background: url(https://unknown-tracking-site.com/pixel.gif);
}

@import url(https://suspicious-domain.com/inject.css);
```

**✅ Safe practices:**
- Host all resources on your own domain or trusted CDNs
- Use data URIs for small images
- Keep CSS readable and unobfuscated
- Only use standard CSS properties

**Trusted CDNs:**
- jsDelivr (`cdn.jsdelivr.net`)
- cdnjs (`cdnjs.cloudflare.com`)
- unpkg (`unpkg.com`)

---

### 6. Quality Standards

**✅ Your theme should style all these components:**

- [ ] Toast notifications (`.toast-container .toast`)
- [ ] Popup modals (`.popup-container .popup`)
- [ ] Icons (`.toast-icon`)
- [ ] Text content (`.toast-text`)
- [ ] Progress bars (`.toast-duration-bar`)
- [ ] Error states (`.toast-default-error`)
- [ ] Close buttons and hover states

**✅ Your theme should:**
- Be visually coherent across all components
- Not break any UI functionality
- Handle different content lengths gracefully
- Work with various types of content

**🚩 Your theme will be rejected if it:**
- Only styles one component (e.g., just changes background color)
- Breaks text readability (invisible text, unreadable contrast)
- Hides critical UI elements (close buttons, important icons)
- Uses copyrighted assets (Disney characters, brand logos, etc.)
- Contains explicit or offensive content
- Doesn't actually work when applied

---

## 🧪 Test Your Theme Before Submitting

### Quick Test Method

1. Open a website that uses JSPT or create a test page
2. Open browser DevTools (F12)
3. Go to Console tab
4. Run this code:

```javascript
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'YOUR_THEME_URL_HERE';
document.head.appendChild(link);
```

5. **Test these things:**
   - [ ] Create a toast notification - does it look right?
   - [ ] Create an error toast - is it clearly different?
   - [ ] Open a popup modal - is it styled correctly?
   - [ ] Hover over close buttons - do they respond?
   - [ ] Try long text - does it overflow properly?
   - [ ] Test with different content lengths

### Create a Test Page

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://jspt.js.org/path/to/base.css">
    <link rel="stylesheet" href="YOUR_THEME_URL">
</head>
<body>
    <button onclick="createToast()">Test Toast</button>
    <button onclick="createErrorToast()">Test Error Toast</button>
    <button onclick="createPopup()">Test Popup</button>
    
    <script>
        function createToast() {
            // Your toast creation code
        }
        
        function createErrorToast() {
            // Your error toast creation code
        }
        
        function createPopup() {
            // Your popup creation code
        }
    </script>
</body>
</html>
```

---

## 📤 Submitting Your Theme

### Step-by-Step

1. **Fork the repository**
   - Go to [github.com/levkris/jspt](https://github.com/levkris/jspt)
   - Click "Fork" and select the `gh-pages` branch

2. **Add your theme to `themes_list.json`**
   - Edit the file in your fork
   - Add your entry to the JSON object
   - Make sure JSON is valid!

3. **Create a Pull Request**
   - Fill out the PR template completely
   - Add screenshots of your theme
   - Include any relevant notes

4. **Wait for review**
   - Maintainers will review within a few days
   - Be ready to make changes if requested
   - Keep an eye on your PR for comments

---

## 🔄 What Happens During Review

### If everything looks good ✅
Your theme will be approved and merged! It will then be available to all JSPT users.

### If changes are needed 🔄
You'll receive specific feedback on what needs to be fixed:
- **JSON formatting** - Easy fix, just adjust the format
- **Missing fields** - Add the required information
- **CORS issues** - Update your hosting configuration
- **Accessibility** - Adjust colors for better contrast
- **Security concerns** - Remove or replace problematic resources

Most issues are quick to fix! The maintainers will guide you.

### If your theme is rejected ❌
This only happens if:
- Contains malicious code
- Violates copyright
- Contains offensive content
- Completely breaks the UI
- Doesn't style JSPT components at all

---

## 💡 Tips for Success

### Do:
- ✅ Test your theme thoroughly before submitting
- ✅ Check accessibility with contrast checkers
- ✅ Use standard hosting platforms (GitHub Pages, Netlify, etc.)
- ✅ Provide clear screenshots in your PR
- ✅ Respond promptly to review feedback
- ✅ Keep your theme maintained (though not required)

### Don't:
- ❌ Submit untested themes
- ❌ Use poor contrast ratios
- ❌ Include external resources from unknown sources
- ❌ Copy copyrighted assets
- ❌ Create multiple separate JSON objects in themes_list.json
- ❌ Ignore review feedback

---

## ❓ Common Questions

**Q: How long does review take?**
A: Usually 1-3 days, sometimes longer depending on maintainer availability.

**Q: Can I update my theme after it's approved?**
A: Yes! Update your hosted files and increment the version in `theme_config.json`.

**Q: What if I don't have a GitHub account?**
A: You need one to submit a theme. It's free to create: [github.com/signup](https://github.com/signup)

**Q: Can I submit multiple themes?**
A: Yes! Each theme needs its own `theme_config.json` and entry in `themes_list.json`.

**Q: What license should I use?**
A: MIT is most common and permissive. Choose what works for you.

**Q: Do I need to maintain my theme?**
A: It's recommended but not required. Maintained themes are more likely to stay compatible.

---

## 🆘 Need Help?

**Got stuck?** Here's what to do:

1. **Read the documentation**
   - [How to create a theme](https://jspt.js.org/#/docs/styling?id=how-to-create-a-custom-theme)
   - [How to upload a theme](https://jspt.js.org/#/themes/upload?id=how-to-upload-a-theme)

2. **Check existing themes**
   - Look at approved themes for examples
   - See how they structure their files

3. **Ask for help**
   - Open a discussion on GitHub
   - Comment on your PR with specific questions
   - Check the community forums

---

**Ready to submit?** Follow the [upload guide](https://jspt.js.org/#/themes/upload?id=how-to-upload-a-theme) and create your PR!

Good luck! 🎨✨