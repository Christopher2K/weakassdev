import React from 'react';
import { Layout } from '~/Pages/Layout';

export default function Dashboard() {
  return <div>Dashboard</div>;
}

Dashboard.layout = (page: JSX.Element) => <Layout children={page} />;
