<script setup lang="ts">
  import type { Tables } from '../../../database/types';
  import { projectsQuery } from '@/utils/supabaseQueries';
  import type { Projects } from '@/utils/supabaseQueries';
  import { columns } from '@/utils/tableColumns/projectsColumns';

  usePageStore().pageData.title = 'Projects';

  const projects = ref<Projects | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const getProjects = async () => {
    const { data, error: fetchError } = await projectsQuery;

    if (fetchError) {
      console.error('Error fetching projects:', fetchError);
      error.value = 'Failed to load projects.';
    } else {
      projects.value = data as Tables<'projects'>[];
    }
    loading.value = false;
  }

  await getProjects();


  // const columns: ColumnDef<Tables<'projects'>>[] = [
  //   {
  //     accessorKey: 'name',
  //     header: () => h('div', { class: 'text-left' }, 'Name'),
  //     cell: ({ row }) => {
  //       return h(RouterLink, { to: `/projects/${row.original.slug}`, class: 'text-left font-medium hover:bg-muted block w-full'}, () => row.getValue('name'))
  //     },
  //   },
  //   {
  //     accessorKey: 'status',
  //     header: () => h('div', { class: 'text-left' }, 'Status'),
  //     cell: ({ row }) => row.getValue('status'),
  //   },
  //   {
  //     accessorKey: 'slug',
  //     header: () => h('div', { class: 'text-left' }, 'Slug'),
  //     cell: ({ row }) => row.getValue('slug'),
  //   },
  //   {
  //     accessorKey: 'collaborators',
  //     header: () => h('div', { class: 'text-left' }, 'Collaborators'),
  //     cell: ({ row }) => {
  //       const collaborators = row.getValue('collaborators') as string[];
  //       return h('div', { class: 'text-left' }, collaborators.join(', '));
  //     },
  //   },
  //   {
  //     accessorKey: 'created_at',
  //     header: () => h('div', { class: 'text-left' }, 'Created At'),
  //     cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString(),
  //   },
  // ];
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style>
</style>
