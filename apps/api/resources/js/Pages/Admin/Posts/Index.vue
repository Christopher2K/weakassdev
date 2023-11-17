<script setup lang="ts">
import { computed } from 'vue';

import { css } from '@style/css';
import { vstack } from '@style/patterns';

import { AdminPostsData } from '@weakassdev/shared/validators';

import AppLayout from '~/Pages/Layout.vue';
import AppPostsTable from '~/Components/AppPostsTable.vue';

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
  <h1 :class="css({ textStyle: 'heading1', mb: '10' })">Posts</h1>

  <div
    :class="vstack({ gap: 5, justifyContent: 'flex-start', alignItems: 'flex-start', w: 'full' })"
  >
    <h2 :class="css({ textStyle: 'heading3' })">Liste des posts</h2>
    <AppPostsTable
      :data="data"
      :currentPage="props.posts.meta.currentPage"
      :lastPage="props.posts.meta.lastPage"
      baseUrl="/admin/posts"
    />
  </div>
</template>
