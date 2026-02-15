# Styling

Override CSS custom properties for custom appearance:

```css
.toast-container .toast {
    --translate: 0px;
    --scale: 1;
    --cursor: default;
}
```

## How to create a custom theme

To create a custom theme, download the default CSS file from the [GitHub repository](https://github.com/levkris/jspt/blob/main/src/jspt.css) and modify the styles to match your desired appearance.

### Key Elements to Customize

**Toast Container**
- `.toast-container` - Position, spacing, and layout of toast notifications

**Toast Notifications**
- `.toast-container .toast` - Background color, border, padding, border-radius, shadow
- `.toast-container .toast.toast-default-error` - Error state styling

**Toast Components**
- `.toast-container .toast .toast-icon` - Icon size and color
- `.toast-container .toast .toast-text` - Text styling and overflow behavior
- `.toast-container .toast .toast-duration-bar` - Progress bar appearance

**Popups**
- `.popup-container .popup` - Popup modal styling
- `.popup-container .popup .popup-header` - Header appearance
- `.popup-error-code` - Code block styling

### Example Themes

**Light Theme**
```css
.toast-container .toast {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    color: #333;
}

.toast-container .toast.toast-default-error {
    background-color: #ffebee;
    border-color: #f44336;
    color: #c62828;
}

.popup-container .popup {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    color: #333;
}
```

**Neon Theme**
```css
.toast-container .toast {
    background-color: #000;
    border: 2px solid #0ff;
    color: #0ff;
    box-shadow: 0 0 10px #0ff, inset 0 0 10px rgba(0, 255, 255, 0.1);
}

.toast-container .toast.toast-default-error {
    background-color: #000;
    border-color: #f0f;
    color: #f0f;
    box-shadow: 0 0 10px #f0f, inset 0 0 10px rgba(255, 0, 255, 0.1);
}

.toast-container .toast .toast-duration-bar {
    background-color: #0ff;
    box-shadow: 0 0 5px #0ff;
}
```

**Minimal Theme**
```css
.toast-container .toast {
    background-color: #f5f5f5;
    border: none;
    color: #333;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.toast-container .toast.toast-default-error {
    background-color: #fee;
    border: none;
    color: #c00;
}

.popup-container .popup {
    background-color: #fff;
    border: none;
    color: #333;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```