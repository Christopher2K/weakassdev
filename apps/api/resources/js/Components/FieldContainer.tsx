import { styled } from '@style/jsx';

export const FieldContainer = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '1',
    width: '100%',
  },
  variants: {
    alignment: {
      left: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      right: {
        alignItems: 'flex-end',
      },
    },
  },
  defaultVariants: {
    alignment: 'left',
  },
});
