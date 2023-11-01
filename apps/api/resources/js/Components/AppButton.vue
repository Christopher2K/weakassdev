<script setup lang="ts" generic="T extends 'link' | 'button'">
export type ButtonType = 'link' | 'button';

import { Link, type InertiaLinkProps } from '@inertiajs/vue3';
import { computed, type ButtonHTMLAttributes } from 'vue';
import { css, cva, RecipeVariantProps } from '@style/css';

// TODO: Check if props typing and passthrough are OK here!

const props = defineProps<StyleProps & SpecificProps[T]>();

const slots = defineSlots<{
  ['left-icon']: (props: unknown) => unknown;
  ['right-icon']: (props: unknown) => unknown;
}>();

const isLeftIconDefined = computed(() => slots['left-icon'] != null);
const isRightIconDefined = computed(() => slots['right-icon'] != null);

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

type SpecificProps = {
  link: InertiaLinkProps;
  button: ButtonHTMLAttributes;
};

type StyleProps = {
  btnSize?: RecipeVariantProps<typeof buttonStyle>['btnSize'];
  theme?: RecipeVariantProps<typeof buttonStyle>['theme'];
};

function isLink(a: unknown): a is SpecificProps['link'] {
  return (a as SpecificProps['link']).href != null;
}
</script>

<template>
  <component
    :is="isLink(props) ? Link : 'button'"
    :class="
      buttonStyle({
        btnSize: props.btnSize,
        theme: props.theme,
      })
    "
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
