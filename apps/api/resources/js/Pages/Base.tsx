import React, { PropsWithChildren } from 'react';

type BaseProps = PropsWithChildren<{}>;

export default function Base({ children }: BaseProps) {
  return <div>{children}</div>;
}
