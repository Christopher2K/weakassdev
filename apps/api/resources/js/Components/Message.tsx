import React, { type PropsWithChildren } from 'react';
import { X } from 'lucide-react';

import { RecipeVariantProps, css, cva, cx } from '@style/css';

const messageStyle = cva({
  base: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '4',
    borderRadius: 'md',
    maxWidth: '500px',
    p: '4',
  },
  variants: {
    kind: {
      error: {
        backgroundColor: 'red.200',
      },
      success: {
        backgroundColor: 'green.200',
      },
    },
  },
});

type MessageKind = RecipeVariantProps<typeof messageStyle>['kind'];

type MessageProps = PropsWithChildren<{
  onClose?: () => void;
  kind: MessageKind;
}>;

export function Message({ onClose, kind, children }: MessageProps) {
  const articleCx = cx(messageStyle({ kind }));

  return (
    <article className={articleCx}>
      <p className={css({ textStyle: 'body' })}>{children}</p>
      <button
        type="button"
        aria-label="Fermer"
        className={css({
          cursor: 'pointer',
        })}
        onClick={onClose}
      >
        <X size={24} />
      </button>
    </article>
  );
}
