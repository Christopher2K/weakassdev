<script setup lang="ts">
import { css } from '@style/css';
import { hstack, vstack } from '@style/patterns';

const props = defineProps<{
  title: string;
  data?: Array<{ label: string; text: string }>;
}>();
</script>

<template>
  <div
    :class="
      vstack({
        gap: 0,
        width: 'fit-content',
      })
    "
  >
    <h2
      :class="
        css({
          textStyle: 'heading3',
          textAlign: 'center',
          p: '5',
          backgroundColor: 'whitesmoke.200',
          borderTopRadius: 'md',
          w: 'full',
        })
      "
    >
      {{ props.title }}
    </h2>
    <ul
      :class="
        hstack({
          justifyContent: 'center',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          backgroundColor: 'whitesmoke.300',
          py: '5',
          px: '10',
          gap: '10',
          borderBottomRadius: 'md',
        })
      "
    >
      <li
        v-for="item of props.data"
        :class="
          vstack({
            justifyContent: 'center',
            alignItems: 'flex-start',
            alignSelf: 'stretch',
            gap: 0,
          })
        "
      >
        <span
          :class="
            css({
              textStyle: 'body',
              color: 'whitesmoke.800',
            })
          "
          >{{ item.label }}</span
        >
        <span
          :class="
            css({
              textStyle: 'heading3',
              color: 'whitesmoke.1000',
            })
          "
          >{{ item.text }}</span
        >
      </li>
    </ul>
  </div>
</template>
