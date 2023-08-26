import React from 'react';

import { Layout } from '~/Pages/Layout';
import { vstack } from '@style/patterns';
import { Typography } from '~/Components';

type ErrorProps = {
  error: 'Unauthorized' | 'Forbidden' | 'NotFound' | 'ServerError';
};
export default function Error({ error }: ErrorProps) {
  return (
    <div
      className={vstack({
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <Typography tag="h1">OH MON DIEU, un erreur!!!</Typography>
      {(function () {
        switch (error) {
          case 'Unauthorized':
            return <Typography>Vous n'avez pas les autorisations requises</Typography>;
          default:
            return <Typography>Une erreur est survenue</Typography>;
        }
      })()}
    </div>
  );
}

Error.layout = (page: JSX.Element) => <Layout children={page} />;
