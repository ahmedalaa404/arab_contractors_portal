# Arab Contractors Website

A modern, responsive, and bilingual website for Arab Contractors (المقاولون العرب) built with HTML, CSS, JavaScript, Bootstrap 5, and jQuery.

## 🌟 Features

### ✅ Core Features
- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Bilingual Support**: Arabic and English with RTL/LTR layout switching
- **Dark/Light Mode**: Toggle between dark and light themes
- **Modern UI**: Professional design with gold color scheme (#B89D4F)
- **Smooth Animations**: AOS (Animate On Scroll) integration

### 🎯 Sections
1. **Header/Navbar**: Fixed transparent navbar with scroll effect
2. **Hero Section**: Full-screen carousel with project images
3. **About Section**: Company information with animated statistics
4. **Leadership**: Board members timeline with CEO highlighting
5. **Sustainability**: Cards showcasing environmental initiatives
6. **Footer**: Contact information and social links

### 🔧 Technical Features
- **Bootstrap 5**: Modern CSS framework
- **jQuery**: Enhanced interactivity
- **AOS.js**: Scroll animations
- **FontAwesome**: Professional icons
- **Google Fonts**: Cairo (Arabic) and Inter (English)

## 🚀 Quick Start

1. **Download/Clone** the project files
2. **Open** `index.html` in your web browser
3. **Test** all features:
   - Language toggle (AR/EN)
   - Dark mode toggle
   - Responsive design
   - Smooth scrolling

## 📁 File Structure

```
arab-contractors-website/
├── index.html          # Main HTML file
├── style.css           # Custom CSS styles
├── script.js           # jQuery functionality
└── README.md           # This file
```

## 🎨 Customization

### Colors
The website uses CSS variables for easy color customization:

```css
:root {
    --primary-gold: #B89D4F;      /* Main gold color */
    --secondary-gold: #8B7500;    /* Darker gold */
    --dark-charcoal: #1E1E1E;     /* Dark background */
    --light-gray: #F7F7F7;        /* Light background */
}
```

### Content
- **Images**: Replace placeholder images in the HTML
- **Text**: Update content in both English and Arabic
- **Leadership**: Add/remove board members in the leadership section
- **Projects**: Update carousel images and descriptions

### Translations
Add new translations in the `script.js` file:

```javascript
const translations = {
    en: {
        'your.key': 'English Text'
    },
    ar: {
        'your.key': 'Arabic Text'
    }
};
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔧 Dependencies

### CDN Links (included in HTML)
- Bootstrap 5.3.2
- jQuery 3.7.1
- FontAwesome 6.4.0
- AOS 2.3.1
- Google Fonts (Cairo, Inter)

## 📋 Features Breakdown

### 1. Navbar
- Transparent initially, changes on scroll
- Language toggle (AR/EN)
- Dark mode toggle
- Responsive mobile menu

### 2. Hero Carousel
- Auto-playing slides
- Pause on hover
- Smooth transitions
- Overlay text with animations

### 3. Leadership Section
- CEO card highlighted and centered
- Hover effects on cards
- Social media links
- Responsive grid layout

### 4. Sustainability Cards
- Icon animations
- Hover effects
- Responsive grid
- Professional styling

### 5. Footer
- Company information
- Social media links
- Contact details
- Copyright notice

## 🎯 Performance Features

- **Lazy Loading**: Images load as needed
- **Debounced Scroll**: Optimized scroll events
- **Minified Dependencies**: Fast loading
- **CSS Variables**: Efficient styling

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Semantic HTML structure
- **Focus Management**: Proper focus indicators
- **Alt Text**: All images have alt attributes

## 🔄 Language Switching

The website supports seamless language switching:

1. **RTL/LTR Layout**: Automatic direction switching
2. **Font Changes**: Cairo for Arabic, Inter for English
3. **Content Translation**: All text updates
4. **Local Storage**: Remembers user preference

## 🌙 Dark Mode

- **Toggle Button**: Moon/Sun icon
- **Persistent**: Saves user preference
- **Smooth Transitions**: CSS transitions
- **Complete Coverage**: All sections styled

## 📞 Contact Information

To customize contact information, update the footer section in `index.html`:

```html
<div class="contact-info">
    <p><i class="fas fa-map-marker-alt me-2"></i>Cairo, Egypt</p>
    <p><i class="fas fa-phone me-2"></i>+20 2 1234 5678</p>
    <p><i class="fas fa-envelope me-2"></i>info@arabcontractors.com</p>
</div>
```

## 🚀 Deployment

### Local Development
1. Open `index.html` in a web browser
2. All features work locally

### Web Server
1. Upload files to your web server
2. Ensure all CDN links are accessible
3. Test all features after deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Website will be available at `https://username.github.io/repository-name`

## 🐛 Troubleshooting

### Common Issues

1. **Images Not Loading**
   - Check image URLs in HTML
   - Ensure images are in correct directory

2. **Animations Not Working**
   - Verify AOS.js is loaded
   - Check browser console for errors

3. **Language Toggle Not Working**
   - Ensure jQuery is loaded
   - Check browser console for JavaScript errors

4. **Responsive Issues**
   - Test on different screen sizes
   - Check CSS media queries

## 📈 Future Enhancements

- **Contact Form**: Add functional contact form
- **Blog Section**: Add news/blog functionality
- **Project Gallery**: Expand project showcase
- **Multi-language**: Add more languages
- **CMS Integration**: Connect to content management system

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For questions or support:
- Check the troubleshooting section
- Review browser console for errors
- Ensure all dependencies are loaded

---

**Built with ❤️ for Arab Contractors** 