# Board Hub API

> For architecture details, check the [architecture document](./ARCHITECTURE.md)

## Configuration and Build steps

> This assumes that you have installed both MySQL (preferable >= 8.0) and a package manager (Yarn, NPM).

### Setup

- Enter in your MySQL CLI and run `CREATE DATABASE board_hub;`, this can also be done with MySQL Workbench.
- Install dependencies → `yarn`.
- Create .env file (assumes that you're in root folder) → `cp .env.example .env`
- Fill the empty fields in the `.env`.
- Run migrations → `yarn migrate`, if needed migrations can be reverted with → `yarn undo:migration`.
- Seed data → `yarn seed`, this will create 50 users, the password for all of the seeded users is `password`.

### Scripts

If needed, migrations and seeding can be reverted:

- `yarn undo:migration`.
- `yarn undo:seeding`.

Logs can be queried with:
> --lines is an optional argument.

The only valid log names at the moment are **exceptions**, **rejections** and **errors**.

- `yarn query:logs --name <log name> --lines <amount of lines>`.

### Builds

- Run in development mode → `yarn dev`.
- Build for production → `yarn prod`.

### About Migrations

Create a new migration for it, and use **snake_case**.

- `npx sequelize migration:generate <migration name>`
- `yarn run sequelize migration:generate <migration name>`

Don't overwrite existing ones, [this article](https://dev.to/anayooleru/modifying-an-existing-sequelize-migration-1mnn)  or [this one](https://sequelize.org/master/manual/migrations.html) can help if needed.