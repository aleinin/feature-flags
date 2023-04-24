import {
  getParams,
  HttpMethod,
  methodNotAllowed,
  notFound,
  ok,
} from "@/lib/httpUtil";
import { UsersClient } from "@/services/usersClient";
import { NextApiRequest, NextApiResponse } from "next";

const BAD_PARAM = "Invalid user name";

/* /users/{user} */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [userName] = getParams(req, res, ["user"], BAD_PARAM);
  if (!userName) {
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
