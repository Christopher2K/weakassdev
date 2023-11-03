<script setup lang="ts">
import { computed, type ButtonHTMLAttributes } from 'vue';

import { Link, type InertiaLinkProps } from '@inertiajs/vue3';
import { css, cva, RecipeVariantProps } from '@style/css';

const props = defineProps<{
  btnSize?: RecipeVariantProps<typeof buttonStyle>['btnSize'];
  theme?: RecipeVariantProps<typeof buttonStyle>['theme'];
  href?: InertiaLinkProps['href'];
  type?: ButtonHTMLAttributes['type'];
}>();

const slots = defineSlots<{
  ['left-icon']: (props: unknown) => unknown;
  ['right-icon']: (props: unknown) => unknown;
}>();

const isLeftIconDefined = computed(() => slots['left-icon'] != null);
const isRightIconDefined = computed(() => slots['right-icon'] != null);
const isLink = computed(() => Boolean(props.href));

const buttonStyle = cva({
  base: {
    display: 'flex',
    textStyle: 'button',
    borderRadius: 'sm',
    borderWidth: 'thin',
    borderStyle: 'solid',
    cursor: 'pointer',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
      bg: 'gray.100',
      color: 'gray.600',
    },
  },
  variants: {
    btnSize: {
      sm: {
        p: '2',
      },
      md: {
        px: '4',
        py: '2',
      },
      lg: {
        px: '6',
        py: '4',
      },
    },
    theme: {
      primary: {
        color: 'indigo.600',
        backgroundColor: 'indigo.100',
        borderColor: 'indigo.100',
        _hover: {
          backgroundColor: 'indigo.200',
          borderColor: 'indigo.600',
        },
      },
      secondary: {
        color: 'lime.600',
        backgroundColor: 'lime.100',
        borderColor: 'lime.100',
        _hover: {
          backgroundColor: 'lime.200',
          borderColor: 'lime.600',
        },
      },
    },
  },
  defaultVariants: {
    theme: 'primary',
    btnSize: 'sm',
  },
});
</script>

<template>
  <component
    :is="isLink ? Link : 'button'"
    :class="
      buttonStyle({
        btnSize: props.btnSize,
        theme: props.theme,
      })
    "
    :href="props.href"
  >
    <span
      :class="
        css({
          display: 'flex',
          flexDir: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2',
        })
      "
    >
      <span v-if="isLeftIconDefined">
        <slot name="left-icon" />
      </span>

      <slot></slot>

      <span v-if="isRightIconDefined">
        <slot name="right-icon" />
      </span>
    </span>
  </component>
</template>
