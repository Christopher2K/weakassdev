import React from 'react';

import { vstack } from '@style/patterns';

import { Layout } from './Layout';
import { css } from '@style/css';

type ErrorProps = {
  error: 'unauthorized' | 'forbidden' | 'not-found' | 'server-error';
  user?: {};
};
export default function Error({ error }: ErrorProps) {
  return (
    <div
      className={vstack({
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <h1 className={css({ textStyle: 'h1' })}>It's so OVER!!!!!!!</h1>
      <h2 className={css({ textStyle: 'h3' })}>We're cooked (On est cuisiné) (Same thing)</h2>
      {(function () {
        switch (error) {
          case 'unauthorized':
          case 'forbidden':
            return (
              <p className={css({ textStyle: 'body' })}>
                Vous n'avez pas les autorisations requises
              </p>
            );
          case 'not-found':
            return <p className={css({ textStyle: 'body' })}>La ressource demandée n'éxiste pas</p>;
          default:
            return <p className={css({ textStyle: 'body' })}>Une erreur est survenue</p>;
        }
      })()}
    </div>
  );
}

Error.layout = (page: JSX.Element) => <Layout children={page} />;
