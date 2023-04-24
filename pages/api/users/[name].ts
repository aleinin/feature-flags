import {
  badRequest,
  HttpMethod,
  methodNotAllowed,
  notFound,
  ok,
} from "@/lib/httpUtil";
import { UserNameValidator } from "@/models/user";
import { UsersClient } from "@/services/usersClient";
import { NextApiRequest, NextApiResponse } from "next";

const BAD_PARAM = "Invalid user name";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let userName: string;
  try {
    userName = UserNameValidator.parse(req.query.name);
  } catch (e) {
    badRequest(res, BAD_PARAM);
    return;
  }
  switch (req.method) {
    case HttpMethod.GET:
      const user = await UsersClient.getUser(userName);
      user ? ok(res, user) : notFound(res);
      break;
    default:
      methodNotAllowed(res, req.method);
  }
}
