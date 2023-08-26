import React, { PropsWithChildren } from 'react';

import { Navbar } from '~/Components';
import { css } from '@style/css';

type LayoutProps = PropsWithChildren<{}>;

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div
        className={css({
          w: 'full',
          h: 'full',
          overflowY: 'auto',
        })}
      >
        <main
          className={css({
            p: '4',
            width: 'full',
            maxW: '1100px',
            minHeight: 'full',
            mx: 'auto',
          })}
        >
          {children}
        </main>
      </div>
    </>
  );
}
