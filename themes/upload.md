# How to upload a theme?

Follow these steps to submit your custom theme to the JSPT themes collection:

## Prerequisites

1. **Have your theme ready**
   - You can read instructions on how to create a theme in the [Styling documentation](docs/styling.md?id=how-to-create-a-custom-theme)

## Step-by-Step Guide

### 1. Set up your theme hosting

Your theme must be hosted on a publicly accessible website. Create a folder named exactly as your theme should be named, and place your CSS file and configuration inside it.

**Important:** The URL must not have any CORS restrictions - it needs to be accessible from any origin.

### 2. Create theme_config.json

In your theme folder, create a `theme_config.json` file with the following structure:

```json
{
    "name": "",
    "display_name": "",
    "description": "",
    "author": "",
    "github": "",
    "homepage": "",
    "version": "",
    "license": "",
    "theme_url": "",
    "released_on": "",
    "updated_on": "",
    "categories": []
}
```

**All fields are required:**

- `name` - Unique identifier for your theme (lowercase, no spaces)
- `display_name` - The name shown to users
- `description` - Brief description of your theme
- `author` - Your name or username
- `github` - Link to your theme's GitHub repository
- `homepage` - Link to your theme's homepage or GitHub README
- `version` - Current version (e.g., "1.0.0")
- `license` - License type (e.g., "MIT", "Apache-2.0")
- `theme_url` - Direct URL to your CSS file
- `released_on` - Initial release date (YYYY-MM-DD)
- `updated_on` - Last update date (YYYY-MM-DD)
- `categories` - Array of category tags (e.g., ["dark", "minimal"])

**Important notes:**
- Your theme must be publicly hosted on GitHub
- The `homepage` can be the GitHub README URL
- Maintaining your theme with regular updates is recommended but not required

### 3. Fork the repository

Create a fork of the repository:

1. Go to [https://github.com/levkris/jspt](https://github.com/levkris/jspt)
2. Click **"Fork"** in the top right
3. After forking, **switch to the `gh-pages` branch** in your fork
4. Make your changes in the `gh-pages` branch

### 4. Edit themes_list.json

In your fork, edit the `themes_list.json` file to add your theme. The file should contain a single JSON object with multiple theme entries as keys.

**Correct format:**
```json
{
    "default": "https://jspt.js.org/default_themes/default.json",
    "default2": "https://yourwebsite.com/path/to/theme_config.json",
    "your-theme": "https://yourwebsite.com/path/to/theme_config.json"
}
```

**Incorrect format (do not do this):**
```json
{
    "default": "https://jspt.js.org/default_themes/default.json"
},
{
    "default2": "https://yourwebsite.com/path/to/theme_config.json"
}
```

Add your entry as a new key-value pair within the existing JSON object, following the format of existing entries.

### 5. Create a Pull Request

**Important:** Make sure to set the correct base branch and use the theme submission template!

**Quick Link (recommended):**
Replace `YOUR-USERNAME` with your GitHub username and click this link:
```
https://github.com/levkris/jspt/compare/gh-pages...YOUR-USERNAME:gh-pages?template=theme_submission.md
```

**Or manually:**
1. Go to your fork on GitHub
2. Click **"Contribute"** → **"Open pull request"**
3. **Change the base branch:**
   - By default, it may target `main`
   - Click on **"base: main"** to change it
   - Select **`gh-pages`** as the base branch
4. **Select template:** Choose "Theme Submission" from the template dropdown if available, else add `?template=theme_submission.md` to the URL
5. Fill out the PR template completely
6. Click **"Create pull request"**

Your PR should show: `levkris:gh-pages ← your-username:gh-pages`

**⚠️ Common Mistake:**
If you see `levkris:main ← your-username:gh-pages`, you need to change the base branch to `gh-pages`. The workflow won't run if the PR targets `main`.

### 6. Wait for review

Keep an eye on your PR for:
- Approval notifications
- Additional comments or requested changes
- Feedback from maintainers

Your theme will be reviewed and, if approved, added to the official themes list!