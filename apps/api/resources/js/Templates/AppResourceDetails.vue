<script setup lang="ts">
import { css } from '@style/css';
import { hstack } from '@style/patterns';

import AppDetailsSection from '~/Components/AppDetailsSection.vue';

const props = defineProps<{ title: string }>();
</script>

<template>
  <h1 :class="css({ textStyle: 'heading1', mb: 10 })">{{ props.title }}</h1>
  <slot name="header" />

  <div
    :class="
      hstack({
        width: 'full',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 6,
        mb: 10,
      })
    "
  >
    <AppDetailsSection title="Informations">
      <slot name="informations" />
    </AppDetailsSection>

    <AppDetailsSection title="Actions">
      <slot name="actions" />
    </AppDetailsSection>
  </div>

  <slot></slot>
</template>
