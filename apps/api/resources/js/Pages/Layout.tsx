import React, { PropsWithChildren } from 'react';

import { Navbar } from '~/Components';

type LayoutProps = PropsWithChildren<{}>;

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
