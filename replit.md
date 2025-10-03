# Weeny Memecoin Landing Page

## Overview

This is a Halloween-themed memecoin landing page built for the Weeny token on the Solana blockchain. The application is a single-page marketing website featuring a cute ghost character, spooky aesthetics, animated elements, and comprehensive information about the Weeny memecoin project. It includes sections for project details, tokenomics, purchasing instructions, roadmap, and community links.

**Main Character**: White ghost with black paws raised saying "BOO" (BackgroundEraser_20251003_161709572_1759505737101.png)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast Hot Module Replacement (HMR)
- Wouter for lightweight client-side routing
- React Query (@tanstack/react-query) for server state management and data fetching

**UI Component System**
- Shadcn UI component library (New York style variant) with Radix UI primitives
- Tailwind CSS for utility-first styling with custom Halloween-themed design tokens
- CSS variables for theming with dark mode support
- Custom fonts: Inter (sans), Creepster (display), Permanent Marker (marker)

**Animation & Interactions**
- Custom scroll-based animations using Intersection Observer API
- Parallax scrolling effects
- Particle system with floating emojis and interactive cursor trails
- Embla Carousel for content carousels
- Smooth scrolling navigation

**State Management**
- React Query for async state and API communication
- React Hook Form with Zod resolvers for form validation
- Local component state with React hooks

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Development mode uses Vite middleware for HMR
- Production mode serves static built assets
- Custom logging middleware for API request tracking

**Data Storage**
- In-memory storage implementation (`MemStorage` class) for development
- Drizzle ORM configured for PostgreSQL with Neon serverless driver
- Database schema defined with Drizzle's type-safe schema builder
- Zod schema validation integrated with Drizzle

**API Design**
- RESTful API architecture with `/api` prefix for all routes
- Storage abstraction layer (`IStorage` interface) allows switching between memory and database implementations
- Currently implements user management (CRUD operations)

**Session Management**
- Configured with connect-pg-simple for PostgreSQL session storage
- Session middleware ready for authentication implementation

### Design System

**Color Palette (Halloween Theme)**
- Primary: Orange (`hsl(25, 100%, 50%)`)
- Secondary: Purple (`hsl(270, 100%, 42%)`)
- Accent: Neon Green (`hsl(160, 100%, 50%)`)
- Dark backgrounds with high contrast text
- Custom CSS variables for consistent theming

**Typography**
- Display font: Creepster (spooky headings)
- Body font: Inter (readable content)
- Marker font: Permanent Marker (decorative elements)

**Component Patterns**
- Scroll-triggered fade-in animations
- Hover effects with scale transformations
- Gradient backgrounds and glowing effects
- Responsive grid layouts

## External Dependencies

**Database & Storage**
- Neon Serverless PostgreSQL (@neondatabase/serverless) - Cloud-native serverless Postgres
- Drizzle ORM (drizzle-orm) - Type-safe ORM for database operations
- connect-pg-simple - PostgreSQL session store for Express

**UI Component Libraries**
- Radix UI primitives - Unstyled, accessible component primitives
- Tailwind CSS - Utility-first CSS framework
- Shadcn UI - Pre-built component collection
- class-variance-authority - Variant-based styling utility

**Form & Validation**
- React Hook Form - Performant form library
- Zod - TypeScript-first schema validation
- @hookform/resolvers - Validation resolvers for React Hook Form

**Development Tools**
- Vite - Frontend build tool
- tsx - TypeScript execution for Node.js
- esbuild - JavaScript bundler for production builds
- @replit/vite-plugin-* - Replit-specific development plugins

**Routing & Navigation**
- Wouter - Minimalist router for React
- Client-side navigation with smooth scrolling

**Date & Utilities**
- date-fns - Modern date utility library
- clsx/tailwind-merge - Utility for conditional class names
- nanoid - Unique ID generator

**Assets**
- Google Fonts (Creepster, Inter, Permanent Marker, Fira Code, Geist Mono)
- Custom image assets stored in attached_assets directory