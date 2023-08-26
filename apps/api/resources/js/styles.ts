import { cva } from '@style/css';

export const buttonStyle = cva({
  base: {
    fontSize: 'm',
    fontWeight: 'medium',
    backgroundColor: 'gray.400',
    color: 'gray.900',
    borderRadius: 'md',
    px: '4',
    py: '2',
    cursor: 'pointer',
    _hover: {
      backgroundColor: 'gray.300',
    },
    _active: {
      transform: 'scale(0.9)',
    },
    _disabled: {
      cursor: 'not-allowed',
    },
  },
});
