import dbConnect from "@/lib/dbConnect";
import { Feature } from "@/models/feature";
import FeatureModel, { toFeature } from "../documents/features";
import { AuditsService } from "./auditsService";

export const FeaturesService = {
  getFeatures: async (): Promise<Feature[]> => {
    await dbConnect();
    const featureDocuments = await FeatureModel.find({});
    return featureDocuments.map((featureDocument) =>
      toFeature(featureDocument)
    );
  },
  getFeature: async (name: string): Promise<Feature | null> => {
    await dbConnect();
    const featureDocument = await FeatureModel.findOne({ name });
    return featureDocument ? toFeature(featureDocument) : null;
  },
  createFeature: async (feature: Feature): Promise<Feature> => {
    await dbConnect();
    const featureDocument = await FeatureModel.create(feature);
    const createdFeature = toFeature(featureDocument);
    await AuditsService.logFeatureCreate(createdFeature);
    return createdFeature;
  },
  updateFeature: async (
    name: string,
    feature: Feature
  ): Promise<Feature | null> => {
    await dbConnect();
    const originalDocument = await FeatureModel.findOneAndReplace(
      { name },
      feature,
      { returnDocument: "before" }
    );
    const updatedDocument = await FeatureModel.findOne({ name });
    if (originalDocument) {
      const originalFeature = toFeature(originalDocument);
      const updatedFeature = toFeature(updatedDocument);
      AuditsService.logFeatureUpdate(originalFeature, updatedFeature);
      return updatedFeature;
    } else {
      return null;
    }
  },
  deleteFeature: async (name: string): Promise<Feature | null> => {
    await dbConnect();
    const deletedFeatureDocument = await FeatureModel.findOneAndDelete({
      name,
    });
    if (deletedFeatureDocument) {
      const deletedFeature = toFeature(deletedFeatureDocument);
      AuditsService.logFeatureDelete(deletedFeature);
      return deletedFeature;
    } else {
      return null;
    }
  },
};
