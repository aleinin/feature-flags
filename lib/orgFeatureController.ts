import {
  badRequest,
  getParams,
  HttpMethod,
  methodNotAllowed,
  noContent,
  notFound,
  ok,
} from "@/lib/httpUtil";
import { OrgFeaturesService } from "@/backend/services/orgFeaturesService";
import type { NextApiRequest, NextApiResponse } from "next";
import { OrgFeature } from "@/models/orgFeature";
import { OrgFeatureValidator } from "@/backend/documents/orgFeatures";

const BAD_PARAM = "Invalid feature and/or org name";
const ORG_FEATURE_MISMATCH =
  "Feature and/or org name in param does not match body";

export default async function orgFeatureController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [featureName, orgName] = getParams(
    req,
    res,
    ["feature", "org"],
    BAD_PARAM
  );
  if (!featureName || !orgName) {
    return;
  }
  switch (req.method) {
    case HttpMethod.GET:
      const orgFeature = await OrgFeaturesService.getOrgFeature(
        orgName,
        featureName
      );
      orgFeature ? ok(res, orgFeature) : notFound(res);
      break;
    case HttpMethod.PUT:
      const updateOrgFeatureRequest: OrgFeature = OrgFeatureValidator.parse(
        req.body
      );
      if (
        updateOrgFeatureRequest.feature !== featureName ||
        updateOrgFeatureRequest.organization !== orgName
      ) {
        badRequest(res, ORG_FEATURE_MISMATCH);
      }
      const updatedOrgFeature = await OrgFeaturesService.updateOrgFeature(
        orgName,
        featureName,
        updateOrgFeatureRequest
      );
      updatedOrgFeature ? ok(res, updatedOrgFeature) : notFound(res);
      break;
    case HttpMethod.DEL:
      const deletedOrgFeature = await OrgFeaturesService.deleteOrgFeature(
        orgName,
        featureName
      );
      deletedOrgFeature ? noContent(res) : notFound(res);
      break;
    default:
      methodNotAllowed(res, req.method);
  }
}
