import dbConnect from "@/lib/dbConnect";
import FeatureModel, { Feature, FeatureValidator } from "@/models/feature";

export const FeaturesService = {
  getFeatures: async (): Promise<Feature[]> => {
    await dbConnect();
    const features = await FeatureModel.find({});
    return features.map((feature) => FeatureValidator.parse(feature));
  },
  getFeature: async (name: string): Promise<Feature | null> => {
    await dbConnect();
    const feature = await FeatureModel.findOne({ name });
    return feature ? FeatureValidator.parse(feature) : null;
  },
  createFeature: async (feature: Feature): Promise<Feature> => {
    await dbConnect();
    const createdFeature = await FeatureModel.create(feature);
    return FeatureValidator.parse(createdFeature);
  },
  updateFeature: async (
    name: string,
    feature: Feature
  ): Promise<Feature | null> => {
    await dbConnect();
    const updatedFeature = await FeatureModel.findOneAndReplace(
      { name },
      feature
    );
    return updatedFeature ? FeatureValidator.parse(feature) : null;
  },
  deleteFeature: async (name: string) => {
    await dbConnect();
    return FeatureModel.deleteOne({ name });
  },
};
