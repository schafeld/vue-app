// Default English locale
// import { faker } from '@faker-js/faker'
// Custom German locale
import { fakerDE as faker } from '@faker-js/faker'

import { createClient } from '@supabase/supabase-js'

// # SERVICE_ROLE_KEY is deliberately set in folder outside of the repo, so Copilot never has access to it.
import { config } from 'dotenv'
config({ path: '../../.env' })

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

// console.log('Supabase URL:', process.env.VITE_SUPABASE_URL)
// console.log('Supabase Service Role Key:', process.env.SERVICE_ROLE_KEY)
// console.log('Supabase Client:', supabase)

const seedProjects = async (maxEntries = 10) => {
  const projects = Array.from({ length: maxEntries }, () => {
    const name = faker.lorem.words(3)
    return {
      name: name,
      slug: name.replace(/\s+/g, '-').toLowerCase(),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements(['user', 'admin', 'viewer'], 2)
    }
  })

  await supabase
    .from('projects')
    .insert(projects)
    .then(({ data, error }) => {
      if (error) {
        console.error('Error seeding "projects":', error)
      } else {
        console.log(
          `Database "projects" seeded successfully with ${projects.length} entries:`,
          data
        )
      }
    })
    .catch((error) => {
      console.error('Error seeding projects:', error)
    })
}

await seedProjects()
