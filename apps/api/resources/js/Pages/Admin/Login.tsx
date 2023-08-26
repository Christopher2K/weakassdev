import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';

import { FieldContainer, TextInput, Button, Typography, Message } from '~/Components';
import { Layout } from '~/Pages/Layout';
import { vstack } from '@style/patterns';

export default function Login() {
  const { props } = usePage();
  const { data, setData, post, processing } = useForm({
    username: '',
    password: '',
  });
  const [hiddenErrors, setHiddenErrors] = useState<string[]>([]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post('/admin/login', {
      onFinish: () => setHiddenErrors([]),
    });
  }

  return (
    <div
      className={vstack({
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      {!hiddenErrors.includes('login') && props?.errors?.login && (
        <Message kind="error" onClose={() => setHiddenErrors((errors) => [...errors, 'login'])}>
          Mot de passe ou utilisateur incorrect
        </Message>
      )}
      <Typography tag="h1">Connexion</Typography>
      <form
        onSubmit={submit}
        className={vstack({
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 3,
        })}
      >
        <FieldContainer>
          <Typography tag="label" htmlFor="username">
            Nom d'utilisateur
          </Typography>
          <TextInput
            type="text"
            name="username"
            id="email"
            required
            value={data.username}
            onChange={(e) => setData('username', e.target.value)}
          />
        </FieldContainer>

        <FieldContainer>
          <Typography tag="label" htmlFor="password">
            Mot de passe
          </Typography>
          <TextInput
            type="password"
            name="password"
            id="password"
            required
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
        </FieldContainer>

        <FieldContainer alignment="center">
          <Button disabled={processing}>Se connecter</Button>
        </FieldContainer>
      </form>
    </div>
  );
}

Login.layout = (page: JSX.Element) => <Layout children={page} />;
