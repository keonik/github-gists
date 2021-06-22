# Github Gists

Search Github gists by username, favorite gists, persist to database

## Tech Stack

-   Local

    -   React
    -   Next.js (monolithic Node.js API and UI)
    -   Material UI (quick components)
    -   Postgres (spun up using docker)
    -   Prisma ORM (underutilized for one model)
    -   GraphQL (REST data source wrapper and prisma query/mutations example)

-   Deployed
    -   Same as Local plus...
    -   Vercel (free)
    -   Heroku PostgreSQL (free)

## Startup

Prequisites

-   Docker
-   Node.js >= 14
-   Ports available
    -   6543 for database
    -   3001 for Next.js app (UI and API)

1. `docker compose up`

    Spins up a Postgres database

2. `npx prisma generate`

    Runs prisma commands to generate TypeScript ORM

3. `npm run dev`

    Starts a Next.js app on port 3001

## API Requirements

-   [ ] Query gists (username)
-   [ ] Query gist (ID)
-   [ ] Mutation favorite a gist (ID)
-   [ ] Query favorited gists

## UI Requirements

Requirements by page

### Home page

-   [ ] Text box to enter username
-   [ ] Debounced username search to list public gists (description and date at minimum)
-   [ ] Navigate to gist detail page after clicking a public gist

### Gist detail page

-   [ ] List all files of the gist
-   [ ] Button/Icon to toggle favoriting/unfavoriting a gist
-   [ ] Breadcrumb/Nav to return to home page
-   [ ] Nav with homepage and favorited gists
