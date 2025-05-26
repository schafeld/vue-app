<script setup lang="ts">
  import { h, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { supabase } from '@/lib/supabaseClient';
  import type { Tables } from '../../../database/types';
  import type { ColumnDef } from '@tanstack/vue-table';
  import DataTable from '@/components/ui/data-table/DataTable.vue';

  const projects = ref<Tables<'projects'>[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  (async () => {
    const { data, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching projects:', fetchError);
      error.value = 'Failed to load projects.';
    } else {
      projects.value = data as Tables<'projects'>[];
    }
    loading.value = false;
  })()


  const columns: ColumnDef<Tables<'projects'>>[] = [
    {
      accessorKey: 'name',
      header: () => h('div', { class: 'text-left' }, 'Name'),
      cell: ({ row }) => {
        return h(RouterLink, { to: `/projects/${row.original.slug}`, class: 'text-left font-medium hover:bg-muted block w-full'}, () => row.getValue('name'))
      },
    },
    {
      accessorKey: 'status',
      header: () => h('div', { class: 'text-left' }, 'Status'),
      cell: ({ row }) => row.getValue('status'),
    },
    {
      accessorKey: 'slug',
      header: () => h('div', { class: 'text-left' }, 'Slug'),
      cell: ({ row }) => row.getValue('slug'),
    },
    {
      accessorKey: 'collaborators',
      header: () => h('div', { class: 'text-left' }, 'Collaborators'),
      cell: ({ row }) => {
        const collaborators = row.getValue('collaborators') as string[];
        return h('div', { class: 'text-left' }, collaborators.join(', '));
      },
    },
    {
      accessorKey: 'created_at',
      header: () => h('div', { class: 'text-left' }, 'Created At'),
      cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString(),
    },
  ];
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style>
</style>
