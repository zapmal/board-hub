# Contributing to Board Hub

## Development Process

All changes happen through pull requests. Pull requests are the best way to propose changes, you can submit a pull request
<a href="https://github.com/Zondazx/board-hub/pulls">here</a>, and after review, these can be merged into the project.

## Pull Requests

> [This gist](https://gist.github.com/Chaser324/ce0505fbed06b947d962) can provide more detail if needed.

1. Fork the repo and create your branch (usually named `patch-%the number of PRs you've already made%`) from `main`.
2. Ensure to describe your pull request.

## Full Local Development Setup

### Backend

> For architecture details, check the [architecture document](./api/ARCHITECTURE.md) (soon).

This assumes that you've installed MySQL (preferable >= 8.0) 

- Create a database named `board_hub`.

```shell
$ mysql -u <username> -p <password>

$ CREATE DATABASE board_hub;
```

- Run `yarn` to install dependencies.

- Navigate to `/api` and run `cp .env.example .env` to create the enviroment variables.

- Set the following enviroment variables:

```
DATABASE_USERNAME=
DATABASE_PASSWORD=
JWT_SECRET=
```

- Run `yarn migrate` for migrations.

- (Optional) Run `yarn seed`, this will create 50 users, the passsword for all of the seeded users is `password`.

#### Scripts

If needed, migrations and seeding can be reverted:

- `yarn undo:migration`
- `yarn undo:seeding`

Logs can be queried with:

- `yarn query:logs --name <log name> --lines <amount of lines>`

`--lines` is an optional argument and `--name` is required, the only accepted names
at the moment are **exceptions**, **rejections** or **errors**.

#### About Migrations

Create a new migration for it, and use **snake_case**.

- `yarn run sequelize migration:generate <migration name>`

Don't overwrite existing ones, [this article](https://dev.to/anayooleru/modifying-an-existing-sequelize-migration-1mnn)  or [the official docs](https://sequelize.org/master/manual/migrations.html) can help if needed.

### Frontend

Navigate to `/web` and run `yarn` and then `yarn start`.
