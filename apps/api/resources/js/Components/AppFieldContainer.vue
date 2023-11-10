<script setup lang="ts">
import { css } from '@style/css';
import { vstack } from '@style/patterns';

const props = defineProps<{
  name: string;
  label: string;
}>();
</script>

<template>
  <fieldset
    :class="
      vstack({
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        gap: '0',
      })
    "
  >
    <label
      :class="
        css({
          textStyle: 'smallImportant',
        })
      "
      :label="props.label"
      >{{ props.label }}</label
    >
    <slot />
  </fieldset>
</template>
