# Esencias By Nancy - Essential Oils E-commerce Website

A modern, bilingual e-commerce website for Esencias By Nancy, specializing in premium essential oils and natural products. Built with Next.js 15, Sanity CMS, and TypeScript.

## 🌟 Features

### 🛍️ E-commerce Functionality

- **Product Catalog**: Browse and search through essential oils and natural products
- **Product Details**: Detailed product pages with image galleries and descriptions
- **Shopping Cart**: Add products to cart with quantity management
- **Contact Form**: Customer inquiry system for orders and questions
- **Product Categories**: Organized product browsing by categories

### 🌍 Internationalization

- **Bilingual Support**: Full English and Spanish language support
- **SEO Optimized**: Proper hreflang tags and localized meta data
- **URL Structure**: Clean URL routing with language prefixes (`/es/` for Spanish)

### 🎨 User Experience

- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Image Optimization**: Next.js Image component with Sanity CDN
- **Photo Gallery**: Interactive image galleries with lightbox functionality
- **Hero Sliders**: Dynamic hero sections with auto-playing image carousels
- **Dark Mode**: Built-in dark/light theme support

### 📱 Performance & SEO

- **Static Generation**: Pre-rendered pages for optimal performance
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Sitemap**: Automated XML sitemap generation
- **Robots.txt**: Search engine optimization
- **Performance Monitoring**: Built-in performance tracking

### 🛠️ Content Management

- **Sanity Studio**: Headless CMS for content management
- **Media Management**: Advanced image and media handling
- **Rich Text**: Portable Text for flexible content editing
- **Localized Content**: Multi-language content management

## 🚀 Technology Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **React 19**: Latest React with concurrent features
- **Motion**: Animation library for smooth transitions

### Backend & CMS

- **Sanity.io**: Headless CMS with real-time collaboration
- **GROQ**: Query language for Sanity
- **Portable Text**: Rich text content handling

### E-commerce & UI

- **React Icons**: Comprehensive icon library
- **Swiper**: Touch slider for mobile-friendly interactions
- **React Photo Album**: Optimized image galleries
- **React Toastify**: User notification system
- **Yet Another React Lightbox**: Image lightbox functionality

### Internationalization

- **i18next**: Internationalization framework
- **next-i18next**: Next.js integration for i18next
- **react-i18next**: React bindings for i18next

### Development Tools

- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 📁 Project Structure

```
nancy-store-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (root)/            # Main application routes
│   │   │   ├── [lang]/        # Language-specific routes
│   │   │   │   ├── products/  # Product pages
│   │   │   │   ├── cart/      # Shopping cart
│   │   │   │   ├── contact/   # Contact form
│   │   │   │   ├── about-us/  # About page
│   │   │   │   └── photo-gallery/ # Image gallery
│   │   │   └── layout.tsx     # Root layout
│   │   ├── studio/            # Sanity Studio
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── Layout/           # Layout components
│   │   ├── ProductsComponents/ # Product-related components
│   │   ├── HeroComponent/    # Hero section components
│   │   ├── CartComponents/   # Shopping cart components
│   │   ├── ContactFormComponents/ # Contact form
│   │   └── PhotoGalleryComponents/ # Gallery components
│   ├── sanity/               # Sanity CMS configuration
│   │   ├── schemaTypes/      # Content schemas
│   │   ├── lib/             # Sanity utilities
│   │   └── env.ts           # Environment variables
│   ├── i18n/                # Internationalization
│   │   ├── locales/         # Translation files
│   │   └── settings.ts      # i18n configuration
│   ├── types/               # TypeScript type definitions
│   ├── lib/                 # Utility functions
│   └── context/             # React context providers
├── public/                  # Static assets
├── scripts/                 # Build and deployment scripts
└── dist/                    # Build output
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Sanity account (for CMS)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nancy-store-nextjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file with your Sanity configuration:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Sanity Studio Setup

1. **Access Sanity Studio**
   Navigate to [http://localhost:3000/studio](http://localhost:3000/studio)

2. **Configure Content Types**

   - Set up product schemas
   - Configure image assets
   - Set up page content types

3. **Deploy Sanity Studio** (optional)
   ```bash
   npm run sanity-deploy
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run sanity-deploy` - Deploy Sanity Studio

## 🌐 Deployment

### Netlify Deployment

The project is configured for Netlify deployment with:

- Automatic builds from Git
- Next.js plugin integration
- Optimized caching headers
- Image optimization

### Environment Variables for Production

Ensure these are set in your deployment platform:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`

## 🎨 Customization

### Styling

- **Tailwind CSS**: Modify `tailwind.config.js` for theme customization
- **Global Styles**: Edit `src/app/globals.css` for custom CSS
- **Component Styles**: Use Tailwind classes or styled-components

### Content Management

- **Sanity Schemas**: Modify `src/sanity/schemaTypes/` for content structure
- **Translations**: Update `src/i18n/locales/` for new languages
- **SEO**: Configure meta tags in page components

### Features

- **Products**: Add new product types in Sanity schemas
- **Pages**: Create new page types and routes
- **Components**: Extend component library in `src/components/`

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `sanity.config.ts` - Sanity CMS configuration
- `tsconfig.json` - TypeScript configuration
- `netlify.toml` - Netlify deployment configuration

## 📊 Performance Features

- **Image Optimization**: Automatic image compression and responsive sizes
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Pre-rendered pages for fast loading
- **Caching**: Optimized caching strategies for static assets
- **Bundle Analysis**: Built-in bundle size monitoring

## 🔒 Security

- **Content Security Policy**: Configured headers for XSS protection
- **Environment Variables**: Secure handling of sensitive data
- **Input Validation**: Sanitized user inputs
- **HTTPS**: Enforced secure connections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For support and questions:

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Sanity documentation](https://www.sanity.io/docs)
- Contact the development team

---

**Esencias By Nancy** - Premium essential oils and natural products for wellness and aromatherapy.
