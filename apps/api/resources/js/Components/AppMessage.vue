<script setup lang="ts">
import { XIcon } from 'lucide-vue-next';

import { RecipeVariantProps, css, cva } from '@style/css';

type MessageKind = RecipeVariantProps<typeof messageStyle>['kind'];

const props = defineProps<{
  kind: MessageKind;
}>();
const emit = defineEmits<{ close: [] }>();

const messageStyle = cva({
  base: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '4',
    borderRadius: 'md',
    maxWidth: '500px',
    p: '4',
  },
  variants: {
    kind: {
      error: {
        backgroundColor: 'red.200',
      },
      success: {
        backgroundColor: 'green.200',
      },
    },
  },
});
</script>

<template>
  <article :class="messageStyle({ kind: props.kind })">
    <p :class="css({ textStyle: 'body' })">
      <slot />
    </p>
    <button
      type="button"
      aria-label="Fermer"
      :class="
        css({
          cursor: 'pointer',
        })
      "
      @click="() => emit('close')"
    >
      <XIcon :size="24" />
    </button>
  </article>
</template>
