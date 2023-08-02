import { createSignal } from 'solid-js';

import './Counter.css';

export default function Counter() {
  const [count, setCount] = createSignal(0);
  console.log('count', count());
  return (
    <button class="increment" onClick={() => setCount(count() + 1)}>
      Clicks: {count()}
    </button>
  );
}
