import React from 'react';

import { vstack } from '@style/patterns';
import { Typography } from '~/Components';

import { Layout } from './Layout';

type ErrorProps = {
  error: 'unauthorized' | 'forbidden' | 'not-found' | 'server-error';
  user?: {};
};
export default function Error({ error, ...props }: ErrorProps) {
  return (
    <div
      className={vstack({
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <Typography tag="h1">It's so OVER!!!!!!!</Typography>
      <Typography tag="h2">We're cooked (On est cuisiné) (Same thing)</Typography>
      {(function () {
        switch (error) {
          case 'unauthorized':
          case 'forbidden':
            return <Typography>Vous n'avez pas les autorisations requises</Typography>;
          case 'not-found':
            return <Typography>La ressource demandée n'éxiste pas</Typography>;
          default:
            return <Typography>Une erreur est survenue</Typography>;
        }
      })()}
    </div>
  );
}

Error.layout = (page: JSX.Element) => <Layout children={page} />;
