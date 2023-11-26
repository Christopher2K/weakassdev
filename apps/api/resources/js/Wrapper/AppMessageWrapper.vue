<script setup lang="ts">
import { ref, effect } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import { css } from '@style/css';

import AppMessage from '~/Components/AppMessage.vue';

type FeedbackMessage = ['error' | 'success', string];

const page = usePage<{ feedback?: FeedbackMessage }>();
const displayedMessage = ref<FeedbackMessage | undefined>();

function closeMessage() {
  displayedMessage.value = undefined;
}

effect(() => {
  if (page.props?.feedback) {
    displayedMessage.value = page.props.feedback;
  }
});

router.on('start', () => {
  displayedMessage.value = undefined;
});
</script>

<template>
  <div
    v-if="Boolean(displayedMessage)"
    :class="
      css({
        position: 'fixed',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'fit-content',
        height: 'fit-content',
        zIndex: '100',
      })
    "
  >
    <AppMessage :kind="displayedMessage[0]" @close="closeMessage()">
      {{ displayedMessage[1] }}
    </AppMessage>
  </div>
  <slot />
</template>
