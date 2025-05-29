import type { ColumnDef } from "@tanstack/vue-table";
import type { Tables } from '../../../database/types';
import { RouterLink } from 'vue-router';

export const columns: ColumnDef<Tables<'projects'>>[] = [
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
