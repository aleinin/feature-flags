import { badRequest, HttpMethod, methodNotAllowed, ok } from "@/lib/httpUtil";
import { Feature, FeatureValidator } from "@/models/feature";
import { FeaturesService } from "@/server/featuresService";
import type { NextApiRequest, NextApiResponse } from "next";

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
        const newFeatureBody: Feature = FeatureValidator.parse({
          name: req.body.name,
          description: req.body.description,
          onByDefault: req.body.onByDefault,
        });
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
