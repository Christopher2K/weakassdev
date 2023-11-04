<script lang="ts">
import Layout from '~/Pages/Layout.vue';

export default {
  layout: Layout,
};
</script>

<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { AdminReportsData } from '@weakassdev/shared/validators';
import { css } from '@style/css';
import { vstack } from '@style/patterns';

import Pagination from '~/Components/Pagination.vue';

import ReportItem from './components/ReportItem.vue';

const props = defineProps<{
  reports: AdminReportsData;
}>();

function approveReport(reportId: string) {
  router.post(
    '/admin/reports/approve',
    {
      id: reportId,
    },
    {
      preserveScroll: true,
    },
  );
}

function rejectReport(reportId: string) {
  router.post(
    '/admin/reports/reject',
    {
      id: reportId,
    },

    {
      preserveScroll: true,
    },
  );
}
</script>

<template>
  <h1 :class="css({ textStyle: 'h2', mb: '10' })">Signalements</h1>
  <div
    :class="
      vstack({
        alignItems: 'flex-start',
        width: 'full',
        gap: '3',
      })
    "
  >
    <ReportItem
      v-for="report of props.reports.data"
      :key="report.id"
      :report="report"
      @approve="approveReport($event)"
      @reject="rejectReport($event)"
    />
    <Pagination
      v-if="props.reports.data.length > 0"
      as="footer"
      baseUrl="/admin/reports"
      :currentPage="props.reports.meta.currentPage"
      :lastPage="props.reports.meta.lastPage"
    />
  </div>
</template>
