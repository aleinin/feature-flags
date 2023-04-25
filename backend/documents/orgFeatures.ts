import { OrgFeature } from "@/models/orgFeature";
import { Schema, models, model } from "mongoose";
import { z } from "zod";

export interface OrgFeatureDocument {
  _id: string;
  __v: number;
  organization: string;
  feature: string;
  enabled: boolean;
}

export const toOrgFeature = (
  orgFeatureDocument: OrgFeatureDocument
): OrgFeature => ({
  organization: orgFeatureDocument.organization,
  feature: orgFeatureDocument.feature,
  enabled: orgFeatureDocument.enabled,
});

export const OrgFeatureValidator = z.object({
  organization: z.string(),
  feature: z.string(),
  enabled: z.boolean(),
});

const orgFeatureSchema = new Schema<OrgFeature>({
  organization: {
    type: String,
    required: true,
  },
  feature: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    required: true,
  },
});
// organization & feature form a composite key
orgFeatureSchema.index({ organization: 1, feature: 1 }, { unique: true });

export default models.OrgFeature || model("OrgFeature", orgFeatureSchema);
