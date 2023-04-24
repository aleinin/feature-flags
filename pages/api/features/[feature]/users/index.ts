import {
  badRequest,
  getParams,
  HttpMethod,
  methodNotAllowed,
  ok,
} from "@/lib/httpUtil";
import { UserFeature, UserFeatureValidator } from "@/models/userFeature";
import { UserFeaturesService } from "@/services/userFeaturesService";
import type { NextApiRequest, NextApiResponse } from "next";

const BAD_PARAM = "Invalid feature name";
const USER_FEATURE_MISMATCH = "Feature name in param does not match body";

/* /features/{feature}/users */
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
      const userFeatures = await UserFeaturesService.getUserFeaturesForFeature(
        featureName
      );
      ok(res, userFeatures);
      break;
    case HttpMethod.POST:
      try {
        const newUserFeatureBody: UserFeature = UserFeatureValidator.parse(
          req.body
        );
        if (newUserFeatureBody.feature !== featureName) {
          badRequest(res, USER_FEATURE_MISMATCH);
        } else {
          const newUserFeature = await UserFeaturesService.createUserFeature(
            newUserFeatureBody
          );
          ok(res, newUserFeature);
        }
      } catch (e) {
        badRequest(res);
      }
      break;
    default:
      methodNotAllowed(res, req.method);
  }
}
