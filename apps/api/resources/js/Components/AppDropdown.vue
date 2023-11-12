<script setup lang="ts">
import { ref, type VNodeRef } from 'vue';
import { MoreVerticalIcon } from 'lucide-vue-next';
import { onClickOutside } from '@vueuse/core';

import { css } from '@style/css';
import { vstack } from '@style/patterns';

import AppButton from './AppButton.vue';

const isOpen = ref(false);
const dropdownContainer = ref<VNodeRef>(null);

onClickOutside(dropdownContainer, () => (isOpen.value = false));
defineExpose({ isOpen });
</script>

<template>
  <div
    ref="dropdownContainer"
    :class="
      css({
        position: 'relative',
      })
    "
  >
    <AppButton @click="isOpen = !isOpen">
      <MoreVerticalIcon #left-icon />
    </AppButton>
    <div
      v-if="isOpen"
      :class="
        vstack({
          position: 'absolute',
          top: 0,
          right: '100%',
          transform: 'translateX(-0.5rem)',
          borderRadius: 'lg',
          backgroundColor: 'white',
          shadow: 'md',
          gap: 0,
          borderWidth: 'thin',
          borderColor: 'whitesmoke.400',
        })
      "
    >
      <slot />
    </div>
  </div>
</template>
