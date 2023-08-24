import React, { HTMLProps } from 'react';

type InputProps = HTMLProps<'input'> & {};

export function Input({ props }: InputProps) {
  return <input {...props} />;
}
