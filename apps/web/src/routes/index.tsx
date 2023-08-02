import { Title } from 'solid-start';
import { createSignal } from 'solid-js';
import Counter from '@app/components/Counter';
import { EXAMPLE } from '@weakassdev/shared';
import { css, cva } from '@style/css';

const titleCva = cva({
  base: {
    fontSize: '12rem',
  },
  variants: {
    kind: {
      bigTitle: {
        color: 'red',
      },
      smallTitle: {
        color: 'blue',
      },
    },
  },
});

export default function Home() {
  const [variant, setVariant] = createSignal('bigTitle');

  function changeVariant() {
    setVariant(variant() === 'bigTitle' ? 'smallTitle' : 'bigTitle');
  }

  return (
    <main>
      <Title>Hello World</Title>
      <Counter />
      {/* @ts-expect-error */}
      <h1 class={titleCva({ kind: variant() })}>{EXAMPLE}</h1>
      <p>
        Visit{' '}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{' '}
        to learn how to build SolidStart apps.
      </p>
      <button onClick={changeVariant}>Click me</button>
    </main>
  );
}
