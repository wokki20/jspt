# Performance Tips

- ✅ Use versioned URLs in production (cached 30 days)
- ✅ Minified version (10KB vs 24KB)
- ✅ Pin to specific version
- ✅ Preload scripts for faster loading:

```html
<link rel="preload" href="https://cdn.wokki20.nl/content/jspt-v2.0.4/jspt.min.js" as="script">
<link rel="preload" href="https://cdn.wokki20.nl/content/jspt-v2.0.4/jspt.css" as="style">
```