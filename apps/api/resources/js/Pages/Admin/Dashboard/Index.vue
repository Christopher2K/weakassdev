<script setup lang="ts">
import { css } from '@style/css';

import AppAdminPageCard from '~/Components/AppAdminPageCard.vue';
import AppLayout from '~/Pages/Layout.vue';

defineOptions({
  layout: AppLayout,
});
const props = defineProps<{
  postCount: number;
  userCount: number;
  userpostcontentreactionCount: number;
  reportedPostCount: number;
}>();

function addPlusPrefix(text: string | number) {
  return '+' + text;
}
</script>

<template>
  <h1 :class="css({ textStyle: 'heading1', mb: '10' })">Dashboard</h1>
  <AppAdminPageCard
    :class="css({ mb: '10', mx: 'auto' })"
    title="Statistiques hebdomadaires"
    :data="[
      { label: 'Utilisateurs', text: addPlusPrefix(props.userCount) },
      { label: 'Posts', text: addPlusPrefix(props.postCount) },
      { label: 'Réactions', text: addPlusPrefix(props.userpostcontentreactionCount) },
      { label: 'Signalements', text: addPlusPrefix(props.reportedPostCount) },
    ]"
  />

  <div :class="css({ w: 'full', display: 'grid', gridTemplateColumns: '3', gap: '6' })">
    <section>
      <h2 :class="css({ textStyle: 'heading3' })">Utilisateurs</h2>
      <p>TBD</p>
    </section>

    <section>
      <h2 :class="css({ textStyle: 'heading3' })">Posts</h2>
      <p>TBD</p>
    </section>

    <section>
      <h2 :class="css({ textStyle: 'heading3' })">Modération</h2>
      <p>TBD</p>
    </section>
  </div>
</template>
