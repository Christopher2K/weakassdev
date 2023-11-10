<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { HomeIcon, LogOutIcon, UsersIcon, NewspaperIcon, StopCircleIcon } from 'lucide-vue-next';

import { css } from '@style/css';
import { vstack } from '@style/patterns';

import AppNavbarItem from './AppNavbarItem.vue';

const ICON_SIZE = 20;
const page = usePage();
</script>

<template>
  <nav
    :class="
      vstack({
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 0,
        width: 'full',
        height: 'full',
        backgroundColor: 'whitesmoke.100',
        borderRightWidth: 'thin',
        borderRightStyle: 'solid',
        borderRightColor: 'whitesmoke.600',
        px: 4,
        py: 6,
      })
    "
  >
    <div :class="vstack({ w: 'full', h: 'fit-content', gap: 0 })">
      <AppNavbarItem exact href="/admin/dashboard" label="Dashboard" :url="page.url">
        <template #left-icon>
          <HomeIcon :size="ICON_SIZE" />
        </template>
      </AppNavbarItem>

      <AppNavbarItem href="/admin/users" label="Utilisateurs" :url="page.url">
        <template #left-icon>
          <UsersIcon :size="ICON_SIZE" />
        </template>
      </AppNavbarItem>
      <AppNavbarItem href="/admin/posts" label="Posts" :url="page.url">
        <template #left-icon>
          <NewspaperIcon :size="ICON_SIZE" />
        </template>
      </AppNavbarItem>

      <AppNavbarItem href="/admin/reports" label="Modération" :url="page.url">
        <template #left-icon>
          <StopCircleIcon :size="ICON_SIZE" />
        </template>
      </AppNavbarItem>
    </div>

    <div :class="css({ w: 'full' })">
      <AppNavbarItem href="/admin/logout" label="Déconnexion" :url="page.url">
        <template #left-icon>
          <LogOutIcon :size="ICON_SIZE" />
        </template>
      </AppNavbarItem>
    </div>
  </nav>
</template>
