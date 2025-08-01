/*
Tutorial skipped this step?
https://vueschool.io/lessons/delete-tasks

copied stuff over from
https://github.com/vueschool/vuejs-masterclass-2024-edition/blob/121.use-vue-meta-to-set-dynamic-title-and-meta-data/src/stores/loaders/tasks.ts

added/fixed typing
*/

import {
  deleteTaskQuery,
  singleTaskQuery,
  tasksWithProjectsQuery,
  updateTaskQuery
} from "@/utils/supabaseQueries";
import { useMemoize } from '@vueuse/core'
import type { SingleTask, TasksWithProjects } from "@/utils/supabaseQueries";

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const task = ref<SingleTask | null>(null)
  const loadTasks = useMemoize(
    async (id: string) => await tasksWithProjectsQuery
  )
  const loadTask = useMemoize(async (id: number) => await singleTaskQuery(id))

  type LoaderFnWithDelete<K> = ((key: K) => Promise<any>) & { delete: (key: K) => void }

  type ValidateCacheParams<K> = {
    ref: typeof tasks | typeof task
    query: typeof tasksWithProjectsQuery | typeof singleTaskQuery
    key: K
    loaderFn: LoaderFnWithDelete<K>
  }

  function validateCache<K>({
    ref,
    query,
    key,
    loaderFn
  }: ValidateCacheParams<K>) {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          (loaderFn as LoaderFnWithDelete<typeof key>).delete(key)
        } else {
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const getTasks = async () => {
    tasks.value = null

    const { data, error, status } = await loadTasks('tasks')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) tasks.value = data

    validateCache<string>({
      ref: tasks,
      query: tasksWithProjectsQuery,
      key: 'tasks',
      loaderFn: loadTasks
    })
  }

  const getTask = async (id: number) => {
    task.value = null

    const { data, error, status } = await loadTask(id)

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) task.value = data

    validateCache<number>({
      ref: task,
      query: singleTaskQuery,
      key: id,
      loaderFn: loadTask
    })
  }

  const updateTask = async () => {
    if (!task.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...taskProperties } = task.value

    await updateTaskQuery(taskProperties, task.value.id)
  }

  const deleteTask = async () => {
    if (!task.value) return

    await deleteTaskQuery(task.value.id)
  }

  return {
    tasks,
    getTasks,
    getTask,
    task,
    updateTask,
    deleteTask
  }
})