# System Flow Diagram

This document outlines the architectural flow of the UI/UX SaaS application.

## High-Level Architecture

The application is built with **Next.js 14+** (App Router), using **Drizzle ORM** for database management and **Google Gemini AI** for content generation.

```mermaid
graph TD
    %% Actors and Frontend
    User((User))
    Landing[Landing Page<br/>app/page.tsx]
    ProjectWS[Project Workspace<br/>app/project/[id]/page.tsx]
    
    %% API Routes
    subgraph "API Routes"
        CreateProjAPI[POST /api/project]
        GenConfigAPI[POST /api/generate-config]
        GenScreenAPI[POST /api/generate-screen-ui]
        EditScreenAPI[POST /api/edit-screen]
    end

    %% External Services & DB
    Gemini[Google Gemini AI]
    DB[(Database<br/>Drizzle ORM)]

    %% Flow 1: Create Project
    User -->|1. Enter Design Idea| Landing
    Landing -->|2. Create Project| CreateProjAPI
    CreateProjAPI -->|3. Save Project| DB
    CreateProjAPI -->|4. Return ID| Landing
    Landing -->|5. Redirect| ProjectWS

    %% Flow 2: Project Initialization (Planning)
    ProjectWS -->|6. Fetch Project| CreateProjAPI
    ProjectWS -- Check if screens exist --> GenConfigAPI
    GenConfigAPI -->|7. Generate Plan| Gemini
    Gemini -->|8. Return JSON Plan| GenConfigAPI
    GenConfigAPI -->|9. Save Screen Definitions| DB
    
    %% Flow 3: UI Generation
    ProjectWS -->|10. Loop Valid Screens| GenScreenAPI
    GenScreenAPI -->|11. Generate Code (HTML/Tailwind)| Gemini
    Gemini -->|12. Return Code| GenScreenAPI
    GenScreenAPI -->|13. Update Screen Record| DB

    %% Flow 4: User Editing
    User -->|14. Edit Screen| ProjectWS
    ProjectWS -->|15. Request Edit| EditScreenAPI
    EditScreenAPI -->|16. Send Old Code + Prompt| Gemini
    Gemini -->|17. Return New Code| EditScreenAPI
    EditScreenAPI -->|18. Save Update| DB
```

## Detailed Process Breakdown

### 1. Project Ingestion
- **Location**: `app/_shared/Hero.tsx`
- **Action**: User provides a description (e.g., "Fitness App") and device type.
- **Backend**: `/api/project` creates a new record in `ProjectTable`.

### 2. Screen Planning (Configuration)
- **Location**: `app/project/[projectId]/page.tsx`
- **Trigger**: When the project loads, if no screens exist in `ScreenConfigTable`.
- **Backend**: `/api/generate-config`
- **AI Task**: Generates a project theme (colors, style) and a list of necessary screens (e.g., Home, Profile, workout-list) based on the user's description.

### 3. UI Code Generation
- **Location**: `app/project/[projectId]/page.tsx`
- **Trigger**: After configuration is loaded, the frontend iterates through each screen that lacks code.
- **Backend**: `/api/generate-screen-ui`
- **AI Task**: Takes the *specific* screen description and generates fully functional HTML + TailwindCSS code.

### 4. Interactive Editing
- **Location**: `app/project/[projectId]/_shared/ScreenHandler.tsx`
- **Trigger**: User clicks "Regenerate" on a specific screen with a new prompt.
- **Backend**: `/api/edit-screen`
- **AI Task**: Takes the *existing code* and the *user's prompt* to apply distinct changes without losing the original design structure.
