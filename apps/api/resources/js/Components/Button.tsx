import React, { ButtonHTMLAttributes, ComponentProps, DetailedHTMLProps } from 'react';
import { Link as InertiaLink } from '@inertiajs/inertia-react';

import { cx } from '@style/css';
import { buttonStyle } from '~/styles';

type BaseProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
function Base({ className, ...props }: BaseProps) {
  const cxs = cx(buttonStyle({}), className);
  return <button className={cxs} {...props} />;
}

type LinkProps = ComponentProps<typeof InertiaLink>;
function Link({ className, ...props }: LinkProps) {
  const cxs = cx(buttonStyle({}), className);
  return <InertiaLink className={cxs} {...props} />;
}

export const Button = {
  Link,
  Base,
};
