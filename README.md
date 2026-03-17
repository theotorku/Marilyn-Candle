# P.M Candles

A luxury handcrafted candle e-commerce landing page built with vanilla HTML, CSS, and JavaScript.

## Live Features

- **Responsive Design** — Adapts seamlessly across desktop, tablet, and mobile breakpoints (1024px, 768px, 480px)
- **Mobile Navigation** — Animated hamburger menu with slide-down drawer for small screens
- **Cart System** — Slide-out cart drawer with add, remove, and quantity controls; live badge count and total calculation
- **Transform Parallax** — GPU-accelerated `translate3d` parallax on hero and quote sections (no `background-attachment: fixed` jank)
- **Custom Cursor** — Dot + outline cursor with interactive hover states, gated behind `pointer: fine` media query
- **Newsletter Form** — Client-side email capture with success feedback
- **Scroll Animations** — Fade-in effects via AOS (Animate On Scroll) library

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Markup    | HTML5, semantic elements          |
| Styling   | CSS3, custom properties, flexbox, grid |
| Scripts   | Vanilla JavaScript (ES6+)         |
| Fonts     | Playfair Display + Lato (Google Fonts) |
| Icons     | Font Awesome 6.4                  |
| Animations| AOS 2.3.1                         |

## Project Structure

```
P.M Candles/
├── index.html      # Main page markup
├── script.js       # All interactivity (cart, menu, parallax, cursor, newsletter)
├── styles.css      # Full stylesheet with responsive breakpoints
├── favicon.png     # Site icon (add your own)
└── README.md       # This file
```

## Getting Started

No build tools required. Just open `index.html` in a browser.

```bash
# Option 1: Direct open
open index.html

# Option 2: Local server (avoids CORS issues with fonts/images)
npx serve .
```

## Accessibility

- Skip-to-content link for keyboard users
- `aria-label` on all icon-only links and buttons
- Screen-reader-only `<label>` on the newsletter email input
- Custom cursor only activates on devices with a fine pointer — keyboard and touch users get the native cursor
- Semantic HTML structure with proper heading hierarchy

## SEO

- `<meta name="description">` for search engine snippets
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`) for social sharing
- Twitter Card meta tags
- Favicon link

## Browser Support

- Chrome, Edge, Firefox, Safari (latest 2 versions)
- Mobile Safari and Chrome for Android
- Parallax gracefully degrades on mobile (no `background-attachment: fixed`)

## Customization

### Branding

Update the logo in `index.html` — the "P.M" uses a CSS gradient defined in `styles.css` under `.logo-m`:

```css
.logo-m {
    background: linear-gradient(135deg, var(--accent) 0%, #e8c88a 100%);
}
```

### Colors

All colors are controlled via CSS custom properties in `:root`:

```css
--primary-bg: #F9F7F5;    /* Page background */
--text-main: #2C2C2C;     /* Primary text */
--text-muted: #6A6A6A;    /* Secondary text */
--accent: #CFA670;        /* Gold accent */
--accent-hover: #B88E5A;  /* Hover state */
--dark-bg: #1A1A1A;       /* Footer background */
```

### Products

Each product card reads from `data-*` attributes for cart functionality:

```html
<div class="product-card"
     data-product-name="Midnight Amber"
     data-product-price="45.00"
     data-product-image="image-url">
```

## License

All rights reserved. &copy; 2026 P.M Candles.
