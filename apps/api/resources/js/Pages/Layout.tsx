import React, { PropsWithChildren } from 'react';

import { Navbar } from '~/Components';
import { css } from '@style/css';
import { usePage } from '@inertiajs/inertia-react';

type LayoutProps = PropsWithChildren<{}>;

export function Layout({ children }: LayoutProps) {
  const { props } = usePage();
  const isLoggedIn = props.user !== null;

  return (
    <>
      {isLoggedIn && <Navbar />}
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
