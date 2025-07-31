# NGO Website Development - Replit.md

## Overview

This project is a modern, full-stack NGO website for **Samruddhi Service Society**, established in 1995. The application is designed to showcase the organization's mission of empowering underprivileged rural girls and differently-abled children through education and care. The website includes a comprehensive public-facing interface with enhanced donor engagement features and an admin dashboard for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Architecture
The application follows a modern full-stack architecture with:

- **Frontend**: React with TypeScript using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit-based OIDC authentication
- **Styling**: Tailwind CSS with shadcn/ui components

### Architectural Decisions
1. **Monorepo Structure**: All code is organized in a single repository with clear separation between client, server, and shared code
2. **TypeScript First**: Ensures type safety across the entire application
3. **Component-Based UI**: Uses shadcn/ui for consistent, accessible components
4. **Server-Side Rendering**: Vite development server with Express for production

## Key Components

### Frontend Components
- **Enhanced Public Pages**: Comprehensive home page with Hero, Impact Section, About, Programs, Success Stories, Donate, Volunteer Section, Testimonials, Partners Section, Download Brochure, and Contact
- **Admin Dashboard**: Complete CMS for managing all website content
- **Donor Engagement Features**: Animated impact counters, success story carousel, volunteer application form, partner showcase, and downloadable brochure
- **Responsive Design**: Mobile-first approach using Tailwind CSS with enhanced visual appeal
- **UI Components**: Comprehensive set of reusable components from shadcn/ui with custom animations and interactive elements

### Backend Services
- **RESTful API**: Express routes for all CRUD operations
- **Authentication Middleware**: Replit OIDC integration with session management
- **Database Operations**: Centralized storage service with Drizzle ORM
- **Error Handling**: Comprehensive error handling and logging

### Database Schema
Key entities include:
- **Users**: Replit authentication integration
- **Hero Content**: Homepage banner content
- **About Content**: Organization information
- **Programs**: Service offerings with images and descriptions
- **Testimonials**: Success stories and feedback
- **Contact Info**: Organization contact details and social media
- **Contact Submissions**: Form submissions from visitors
- **Donation Config**: Donation settings and information

## Data Flow

### Public Website Flow
1. User visits homepage
2. React components fetch content from API endpoints
3. Server retrieves data from PostgreSQL via Drizzle ORM
4. Content is displayed with fallback defaults if no custom content exists

### Admin Management Flow
1. Admin authenticates via Replit OIDC
2. Protected admin routes load content management interface
3. Admin makes changes through forms
4. Changes are validated and saved to database
5. Public website reflects updates immediately

### Authentication Flow
1. Replit OIDC handles user authentication
2. Session is stored in PostgreSQL with connect-pg-simple
3. Protected routes check authentication status
4. Unauthorized users are redirected to login

## External Dependencies

### Core Technologies
- **React 18**: Frontend framework with hooks and functional components
- **Express.js**: Backend web framework
- **Drizzle ORM**: Type-safe database operations
- **PostgreSQL**: Primary database via Neon serverless
- **Tailwind CSS**: Utility-first CSS framework

### Authentication & Security
- **Replit OIDC**: Authentication provider
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library
- **React Hook Form**: Form management
- **TanStack Query**: Data fetching and caching

## Deployment Strategy

### Development Environment
- **Vite Dev Server**: Hot module replacement for frontend development
- **tsx**: TypeScript execution for backend development
- **Concurrent Development**: Frontend and backend run simultaneously

### Production Build
1. **Frontend Build**: Vite builds React app to static files
2. **Backend Build**: esbuild bundles Express server
3. **Static Serving**: Express serves built frontend files
4. **Database Migrations**: Drizzle handles schema updates

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **SESSION_SECRET**: Session encryption key
- **REPLIT_DOMAINS**: Authentication domain configuration
- **NODE_ENV**: Environment detection

### File Structure
```
/
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared TypeScript types and schemas
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Recent Enhancements (January 2025)

### Complete NGO Website Transformation
Transformed the basic NGO website into a comprehensive organizational platform with all standard NGO features:

#### Core Organizational Features
- **Leadership Section**: Complete team profiles with roles, qualifications, and experience
- **News & Blog Section**: Content management for announcements, impact stories, and updates
- **Photo Gallery**: Categorized visual storytelling with event documentation
- **Annual Reports**: Transparent financial and impact reporting with downloadable documents
- **Certifications Section**: Legal compliance documentation and recognition showcase
- **Events Management**: Upcoming and past events with registration capabilities
- **Resources & Publications**: Research papers, case studies, and educational materials
- **Media Coverage**: Professional media presence with documentaries and press coverage

#### Enhanced Engagement Features
- **How to Help Section**: Comprehensive guide with 5 pathways (Celebrate, Sponsor, Corporate Partnership, Volunteering, Employee Engagement)
- **CSR Partnership Program**: Structured corporate engagement with multiple partnership models
- **Impact Statistics**: Data-driven storytelling with measurable outcomes
- **Professional Navigation**: Enhanced header with all organizational sections

#### Previously Implemented Features
- **Impact Section**: Animated counters showing years of service, children supported, and core programs
- **Success Stories Section**: Interactive carousel featuring detailed beneficiary stories
- **Volunteer Section**: Comprehensive volunteer application system with opportunity listings
- **Partners Section**: Showcase of recognition, achievements, and trusted partnerships
- **Download Brochure**: Professional brochure generation with email capture
- **Monthly Donor Program**: Recurring donation system with impact tracking

### Technical Architecture Enhancements
- **Complete API Layer**: RESTful endpoints for all NGO functionalities
- **Database Schema**: Comprehensive data models for organizational content management
- **Storage Interface**: Unified data access layer with PostgreSQL integration
- **TypeScript Implementation**: Full type safety across frontend and backend
- **Responsive Design**: Mobile-first approach with enhanced visual appeal
- **Component Architecture**: Modular, reusable components with shadcn/ui integration

### Database Schema Additions
New entities added to support comprehensive NGO operations:
- **Leadership**: Team member profiles and organizational structure
- **News**: Content management for announcements and stories
- **Photo Gallery**: Visual content with categorization and metadata
- **Annual Reports**: Document management with download tracking
- **Certifications**: Legal documentation and compliance certificates
- **Events**: Event management with registration and participation tracking
- **Publications**: Research and educational resource library
- **Impact Statistics**: Metrics and performance indicators
- **Newsletter Subscriptions**: Community engagement and communication

The application now represents a complete, professional NGO website with all standard organizational features, ready for production deployment and ongoing content management.