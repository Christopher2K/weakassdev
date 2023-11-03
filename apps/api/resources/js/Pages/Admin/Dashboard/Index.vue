<script lang="ts">
import AppLayout from '~/Pages/Layout.vue';

export default {
  layout: AppLayout,
};
</script>

<script setup lang="ts">
import { css } from '@style/css';
import { flex } from '@style/patterns';

import DashboardCard from './components/DashboardCard.vue';

const props = defineProps<{
  postCount: string;
  userCount: string;
}>();
</script>

<template>
  <h1 :class="css({ textStyle: 'h2', mb: '10' })">Dashboard</h1>
  <section>
    <h2 :class="css({ textStyle: 'h3', mb: '5' })">Statistiques sur l'app</h2>
    <div
      :class="
        flex({ direction: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '5' })
      "
    >
      <DashboardCard label="Comptes utilisateur" :count="+props.userCount" />
      <DashboardCard label="Posts crées" :count="+props.postCount" />
    </div>
  </section>
</template>
