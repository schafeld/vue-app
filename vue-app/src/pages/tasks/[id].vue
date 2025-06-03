<script setup lang="ts">
import { singleTaskQuery } from "@/utils/supabaseQueries";
import type { SingleTask } from "@/utils/supabaseQueries";

const route = useRoute("/tasks/[id]");
// const params = route.params as { id: string };

const task = ref<SingleTask | null>(null);

watch(
  task,
  (newTask) => {
    if (newTask && newTask.name) {
      usePageStore().pageData.title = `Task: ${newTask.name}`;
    } else {
      usePageStore().pageData.title = "Task: Loading...";
    }
  },
  { immediate: true }
);

const getTask = async () => {
  const { data, error, status } = await singleTaskQuery(Number(route.params.id));

  if (error) {
    console.error("Error fetching task:", error);
    useErrorStore().setError({
      // error: `Failed to fetch task: ${error.code}`, // this would be error type string
      error, // this is the PostgrestError type
      customCode: status,
    });
  } else {
    task.value = data;
  }
};

await getTask();
</script>

<template>
  <RouterLink to="/tasks">Back to Tasks</RouterLink>
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
</template>

<style></style>
