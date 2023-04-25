import {
  getParams,
  HttpMethod,
  methodNotAllowed,
  notFound,
  ok,
} from "@/lib/httpUtil";
import { OrgsClient } from "@/backend/services/orgsClient";
import { NextApiRequest, NextApiResponse } from "next";

const BAD_PARAM = "Invalid organization name";

/* /orgs/{org} */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [orgName] = getParams(req, res, ["org"], BAD_PARAM);
  if (!orgName) {
    return;
  }
  switch (req.method) {
    case HttpMethod.GET:
      const organization = await OrgsClient.getOrg(orgName);
      organization ? ok(res, organization) : notFound(res);
      break;
    default:
      methodNotAllowed(res, req.method);
  }
}
