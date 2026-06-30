# C.KING Portfolio

A modern, minimalist portfolio website built with Next.js 14, GSAP animations, and Tailwind CSS.

## Features

- **Modern Design**: Clean, black and white aesthetic with bold typography
- **GSAP Animations**: Smooth scroll animations, text reveals, and page transitions
- **Responsive**: Mobile-first design that works on all devices
- **Fast Performance**: Built with Next.js App Router and optimized for speed
- **TypeScript**: Full type safety throughout the codebase
- **MDX Support**: Write project case studies in Markdown with React components

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) with ScrollTrigger
- **Typography**: [Syne](https://fonts.google.com/specimen/Syne) (headings) + [Inter](https://fonts.google.com/specimen/Inter) (body)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/c-king.git
cd c-king
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
C.King/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About page
│   │   ├── services/           # Services page
│   │   ├── projects/           # Projects listing & detail pages
│   │   ├── contact/            # Contact page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles
│   ├── components/             # Reusable React components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Footer.tsx          # Footer
│   │   ├── ProjectCard.tsx     # Project card component
│   │   ├── ContactForm.tsx     # Contact form
│   │   └── ...
│   └── lib/                    # Utility functions
│       ├── gsap.ts             # GSAP animation utilities
│       ├── mdx.ts              # MDX processing
│       └── projects.ts         # Project data
├── content/                    # MDX content files
│   └── projects/               # Project case studies
├── public/                     # Static assets
│   └── images/                 # Images and SVGs
└── package.json
```

## Customization

### Adding Your Portrait

Replace the placeholder image at `public/images/portrait.svg` with your own photo:
- Name it `portrait.jpg` or `portrait.png`
- Update the image path in `src/components/Hero.tsx` and `src/app/about/page.tsx`

### Adding Projects

1. Edit the project data in `src/lib/projects.ts`
2. Add project images to `public/images/`
3. Optionally, create MDX files in `content/projects/` for detailed case studies

### Customizing Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --background: #f5f5f5;
  --foreground: #0a0a0a;
  --accent: #e53935;
  --muted: #6b6b6b;
  --border: #e0e0e0;
}
```

### Updating Content

- **About page**: Edit `src/app/about/page.tsx`
- **Services**: Edit `src/app/services/page.tsx`
- **Contact info**: Edit `src/app/contact/page.tsx`
- **Social links**: Update links in `src/components/Header.tsx` and `src/components/Footer.tsx`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

```bash
npm run build
```

Or deploy directly with Vercel CLI:

```bash
npx vercel
```

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Built by Chandler King - Lead Software Developer & Founder of [Sozo Tech](https://sozotech.com)
