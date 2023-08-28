import React, { PropsWithChildren } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Home, LogOut, Users, Newspaper, StopCircle } from 'lucide-react';

import { css, cva } from '@style/css';
import { vstack } from '@style/patterns';

const ICON_SIZE = 20;
const navbarItemStyle = cva({
  base: {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '3',
    px: '6',
    py: '3',
    width: 'full',
    textStyle: 'body',
    _hover: {
      backgroundColor: 'gray.200',
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: 'gray.200',
      },
    },
  },
});

type NavItemProps = {
  label: string;
  href: string;
  url: string;
  exact?: boolean;
  icon: JSX.Element;
};
function NavItem({ href, label, url, icon, exact = false }: NavItemProps) {
  const active = exact ? href === url : url.startsWith(href);
  return (
    <Link href={href} className={navbarItemStyle({ active })}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

type NavSectionProps = PropsWithChildren<{
  title?: string;
}>;
function NavSection({ children, title }: NavSectionProps) {
  return (
    <div
      className={vstack({
        w: 'full',
      })}
    >
      {title && <p className={css({ width: 'full', textStyle: 'caption', px: '4' })}>{title}</p>}
      <div
        className={vstack({
          w: 'full',
          gap: '0',
        })}
      >
        {children}
      </div>
    </div>
  );
}

export function Navbar() {
  const { url } = usePage();

  return (
    <nav
      className={css({
        width: '440px',
        height: 'full',
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
          backgroundColor: 'gray.50',
          borderRightWidth: 'thin',
          borderColor: 'gray.100',
          overflowY: 'auto',
        })}
      >
        <div className={vstack({ w: 'full' })}>
          <NavSection>
            <NavItem
              exact
              href="/admin/dashboard"
              label="Dashboard"
              url={url}
              icon={<Home size={ICON_SIZE} />}
            />
          </NavSection>

          <NavSection title="Entités">
            <NavItem
              href="/admin/users"
              label="Utilisateurs"
              url={url}
              icon={<Users size={ICON_SIZE} />}
            />
            <NavItem
              href="/admin/posts"
              label="Posts"
              url={url}
              icon={<Newspaper size={ICON_SIZE} />}
            />

            <NavItem
              href="/admin/reports"
              label="Modération"
              url={url}
              icon={<StopCircle size={ICON_SIZE} />}
            />
          </NavSection>
        </div>

        <div className={css({ w: 'full' })}>
          <NavSection>
            <NavItem
              href="/admin/logout"
              label="Déconnexion"
              url={url}
              icon={<LogOut size={ICON_SIZE} />}
            />
          </NavSection>
        </div>
      </div>
    </nav>
  );
}
