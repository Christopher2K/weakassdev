import { styled } from '@style/jsx';

export const Button = styled('button', {
  base: {
    fontSize: 'm',
    fontWeight: 'medium',
    backgroundColor: 'sky.400',
    color: 'sky.900',
    borderRadius: 'md',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'sky.900',
    px: '4',
    py: '2',
    cursor: 'pointer',
    _hover: {
      backgroundColor: 'sky.200',
    },
    _active: {
      transform: 'scale(0.9)',
      backgroundColor: 'sky.500',
    },
    _disabled: {
      cursor: 'not-allowed',
    },
  },
});
