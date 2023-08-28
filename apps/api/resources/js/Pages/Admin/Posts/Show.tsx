import React from 'react';
import { Layout } from '~/Pages/Layout';

export default function Show() {
  return <div>Post Show</div>;
}

Show.layout = (page: JSX.Element) => <Layout children={page} />;
