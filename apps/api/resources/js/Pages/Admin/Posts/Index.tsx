import React from 'react';

import { css } from '@style/css';
import { Layout } from '~/Pages/Layout';

export default function Index() {
  return <h1 className={css({ textStyle: 'h2' })}>Posts</h1>;
}

Index.layout = (page: JSX.Element) => <Layout children={page} />;
