export const TENANT_SITE_LOGGED_IN_EVENT = 'tenant.site.logged_in';

export interface TenantSiteLoggedInEvent {
  userId: string;
  email: string;
  name: string | null;
  tenantSlug: string;
  siteSlug: string;
  occurredAt: string;
}
