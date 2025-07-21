// Default English locale
// import { faker } from '@faker-js/faker'
// Custom German locale
import { fakerDE as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'
// # SERVICE_ROLE_KEY is deliberately set in folder outside of the repo, so Copilot never has access to it.
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../../../.env') })

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

// console.log('Supabase URL:', process.env.VITE_SUPABASE_URL)
// console.log('Supabase Service Role Key:', process.env.SERVICE_ROLE_KEY)
// console.log('Supabase Client:', supabase)

const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`
  )
  process.exit(1)
}

const logStep = (stepMessage) => {
  console.log(stepMessage)
}

const seedProjects = async (numEntries) => {
  logStep('Seeding projects...')
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projects.push({
      name: name,
      slug: name.toLocaleLowerCase().replace(/ /g, '-'),
      description: faker.lorem.paragraphs(2),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3])
    })
  }

  const { data, error } = await supabase.from('projects').insert(projects).select('id')

  if (error) return logErrorAndExit('Projects', error)

  logStep('Projects seeded successfully.')

  return data
}

const seedTasks = async (numEntries, projectsIds) => {
  logStep('Seeding tasks...')
  const tasks = []

  for (let i = 0; i < numEntries; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectsIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3])
    })
  }

  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

  if (error) return logErrorAndExit('Tasks', error)

  logStep('Tasks seeded successfully.')

  return data
}

const seedDatabase = async (numEntriesPerTable) => {
  const projectsIds = (await seedProjects(numEntriesPerTable)).map((project) => project.id)
  await seedTasks(numEntriesPerTable, projectsIds)
}

const numEntriesPerTable = 10

seedDatabase(numEntriesPerTable)
