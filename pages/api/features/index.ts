import { badRequest, HttpMethod, methodNotAllowed, ok } from "@/lib/httpUtil";
import { Feature } from "@/models/feature";
import { FeaturesService } from "@/backend/services/featuresService";
import type { NextApiRequest, NextApiResponse } from "next";
import { FeatureValidator } from "@/backend/documents/features";

/* /features */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case HttpMethod.GET:
      const features = await FeaturesService.getFeatures();
      ok(res, features);
      break;
    case HttpMethod.POST:
      try {
        const newFeatureBody: Feature = FeatureValidator.parse(req.body);
        const newFeature = await FeaturesService.createFeature(newFeatureBody);
        ok(res, newFeature);
      } catch (e) {
        badRequest(res);
      }
      break;
    default:
      methodNotAllowed(res, req.method);
  }
}
