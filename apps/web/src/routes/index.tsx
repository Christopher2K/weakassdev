import { Title } from 'solid-start';
import Counter from '@app/components/Counter';
import { EXAMPLE } from '@weakassdev/shared';

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <Counter />
      <h1>{EXAMPLE}</h1>
      <p>
        Visit{' '}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{' '}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
