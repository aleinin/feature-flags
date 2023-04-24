import { mockOrganizations } from "@/lib/mockUsers";
import { toUser } from "@/models/user";

export const UsersClient = {
  getUsers: async () => {
    const externalUsers = await Promise.resolve(mockOrganizations);
    return externalUsers.map((externalUser) => toUser(externalUser));
  },
  getUser: async (name: string) => {
    const externalUser = await Promise.resolve(
      mockOrganizations.find((org) => org.name === name)
    );
    return externalUser ? toUser(externalUser) : null;
  },
};
