<script lang="ts">
import Layout from '~/Pages/Layout.vue';

export default {
  layout: Layout,
};
</script>

<script setup lang="ts">
import { css } from '@style/css';

import AppBreadcrumbs from '~/Components/AppBreadcrumbs.vue';
</script>

<template>
  <h1 :class="css({ textStyle: 'h2' })">Détails de l'utilisateur</h1>
  <AppBreadcrumbs
    :links="[{ href: '/admin/users', name: 'Liste des utilisateurs' }, { name: 'Détails' }]"
  />
</template>
