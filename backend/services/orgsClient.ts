import { mockOrganizations } from "@/lib/mockOrgs";
import { toOrganization } from "@/models/organization";

export const OrgsClient = {
  getOrgs: async () => {
    const externalOrgs = await Promise.resolve(mockOrganizations);
    return externalOrgs.map((externalOrg) => toOrganization(externalOrg));
  },
  getOrg: async (name: string) => {
    const externalOrg = await Promise.resolve(
      mockOrganizations.find((org) => org.name === name)
    );
    return externalOrg ? toOrganization(externalOrg) : null;
  },
};
