# Header and Footer Components

This folder contains reusable header and footer components for the Arab Contractors website.

## 📁 File Structure

```
components/
├── header.html          # Header/Navbar HTML component
├── footer.html          # Footer HTML component
├── carousel.html        # Carousel HTML component
├── header.css           # Header styles
├── footer.css           # Footer styles
├── carousel.css         # Carousel styles
├── header-footer.js     # Header and footer JavaScript functionality
└── README.md           # This file
```

## 🚀 How to Use

### 1. Include HTML Components

Add these components to your HTML pages:

```html
<!-- Include Header -->
<div id="header-placeholder"></div>

<!-- Include Carousel (optional) -->
<div id="carousel-placeholder"></div>

<!-- Your page content here -->

<!-- Include Footer -->
<div id="footer-placeholder"></div>
```

### 2. Include CSS Files

Add these CSS files to your HTML `<head>` section:

```html
<link rel="stylesheet" href="components/header.css">
<link rel="stylesheet" href="components/footer.css">
<link rel="stylesheet" href="components/carousel.css">
```

### 3. Include JavaScript

Add this JavaScript file before the closing `</body>` tag:

```html
<script src="components/header-footer.js"></script>
```

### 4. Load Components with JavaScript

Add this script to load the components:

```html
<script>
$(document).ready(function() {
    // Load Header
    $('#header-placeholder').load('components/header.html');
    
    // Load Carousel (optional)
    $('#carousel-placeholder').load('components/carousel.html');
    
    // Load Footer
    $('#footer-placeholder').load('components/footer.html');
});
</script>
```

## 📋 Required Dependencies

Make sure you have these dependencies in your HTML:

```html
<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<!-- AOS CSS -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Bootstrap 5 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- AOS JS -->
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
```

## 🎨 Features

### Header Features:
- ✅ Responsive navigation
- ✅ Language toggle (English/Arabic)
- ✅ Theme toggle (Light/Dark)
- ✅ Smooth scrolling
- ✅ Active link highlighting
- ✅ Mobile hamburger menu
- ✅ Dropdown menus
- ✅ Scroll effects

### Footer Features:
- ✅ Company information
- ✅ Quick links
- ✅ Services overview
- ✅ Contact information
- ✅ Social media links
- ✅ Copyright notice
- ✅ Responsive design

### Carousel Features:
- ✅ Auto-playing slides
- ✅ Navigation controls
- ✅ Indicators
- ✅ Responsive images
- ✅ Hover pause
- ✅ Smooth transitions

## 🔧 Customization

### Changing Navigation Links

Edit `header.html` to modify navigation links:

```html
<li class="nav-item">
    <a class="nav-link" href="your-page.html" data-i18n="nav.yourpage">Your Page</a>
</li>
```

### Adding Translations

Edit `header-footer.js` to add new translations:

```javascript
const translations = {
    en: {
        'nav.yourpage': 'Your Page',
        // ... other translations
    },
    ar: {
        'nav.yourpage': 'صفحتك',
        // ... other translations
    }
};
```

### Modifying Styles

Edit the CSS files to customize appearance:

- `header.css` - Header and navigation styles
- `footer.css` - Footer styles
- `carousel.css` - Carousel styles

### Changing Carousel Images

Edit `carousel.html` to change carousel images:

```html
<div class="carousel-item active">
    <img src="your-image.jpg" class="d-block w-100" alt="Your Image">
</div>
```

## 📱 Responsive Design

All components are fully responsive and work on:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

## 🌐 Internationalization

The components support:
- ✅ English (LTR)
- ✅ Arabic (RTL)
- ✅ Language persistence
- ✅ Automatic text direction

## 🎨 Theme Support

The components support:
- ✅ Light theme
- ✅ Dark theme
- ✅ Theme persistence
- ✅ Smooth transitions

## 🔧 JavaScript Functions

### Available Functions:

- `toggleLanguage(lang)` - Switch between English and Arabic
- `toggleDarkMode()` - Switch between light and dark themes
- `animateBrandName()` - Animate the Arabic brand name
- `initializeTheme()` - Load saved theme preference
- `initializeLanguage()` - Load saved language preference
- `initializeCarousel()` - Initialize carousel functionality

### Event Handlers:

- Language toggle button
- Theme toggle button
- Mobile menu toggle
- Smooth scrolling for anchor links
- Social media link clicks
- Scroll to top functionality

## 📝 Notes

1. **File Paths**: Make sure all file paths are correct relative to your project structure
2. **Dependencies**: Ensure all required libraries are loaded before the component scripts
3. **Images**: Update image paths in carousel.html to match your project structure
4. **Links**: Update navigation links in header.html to match your page structure
5. **Social Media**: Update social media URLs in header-footer.js

## 🐛 Troubleshooting

### Common Issues:

1. **Components not loading**: Check file paths and ensure jQuery is loaded
2. **Styles not applying**: Verify CSS files are properly linked
3. **JavaScript errors**: Check browser console for errors
4. **Responsive issues**: Test on different screen sizes
5. **Language not switching**: Verify translations object is complete

### Debug Tips:

- Check browser console for JavaScript errors
- Verify all file paths are correct
- Ensure all dependencies are loaded
- Test on different browsers and devices
- Check network tab for failed requests

## 📞 Support

For issues or questions about these components, please check:
1. Browser console for errors
2. File paths and dependencies
3. This README for common solutions
4. The main project documentation 