<script setup lang="ts">
import { type InputHTMLAttributes } from 'vue';

import { css } from '@style/css';

const props = defineProps<{
  modelValue?: InputHTMLAttributes['value'];
}>();
const emits = defineEmits<{ 'update:modelValue': [string] }>();
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)"
    :class="
      css({
        textStyle: 'body',
        width: '100%',
        p: '3',
        backgroundColor: 'whitesmoke.100',
        borderColor: 'whitesmoke.100',
        borderRadius: 'md',
        borderWidth: '2px',
        outline: 'none',
        '&:focus': {
          borderColor: 'whitesmoke.800',
        },
        '&:hover:not(:focus)': {
          borderColor: 'whitesmoke.400',
        },
        '&:disabled': {
          borderColor: 'whitesmoke.400',
          backgroundColor: 'whitesmoke.400',
          color: 'whitesmoke.800',
        },
      })
    "
  />
</template>
