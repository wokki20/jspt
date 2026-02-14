# Contributing to JSPT

Thank you for your interest in contributing to JSPT! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Your Changes](#testing-your-changes)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/jspt.git
   cd jspt
   ```
3. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Important: Source vs Distribution Files

**⚠️ CRITICAL: Only edit files in the `/src` directory, NEVER edit files in `/dist`**

- **`/src`** - Source files (edit these)
  - `src/jspt.js` - Main library source
  - `src/jspt.module.js` - ES module source
  - `src/jspt.css` - Styles source
  - `src/jspt.d.ts` - TypeScript definitions

- **`/dist`** - Distribution files (do NOT edit these)
  - These are generated/copied from `/src`
  - Any changes here will be overwritten

### Why This Matters

The `/dist` folder contains production-ready files that users download and use. Changes made directly to `/dist` will:
- Be lost when the build process runs
- Create inconsistencies between source and distribution
- Cause confusion for other contributors

## Project Structure

```
jspt/
├── src/                    # ✅ EDIT THESE FILES
│   ├── jspt.js            # Main source with JSDoc
│   ├── jspt.module.js     # ES module source
│   ├── jspt.css           # Styles
│   └── jspt.d.ts          # TypeScript definitions
│
├── dist/                   # ❌ DO NOT EDIT
│   ├── jspt.js            # Generated from src/
│   ├── jspt.min.js        # Minified version
│   ├── jspt.module.js     # Generated from src/
│   ├── jspt.css           # Copied from src/
│   └── jspt.d.ts          # Copied from src/
│
├── examples/               # Example HTML files
├── .github/                # GitHub templates
└── README.md              # Documentation
```

## Making Changes

### 1. Edit Source Files Only

Make all your changes in the `/src` directory:

```bash
# ✅ Good - editing source
vim src/jspt.js

# ❌ Bad - editing distribution
vim dist/jspt.js
```

### 2. Update Distribution Files

After making changes to `/src`, copy them to `/dist`:

```bash
# Copy main files
cp src/jspt.js dist/jspt.js
cp src/jspt.module.js dist/jspt.module.js
cp src/jspt.css dist/jspt.css
cp src/jspt.d.ts dist/jspt.d.ts
```

For the minified version, you can use an online minifier or a tool like:
```bash
# Using terser (if installed)
npx terser src/jspt.js -o dist/jspt.min.js -c -m
```

### 3. Types of Contributions

#### Bug Fixes
- Fix the bug in `/src` files
- Add a test case if possible
- Update CHANGELOG.md
- Submit a pull request

#### New Features
- Discuss the feature in an issue first
- Implement in `/src` files
- Update documentation (README.md)
- Add examples if applicable
- Update CHANGELOG.md
- Submit a pull request

#### Documentation
- Update README.md
- Improve code comments (JSDoc)
- Add or update examples
- Submit a pull request

## Code Style Guidelines

### JavaScript

1. **Use JSDoc comments** for all functions:
   ```javascript
   /**
    * @param {ToastOptions} options
    * @returns {void}
    */
   makeToast: function(options) {
       // ...
   }
   ```

2. **Use modern JavaScript**:
   - Use `const` and `let` instead of `var`
   - Use arrow functions where appropriate
   - Use destructuring for parameters

3. **Keep functions focused**:
   - Each function should do one thing well
   - Extract complex logic into helper functions

4. **Error handling**:
   - Validate input parameters
   - Provide helpful error messages
   - Use try-catch for async operations

### CSS

1. **Use BEM-like naming** for classes:
   ```css
   .toast-container { }
   .toast-container .toast { }
   .toast-container .toast .toast-icon { }
   ```

2. **Keep specificity low**:
   - Avoid deep nesting
   - Use classes over IDs

3. **Use CSS custom properties** for theming:
   ```css
   --translate: 0px;
   --scale: 1;
   ```

### TypeScript Definitions

Keep type definitions in sync with JSDoc comments:
```typescript
export interface ToastOptions {
    message: string;
    duration?: number;
    // ...
}
```

## Testing Your Changes

### 1. Test with Example Files

Open and test both example files in a browser:

```bash
# Open in your default browser
open examples/example-script.html
open examples/example-module.html
```

### 2. Test in Multiple Browsers

Test your changes in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

### 3. Manual Testing Checklist

- [ ] Toasts display correctly
- [ ] Popups display correctly
- [ ] Icons render properly
- [ ] Animations work smoothly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Close buttons work
- [ ] Custom IDs work as expected
- [ ] Error handling works

### 4. Test Both Import Methods

```html
<!-- Test script tag -->
<script src="../dist/jspt.js"></script>

<!-- Test ES module -->
<script type="module">
import { makeToast } from '../dist/jspt.module.js';
</script>
```

## Submitting Changes

### 1. Update CHANGELOG.md

Add your changes under the appropriate section:

```markdown
## [Unreleased]

### Added
- New feature description

### Changed
- Changed feature description

### Fixed
- Bug fix description
```

### 2. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git add src/jspt.js dist/jspt.js CHANGELOG.md
git commit -m "Add support for custom toast positions"
```

Good commit message format:
```
Add support for custom toast positions

- Added 'position' parameter to ToastOptions
- Updated CSS to support top/bottom and left/right positioning
- Added examples to example-script.html
- Updated TypeScript definitions
```

### 3. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 4. Create a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the pull request template
5. Submit the pull request

### Pull Request Checklist

- [ ] Changes are in `/src` directory (not `/dist`)
- [ ] `/dist` files updated from `/src`
- [ ] Code follows style guidelines
- [ ] JSDoc comments added/updated
- [ ] TypeScript definitions updated
- [ ] Examples tested in browser
- [ ] CHANGELOG.md updated
- [ ] No console errors
- [ ] Tested in multiple browsers

## Reporting Bugs

Use the bug report template in `.github/ISSUE_TEMPLATE/bug_report.md`

Include:
1. Clear description of the bug
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Browser and OS information
6. Code sample if applicable
7. Console errors if any

## Feature Requests

Use the feature request template in `.github/ISSUE_TEMPLATE/feature_request.md`

Include:
1. Clear description of the feature
2. Use case / problem it solves
3. Proposed solution
4. Example usage code
5. Alternative solutions considered

## Questions?

- Open an issue with the `question` label
- Check existing issues and discussions
- Review the README.md documentation

## License

By contributing to JSPT, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to JSPT! 🎉