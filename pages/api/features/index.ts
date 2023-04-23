import { Feature, FeatureValidator } from "@/models/feature";
import { FeaturesService } from "@/server/featuresService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    FeaturesService.getFeatures().then((features) => {
      res.status(200).json(features);
    });
  } else if (req.method === "POST") {
    try {
      const feature: Feature = FeatureValidator.parse({
        name: req.body.name,
        description: req.body.description,
        onByDefault: req.body.onByDefault,
      });
      const dbFeature = await FeaturesService.createFeature(feature);
      res.status(200).json(dbFeature);
    } catch (e) {
      res.status(400).json(e);
    }
  } else {
    res.status(405).send({ message: "Method not allowed" });
  }
}
