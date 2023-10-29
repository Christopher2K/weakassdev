import React from 'react';

import { css } from '@style/css';

export type DefinitionListProps = {
  items: Array<[string, string]>;
};

export function DefinitionList({ items }: DefinitionListProps) {
  return (
    <dl>
      {items.map(([label, text]) => {
        return (
          <React.Fragment key={label}>
            <dt
              className={css({
                fontWeight: 'bold',
                fontSize: 'sm',
                color: 'gray.600',
              })}
            >
              {label}
            </dt>
            <dd
              className={css({
                mb: '3',
                '&:last-child': {
                  mb: 0,
                },
              })}
            >
              {text}
            </dd>
          </React.Fragment>
        );
      })}
    </dl>
  );
}
