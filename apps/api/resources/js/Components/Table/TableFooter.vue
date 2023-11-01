<script setup lang="ts">
import { css } from '@style/css';

const props = defineProps<{ length: number }>();
</script>

<template>
  <tfoot
    :class="
      css({
        '& tr > td': {
          borderTopStyle: 'solid',
          borderTopWidth: 'thin',
          borderTopColor: 'gray.300',
          p: '4',
        },
      })
    "
  >
    <tr>
      <td :colSpan="props.length">{children}</td>
    </tr>
  </tfoot>
</template>
