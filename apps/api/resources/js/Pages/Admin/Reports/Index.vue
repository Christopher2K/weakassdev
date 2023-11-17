<script setup lang="ts">
import { router } from '@inertiajs/vue3';

import { AdminReportedPostsData } from '@weakassdev/shared/validators';

import { css } from '@style/css';
import { vstack } from '@style/patterns';

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
  <h1 :class="css({ textStyle: 'heading1', mb: '10' })">Modération</h1>

  <div
    :class="
      vstack({
        width: 'full',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 5,
      })
    "
  >
    <h2 :class="css({ textStyle: 'heading3' })">Liste des signalements</h2>
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
  </div>
</template>
