import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Home, LogIn, LogOut } from 'lucide-react';

import { css, cva } from '@style/css';
import { vstack } from '@style/patterns';

const ICON_SIZE = 20;
const navbarItemStyle = cva({
  base: {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: '2',
    alignItems: 'center',
    fontSize: 'sm',
    px: '4',
    py: '2',
    borderRadius: 'md',
    width: 'full',
    _hover: {
      backgroundColor: 'gray.400',
    },
    _active: {
      transform: 'scale(0.9)',
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: 'gray.400',
      },
    },
  },
});

const sectionStyle = vstack({
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
});

type NavItemProps = {
  label: string;
  href: string;
  url: string;
  icon: JSX.Element;
};

function NavItem({ href, label, url, icon }: NavItemProps) {
  const active = href === url;
  return (
    <Link href={href} className={navbarItemStyle({ active })}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export function Navbar() {
  const { url } = usePage();

  return (
    <nav
      className={css({
        width: '240px',
        height: 'full',
        padding: '2',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 'width',
          height: 'full',
          padding: '2',
          backgroundColor: 'gray.100',
          borderRadius: 'md',
          overflowY: 'auto',
        })}
      >
        <div className={sectionStyle}>
          <NavItem
            href="/admin/dashboard"
            label="Dashboard"
            url={url}
            icon={<Home size={ICON_SIZE} />}
          />
        </div>

        <div className={sectionStyle}>
          <NavItem href="/admin" label="Connexion" url={url} icon={<LogIn size={ICON_SIZE} />} />
          <NavItem
            href="/admin/logout"
            label="Déconnexion"
            url={url}
            icon={<LogOut size={ICON_SIZE} />}
          />
        </div>
      </div>
    </nav>
  );
}
