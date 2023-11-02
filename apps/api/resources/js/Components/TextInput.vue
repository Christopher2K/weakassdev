<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';
import { css } from '@style/css';

// defineProps<InputHTMLAttributes>();
defineProps<{}>();
</script>

<template>
  <input
    :class="
      css({
        textStyle: 'body',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'green.950',
        borderRadius: 'md',
        px: 2,
        py: 1,
      })
    "
  />
</template>
