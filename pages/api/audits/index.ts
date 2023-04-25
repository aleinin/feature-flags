import { HttpMethod, methodNotAllowed, ok } from "@/lib/httpUtil";
import { AuditsService } from "@/backend/services/auditsService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case HttpMethod.GET:
      const audits = await AuditsService.getAudits();
      ok(res, audits);
      break;
    default:
      methodNotAllowed(res, req.method);
  }
}
