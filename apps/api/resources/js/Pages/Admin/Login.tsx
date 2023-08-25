import React from 'react';

import { Input } from '~/Components';
import { vstack } from '@style/patterns';
import { css } from '@style/css';

export default function Login() {
  return (
    <main
      className={css({
        justifyContent: 'center',
        alignItems: 'center',
        background: 'green',
      })}
    >
      <h1>Connexion</h1>
      <form className="flex flex-col justify-center items-center">
        <label htmlFor="email">Email</label>
        <Input type="email" name="email" id="email" />
        <label htmlFor="password">Mot de passe</label>
        <Input type="password" name="password" id="password" />
      </form>
    </main>
  );
}
