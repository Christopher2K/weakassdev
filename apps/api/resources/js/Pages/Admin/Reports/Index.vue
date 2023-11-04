<script lang="ts">
import Layout from '~/Pages/Layout.vue';

export default {
  layout: Layout,
};
</script>

<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { AdminReportedPostsData } from '@weakassdev/shared/validators';
import { css } from '@style/css';
import { vstack } from '@style/patterns';

import Pagination from '~/Components/Pagination.vue';

import ReportItem from './components/ReportItem.vue';

const props = defineProps<{
  posts: AdminReportedPostsData;
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
      v-for="post of props.posts.data"
      :key="post.id"
      :post="post"
      @approve="approveReport($event)"
      @reject="rejectReport($event)"
    />
    <Pagination
      v-if="props.posts.data.length > 0"
      as="footer"
      baseUrl="/admin/reports"
      :currentPage="props.posts.meta.currentPage"
      :lastPage="props.posts.meta.lastPage"
    />
  </div>
</template>
