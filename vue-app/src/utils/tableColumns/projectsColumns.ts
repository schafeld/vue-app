import type { ColumnDef } from "@tanstack/vue-table";
import { RouterLink } from 'vue-router';
import { h } from 'vue';
import type { Projects } from '@/utils/supabaseQueries';
import type { GroupedCollabs } from "@/types/GroupedCollabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppInPlaceEditStatus from "@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue";

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
    cell: ({ row }) => {
      const { updateProjectInList } = useProjectsStore();
      
      return h(
        'div',
        { class: 'text-left font-medium' },
        h(AppInPlaceEditStatus, { 
          modelValue: row.original.status,
          readonly: true, // Set to false to allow bulk editing in list view
          // 'onUpdate:modelValue': (value: 'in-progress' | 'completed' | undefined) => {
          //   if (value) {
          //     row.original.status = value;
          //   }
          // },
          onCommit: () => {
            updateProjectInList(row.original.id, { status: row.original.status });
          }
        })
      )
    }
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

          return h(RouterLink, { to: `/users/${collab.username}` }, () => {
            return h(Avatar, { class: "h-6 w-6 hover:scale-110 transition-transform" }, () => [
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
