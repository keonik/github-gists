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

-   [x] Query gists (username)
-   [x] Query gist (ID)
-   [x] Mutation favorite a gist (ID)
-   [x] Query favorited gists

## UI Requirements

Requirements by page

### Home page

-   [x] Text box to enter username
-   [x] Debounced username search to list public gists (description and date at minimum)
-   [x] Navigate to gist detail page after clicking a public gist

### Gist detail page

-   [x] List all files of the gist
-   [x] Button/Icon to toggle favoriting/unfavoriting a gist
-   [x] Breadcrumb/Nav to return to home page
-   [x] Nav with homepage and favorited gists

## Assumptions made

-   I couldn't find a way to get gists by username without going through the user/{id}/gists endpoint. Spent 30 minutes figuring out you can't pass username to the api/gists endpoint :/
-

## How this actually went down

-   Parsed through requirements to make sure I understood them
-   Realized I needed a database and a way to write to it so I threw in Postgres and Docker for ease of startup
-   Refreshed on how to make a REST Data source
-   Made REST resource then a quick and dirty graphql api using that service
-   Create queries to get list of gists
-   Decided to switch to frontend because I figured the favoriting was going to be a little more thought
-   Finished up a search example in the frontend (had to add in some of my favorite tooling to make the Developer experience fun)
-   Realized gist files were keys with a file instead of the file array I was expecting. I reworked the RESTDataSource to make that fit my situation
-   Worked on the gist page renderer showing files in a table
-   Realized I was already over an hour so I tried to cut corners to keep it under 2 hours.
-   Got a favorite mutation wired up using prisma orm and javascript
-   Proved it was working in the frontend for favoriting/unfavoriting
-   Had about 20 minutes left to work the favorites page
-   Realized I wouldn't have time to work on relating gists back to favorited and vice versa so I just got the favorited page working enough to show it lists all the favorites and can navigate to each gist by id
-   At this point I realized if I had more time I would try to go the apollo federated route because this github gist api can be independent from the favorited service and could just be an extension of the existing service. My stitching/ entity extension knowledge wasn't solid enough for a 2 hour coding challenge :\ but if I had more time I'd figure it out :)
