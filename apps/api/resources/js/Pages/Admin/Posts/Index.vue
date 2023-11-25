<script setup lang="ts">
import { computed } from 'vue';

import { AdminPostsData } from '@weakassdev/shared/validators';

import AppLayout from '~/Pages/Layout.vue';
import AppResourceIndex from '~/Templates/AppResourceIndex.vue';
import AppPostsTable from '~/Components/AppPostsTable.vue';
import AppEmptyData from '~/Components/AppEmptyData.vue';

defineOptions({
  layout: AppLayout,
});
const props = defineProps<{
  posts: AdminPostsData;
}>();

const data = computed(() =>
  props.posts.data.map((post) => ({
    id: post.id,
    author: post.author.username,
    authorId: post.author.id,
    status: post.status,
    revisions: post.meta.revisions,
    content: post.content.content,
    createdAt: post.createdAt,
  })),
);
</script>

<template>
  <AppResourceIndex showTable title="Posts" contentTitle="Liste des posts">
    <template #content>
      <AppPostsTable
        v-if="props.posts.data.length > 0"
        :data="data"
        :currentPage="props.posts.meta.currentPage"
        :lastPage="props.posts.meta.lastPage"
        baseUrl="/admin/posts"
      />
      <AppEmptyData v-else />
    </template>
  </AppResourceIndex>
</template>
