// // const { createInertiaApp } = require('@inertiajs/react');
// import React from 'react';
// import { createInertiaApp } from '@inertiajs/inertia-react';
// import { createRoot } from 'react-dom/client';
// import '@weakassdev/config/base.css';
// import '../css/app.css';
//
// createInertiaApp({
//   id: 'app',
//   page: JSON.parse(document.getElementById('app')!.dataset.page!),
//   resolve: (pageName) => require(`./Pages/${pageName}`),
//   setup({ el, App, props }) {
//     createRoot(el).render(<App {...props} />);
//   },
// });
//
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';

createInertiaApp({
  resolve: (pageName) => require(`./Pages/${pageName}.vue`),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el);
  },
});
