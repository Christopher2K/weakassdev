import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import AppMessageWrapper from './Wrapper/AppMessageWrapper.vue';

import '../css/app.css';

createInertiaApp({
  resolve: (pageName) => require(`./Pages/${pageName}.vue`),
  setup({ el, App, props, plugin }) {
    createApp({
      render: () => h(AppMessageWrapper, () => h(App, props)),
    })
      .use(plugin)
      .mount(el);
  },
});
