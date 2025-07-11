import type { ColumnDef } from "@tanstack/vue-table";
// import type { Tables } from '../../../database/types';
import { RouterLink } from 'vue-router';
import type { Projects } from '@/utils/supabaseQueries';
import type { GroupedCollabs } from "@/types/GroupedCollabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// export const columns: ColumnDef<Tables<'projects'>>[] = [
export const columns = (collabs: Ref<GroupedCollabs>):ColumnDef<Projects[0]>[] => [
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
      return h(
        'div',
        { class: 'text-left' },
        collabs.value[row.original.id].map(collab => {
          return h(Avatar, () => [
            h(AvatarImage, {
              src: collab.avatar_url || '',
              alt: collab.username,
              class: 'rounded-full',
            }),
            h(AvatarFallback, { class: 'h-6 w-6 text-xs' }, () => collab.username.charAt(0).toUpperCase())
          ])
        })
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: () => h('div', { class: 'text-left' }, 'Created At'),
    cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString(),
  },
];
