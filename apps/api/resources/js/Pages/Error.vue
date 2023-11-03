<script lang="ts">
import AppLayout from '~/Pages/Layout.vue';
import { computed } from 'vue';

export default {
  layout: AppLayout,
};
</script>

<script setup lang="ts">
import { vstack } from '@style/patterns';
import { css } from '@style/css';

const props = defineProps<{
  error: 'unauthorized' | 'forbidden' | 'not-found' | 'server-error';
}>();

const errorMsg = computed(() => {
  switch (props.error) {
    case 'unauthorized':
    case 'forbidden':
      return "Vous n'avez pas les autorisations requises";
    case 'not-found':
      return "La ressource demandée n'éxiste pas";
    default:
      return 'Une erreur est survenue';
  }
});
</script>

<template>
  <div
    :class="
      vstack({
        justifyContent: 'center',
        alignItems: 'center',
      })
    "
  >
    <h1 :class="css({ textStyle: 'h1' })">It's so OVER!!!!!!!</h1>
    <h2 :class="css({ textStyle: 'h3' })">We're cooked (On est cuisiné) (Same thing)</h2>
    <p :class="css({ textStyle: 'body' })">{{ errorMsg }}</p>
  </div>
</template>
