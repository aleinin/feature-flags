import dbConnect from "@/lib/dbConnect";
import UserFeatureModel, {
  toUserFeature,
  UserFeature,
} from "@/models/userFeature";
import { AuditsService } from "./auditsService";

// const getUserFeatures = async (filter: string): Promise<UserFeature[]> => {

// }
// const updateUserFeature = async (userFeature: UserFeature):  Promise<UserFeature | null> => {

// }
/*
GET MANY: 2 service, 2 endpoints
GET ONE: 1 service, 2 endpoints

*/

// const getUserFeature = async (feature: string): Promise<UserFeature> => {

// }

export const UserFeaturesService = {
  //   getUserFeaturesForUser: async (user: string): Promise<UserFeature[]> => {
  //     await dbConnect();
  //     const userFeatureDocuments = await UserFeatureModel.find({ user });
  //     return userFeatureDocuments.map((userFeatureDocument) =>
  //       toUserFeature(userFeatureDocument)
  //     );
  //   },
  getUserFeature: async (
    user: string,
    feature: string
  ): Promise<UserFeature | null> => {
    await dbConnect();
    const userFeatureDocument = await UserFeatureModel.findOne({
      user,
      feature,
    });
    return userFeatureDocument ? toUserFeature(userFeatureDocument) : null;
  },
  getUserFeaturesForFeature: async (
    feature: string
  ): Promise<UserFeature[]> => {
    await dbConnect();
    const userFeatureDocuments = await UserFeatureModel.find({ feature });
    return userFeatureDocuments.map((userFeatureDocument) =>
      toUserFeature(userFeatureDocument)
    );
  },
  createUserFeature: async (
    newUserFeature: UserFeature
  ): Promise<UserFeature> => {
    await dbConnect();
    const userFeatureDocument = await UserFeatureModel.create(newUserFeature);
    const userFeature = toUserFeature(userFeatureDocument);
    await AuditsService.logUserFeatureCreate(userFeature);
    return userFeature;
  },
  updateUserFeature: async (
    user: string,
    feature: string,
    userFeature: UserFeature
  ): Promise<UserFeature | null> => {
    await dbConnect();
    const originalUserFeatureDocument =
      await UserFeatureModel.findOneAndReplace({ user, feature }, userFeature, {
        returnDocument: "before",
      });
    const updatedUserFeatureDocument = await UserFeatureModel.findOne({
      user,
      feature,
    });
    if (originalUserFeatureDocument) {
      const originalUserFeature = toUserFeature(originalUserFeatureDocument);
      const updatedUserFeature = toUserFeature(updatedUserFeatureDocument);
      AuditsService.logUserFeatureUpdate(
        originalUserFeature,
        updatedUserFeature
      );
      return updatedUserFeature;
    } else {
      return null;
    }
  },
  deleteUserFeature: async (
    user: string,
    feature: string
  ): Promise<UserFeature | null> => {
    await dbConnect();
    const userFeatureDocument = await UserFeatureModel.findOneAndDelete({
      user,
      feature,
    });
    if (userFeatureDocument) {
      const userFeature = toUserFeature(userFeatureDocument);
      await AuditsService.logUserFeatureDelete(userFeature);
      return userFeature;
    } else {
      return null;
    }
  },
};
