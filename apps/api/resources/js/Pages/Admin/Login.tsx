import React from 'react';

import { Input } from '~/Components';

export default function Login() {
  return (
    <main className="flex flex-col justify-center items-center">
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
