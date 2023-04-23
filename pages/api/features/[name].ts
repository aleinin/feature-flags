import {
  Feature,
  FeatureNameValidator,
  FeatureValidator,
} from "@/models/feature";
import { FeaturesService } from "@/server/featuresService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let featureName: string;
  try {
    featureName = FeatureNameValidator.parse(req.query.name);
  } catch (e) {
    res.status(400).send({ error: "Invalid feature name" });
    return;
  }
  switch (req.method) {
    case "GET":
      const feature = await FeaturesService.getFeature(featureName);
      feature ? res.status(200).json(feature) : res.status(404).end();
      break;
    case "PUT":
      const updatedFeatureRequest: Feature = FeatureValidator.parse({
        name: req.body.name,
        description: req.body.description,
        onByDefault: req.body.onByDefault,
      });
      if (featureName !== updatedFeatureRequest.name) {
        res
          .status(400)
          .send({
            error: "Feature name in param does not match body feature name",
          });
      }
      const updatedFeature = await FeaturesService.updateFeature(
        featureName,
        updatedFeatureRequest
      );
      updatedFeature
        ? res.status(200).json(updatedFeature)
        : res.status(404).end();
      break;
    case "DELETE":
      const mongoResponse = await FeaturesService.deleteFeature(featureName);
      mongoResponse.deletedCount > 0 ? res.status(204) : res.status(404);
      res.end();
      break;
    default:
      res.status(405).send({ message: `Method '${req.method}' not allowed` });
  }
}
