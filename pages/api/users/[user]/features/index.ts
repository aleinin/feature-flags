import {
  badRequest,
  getParams,
  HttpMethod,
  methodNotAllowed,
  ok,
} from "@/lib/httpUtil";
import { UserFeature, UserFeatureValidator } from "@/models/userFeature";
import { UserFeaturesService } from "@/services/userFeaturesService";
import { NextApiRequest, NextApiResponse } from "next";

const BAD_PARAM = "Invalid user name";
const USER_FEATURE_MISMATCH = "User name in param does not match body";

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
      const userFeatures = await UserFeaturesService.getUserFeaturesForUser(
        userName
      );
      ok(res, userFeatures);
      break;
    case HttpMethod.POST:
      try {
        const newUserFeatureBody: UserFeature = UserFeatureValidator.parse(
          req.body
        );
        if (newUserFeatureBody.user !== userName) {
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
