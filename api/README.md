## Board Hub API 

### Configuration and Build steps
> This assumes that you have installed both MySQL (preferable >= 8.0) and a package manager (Yarn, NPM).

### Setup
- Enter in your MySQL CLI and run `CREATE DATABASE board_hub;`, this can also be done with MySQL Workbench.
- Install dependencies → `yarn`
- Create .env file (assumes that you're in root folder) → `cp .env.example .env`
- Fill the empty fields in the `.env`
- Run migrations → `yarn migrate`
- Seed data → `yarn seed`

### Build
- Run in development mode → `yarn dev`
- Build for production → `yarn prod`
