<script setup lang="ts" generic="TData, TValue">
  import type { ColumnDef } from '@tanstack/vue-table'
  import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
  } from '@tanstack/vue-table'


  const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }>()

  const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
  })
</script>

<template>
  <div class="data-table">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows" :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped>
/* TODO: Why aren't Tailwind @apply directives not working properly (without import or reference) in this project? */
/* td {
  padding: 0;
  & > * {
    padding: 16px
  }
} */
/*
  Workaround from: https://vueschool.io/lessons/make-the-data-table-cells-clickable-with-routerlink
  @reference "@/index.css";
*/
@import "tailwindcss";

td {
  @apply p-0;

  & > * {
    @apply p-4;
  }
}
</style>
