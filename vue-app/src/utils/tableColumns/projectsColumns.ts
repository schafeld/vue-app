import type { ColumnDef } from "@tanstack/vue-table";
// import type { Tables } from '../../../database/types';
import { RouterLink } from 'vue-router';
import type { Projects } from '@/utils/supabaseQueries';
import type { GroupedCollabs } from "@/types/GroupedCollabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// export const columns: ColumnDef<Tables<'projects'>>[] = [
export const columns = (collabs: Ref<GroupedCollabs>): ColumnDef<Projects[0]>[] => [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(RouterLink, { to: `/projects/${row.original.slug}`, class: 'text-left font-medium hover:bg-muted block w-full' }, () => row.getValue('name'))
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
      const projectCollabs = collabs.value[row.original.id];
      const isLoading = !projectCollabs && row.original.collaborators.length > 0;

      return h(
        'div',
        { class: 'text-left flex gap-1' },
        collabs.value[row.original.id]?.map((collab) => {
          return h(Avatar, { class: "h-6 w-6" }, () => [
            // Try to show avatar image first
            collab.avatar_url && h(AvatarImage, {
              src: collab.avatar_url,
              alt: collab.username || collab.full_name || 'User avatar'
            }),
            // Fallback if no image or image fails to load
            h(AvatarFallback, { class: 'text-xs' }, () =>
              (collab.username || collab.full_name || 'U').charAt(0).toUpperCase()
            )
          ]);
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
