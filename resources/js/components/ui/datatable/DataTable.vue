<script setup lang="ts">
import { ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';

/* ======= Components ======= */
import { Pagination } from '@/components/ui/datatable';
import { InputForm } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableEmpty } from '@/components/ui/table'
import { SelectCustom } from '@/components/ui/select';

/* ======= Icons ======= */
import { PackageSearch, Plus } from 'lucide-vue-next';

/* ======= Libraries ======= */
import type { Column, DataTableData } from '@/types';

const props = withDefaults(defineProps<{
  searchPlaceholder?: string;
  columns: Column[];
  data: DataTableData;
  routeName: string;
  btnCreate?: boolean;
}>(), {
  searchPlaceholder: '',
  btnCreate: false,
});

const paginationInfo = {
  current_page: props.data.current_page,
  last_page: props.data.last_page,
  per_page: props.data.per_page,
  to: props.data.to,
  total: props.data.total,
}

defineEmits<{
  (e: 'open-modal', action: any): void;
}>();

const searchQuery = ref('');

const submitSearch = () => {
    router.get(
      route(props.routeName),
      { search: searchQuery.value },
      { preserveState: true, preserveScroll: true }
    )
}

const perPage = [
  { id: 5, label: '5' },
  { id: 10, label: '10' },
  { id: 25, label: '25' },
  { id: 50, label: '50' },
  { id: 100, label: '100' },
]

const selectedPerPage = ref<number>(props.data.per_page || perPage[0].id);

watch(selectedPerPage, (newVal) => {
  router.get(
    route(props.routeName),
    { per_page: newVal },
    { preserveState: true, preserveScroll: true }
  )
})

/* ======= Función para obtener valores anidados ======= */
const getNestedValue = (obj: Record<string, any>, key: string): any => {
  return key.split('.').reduce((acc, cur) => (acc ? acc[cur] : undefined), obj);
};
</script>

<template>
  <div>
    <!-- ======= Search || Create ======= -->
    <div class="grid grid-cols-2 items-center gap-2">
      <div class="col-span-2 md:col-span-1">
        <div v-if="searchPlaceholder" class="w-full md:max-w-xs">
          <form @submit.prevent="submitSearch">
            <InputForm id="search" v-model="searchQuery" type="search" :placeholder="searchPlaceholder"/>
          </form>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1 md:text-end">
        <Button v-if="btnCreate" type="button" @click="$emit('open-modal', 'create')" class="w-full md:w-auto">
          <Plus :size="20" />Create
        </Button>
      </div>
    </div>
    <!-- ======= Table ======= -->
    <div class="mt-4 border rounded-md">
      <Table>
        <TableHeader class="bg-primary-foreground">
          <TableRow>
            <TableHead v-for="column in columns" :key="column.key">
              {{ column.label }}
            </TableHead>
            <TableHead v-if="$slots.actions">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="data.data.length > 0">
            <TableRow v-for="item in data.data" :key="item.id" class="whitespace-nowrap">
              <TableCell v-for="column in columns" :key="column.key">
                <slot :name="column.key" :item="item" :value="getNestedValue(item, column.key)">
                  {{ getNestedValue(item, column.key) }}
                </slot>
              </TableCell>
              <TableCell v-if="$slots.actions" class="space-x-2">
                <slot name="actions" :item="item" />
              </TableCell>
            </TableRow>
          </template>
          <TableEmpty v-else :colspan="columns.length + ($slots.actions ? 1 : 0)">
            <div class="flex flex-col items-center justify-center text-muted-foreground">
              <PackageSearch :size="60" :stroke-width="0.5"/>
              <span class="text-[16px] mt-2">No results.</span>
            </div>
          </TableEmpty>
        </TableBody>
      </Table>
    </div>
  </div>
  <!-- ======= Pagination ======= -->
  <div class="flex items-center justify-center md:justify-between">
    <div class="hidden md:flex items-center space-x-2 mt-4">
      <span class="text-xs text-muted-foreground whitespace-nowrap">Rows per page</span>
      <SelectCustom
          v-model="selectedPerPage"
          :options="perPage"
          valueField="id"
          labelField="label"
          id="per-page-select"
          placeholder="Per page"
          class="w-20"
      />
    </div>
    <Pagination v-if="data.links" :links="data.links" :info="paginationInfo" class="mt-6" />
  </div>
</template>
