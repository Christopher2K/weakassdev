import React, {
  type PropsWithChildren,
  type ButtonHTMLAttributes,
  type ComponentProps,
  type DetailedHTMLProps,
} from 'react';
import { Link as InertiaLink } from '@inertiajs/inertia-react';

import { css, cx, cva, RecipeVariantProps } from '@style/css';

export const buttonStyle = cva({
  base: {
    display: 'flex',
    textStyle: 'button',
    color: 'indigo.600',
    backgroundColor: 'indigo.100',
    borderRadius: 'sm',
    borderWidth: 'thin',
    borderStyle: 'solid',
    borderColor: 'indigo.100',
    cursor: 'pointer',
    _hover: {
      backgroundColor: 'indigo.200',
      borderColor: 'indigo.600',
    },
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
      bg: 'gray.100',
      color: 'gray.600',
    },
  },
  variants: {
    btnSize: {
      sm: {
        p: '2',
      },
      md: {
        px: '4',
        py: '2',
      },
      lg: {
        px: '6',
        py: '4',
      },
    },
  },
  defaultVariants: {
    btnSize: 'sm',
  },
});

type StyleProps = {
  btnSize?: RecipeVariantProps<typeof buttonStyle>['btnSize'];
};
type CommonProps = PropsWithChildren<{
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}>;

function Content({ children, leftIcon, rightIcon }: CommonProps) {
  return (
    <span
      className={css({
        display: 'flex',
        flexDir: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2',
      })}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </span>
  );
}
type BaseProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  CommonProps &
  StyleProps;

function Base({ className, children, leftIcon, rightIcon, btnSize, ...props }: BaseProps) {
  const cxs = cx(buttonStyle({ btnSize }), className);
  return (
    <button className={cxs} {...props}>
      <Content leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Content>
    </button>
  );
}

type LinkProps = ComponentProps<typeof InertiaLink> & CommonProps & StyleProps;
function Link({
  className,
  children,
  leftIcon,
  rightIcon,
  btnSize,
  disabled,
  onClick,
  ...props
}: LinkProps) {
  const cxs = cx(buttonStyle({ btnSize }), className);

  function noop(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
  }

  return (
    <InertiaLink className={cxs} {...props} onClick={disabled ? noop : onClick} disabled={disabled}>
      <Content leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Content>
    </InertiaLink>
  );
}

export const Button = {
  Link,
  Base,
};
