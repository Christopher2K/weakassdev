import { cva, type RecipeVariantProps } from '@style/css';

export const typographyStyle = cva({
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

export type AvailableTags = RecipeVariantProps<typeof typographyStyle>['tag'];
