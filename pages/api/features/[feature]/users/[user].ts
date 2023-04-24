import {
  badRequest,
  getParams,
  HttpMethod,
  methodNotAllowed,
  noContent,
  notFound,
  ok,
} from "@/lib/httpUtil";
import { UserFeature, UserFeatureValidator } from "@/models/userFeature";
import { UserFeaturesService } from "@/services/userFeaturesService";
import type { NextApiRequest, NextApiResponse } from "next";

const BAD_PARAM = "Invalid feature and/or user name";
const USER_FEATURE_MISMATCH =
  "Feature and/or user name in param does not match body";

/* /features/{feature}/users/{user} */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [featureName, userName] = getParams(
    req,
    res,
    ["feature", "user"],
    BAD_PARAM
  );
  if (!featureName || !userName) {
    return;
  }
  switch (req.method) {
    case HttpMethod.GET:
      const userFeature = await UserFeaturesService.getUserFeature(
        userName,
        featureName
      );
      userFeature ? ok(res, userFeature) : notFound(res);
      break;
    case HttpMethod.PUT:
      const updateUserFeatureRequest: UserFeature = UserFeatureValidator.parse(
        req.body
      );
      if (
        updateUserFeatureRequest.feature !== featureName ||
        updateUserFeatureRequest.user !== userName
      ) {
        badRequest(res, USER_FEATURE_MISMATCH);
      }
      const updatedUserFeature = await UserFeaturesService.updateUserFeature(
        userName,
        featureName,
        updateUserFeatureRequest
      );
      updateUserFeatureRequest ? ok(res, updatedUserFeature) : notFound(res);
      break;
    case HttpMethod.DEL:
      const deletedUserFeature = await UserFeaturesService.deleteUserFeature(
        userName,
        featureName
      );
      deletedUserFeature ? noContent(res) : notFound(res);
      break;
    default:
      methodNotAllowed(res, req.method);
  }
}
