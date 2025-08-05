<script setup lang="ts">
import { singleTaskQuery, deleteTaskQuery } from "@/utils/supabaseQueries";
import type { SingleTask } from "@/utils/supabaseQueries";

const route = useRoute("/tasks/[id]");

const task = ref<SingleTask | null>(null);

// This loader and the ref may introduce redundancies, todo?
const tasksLoader = useTasksStore();
const { deleteTask } = tasksLoader;

watch(
  task,
  (newTask) => {
    if (newTask && newTask.name) {
      usePageStore().setPageTitle(`Task: ${newTask.name}`);
    } else {
      usePageStore().setPageTitle("Task: Loading...");
    }
  },
  { immediate: true }
);

const getTask = async () => {
  const { data, error, status } = await singleTaskQuery(Number(route.params.id));

  if (error) {
    console.error("Error fetching task:", error);
    useErrorStore().setError({
      error, // this is the PostgrestError type
      customCode: status,
    });
  } else {
    task.value = data;
  }
};

await getTask();

// Here too parts of code missing/differing compared to tutorial
// https://vueschool.io/lessons/delete-tasks

const router = useRouter();

const isDeleteInProgress = ref(false);

const triggerDelete = async () => {
  if (!task.value) return;

  isDeleteInProgress.value = true;
  const confirmed = confirm(`Are you sure you want to delete the task: ${task.value.name}?`);
  if (confirmed) {
    const { error } = await deleteTaskQuery(task.value.id);
    
    if (error) {
      console.error("Error deleting task:", error);
      useErrorStore().setError({
        error,
        customCode: 500,
      });
      isDeleteInProgress.value = false;
    } else {
      // Task deleted successfully, navigate to tasks list
      router.push("/tasks");
    }
  } else {
    isDeleteInProgress.value = false;
  }
};

</script>

<template>
  <RouterLink to="/tasks">Back to Tasks</RouterLink>
  
  <div class="flex flex-col justify-center items-center">
    <Table v-if="task" class="w-full">
      <TableRow>
        <TableHead> Name </TableHead>
        <TableCell> {{ task.name }} </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <TableCell>
          {{ task.description }}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Assignee </TableHead>
        <TableCell> Todo </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Project </TableHead>
        <TableCell>
          <RouterLink
            v-if="task.projects?.slug"
            :to="`/projects/${task.projects.slug}`"
            class="hover:underline"
          >
            {{ task.projects?.name }}
          </RouterLink>
          <span v-else>{{ task.projects?.name }}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <TableCell> {{ task.status }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Collaborators </TableHead>
        <TableCell>
          <div class="flex">
            <Avatar
              class="-mr-4 border border-primary hover:scale-110 transition-transform"
              v-for="collaborator in task.collaborators"
              :key="collaborator"
            >
              <RouterLink class="w-full h-full flex items-center justify-center" to="">
                <AvatarImage src="" alt="" />
                <AvatarFallback> </AvatarFallback>
              </RouterLink>
            </Avatar>
          </div>
        </TableCell>
      </TableRow>
      <TableRow class="hover:bg-transparent">
        <TableHead class="align-top pt-4"> Comments </TableHead>

        <TableCell>
          Comments cards goes in here..

          <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
            <textarea
              placeholder="Add your comment.."
              class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
            >
            </textarea>
            <div class="flex justify-between mt-3">
              <Button> Comment </Button>
              <div class="flex gap-4">
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:paperclip"></iconify-icon>
                  <span class="sr-only">Attach file</span>
                </button>
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:image-up"></iconify-icon>

                  <span class="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </Table>

    <Button @click="triggerDelete" variant="destructive" class="mt-4 self-end w-full max-w-40">
      <iconify-icon icon="lucide:loader-circle" class="mr-2 animate-spin" v-if="isDeleteInProgress"></iconify-icon>
      <iconify-icon icon="lucide:trash-2" class="mr-2" v-else></iconify-icon>
      Delete Task
    </Button>
  </div>
</template>

<style></style>
