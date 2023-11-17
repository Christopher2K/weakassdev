<script setup lang="ts">
import { router } from '@inertiajs/vue3';

import type { AdminReportedPostsData } from '@weakassdev/shared/validators';

import AppResourceIndex from '~/Templates/AppResourceIndex.vue';
import AppPagination from '~/Components/AppPagination.vue';
import Layout from '~/Pages/Layout.vue';

import ReportItem from './components/ReportItem.vue';

defineOptions({
  layout: Layout,
});
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
  <AppResourceIndex title="Modération" contentTitle="Liste des signalements">
    <template #content>
      <AppPagination
        v-if="props.posts.data.length > 0"
        as="div"
        baseUrl="/admin/reports"
        :currentPage="props.posts.meta.currentPage"
        :lastPage="props.posts.meta.lastPage"
      />
      <ReportItem
        v-for="post of props.posts.data"
        :key="post.id"
        :post="post"
        @approve="approveReport($event)"
        @reject="rejectReport($event)"
      />
      <AppPagination
        v-if="props.posts.data.length > 0"
        as="div"
        baseUrl="/admin/reports"
        :currentPage="props.posts.meta.currentPage"
        :lastPage="props.posts.meta.lastPage"
      />
    </template>
  </AppResourceIndex>
</template>
