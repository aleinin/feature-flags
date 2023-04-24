import { z } from "zod";

export interface User {
  id: string;
  name: string;
}

export interface ExternalUser {
  id: string;
  name: string;
}

export const UserNameValidator = z.string();

export const toUser = (externalUser: ExternalUser): User => ({
  id: externalUser.id,
  name: externalUser.name,
});
