<script setup lang="ts">
import { ComponentPublicInstance, computed, useAttrs } from 'vue';
import { Link } from '@inertiajs/vue3';

import { css } from '@style/css';

const props = defineProps<{ label: string }>();
const emits = defineEmits<{ click: [MouseEvent] }>();
const attrs = useAttrs();

const tag = computed(() => (attrs.href ? Link : 'button'));

function onClick(event: MouseEvent, parent: ComponentPublicInstance<Partial<{ isOpen: boolean }>>) {
  if (parent?.isOpen != null) {
    parent.isOpen = false;
  }
  emits('click', event);
}
</script>

<template>
  <component
    :is="tag"
    @click="onClick($event, $parent)"
    :class="
      css({
        textStyle: 'body',
        textAlign: 'left',
        px: 3,
        py: 2,
        alignSelf: 'stretch',
        color: 'whitesmoke.1000',
        cursor: 'pointer',
        _hover: {
          backgroundColor: 'whitesmoke.400',
        },
      })
    "
  >
    {{ props.label }}
  </component>
</template>
