import { Schema, model, models } from "mongoose";
import { z } from "zod";

export interface Feature {
  name: string;
  description: string;
  onByDefault: boolean;
}

export interface FeatureDocument {
  _id: string;
  __v: number;
  name: string;
  description: string;
  onByDefault: boolean;
}

export const FeatureValidator = z.object({
  name: z.string(),
  description: z.string(),
  onByDefault: z.boolean(),
});

export const FeatureNameValidator = z.string();

export const toFeature = (featureDocument: FeatureDocument): Feature => ({
  name: featureDocument.name,
  description: featureDocument.description,
  onByDefault: featureDocument.onByDefault,
});

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
