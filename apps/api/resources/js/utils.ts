import { DateTime } from 'luxon';

import type { UserStatus, UserRole } from '@weakassdev/shared/models';

export function addPlusPrefix(text: string | number) {
  return '+' + text;
}

export function formatDate(dateISO: string): string {
  return DateTime.fromISO(dateISO).toLocaleString(DateTime.DATETIME_MED);
}

export const userStatusDefinition: Record<UserStatus, string> = {
  ACTIVE: 'Actif',
  BANNED: 'Banni',
  DELETED: 'Compte supprimé',
};

export const userRoleDefinition: Record<UserRole, string> = {
  ADMIN: 'Administrateur',
  USER: 'Utilisateur',
};
