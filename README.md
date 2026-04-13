# Seno Nguyen — Photography Portfolio

Premium photography portfolio website built with Next.js, GSAP, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → Open http://localhost:3000

# Build for production
npm run build
npm start
```

## Stack

- **Next.js 16** (App Router)
- **GSAP 3** — scroll animations, entrance effects, counters
- **Lenis** — buttery smooth scroll
- **Framer Motion** — available for additional micro-interactions
- **Tailwind CSS** — utility-first styling

## Sections

| Section | Description |
|---|---|
| Preloader | Animated count + brand reveal, clips out into hero |
| Navigation | Fixed header, scroll-aware, mobile overlay menu |
| Hero | Fullscreen image, parallax on scroll, cinematic overlay |
| Portfolio | Filterable grid (Mariage / Portrait / Événement) |
| Wedding | Storytelling layout with parallax images + animated counters |
| Magazine Box | Premium photo booth rental showcase with floating elements |
| About | Photographer presentation with clip-path image reveal |
| Testimonials | Animated slider with dot navigation |
| Contact | Interactive form with service selector |
| Footer | Infinite marquee + back-to-top |

## Customization

### Images
Replace Unsplash URLs in each component with your own photos. The `next.config.js` allows `images.unsplash.com` by default — add your own domain if needed.

### Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  gold: "#C9A84C",       // primary accent
  cream: "#F5F0E8",      // text/light
  charcoal: "#1A1A1A",   // dark surfaces
}
```

### Content
- Update `app/layout.tsx` for SEO metadata
- Edit text directly in each component
- Replace placeholder contact info in `Contact.tsx` and `Footer.tsx`

### Fonts
Loaded via Google Fonts in `globals.css`. Swap the `@import` URL to change families.

## Performance Notes

- All animations use `will-change: transform` where needed
- Images use Next.js `<Image>` with proper `sizes` props
- Lenis smooth scroll is initialized client-side only
- GSAP ScrollTrigger instances are cleaned up on unmount
