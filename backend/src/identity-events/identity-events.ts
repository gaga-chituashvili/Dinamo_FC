export const IDENTITY_USER_REGISTERED_EVENT = 'identity.user.registered';
export const IDENTITY_USER_LOGGED_IN_EVENT = 'identity.user.logged_in';

export interface IdentityUserRegisteredEvent {
  userId: string;
  email: string;
  name: string | null;
  tenantSlug: string;
  requestedRole: string | null;
  occurredAt: string;
}

export interface IdentityUserLoggedInEvent {
  userId: string;
  email: string;
  name: string | null;
  tenantSlug: string;
  occurredAt: string;
}
