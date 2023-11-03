<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

import type { AdminReportsData } from '@weakassdev/shared/validators';
import { formatDate } from '@weakassdev/shared/utils';
import { css } from '@style/css';
import { hstack, vstack } from '@style/patterns';

import AppButton from '~/Components/AppButton.vue';
import DefinitionList from '~/Components/DefinitionList.vue';

const props = defineProps<{
  report: AdminReportsData['data'][number];
}>();
</script>

<template>
  <div
    :class="
      vstack({
        width: 'full',
        gap: '3',
        bg: 'slate.100',
        px: 4,
        py: 5,
        borderRadius: 'md',
      })
    "
  >
    <div
      :class="
        vstack({
          gap: '3',
          w: 'full',
          alignItems: 'stretch',
        })
      "
    >
      <p
        :class="
          css({
            fontStyle: 'italic',
            fontSize: 'sm',
            color: 'gray.600',
          })
        "
      >
        Reported by
        <Link :href="`/admin/users/${report.reporter.id}`">{{
          props.report.reporter.username
        }}</Link
        >, on
        {{ formatDate(report.createdAt) }}
      </p>
      <DefinitionList
        :items="[
          ['Reason', report.reason],
          ['Context', report.reasonContext],
        ]"
      />
    </div>

    <div :class="vstack({ w: 'full', gap: '1', alignItems: 'stretch' })">
      <blockquote
        :class="
          css({
            borderLeftWidth: 4,
            borderLeftColor: 'gray.800',
            fontStyle: 'italic',
            pl: '5',
            py: '2',
          })
        "
      >
        {{ props.report.post.content.content }}
      </blockquote>
      <p
        :class="
          css({
            fontStyle: 'italic',
            fontSize: 'sm',
            color: 'gray.600',
          })
        "
      >
        Posted by
        <Link :href="`/admin/users/${report.post.author.id}`">{{
          props.report.post.author.username
        }}</Link>
        on {{ formatDate(props.report.post.createdAt) }}
      </p>
    </div>

    <div
      :class="
        vstack({
          w: 'full',
          gap: '2',
        })
      "
    >
      <div
        :class="
          hstack({
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            gap: '5',
            w: 'full',
          })
        "
      >
        <AppButton :href="`/admin/reports/${report.id}/approve`">Approve report</AppButton>
        <AppButton :href="`/admin/reports/${report.id}/reject`">Reject report</AppButton>
      </div>
    </div>
  </div>
</template>
