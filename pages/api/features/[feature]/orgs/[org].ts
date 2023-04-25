import orgFeatureController from "@/lib/orgFeatureController";
import { NextApiRequest, NextApiResponse } from "next";

/* /features/{feature}/orgs/{org} */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return orgFeatureController(req, res);
}
