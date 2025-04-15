# vue-app

Demo app in Vue (Vue3, file-based routing, SupaBase, CRUD, Pinia, Tailwind,...)

## Repo

[Schafeld Vue-App repository](https://github.com/schafeld/vue-app)

_Work in progress..._

## Project setup

```bash
npm create vue@latest
cd vue-app
npm install
npm run dev
```

Checking for module updates.

```bash
npm install -g npm-check-updates
ncu -u
npm install
```

## Routing

File-based routing with [Unplugin Vue Router](https://uvr.esm.is/)

## Supabase

[Getting started with Supabase](https://supabase.com/docs/reference/javascript/installing)

```bash
npm install @supabase/supabase-js
```

[Supabase local development](https://supabase.com/docs/guides/local-development), e.g. for DB migrations.

```bash
npm install supabase --save-dev
```

[Initialize a local Supabase project](https://supabase.com/docs/reference/cli/supabase-init)

See [tutorial](https://vueschool.io/lessons/use-supabase-cli-in-vue-js-and-connect-to-the-remote-project) for more details on how to connect.

[Supabase migrations](https://supabase.com/docs/reference/cli/supabase-migration-new)

```bash
// create a new migration in the supabase migrations directory
supabase migration new <migration-name>
```

Reset the database to the latest migration.

```bash
// reset the local database (if one exists) to the latest migration
supabase db reset

// reset the remote database to the latest migration
supabase db reset --linked
```

## Environment variables

Convention demands a `VITE_` prefix for environment variables that you want to expose to your _client_-side code too.

```bash

```
