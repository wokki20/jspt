# API Reference

## jspt.makeToast(options)

Creates a toast notification.

**Options:**

```
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| message  | string | required | Message to display |
| style    | string | 'default' | Toast style |
| icon_left | string | undefined | Left icon content |
| duration | number | 5000 | Duration in ms (-1 = persistent) |
```

## jspt.makePopup(options)

Creates a popup modal.

**Options:**

```
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| content_type | string | 'text' | 'text' or 'html' |
| header       | string | undefined | Header text |
| message      | string | undefined | Message text |
| content      | string | undefined | HTML content |
| close_on_blur| boolean | true | Close on outside click |
```

## jspt.closePopup(options)
Closes a popup by ID:

```javascript
jspt.closePopup({ custom_id: "popup123" });
```