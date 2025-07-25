# vue-app

Demo app in Vue (Vue3, file-based routing, SupaBase, CRUD, Pinia, Tailwind,...)

## Repo

[Schafeld Vue-App repository](https://github.com/schafeld/vue-app)

_Work in progress..._

TBC – TO BE CONTINUED:
https://vueschool.io/lessons/getting-started-with-shadcn-ui-and-vuejs
https://github.com/vueschool/vuejs-masterclass-2024-edition/branches/all?query=&page=5
https://supabase.com/dashboard/project/yuzzrmawywyywsjlnwff/editor

State 2025-06-12, continue at:
https://vueschool.io/lessons/register-new-users-with-supabase-auth-and-vue-js

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

File-based routing with [Unplugin Vue Router](https://uvr.esm.is/).
Router configuration [docs](https://uvr.esm.is/introduction.html#auto-imports) for bundler usage.

## On-demand auto-importing for Vue.js components

https://github.com/unplugin/unplugin-vue-components

## Pinia

[Pinia](https://pinia.vuejs.org/) is the state management library for Vue.js applications, replacing Vuex.

Configure [Pinia for hot module replacement (HMR)](https://pinia.vuejs.org/cookbook/hot-module-replacement.html) in development mode.

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

#### Seed data or modify existing data

If you want to change the projects data for instance (e.g. add descriptions to projects):

- add a DB column `description` to the `projects` table in
  `vue-app/supabase/migrations/20250415144650_projects-schema.sql`
- add the `description` field in `vue-app/database/seed.js`
- run the seed script to update the data in the database

```bash
# Reset and repopulate db
npm run db:reset
npm run db:seed

# Create new typescript types
npm run supabase:types
```

DB updates should then be visible in `vue-app/src/database/types.ts`.

### Faker js

[Faker.js](https://fakerjs.dev/) is used for seeding the database with test data.
[Localization](https://fakerjs.dev/guide/localization.html) is supported.

```bash
npm install @faker-js/faker --save-dev
```

## Supabase Authentication

[Tutorial](https://vueschool.io/lessons/set-up-vue-js-and-supabase-for-seamless-auth-integration).

### Set up Supabase authentication

```bash
npm run db:migrate:new profiles-schema
```

Used this [schema template](https://github.com/vueschool/vuejs-masterclass-2024-edition/blob/67.set-up-vuejs-and-supabase-for-seamless-auth-integration/supabase/migrations/20240905083244_profiles-schema.sql) for the `profiles` schema content.

````bash
# reset the database
npm run db:reset --linked
# generate (new) typescript types
npm run supabase:types
# seed the database with initial data
npm run db:seed
```

Setting up [new Supabase authentication/user(https://supabase.com/docs/reference/javascript/auth-signup), [tutorial](https://vueschool.io/lessons/register-new-users-with-supabase-auth-and-vue-js).

## Environment variables

Convention demands a `VITE_` prefix for environment variables that you want to expose to your _client_-side code too.

Secret environment variables are in an .env file outside the project directory (see seed.js).

## ShadCN for Vue

[Install ShadCN](https://www.shadcn-vue.com/docs/installation/vite.html) with this command instead of non-functional code from [VueSchool tutorial](https://vueschool.io/lessons/getting-started-with-shadcn-ui-and-vuejs):

```bash
# npm i -D tailwindcss@^3.4.17 autoprefixer@^10.4.20

npm install tailwindcss @tailwindcss/vite
# add files according to https://www.shadcn-vue.com/docs/installation/vite.html
````

Adding an [input component](https://www.shadcn-vue.com/docs/components/input.html):

```bash
npx shadcn-vue@latest add input
```

## Tanstack Table

Using [Tanstack Table](https://tanstack.com/table/latest/docs/installation) with the [ShadCDN data table component](https://www.shadcn-vue.com/docs/components/data-table).

```bash
npm install @tanstack/vue-table

npx shadcn-vue@latest add table

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

## Icons

Lucide icons are used in this project. See [Lucide](https://lucide.dev/) for more details.
Implemented with [Iconify](https://icon-sets.iconify.design/lucide/), [icons on demand for Vue](https://iconify.design/docs/icon-components/vue/) or rather for future server-side rendering [Iconify Icon web components](https://iconify.design/docs/iconify-icon/).
E.G. [magnifying glass SVG](https://icon-sets.iconify.design/lucide/?icon-filter=search).

```bash
npm install iconify-icon
```

## Auto Imports

[Unplugin Auto Imports](https://github.com/unplugin/unplugin-auto-import) is used to automatically import commonly used functions and components in Vue.js applications.

```bash
npm install -D unplugin-auto-import
```

---

## Notes about Supabase access

### Role Level Security

[Row Level Security Policies](https://supabase.com/dashboard/project/yuzzrmawywyywsjlnwff/auth/policies)

Currently disabled for the `public` schema, so all users can access all data.

Hints for further development:

@workspace
Looking at your workspace, the issue (now solved/worked around, issue was no data being returned while RLS was active) is likely related to Supabase Row Level Security (RLS). By default, Supabase enables RLS on all tables which prevents anonymous users from reading data, even though the data exists in the database.

The problem is that your database seed script in database/seed.js uses the `SERVICE_ROLE_KEY` which bypasses RLS, but your application is using the anonymous key (`VITE_SUPABASE_ANON_KEY`) which is subject to RLS restrictions.

To fix this issue, you need to add RLS policies that allow anonymous users to read data from your tables. Here's how you can do it:

1. Create a new migration file:

```bash
npm run db:migrate:new enable-rls-policies
```

2. In the new migration file, add the following SQL:

```sql
-- Enable RLS and add policies for anonymous read access
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous read access for projects"
  ON projects FOR SELECT
  USING (true);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous read access for tasks"
  ON tasks FOR SELECT
  USING (true);
```

3. Apply the migration:

```bash
npm run db:reset
```

This should allow your application to read data while still using the anonymous key. The `true` condition in the policies means anyone can read the data.

For a production app, you'd want more restrictive policies, but this will work for development. You can see more details about RLS policies in the [Supabase documentation](https://supabase.com/docs/guides/auth/row-level-security).

---

# TODOs / Ideas / Bugs

- [ ] Lazy loading of routes, smaller initial bundle size
- [ ] Add more components from ShadCDN
- [ ] Add more pages, e.g. a settings page
- [ ] Add more CRUD operations, e.g. for tasks
- [ ] Add more tests, e.g. for the Supabase integration
- [ ] Add more documentation, e.g. for the Supabase integration
- [ ] Add more features based on [VueUse (Collection of Vue Composition Utilities)](https://vueuse.org/), e.g. for login password validation
- [ ] Project title change also changes slug in the URL 
- [ ] Add table sorting, reordering, and filtering capabilities
- [ ] Add pagination to the project list
- [ ] Add a project changed date field and display it (optionally) in the project list
- [ ] Add project description in the projects list (truncated with ellipsis)
- [ ] Add ellipsis to project title in the project list
- [ ] Add data export option? (later import/restore even?)
- [ ] Vitest/Jest
- [ ] Storybook
- [ ] E2E tests with Playwright
- [ ] Add search (against backend in case of large data set)
- [ ] Fix: Readonly status icons should *not* have links. Icons should have alt text.
- [ ] Use status icons in the tasks list
- [ ] Add projects features to tasks list too (e.g. collaborators – ensure multi-collaborator works too; add uuid users to database)
- [ ] Refactor to better software architecture, other state management, or such?