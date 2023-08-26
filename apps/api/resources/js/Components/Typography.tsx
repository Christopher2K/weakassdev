import React, { type ElementType, type HTMLProps, type PropsWithChildren } from 'react';
import { cva, type RecipeVariantProps, cx } from '@style/css';

const typographyStyle = cva({
  base: {},
  variants: {
    tag: {
      h1: {
        fontSize: '3xl',
      },
      h2: {
        fontSize: '2xl',
      },
      h3: {
        fontSize: 'xl',
      },
      p: {
        fontSize: 'md',
      },
      label: {
        fontSize: 'sm',
      },
    },
  },
});

type AvailableTags = RecipeVariantProps<typeof typographyStyle>['tag'];

type TypographyProps<T extends AvailableTags> = {
  tag?: T;
} & HTMLProps<T>;

export function Typography<T extends AvailableTags = 'p'>({
  tag,
  className,
  ...props
}: TypographyProps<T>) {
  const Tag = `${tag ?? 'p'}` as ElementType;
  const elmClassName = cx(typographyStyle({ tag }), className);

  return <Tag className={elmClassName} {...props} />;
}
