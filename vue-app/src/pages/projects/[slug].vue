<script setup lang="ts">
import AppInPlaceEditTextarea from '@/components/AppInPlaceEdit/AppInPlaceEditTextarea.vue';
// import { get } from 'http';


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
  updateProject();
};

watch(
  () => singleProject.value?.name,
  () => {
    usePageStore().pageData.title = `Project: ${singleProject.value?.name || 'Loading...'}`
  }
)

await getSingleProject(slug);

const { getProfilesByIds } = useCollabs();

const collabs = await getProfilesByIds(singleProject.value?.collaborators || []); // differs from tutorial. better.
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
      <TableHead class="align-top pt-3"> Description </TableHead>
      <TableCell>
        <AppInPlaceEditTextarea v-model="singleProject.description" @commit="handleProjectUpdate('description')" />
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
            v-for="collaborator in collabs"
            :key="collaborator.id"
          >
            <RouterLink class="w-full h-full flex items-center justify-center" :to="{ name: '/users/[username]', params: { username: collaborator.username } }">
              <AvatarImage :src="collaborator.avatar_url || ''" :alt="collaborator.full_name" />
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
              <TableCell>
                <RouterLink 
                class="text-left block hover:underline hover:bg-muted p-4"
                :to="{ name: '/tasks/[id]', params: { id: task.id } }">
                  {{ task.name }}
                </RouterLink>
              </TableCell>
              <TableCell>
                <AppInPlaceEditStatus
                  v-model="task.status"
                  readonly
                />
              </TableCell>
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
