<script lang="ts">
import Layout from '~/Pages/Layout.vue';

export default {
  layout: Layout,
};
</script>

<script setup lang="ts">
import { AdminReportsData } from '@weakassdev/shared/validators';
import { css } from '@style/css';
import { vstack } from '@style/patterns';

import Pagination from '~/Components/Pagination.vue';

import ReportItem from './components/ReportItem.vue';

const props = defineProps<{
  reports: AdminReportsData;
}>();
</script>

<template>
  <h1 :class="css({ textStyle: 'h2', mb: '10' })">Reports</h1>
  <div
    :class="
      vstack({
        alignItems: 'flex-start',
        width: 'full',
        gap: '3',
      })
    "
  >
    <ReportItem v-for="report of props.reports.data" :key="report.id" :report="report" />
    <Pagination
      v-if="props.reports.data.length > 0"
      as="footer"
      baseUrl="/admin/reports"
      :currentPage="props.reports.meta.currentPage"
      :lastPage="props.reports.meta.lastPage"
    />
  </div>
</template>
