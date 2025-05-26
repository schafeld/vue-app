<script setup lang="ts">
  import { h, ref } from 'vue';
  import { supabase } from '@/lib/supabaseClient';
  import type { Tables } from '../../../database/types';
  import type { ColumnDef } from '@tanstack/vue-table';
  import DataTable from '@/components/ui/data-table/DataTable.vue';


  const tasks = ref<Tables<'tasks'>[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  (async () => {
    const { data, error: fetchError } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching tasks:', fetchError);
      error.value = 'Failed to load tasks.';
    } else {
      tasks.value = data as Tables<'tasks'>[];
    }
    loading.value = false;
  })()



  const columns: ColumnDef<Tables<'tasks'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('name'));
    },
    },
    {
      accessorKey: 'status',
      header: () => h('div', { class: 'text-left' }, 'Status'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left' }, row.getValue('status'));
      },
    },
    {
      accessorKey: 'due_date',
      header: () => h('div', { class: 'text-left' }, 'Due Date'),
      cell: ({ row }) => {
        const dueDate = new Date(row.getValue('due_date'));
        return h('div', { class: 'text-left' }, dueDate.toLocaleDateString());
      },
    },
    {
      accessorKey: 'id',
      header: () => h('div', { class: 'text-left' }, 'Project ID'),
      cell: ({ row }) => {
      return h('div', { class: 'text-left' }, row.getValue('id'));
      },
    },
    // {
    //   accessorKey: 'project_id',
    //   header: () => h('div', { class: 'text-left' }, 'Project ID'),
    //   cell: ({ row }) => {
    //     return h('div', { class: 'text-left' }, row.getValue('project_id'));
    //   },
    // },
    {
      accessorKey: 'collaborators',
      header: () => h('div', { class: 'text-left' }, 'Collaborators'),
      cell: ({ row }) => {
        const collaborators = row.getValue('collaborators') as string[];
        return h('div', { class: 'text-left' }, collaborators.join(', '));
      },
    },
]
</script>


<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style>
</style>
