export interface Organization {
  id: string;
  name: string;
}

export interface ExternalOrganization {
  id: string;
  name: string;
}

export const toOrganization = (
  externalOrg: ExternalOrganization
): Organization => ({
  id: externalOrg.id,
  name: externalOrg.name,
});
