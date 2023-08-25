// const { createInertiaApp } = require('@inertiajs/react');
import React, { PropsWithChildren } from 'react';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { createRoot } from 'react-dom/client';
import Base from './Pages/Base';
import RootLayout from './Pages/Layout';
import '@weakassdev/config/base.css';

const DefaultLayout = ({ children }: PropsWithChildren<{}>) => <>{children}</>;

createInertiaApp({
  id: 'app',
  page: JSON.parse(document.getElementById('app')!.dataset.page!),
  resolve: (pageName) => require(`./Pages/${pageName}`),
  setup({ el, App, props }) {
    const initialPage = props.initialPage.component;
    const Layout = initialPage === 'Admin/Login' ? DefaultLayout : RootLayout;
    console.log(props);
    createRoot(el).render(
      <Base>
        <Layout>
          <App {...props} />
        </Layout>
      </Base>,
    );
  },
});
