<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { HomeIcon, LogOutIcon, UsersIcon, NewspaperIcon, StopCircleIcon } from 'lucide-vue-next';

import { css } from '@style/css';
import { vstack } from '@style/patterns';

import NavbarSection from './NavbarSection.vue';
import NavbarItem from './NavbarItem.vue';

const ICON_SIZE = 20;
const page = usePage();
</script>

<template>
  <nav
    :class="
      css({
        width: '440px',
        height: 'full',
      })
    "
  >
    <div
      :class="
        css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 'width',
          height: 'full',
          backgroundColor: 'gray.50',
          borderRightWidth: 'thin',
          borderColor: 'gray.100',
          overflowY: 'auto',
        })
      "
    >
      <div :class="vstack({ w: 'full' })">
        <NavbarSection>
          <NavbarItem exact href="/admin/dashboard" label="Dashboard" :url="page.url">
            <template #icon>
              <HomeIcon :size="ICON_SIZE" />
            </template>
          </NavbarItem>
        </NavbarSection>

        <NavbarSection title="Entités">
          <NavbarItem href="/admin/users" label="Utilisateurs" :url="page.url">
            <template #icon>
              <UsersIcon :size="ICON_SIZE" />
            </template>
          </NavbarItem>
          <NavbarItem href="/admin/posts" label="Posts" :url="page.url">
            <template #icon>
              <NewspaperIcon :size="ICON_SIZE" />
            </template>
          </NavbarItem>

          <NavbarItem href="/admin/reports" label="Modération" :url="page.url">
            <template #icon>
              <StopCircleIcon :size="ICON_SIZE" />
            </template>
          </NavbarItem>
        </NavbarSection>
      </div>

      <div :class="css({ w: 'full' })">
        <NavbarSection>
          <NavbarItem href="/admin/logout" label="Déconnexion" :url="page.url">
            <template #icon>
              <LogOutIcon :size="ICON_SIZE" />
            </template>
          </NavbarItem>
        </NavbarSection>
      </div>
    </div>
  </nav>
</template>
