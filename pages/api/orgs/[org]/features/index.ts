import {
  badRequest,
  getParams,
  HttpMethod,
  methodNotAllowed,
  ok,
} from "@/lib/httpUtil";
import { OrgFeature } from "@/models/orgFeature";
import { OrgFeaturesService } from "@/backend/services/orgFeaturesService";
import { NextApiRequest, NextApiResponse } from "next";
import { OrgFeatureValidator } from "@/backend/documents/orgFeatures";

const BAD_PARAM = "Invalid organization name";
const ORG_FEATURE_MISMATCH = "Organization name in param does not match body";

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
      const orgFeatures =
        await OrgFeaturesService.getOrgFeaturesForOrganization(orgName);
      ok(res, orgFeatures);
      break;
    case HttpMethod.POST:
      try {
        const newOrgFeatureBody: OrgFeature = OrgFeatureValidator.parse(
          req.body
        );
        if (newOrgFeatureBody.organization !== orgName) {
          badRequest(res, ORG_FEATURE_MISMATCH);
        } else {
          const newOrgFeature = await OrgFeaturesService.createOrgFeature(
            newOrgFeatureBody
          );
          ok(res, newOrgFeature);
        }
      } catch (e) {
        badRequest(res);
      }
      break;
    default:
      methodNotAllowed(res, req.method);
  }
}
