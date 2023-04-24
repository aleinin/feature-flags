import userFeatureController from "@/lib/userFeatureController";
import { NextApiRequest, NextApiResponse } from "next";

/* /features/{feature}/users/{user} */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return userFeatureController(req, res);
}
