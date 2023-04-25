import {
  badRequest,
  getParams,
  HttpMethod,
  methodNotAllowed,
  ok,
} from "@/lib/httpUtil";
import { OrgFeature } from "@/models/orgFeature";
import { OrgFeaturesService } from "@/backend/services/orgFeaturesService";
import type { NextApiRequest, NextApiResponse } from "next";
import { OrgFeatureValidator } from "@/backend/documents/orgFeatures";

const BAD_PARAM = "Invalid feature name";
const ORG_FEATURE_MISMATCH = "Feature name in param does not match body";

/* /features/{feature}/orgs */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [featureName] = getParams(req, res, ["feature"], BAD_PARAM);
  if (!featureName) {
    return;
  }
  switch (req.method) {
    case HttpMethod.GET:
      const orgFeatures = await OrgFeaturesService.getOrgFeaturesForFeature(
        featureName
      );
      ok(res, orgFeatures);
      break;
    case HttpMethod.POST:
      try {
        const newOrgFeatureBody: OrgFeature = OrgFeatureValidator.parse(
          req.body
        );
        if (newOrgFeatureBody.feature !== featureName) {
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
