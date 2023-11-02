<script setup lang="ts">
import { type InputHTMLAttributes } from 'vue';
import { css } from '@style/css';

const props = defineProps<{
  type?: InputHTMLAttributes['type'];
  name?: InputHTMLAttributes['name'];
  id?: InputHTMLAttributes['id'];
  required?: InputHTMLAttributes['required'];
  modelValue?: InputHTMLAttributes['value'];
}>();

const emits = defineEmits<{ 'update:modelValue': [string] }>();
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
    :type="props.type"
    :name="props.name"
    :id="props.id"
    :required="props.required"
    :value="props.modelValue"
    @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
