export enum Roles {
  ADMIN = 'admin',
  USER = 'user'
}

export function getAllRoles() {
  return Object.values(Roles)
}

export function getAdminRoles() {
  return [ Roles.ADMIN ]
}