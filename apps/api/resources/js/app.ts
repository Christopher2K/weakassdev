import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';

import '../css/app.css';

createInertiaApp({
  resolve: (pageName) => require(`./Pages/${pageName}.vue`),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el);
  },
});