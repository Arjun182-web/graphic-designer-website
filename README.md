# Premium Portfolio - Next.js Frontend

A stunning dark luxury design portfolio built with Next.js, Tailwind CSS, and Framer Motion.

## Features

✨ **Dark Luxury Design** - Elegant dark theme with gold accents  
📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop  
🎨 **Reusable Components** - Well-organized, modular component structure  
⚡ **Smooth Animations** - Framer Motion animations throughout  
🎯 **Modern Stack** - Next.js 14, React 18, TypeScript, Tailwind CSS  
🔍 **SEO Optimized** - Metadata and semantic HTML  

## Pages

- **Home** - Hero section with featured work, services, and CTA
- **Portfolio** - Filterable project gallery with categories
- **About** - Bio, skills, experience, and journey sections
- **Services** - Detailed service offerings and process
- **Blog** - Searchable blog articles with categories
- **Contact** - Contact form and information

## Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── portfolio/
│   │   └── page.tsx             # Portfolio page
│   ├── about/
│   │   └── page.tsx             # About page
│   ├── services/
│   │   └── page.tsx             # Services page
│   ├── blog/
│   │   └── page.tsx             # Blog page
│   └── contact/
│       └── page.tsx             # Contact page
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Footer.tsx           # Footer
│   │   └── MobileMenu.tsx       # Mobile menu component
│   ├── home/
│   │   ├── Hero.tsx             # Hero section
│   │   ├── FeaturedWork.tsx     # Featured projects
│   │   ├── Services.tsx         # Services overview
│   │   └── CTA.tsx              # Call to action
│   ├── portfolio/
│   │   ├── PortfolioFilter.tsx  # Category filter
│   │   └── PortfolioGallery.tsx # Project gallery
│   ├── about/
│   │   ├── AboutHero.tsx        # About introduction
│   │   ├── Skills.tsx           # Skills section
│   │   ├── Experience.tsx       # Work experience
│   │   └── Journey.tsx          # Personal journey
│   ├── services/
│   │   ├── ServicesGrid.tsx     # Services cards
│   │   └── ServiceProcess.tsx   # Process timeline
│   ├── blog/
│   │   ├── BlogSearch.tsx       # Search functionality
│   │   └── BlogGrid.tsx         # Articles grid
│   └── contact/
│       ├── ContactForm.tsx      # Contact form
│       └── ContactInfo.tsx      # Contact information
└── globals.css                  # Global styles
```

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Configuration

### Tailwind CSS
Custom colors and animations are configured in `tailwind.config.js`:
- **Dark theme** with dark-900 to dark-600 shades
- **Gold/Silver accent colors** for luxury feel
- **Custom animations** for smooth transitions

### Environment Variables
Create a `.env.local` file if needed for API endpoints:
```
NEXT_PUBLIC_API_URL=your_api_url
```

## Design System

### Colors
- **Background**: `dark-900` (#0a0e27)
- **Surface**: `dark-800` (#1a1f3a)
- **Accent**: `gold-500` (#d4af37)
- **Text**: `silver` (#e8e8e8)

### Typography
- Font family: Segoe UI, Trebuchet MS, sans-serif
- Large headings: 6xl, 5xl, 4xl
- Body text: Base with gray-400 for secondary content

### Animations
- **fadeIn**: 0.6s ease-in-out
- **slideInUp**: 0.6s ease-out
- **slideInLeft/Right**: 0.6s ease-out
- Framer Motion variants for advanced interactions

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized image loading
- Code splitting with Next.js
- CSS optimization with Tailwind
- Minimal dependencies
- Fast animations with GPU acceleration

## Customization

### Add More Pages
1. Create a new folder in `src/app/`
2. Add `page.tsx` file
3. Update navigation in `Header.tsx`

### Modify Colors
Edit the color palette in `tailwind.config.js`

### Update Content
Replace placeholder content in components with real data or CMS integration

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **ESLint** - Code quality

## License

This project is open source and available under the MIT License.

## Contact

For inquiries or custom development, please get in touch through the contact page.

---

Built with ❤️ using modern web technologies
