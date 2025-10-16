# Seqato - Modern Software Company Website

A modern, responsive web application for a software company built with React, GSAP animations, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional UI with gradient accents and smooth animations
- **GSAP Animations**: Smooth scroll effects, fade-ins, and interactive animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Scrolling**: Seamless navigation between sections
- **Interactive Components**: 
  - Hero section with animated elements
  - Services cards with hover effects
  - Portfolio with filtering capabilities
  - Testimonials carousel
  - Contact form with validation
- **Professional Sections**:
  - Hero with company introduction
  - About with company values and stats
  - Services showcase
  - Portfolio with project filtering
  - Client testimonials
  - Contact form and information

## Technologies Used

- **React 18** - Modern React with hooks
- **GSAP** - Professional animations and scroll effects
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **ScrollTrigger** - GSAP plugin for scroll-based animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd seqato-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Layout.js          # Main layout with navigation
│   ├── Hero.js           # Hero section with animations
│   ├── About.js          # About section
│   ├── Services.js       # Services showcase
│   ├── Portfolio.js      # Portfolio with filtering
│   ├── Testimonials.js   # Client testimonials carousel
│   └── Contact.js        # Contact form and info
├── App.js                # Main app component
├── index.js              # App entry point
└── index.css             # Global styles and Tailwind imports
```

## Key Features Explained

### GSAP Animations
- Scroll-triggered animations for each section
- Smooth scroll navigation between sections
- Parallax effects and hover animations
- Counter animations for statistics

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions

### Interactive Elements
- Service cards with hover effects
- Portfolio filtering system
- Testimonials carousel with navigation
- Contact form with validation

## Customization

### Colors
The color scheme can be customized in `tailwind.config.js` and by modifying the gradient classes throughout the components.

### Content
All content is easily customizable by editing the respective component files:
- Company information in `About.js`
- Services in `Services.js`
- Portfolio projects in `Portfolio.js`
- Testimonials in `Testimonials.js`

### Animations
GSAP animations can be modified in each component's `useEffect` hook. The animations are triggered by scroll position using ScrollTrigger.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact us at hello@seqato.com
