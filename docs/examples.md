# Examples

## CDN Example

```html
<button onclick="jspt.makeToast({ message: 'Hello CDN!' })">Show Toast</button>
<button onclick="jspt.makePopup({ content_type: 'text', header: 'Info', message: 'Hello Popup!' })">Show Popup</button>
```

## Self-Hosted Example

```html
<link rel="stylesheet" href="dist/jspt.css">
<script src="dist/jspt.min.js"></script>
<script>
jspt.makeToast({ message: "Self-hosted toast" });
jspt.makePopup({ content_type: 'text', header: 'Welcome', message: 'Hello!' });
</script>
```

## ES Module Example

```javascript
import { makeToast, makePopup } from './dist/jspt.module.js';
makeToast({ message: "ES Module toast" });
makePopup({ content_type: "text", header: "ES Module", message: "Hello!" });
```
