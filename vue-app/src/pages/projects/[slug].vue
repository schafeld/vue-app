<script setup lang="ts">

const router = useRouter();
const { slug } = useRoute("/projects/[slug]").params;

const goBack = () => {
  if (router.options.history.state.back) {
    router.back();
  } else {
    router.push("/projects");
  }
};

const projectsLoader = useProjectsStore();
const { singleProject } = storeToRefs(projectsLoader);
const { getSingleProject, updateProject } = projectsLoader;

const handleProjectUpdate = (field: string) => {
  // if (!singleProject.value) {
  //   console.log('No project selected for update');
  //   return;
  // }
  
  // console.log(`${field} updated:`, singleProject.value[field as keyof typeof singleProject.value]);
  updateProject();
};

watch(
  () => singleProject.value?.name,
  () => {
    usePageStore().pageData.title = `Project: ${singleProject.value?.name || 'Loading...'}`
  }
)

await getSingleProject(slug);
</script>

<template>
  <Table v-if="singleProject" class="w-full">
    <button @click="goBack" class="hover:underline cursor-pointer">Go Back</button>
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell>
        <AppInPlaceEditText v-model="singleProject.name" @commit="handleProjectUpdate('name')" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        <!-- {{ singleProject.description || "No description provided." }} -->
        <AppInPlaceEditText v-model="singleProject.description" @commit="handleProjectUpdate('description')" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>
        <AppInPlaceEditStatus
          v-model="singleProject.status"
          @commit="handleProjectUpdate('status')"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collaborator in singleProject.collaborators"
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
    v-if="singleProject"
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
            <TableRow v-for="task in singleProject.tasks" :key="task.id">
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
