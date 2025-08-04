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
    query: ((key: K) => Promise<any>) | Promise<any>
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
      query: loadTasks,
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
      query: loadTask,
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
    if (!task.value) return { error: new Error('No task to delete') }

    const { error } = await deleteTaskQuery(task.value.id)
    
    if (error) {
      useErrorStore().setError({ error, customCode: 500 })
      return { error }
    }
    
    // Clear the current task after successful deletion
    task.value = null
    
    return { error: null }
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