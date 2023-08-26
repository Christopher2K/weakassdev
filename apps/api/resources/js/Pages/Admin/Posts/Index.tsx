import React from 'react';
import { Layout } from '~/Pages/Layout';

export default function Index() {
  return <div>Index</div>;
}

Index.layout = (page: JSX.Element) => <Layout children={page} />;
