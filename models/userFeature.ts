import { model, models, Schema } from "mongoose";
import { z } from "zod";

export interface UserFeature {
  user: string;
  feature: string;
  enabled: boolean;
}

export interface UserFeatureDocument {
  _id: string;
  __v: number;
  user: string;
  feature: string;
  enabled: boolean;
}

export const toUserFeature = (
  userDocument: UserFeatureDocument
): UserFeature => ({
  user: userDocument.user,
  feature: userDocument.feature,
  enabled: userDocument.enabled,
});

export const UserFeatureValidator = z.object({
  user: z.string(),
  feature: z.string(),
  enabled: z.boolean(),
});

const userFeatureSchema = new Schema<UserFeature>({
  user: {
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
// user & feature form a composite key
userFeatureSchema.index({ user: 1, feature: 1 }, { unique: true });

export default models.UserFeature || model("UserFeature", userFeatureSchema);
