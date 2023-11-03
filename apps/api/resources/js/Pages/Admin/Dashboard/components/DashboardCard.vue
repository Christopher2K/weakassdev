<script setup lang="ts">
import { css } from '@style/css';

const props = defineProps<{
  label: string;
  count: number;
}>();
</script>

<template>
  <div
    :class="
      css({
        width: '15rem',
        backgroundColor: 'neutral.100',
        borderBottomRadius: 'sm',
      })
    "
  >
    <header
      :class="
        css({
          backgroundColor: 'neutral.300',
          px: '3',
          py: '2',
          borderTopRadius: 'sm',
        })
      "
    >
      <p
        :class="
          css({
            textStyle: 'bigBody',
            fontWeight: 'semibold',
          })
        "
      >
        {{ props.label }}
      </p>
    </header>
    <div :class="css({ p: '3' })">
      <p>{{ props.count }}</p>
    </div>
  </div>
</template>
