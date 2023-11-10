<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

import { css } from '@style/css';

import AppNavbar from '~/Components/AppNavbar.vue';

const page = usePage();
const isLoggedIn = computed(() => page.props.user !== null);
</script>

<template>
  <div
    :class="
      css({
        display: 'grid',
        gridTemplateColumns: '340px 1fr',
        height: '100%',
      })
    "
  >
    <AppNavbar v-if="isLoggedIn" />
    <div
      scroll-region="true"
      :class="
        css({
          w: 'full',
          h: 'full',
          overflowY: 'auto',
        })
      "
    >
      <main
        :class="
          css({
            p: '4',
            px: '8',
            width: 'full',
            minHeight: 'full',
            mx: 'auto',
          })
        "
      >
        <slot />
      </main>
    </div>
  </div>
</template>
