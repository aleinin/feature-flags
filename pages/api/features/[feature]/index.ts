import {
  badRequest,
  getParams,
  HttpMethod,
  methodNotAllowed,
  noContent,
  notFound,
  ok,
} from "@/lib/httpUtil";
import {
  Feature,
  FeatureNameValidator,
  FeatureValidator,
} from "@/models/feature";
import { FeaturesService } from "@/services/featuresService";
import type { NextApiRequest, NextApiResponse } from "next";

const FEATURE_NAME_MISMATCH =
  "Feature name in param does not match body feature name";

const BAD_PARAM = "Invalid feature name";

/* /features/{feature} */
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
      const feature = await FeaturesService.getFeature(featureName);
      feature ? ok(res, feature) : notFound(res);
      break;
    case HttpMethod.PUT:
      const updatedFeatureRequest: Feature = FeatureValidator.parse({
        name: req.body.name,
        description: req.body.description,
        onByDefault: req.body.onByDefault,
      });
      if (featureName !== updatedFeatureRequest.name) {
        badRequest(res, FEATURE_NAME_MISMATCH);
      }
      const updatedFeature = await FeaturesService.updateFeature(
        featureName,
        updatedFeatureRequest
      );
      updatedFeature ? ok(res, updatedFeature) : notFound(res);
      break;
    case HttpMethod.DEL:
      const deletedFeature = await FeaturesService.deleteFeature(featureName);
      deletedFeature ? noContent(res) : notFound(res);
      break;
    default:
      methodNotAllowed(res, req.method);
  }
}
