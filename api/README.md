## Board Hub API 

### Configuration and Build steps
> This assumes that you have installed both MySQL (preferable >= 8.0) and a package manager (Yarn, NPM).

If needed, database stuff like the host, the port and the dialect can be changed in `database/config.js`.

### Setup
- Enter in your MySQL CLI and run `CREATE DATABASE board_hub;`, this can also be done with MySQL Workbench.
- Install dependencies → `yarn`
- Create .env file (assumes that you're in root folder) → `cp .env.example .env`
- Fill the empty fields in the `.env`
- Run migrations → `yarn migrate`, if needed migrations can be reverted with → `yarn undo:migration`
- Seed data → `yarn seed`

### Build
- Run in development mode → `yarn dev`
- Build for production → `yarn prod`

### About changes to migrations (deletes, updates, etc)

- Create a new migration for it → `npx sequelize migration:generate <migration name>`. Don't overwrite existing ones, [this article](https://dev.to/anayooleru/modifying-an-existing-sequelize-migration-1mnn)  or [this one](https://sequelize.org/master/manual/migrations.html) can help if needed.