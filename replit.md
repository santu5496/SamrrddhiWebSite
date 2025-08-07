# NGO Website Development

## Overview
This project is a modern, full-stack NGO website for **Samruddhi Service Society**, established in 1995. Its main purpose is to showcase the organization's mission of empowering underprivileged rural girls and differently-abled children through education and care. The website provides a comprehensive public-facing interface with enhanced donor engagement features and an admin dashboard for content management. Key capabilities include managing organizational content, facilitating donations, showcasing impact statistics, and providing resources to the public.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Updates (August 2025)
**UI/UX Enhancement Migration**: Successfully migrated from Replit Agent to Replit environment with major UI improvements including:
- Modern gradient color scheme with purple/blue primary colors
- Enhanced Hero section with floating animations and glass morphism effects  
- Improved Header with modern navigation styling and glass backdrop
- Enhanced Programs section with better category badges and hover effects
- Modern Footer with gradient background and animated social media icons
- Upgraded Donation section with floating decorations and glass cards
- Added custom CSS animations (float, shimmer, glass-card effects)
- Implemented responsive design improvements across all components
- All 12 programs displaying with enhanced visual appeal and modern styling

## System Architecture

### Full-Stack Architecture
The application employs a modern full-stack architecture consisting of:
-   **Frontend**: React with TypeScript, using Vite as the build tool.
-   **Backend**: Express.js server with TypeScript.
-   **Database**: PostgreSQL with Drizzle ORM.
-   **Authentication**: Replit-based OIDC authentication.
-   **Styling**: Tailwind CSS with shadcn/ui components.

### Architectural Decisions
1.  **Monorepo Structure**: All code is organized in a single repository with clear separation between client, server, and shared code.
2.  **TypeScript First**: Ensures type safety across the entire application.
3.  **Component-Based UI**: Utilizes shadcn/ui for consistent, accessible components and incorporates custom animations and interactive elements.
4.  **Server-Side Rendering**: Vite development server with Express for production.
5.  **Responsive Design**: A mobile-first approach using Tailwind CSS.

### Key Features and Specifications
-   **Enhanced Public Pages**: Includes Home, Impact, About, Programs, Success Stories, Donate, Volunteer, Testimonials, Partners, Download Brochure, and Contact sections.
-   **Admin Dashboard**: A comprehensive CMS for managing all website content, including user management, hero content, organizational information, programs, testimonials, contact details, and donation configurations.
-   **Donor Engagement Features**: Animated impact counters, success story carousels, volunteer application forms, partner showcases, and downloadable brochures. Features also include multiple payment methods, newsletter integration, and trust indicators.
-   **Core Organizational Features**: Sections for Leadership, News & Blog, Photo Gallery, Annual Reports, Certifications, Events Management with registration, Resources & Publications, and Media Coverage.
-   **Programs Section Enhancement**: Features 12 comprehensive programs with program-specific relevant images, category badges, and action buttons ("Support This Program" and "Learn More"). Each program card displays proper categorization and mobile-optimized layout.
-   **Data Flow**: React components fetch content from API endpoints; the server retrieves data from PostgreSQL via Drizzle ORM. For admin management, changes are validated and saved to the database, reflecting immediately on the public site. Authentication is handled by Replit OIDC, with sessions stored in PostgreSQL.

## External Dependencies
-   **Frontend Framework**: React 18
-   **Backend Framework**: Express.js
-   **Database ORM**: Drizzle ORM
-   **Database**: PostgreSQL (via Neon serverless)
-   **CSS Framework**: Tailwind CSS
-   **Authentication**: Replit OIDC, `express-session`, `connect-pg-simple`
-   **UI Libraries**: Radix UI, shadcn/ui, Lucide React
-   **Form Management**: React Hook Form
-   **Data Fetching**: TanStack Query