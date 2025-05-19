# vue-app

Demo app in Vue (Vue3, file-based routing, SupaBase, CRUD, Pinia, Tailwind,...)

## Repo

[Schafeld Vue-App repository](https://github.com/schafeld/vue-app)

_Work in progress..._

TO BE CONTINUED:
https://vueschool.io/lessons/getting-started-with-shadcn-ui-and-vuejs
https://github.com/vueschool/vuejs-masterclass-2024-edition/branches/all?query=&page=5
https://supabase.com/dashboard/project/yuzzrmawywyywsjlnwff/editor

Picked up again 2025-05-17, continue at:
https://vueschool.io/lessons/prepare-the-vue-app-layout-with-tailwindcss

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

[Creating database types](https://supabase.com/dashboard/project/yuzzrmawywyywsjlnwff/api)
[Generating Typescript types](https://supabase.com/docs/guides/api/rest/generating-types)

```bash
npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > database.types.ts
```

Set up local Supabase db correspondingly to remote db with migration files.

```bash
npm run db:reset
npx supabase migration up --linked

// then update types
npm run supabase:types

// the seed data
node database/seed.js
```

### Faker js

[Faker.js](https://fakerjs.dev/) is used for seeding the database with test data.
[Localization](https://fakerjs.dev/guide/localization.html) is supported.

```bash
npm install @faker-js/faker --save-dev
```

## Environment variables

Convention demands a `VITE_` prefix for environment variables that you want to expose to your _client_-side code too.

Secret environment variables are in an .env file outside the project directory (see seed.js).

## ShadCDN for Vue

[Install ShadCDN](https://www.shadcn-vue.com/docs/installation/vite.html) with this command instead of non-functional code from [VueSchool tutorial](https://vueschool.io/lessons/getting-started-with-shadcn-ui-and-vuejs):

```bash
# npm i -D tailwindcss@^3.4.17 autoprefixer@^10.4.20

npm install tailwindcss @tailwindcss/vite
# add files according to https://www.shadcn-vue.com/docs/installation/vite.html
```

## Builder.io integration

[Builder.io](https://www.builder.io/) is a headless CMS that allows you to create and manage content for your Vue.js application. It provides a visual editor for building pages and components, which can be integrated into your Vue app.

### Builder.io for Vue

https://www.builder.io/c/docs/integrating-builder-pages

On my Mac I had to downgrade Node.js to 20.x.x to get the Builder.io SDK working.

```bash
nvm use 20

npm install @builder.io/sdk-vue
```

[The public key is _not_ needed to be kept secret](https://www.builder.io/c/docs/using-your-api-key)

Now [integrate Builder content into your Vue app](https://www.builder.io/c/docs/integrating-builder-pages#add-a-builder-component-to-your-app).
