import React, { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren<{}>;

export default function Layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
