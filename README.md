
# Markdown ↔ Rich Text Converter

A modern web application for seamless conversion between Markdown and Rich Text formats, built with React and TypeScript.

## 🚀 Features

- **Bidirectional Conversion**: Convert from Markdown to Rich Text and vice versa
- **Live Preview**: Real-time preview of conversions
- **Citation Removal**: Option to remove citation markers during conversion
- **Plain Text Output**: Toggle for plain text formatting
- **Dark/Light Theme**: Built-in theme switcher
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Copy to Clipboard**: Easy copying of converted content
- **Clear Content**: Quick clearing of both input and output areas

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components built on Radix UI
- **Radix UI** - Low-level UI primitives for building accessible components
- **Tailwind Animate** - Animation utilities for Tailwind CSS

### State Management & Data Fetching
- **TanStack React Query** - Powerful data synchronization for React
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### Routing & Navigation
- **React Router DOM** - Declarative routing for React applications

### Charts & Visualization
- **Recharts** - Composable charting library for React

### Icons & Assets
- **Lucide React** - Beautiful & consistent icon pack

### Backend Integration
- **Supabase** - Backend-as-a-Service for authentication and database

## 📁 Project Architecture

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   └── conversion/      # Conversion-specific components
│       ├── Header.tsx
│       ├── ConversionControls.tsx
│       ├── EditorPanel.tsx
│       ├── ConversionDirection.tsx
│       ├── DirectionToggle.tsx
│       ├── FeaturesSection.tsx
│       ├── KitOptinForm.tsx
│       ├── Footer.tsx
│       └── BottomPromoBar.tsx
├── hooks/               # Custom React hooks
│   └── useConversion.ts # Main conversion logic hook
├── pages/               # Page components
│   ├── Index.tsx        # Main application page
│   ├── Auth.tsx         # Authentication page
│   └── NotFound.tsx     # 404 error page
├── utils/               # Utility functions
│   ├── conversion.js    # Conversion algorithms
│   ├── appOperations.js # App-specific operations
│   ├── ui.js           # UI utility functions
│   └── eventHandlers.js # Event handling utilities
├── styles/              # CSS stylesheets
│   ├── index.css        # Main styles
│   ├── base.css         # Base styles
│   ├── buttons.css      # Button styles
│   ├── conversion.css   # Conversion UI styles
│   ├── editor.css       # Editor panel styles
│   ├── features.css     # Features section styles
│   ├── layout.css       # Layout styles
│   └── responsive.css   # Responsive design styles
├── integrations/        # Third-party integrations
│   └── supabase/        # Supabase configuration
└── contexts/            # React contexts
    └── AuthContext.tsx  # Authentication context
```

## 🔧 Key Components

### Core Conversion Hook (`useConversion`)
The main business logic is contained in the `useConversion` hook which manages:
- Input/output text state
- Conversion direction (Markdown ↔ Rich Text)
- Conversion options (citation removal, plain formatting)
- HTML input detection and processing
- Clipboard operations

### Editor Panels
- **EditorPanel**: Reusable component for both input and output areas
- **ConversionDirection**: Handles the convert and clear operations
- **ConversionControls**: Manages conversion options and settings

### Theme System
- Dark/light theme toggle with localStorage persistence
- CSS custom properties for theme variables
- Responsive design across all components

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd markdown-richtext-converter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📦 Dependencies

### Core Dependencies
- `react` & `react-dom` - React framework
- `typescript` - TypeScript support
- `vite` - Build tool and dev server

### UI & Styling
- `tailwindcss` - CSS framework
- `@radix-ui/*` - UI component primitives
- `lucide-react` - Icon library
- `class-variance-authority` - CSS class management
- `clsx` & `tailwind-merge` - Utility functions

### Form & Validation
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation

### Routing & State
- `react-router-dom` - Client-side routing
- `@tanstack/react-query` - Server state management

### Backend & Auth
- `@supabase/supabase-js` - Supabase client

### Utilities
- `date-fns` - Date manipulation
- `sonner` - Toast notifications

## 🔄 Conversion Logic

The application supports bidirectional conversion between Markdown and Rich Text:

1. **Markdown → Rich Text**: Parses Markdown syntax and converts to HTML
2. **Rich Text → Markdown**: Processes HTML/rich content and converts to Markdown syntax

Key features of the conversion system:
- Handles pasted HTML content intelligently
- Preserves formatting during conversion
- Optional citation marker removal
- Support for both plain text and formatted output

## 🎨 Styling Architecture

The project uses a modular CSS architecture:
- **Tailwind CSS** for utility-first styling
- **CSS Custom Properties** for theme variables
- **Component-scoped styles** for specific UI elements
- **Responsive design** with mobile-first approach

## 🔐 Authentication

The application includes Supabase-based authentication:
- User registration and login
- Session management
- Protected routes
- User profile management

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Adaptive layouts for different screen sizes
- Touch-friendly interfaces on mobile devices
- Optimized typography and spacing

## 🚀 Deployment

The application can be deployed using various platforms:
- **Vercel** (recommended for Vite projects)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation for common solutions
- Review the code comments for implementation details

---

Built with ❤️ using React, TypeScript, and modern web technologies.
