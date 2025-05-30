<script setup lang="ts">
import { singleProjectQuery } from "@/utils/supabaseQueries";
import type { SingleProject } from "@/utils/supabaseQueries";

const router = useRouter();
const route = useRoute("/projects/[slug]");

const goBack = () => {
  // <button @click="goBack" class="hover:underline cursor-pointer">Go Back</button>
  if (router.options.history.state.back) {
    router.back();
  } else {
    router.push("/projects");
  }
};

const project = ref<SingleProject | null>(null);

watch(
  project,
  (newProject) => {
    if (newProject && newProject.name) {
      usePageStore().pageData.title = `Project: ${newProject.name}`;
    } else {
      usePageStore().pageData.title = "Project: Loading...";
    }
  },
  { immediate: true }
);

const getProject = async () => {
  const { data, error } = await singleProjectQuery(route.params.slug as string);

  if (error) {
    console.error("Error fetching project:", error);
  } else {
    project.value = data;
  }
};

await getProject();
</script>

<template>
  <Table v-if="project" class="w-full">
    <button @click="goBack" class="hover:underline cursor-pointer">Go Back</button>
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ project.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ project.description || "No description provided." }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>In progress</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collaborator in project.collaborators"
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
  </Table>

  <section
    v-if="project"
    class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow"
  >
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="task in project.tasks" :key="task.id">
              <TableCell> {{ task.name }} </TableCell>
              <TableCell> {{ task.status }} </TableCell>
              <TableCell> {{ task.due_date }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2>Documents</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
      </div>
    </div>
  </section>
</template>

<style scoped>
/* workaround for Tailwind @apply not working properly in this project */
@import "tailwindcss";

th {
  @apply w-[100px];
}

h2 {
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80;
}
</style>
