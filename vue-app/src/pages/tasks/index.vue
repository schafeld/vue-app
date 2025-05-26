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


  interface Payment {
    id: string
    amount: number
    status: 'pending' | 'processing' | 'success' | 'failed'
    email: string
  }

  const payments: Payment[] = [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '489e1d42',
      amount: 125,
      status: 'processing',
      email: 'example@gmail.com',
    },
    // ...
  ]


  const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }
]
</script>


<template>
  <!-- <div class="tasks-view">
    <h1>Tasks</h1>

    <div v-if="loading">Loading tasks...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="task in tasks" :key="task.id">
        <h2>
          {{ task.name }}
        </h2>
        <p>Status: {{ task.status }}</p>
        <p>Created at: {{ new Date(String(task.created_at)).toLocaleDateString() }}</p>
      </li>
      <li v-if="tasks.length === 0">
        <p>No tasks found.</p>
      </li>
    </ul>
  </div> -->
  <DataTable :columns="columns" :data="payments" />
</template>

<style>
</style>
