<script setup lang="ts">
import { cva, RecipeVariantProps } from '@style/css';

type StyleProps = RecipeVariantProps<typeof containerStyle>;

// const props = defineProps<StyleProps>();
const props = defineProps<{}>();

const containerStyle = cva({
  base: {
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '1',
    width: '100%',
  },
  variants: {
    alignment: {
      left: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      right: {
        alignItems: 'flex-end',
      },
    },
  },
  defaultVariants: {
    alignment: 'left',
  },
});
</script>

<template>
  <div :class="containerStyle(props)">
    <slot></slot>
  </div>
</template>
