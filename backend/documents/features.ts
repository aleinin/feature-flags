import { Feature } from "@/models/feature";
import { Schema, models, model } from "mongoose";
import { z } from "zod";

export interface FeatureDocument {
  _id: string;
  __v: number;
  name: string;
  description: string;
  onByDefault: boolean;
}

export const toFeature = (featureDocument: FeatureDocument): Feature => ({
  name: featureDocument.name,
  description: featureDocument.description,
  onByDefault: featureDocument.onByDefault,
});

export const FeatureValidator = z.object({
  name: z.string(),
  description: z.string(),
  onByDefault: z.boolean(),
});

export const FeatureNameValidator = z.string();

const featureSchema = new Schema<Feature>({
  name: {
    unique: true,
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  onByDefault: {
    type: Boolean,
    required: true,
  },
});

export default models.Feature || model("Feature", featureSchema);
