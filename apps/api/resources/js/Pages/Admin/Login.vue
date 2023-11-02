<script lang="ts">
import AppLayout from '~/Pages/Layout.vue';
import FieldContainer from '~/Components/FieldContainer.vue';
import TextInput from '~/Components/TextInput.vue';
import AppButton from '~/Components/AppButton.vue';
import AppMessage from '~/Components/AppMessage.vue';

export default {
  layout: AppLayout,
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
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
      })
    "
  >
    <AppMessage
      v-if="shouldDisplayErrorMessage"
      kind="error"
      @close="() => (hiddenErrors = [...hiddenErrors, 'login'])"
    >
      Mot de passe ou utilisateur incorrect
    </AppMessage>
    <form
      @submit="submit"
      :class="
        vstack({
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 3,
        })
      "
    >
      <FieldContainer>
        <label :class="css({ textStyle: 'label' })" for="username"> Nom d'utilisateur </label>
        <TextInput type="text" name="username" id="email" required v-model="form.username" />
      </FieldContainer>

      <FieldContainer>
        <label :class="css({ textStyle: 'label' })" for="password"> Mot de passe </label>
        <TextInput type="password" name="password" id="password" required v-model="form.password" />
      </FieldContainer>

      <FieldContainer alignment="center">
        <AppButton :disabled="form.processing">Se connecter</AppButton>
      </FieldContainer>
    </form>
  </div>
</template>
