import { HttpMethod, methodNotAllowed, ok } from "@/lib/httpUtil";
import { UsersClient } from "@/services/usersClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case HttpMethod.GET:
      const users = await UsersClient.getUsers();
      ok(res, users);
      break;
    default:
      methodNotAllowed(res, req.method);
  }
}
