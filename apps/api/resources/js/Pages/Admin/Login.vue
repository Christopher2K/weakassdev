<script setup lang="ts">
import AppButton from '~/Components/AppButton.vue';
import AppMessage from '~/Components/AppMessage.vue';
import AppInput from '~/Components/AppInput.vue';
import AppFieldContainer from '~/Components/AppFieldContainer.vue';

import { computed, effect, ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { css } from '@style/css';
import { vstack } from '@style/patterns';

const page = usePage();
const form = useForm({
  username: '',
  password: '',
});
const hiddenErrors = ref<string[]>([]);

const shouldDisplayErrorMessage = computed(() => {
  return !hiddenErrors.value.includes('login') && Boolean(page?.props?.errors?.login);
});

effect(() => {
  console.log(page.props);
});

function submit(e: SubmitEvent) {
  e.preventDefault();
  form.post('/admin/login', {
    onFinish: () => {
      hiddenErrors.value = [];
    },
  });
}
</script>

<template>
  <div
    :class="
      vstack({
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0,
        py: '10',
      })
    "
  >
    <header
      :class="
        vstack({
          justifyContent: 'center',
          alignContent: 'center',
          gap: 4,
          mb: 20,
        })
      "
    >
      <h1 :class="css({ textStyle: 'heading1', color: 'whitesmoke.900' })">Weak A** Dev</h1>
      <h2 :class="css({ textStyle: 'heading2', color: 'whitesmoke.700' })">
        Platforme d'administration
      </h2>
    </header>
    <AppMessage
      v-if="shouldDisplayErrorMessage"
      kind="error"
      @close="hiddenErrors = [...hiddenErrors, 'login']"
    >
      Mot de passe ou utilisateur incorrect
    </AppMessage>

    <form
      @submit="submit"
      :class="
        vstack({
          justifyContent: 'center',
          alignItems: 'center',
          width: 'full',
          maxWidth: '500px',
          gap: '10',
        })
      "
    >
      <AppFieldContainer label="Nom d'utilisateur" name="username">
        <AppInput type="text" name="username" required v-model="form.username" />
      </AppFieldContainer>

      <AppFieldContainer label="Mot de passe" name="password">
        <AppInput type="password" name="password" required v-model="form.password" />
      </AppFieldContainer>

      <AppButton :disabled="form.processing">Se connecter</AppButton>
    </form>
  </div>
</template>
