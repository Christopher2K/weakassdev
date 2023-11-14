<script setup lang="ts">
import { computed, type ButtonHTMLAttributes } from 'vue';

import { Link, type InertiaLinkProps } from '@inertiajs/vue3';
import { cva, RecipeVariantProps } from '@style/css';
import { hstack } from '@style/patterns';

const props = defineProps<{
  btnSize?: RecipeVariantProps<typeof buttonStyle>['btnSize'];
  href?: InertiaLinkProps['href'];
  type?: ButtonHTMLAttributes['type'];
  disabled?: boolean;
}>();

const slots = defineSlots<{
  ['left-icon']: (props: unknown) => unknown;
  ['right-icon']: (props: unknown) => unknown;
}>();

const emits = defineEmits<{ click: [MouseEvent] }>();

const isLeftIconDefined = computed(() => slots['left-icon'] != null);
const isRightIconDefined = computed(() => slots['right-icon'] != null);
const isLink = computed(() => Boolean(props.href));

const buttonStyle = cva({
  base: {
    display: 'flex',
    textStyle: 'bodyImportant',
    borderRadius: 'md',
    cursor: 'pointer',
    backgroundColor: 'whitesmoke.1000',
    color: 'whitesmoke.100',
    _disabled: {
      cursor: 'not-allowed',
      background: 'whitesmoke.400',
      color: 'whitesmoke.800',
    },
    '&:hover': {
      backgroundColor: 'whitesmoke.800',
    },
  },
  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
        background: 'whitesmoke.400',
        color: 'whitesmoke.800',
        pointerEvents: 'none',
      },
    },
    btnSize: {
      md: {
        px: '4',
        py: '3',
      },
      sm: {
        p: '2',
      },
    },
  },
  defaultVariants: {
    btnSize: 'md',
    disabled: false,
  },
});

function preventLinkClick(event: MouseEvent) {
  event.preventDefault();
}
</script>

<template>
  <component
    :is="isLink ? Link : 'button'"
    :class="
      buttonStyle({
        btnSize: props.btnSize,
        disabled,
      })
    "
    :type="props.type"
    :disabled="isLink ? null : disabled"
    :aria-disabled="disabled"
    :href="props.href"
    @click="isLink && props.disabled ? preventLinkClick($event) : emits('click', $event)"
  >
    <span
      :class="
        hstack({
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
