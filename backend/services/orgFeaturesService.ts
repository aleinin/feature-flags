import dbConnect from "@/lib/dbConnect";
import { OrgFeature } from "@/models/orgFeature";
import OrgFeatureModel, { toOrgFeature } from "../documents/orgFeatures";
import { AuditsService } from "./auditsService";

const getOrgFeatures = async (
  field: "organization" | "feature",
  value: string
): Promise<OrgFeature[]> => {
  await dbConnect();
  const orgFeatureDocuments = await OrgFeatureModel.find({ [field]: value });
  return orgFeatureDocuments.map((orgFeatureDocument) =>
    toOrgFeature(orgFeatureDocument)
  );
};

export const OrgFeaturesService = {
  getOrgFeaturesForOrganization: async (
    organization: string
  ): Promise<OrgFeature[]> => {
    return getOrgFeatures("organization", organization);
  },
  getOrgFeature: async (
    organization: string,
    feature: string
  ): Promise<OrgFeature | null> => {
    await dbConnect();
    const orgFeatureDocument = await OrgFeatureModel.findOne({
      organization,
      feature,
    });
    return orgFeatureDocument ? toOrgFeature(orgFeatureDocument) : null;
  },
  getOrgFeaturesForFeature: async (feature: string): Promise<OrgFeature[]> => {
    return getOrgFeatures("feature", feature);
  },
  createOrgFeature: async (newOrgFeature: OrgFeature): Promise<OrgFeature> => {
    await dbConnect();
    const orgFeatureDocument = await OrgFeatureModel.create(newOrgFeature);
    const orgFeature = toOrgFeature(orgFeatureDocument);
    await AuditsService.logOrgFeatureCreate(orgFeature);
    return orgFeature;
  },
  updateOrgFeature: async (
    organization: string,
    feature: string,
    orgFeature: OrgFeature
  ): Promise<OrgFeature | null> => {
    await dbConnect();
    const originalOrgFeatureDocument = await OrgFeatureModel.findOneAndReplace(
      { organization, feature },
      orgFeature,
      {
        returnDocument: "before",
      }
    );
    const updatedOrgFeatureDocument = await OrgFeatureModel.findOne({
      organization,
      feature,
    });
    if (originalOrgFeatureDocument) {
      const originalOrgFeature = toOrgFeature(originalOrgFeatureDocument);
      const updatedOrgFeature = toOrgFeature(updatedOrgFeatureDocument);
      AuditsService.logOrgFeatureUpdate(originalOrgFeature, updatedOrgFeature);
      return updatedOrgFeature;
    } else {
      return null;
    }
  },
  deleteOrgFeature: async (
    organization: string,
    feature: string
  ): Promise<OrgFeature | null> => {
    await dbConnect();
    const orgFeatureDocument = await OrgFeatureModel.findOneAndDelete({
      organization,
      feature,
    });
    if (orgFeatureDocument) {
      const orgFeature = toOrgFeature(orgFeatureDocument);
      await AuditsService.logOrgFeatureDelete(orgFeature);
      return orgFeature;
    } else {
      return null;
    }
  },
};
