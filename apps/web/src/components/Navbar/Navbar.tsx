import { A } from 'solid-start';
import { cva } from '@style/css';
import { vstack } from '@style/patterns';

const navbarItemStyle = cva({
  variants: {
    kind: {
      active: {
        width: '100%',
        backgroundColor: 'red.900',
      },
      inactive: {},
    },
  },
});

export const Navbar = () => {
  return (
    <nav
      class={vstack({
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRight: 'grey',
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
      })}
    >
      <A
        href="/"
        inactiveClass={navbarItemStyle({ kind: 'inactive' })}
        activeClass={navbarItemStyle({ kind: 'active' })}
        end
      >
        Accueil
      </A>
      <A
        href="/top"
        inactiveClass={navbarItemStyle({ kind: 'inactive' })}
        activeClass={navbarItemStyle({ kind: 'active' })}
      >
        Top 100 hebdo
      </A>
      <A
        href="/emploi"
        inactiveClass={navbarItemStyle({ kind: 'inactive' })}
        activeClass={navbarItemStyle({ kind: 'active' })}
      >
        Emploi
      </A>
      <A
        href="/profil"
        inactiveClass={navbarItemStyle({ kind: 'inactive' })}
        activeClass={navbarItemStyle({ kind: 'active' })}
      >
        Mon profil
      </A>
    </nav>
  );
};
