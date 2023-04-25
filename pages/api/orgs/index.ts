import { HttpMethod, methodNotAllowed, ok } from "@/lib/httpUtil";
import { OrgsClient } from "@/backend/services/orgsClient";
import type { NextApiRequest, NextApiResponse } from "next";

/* /orgs/ */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case HttpMethod.GET:
      const orgs = await OrgsClient.getOrgs();
      ok(res, orgs);
      break;
    default:
      methodNotAllowed(res, req.method);
  }
}
