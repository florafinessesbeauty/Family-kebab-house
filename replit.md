# Family Kebab House - Replit.md

## Overview

Family Kebab House is a restaurant website for a kebab and pizza shop located in Stalham, Norwich. The application is built as a full-stack web application featuring a modern React frontend with a Node.js/Express backend, utilizing PostgreSQL for data persistence and Drizzle ORM for database operations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: React Router with hash-based routing for GitHub Pages compatibility
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom color scheme and Google Fonts (Poppins, Inter, Dancing Script)

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Structure**: RESTful API with `/api` prefix (currently minimal implementation)
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for server bundling

### Database Layer
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Connection**: @neondatabase/serverless with connection pooling
- **Schema**: Centralized schema definitions in `shared/schema.ts`

## Key Components

### Database Schema
- **Menu Items Table**: Supports flexible pricing (small/medium/large/XL, single price, pizza sizes)
- **Users Table**: Basic user authentication structure
- **Schema Features**: Zod validation integration, TypeScript type inference

### Frontend Components
- **Layout**: Header with responsive navigation, Footer with business information
- **Pages**: Home, Menu, About, Contact, and 404 error handling
- **UI Components**: Full shadcn/ui component library implementation
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

### Business Logic
- **Menu System**: Category-based menu organization with special offers support
- **Storage Interface**: Abstracted database operations through IStorage interface
- **Menu Categories**: Kebabs, Pizzas, Burgers, Fried Chicken, Wings, Extras, Desserts

## Data Flow

1. **Client Requests**: React frontend makes API calls using TanStack Query
2. **API Layer**: Express server handles requests with middleware for logging and error handling
3. **Data Access**: Storage layer abstracts database operations using Drizzle ORM
4. **Response**: JSON responses sent back to client with appropriate error handling
5. **UI Updates**: React Query manages cache invalidation and UI updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm & drizzle-kit**: Database ORM and migration tooling
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **react-router-dom**: Client-side routing

### Development Tools
- **Vite**: Development server and build tool with React plugin
- **TypeScript**: Type safety and development experience
- **Tailwind CSS**: Utility-first CSS framework
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev`
- **Port**: 5000 (configured in .replit)
- **Hot Reload**: Vite HMR with Replit integration

### Production Build
- **Frontend Build**: Vite builds static assets to `dist/public`
- **Backend Build**: esbuild bundles server code to `dist/index.js`
- **Base Path**: Configured for GitHub Pages deployment (`/Family-kebab-house/`)

### Deployment Targets
- **Replit**: Autoscale deployment with build/run configuration
- **GitHub Pages**: Static site deployment from `docs/` folder
- **Database**: Requires DATABASE_URL environment variable for PostgreSQL connection

## Changelog

```
Changelog:
- June 19, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```