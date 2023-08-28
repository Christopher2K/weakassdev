import React from 'react';

import { css } from '@style/css';
import { Layout } from '~/Pages/Layout';

export default function Dashboard() {
  return <h1 className={css({ textStyle: 'h2' })}>Dashboard</h1>;
}

Dashboard.layout = (page: JSX.Element) => <Layout children={page} />;
