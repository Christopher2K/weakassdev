import React from 'react';
import { usePage, useForm } from '@inertiajs/inertia-react';

import { FieldContainer, Label, TextInput, Button } from '~/Components';
import Layout from '~/Pages/Layout';
import { vstack } from '@style/patterns';

type LoginProps = {
  formErrors: [];
};

export default function Login(props: LoginProps) {
  const page = usePage();
  console.log(page);
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  console.log(errors);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post('/admin/login');
  }

  return (
    <div
      className={vstack({
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <h1>Connexion</h1>
      <form
        onSubmit={submit}
        className={vstack({
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 3,
        })}
      >
        <FieldContainer>
          <Label htmlFor="username">Username</Label>
          <TextInput type="text" name="username" id="email" required />
        </FieldContainer>

        <FieldContainer>
          <Label htmlFor="password">Mot de passe</Label>
          <TextInput type="password" name="password" id="password" required />
        </FieldContainer>

        <FieldContainer alignment="center">
          <Button>Se connecter</Button>
        </FieldContainer>
      </form>
    </div>
  );
}

Login.layout = (page: JSX.Element) => <Layout children={page} />;
