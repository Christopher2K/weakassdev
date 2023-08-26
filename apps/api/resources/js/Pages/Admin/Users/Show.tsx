import React from 'react';
import { Layout } from '~/Pages/Layout';

export default function Show() {
  return <div>User Show</div>;
}

Show.layout = (page: JSX.Element) => <Layout children={page} />;
