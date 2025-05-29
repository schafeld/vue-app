import type { ColumnDef } from "@tanstack/vue-table";
import type { Tables } from '../../../database/types';
import { RouterLink } from 'vue-router';

export const columns: ColumnDef<Tables<'tasks'>>[] = [
// const columns: ColumnDef<TasksWithProjects>[] = [
{
  accessorKey: 'name',
  header: () => h('div', { class: 'text-left' }, 'Name'),
  cell: ({ row }) => {
    return h(RouterLink, { to: `/tasks/${row.original.id}`, class: 'text-left font-medium hover:bg-muted block w-full'}, () => row.getValue('name'))
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
  // {
  //   accessorKey: 'id',
  //   header: () => h('div', { class: 'text-left' }, 'Project ID'),
  //   cell: ({ row }) => {
  //   return h('div', { class: 'text-left' }, row.getValue('id'));
  //   },
  // },
  // {
  //   accessorKey: 'project_id',
  //   header: () => h('div', { class: 'text-left' }, 'Project ID'),
  //   cell: ({ row }) => {
  //     return h('div', { class: 'text-left' }, row.getValue('project_id'));
  //   },
  // },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      const project = row.getValue('projects') as { id: string; name: string; slug: string } | null;
      return h(RouterLink, { to: `/projects/${project?.slug}`, class: 'text-left hover:bg-muted block w-full' }, () => project ? project.name : 'No Project');
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      const collaborators = row.getValue('collaborators') as string[];
      return h('div', { class: 'text-left' }, collaborators.join(', '));
    },
  },
]
