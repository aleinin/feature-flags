import dbConnect from "@/lib/dbConnect";
import AuditModel, { Audit, AuditEvent, toAudit } from "@/models/audit";
import { Feature } from "@/models/feature";
import { UserFeature } from "@/models/userFeature";

interface NewAudit {
  oldValue: Feature | UserFeature | null;
  newValue: Feature | UserFeature | null;
  info: string | null;
  event: AuditEvent;
}

const createAudit = async (newAudit: NewAudit) => {
  const auditDocument = await AuditModel.create(newAudit);
  return toAudit(auditDocument);
};

export const AuditsService = {
  getAudits: async (): Promise<Audit[]> => {
    await dbConnect();
    const auditDocuments = await AuditModel.find({});
    return auditDocuments.map((auditDocument) => toAudit(auditDocument));
  },
  logFeatureCreate: async (feature: Feature, info?: string): Promise<Audit> => {
    await dbConnect();
    const newAudit: NewAudit = {
      oldValue: null,
      newValue: feature,
      info: info ?? null,
      event: AuditEvent.FEATURE_CREATED,
    };
    return createAudit(newAudit);
  },
  logFeatureUpdate: async (
    originalFeature: Feature,
    updatedFeature: Feature,
    info?: string
  ): Promise<Audit> => {
    await dbConnect();
    const newAudit: NewAudit = {
      oldValue: originalFeature,
      newValue: updatedFeature,
      info: info ?? null,
      event: AuditEvent.FEATURE_UPDATED,
    };
    return createAudit(newAudit);
  },
  logFeatureDelete: async (
    deletedFeature: Feature,
    info?: string
  ): Promise<Audit> => {
    await dbConnect();
    const newAudit: NewAudit = {
      oldValue: deletedFeature,
      newValue: null,
      info: info ?? null,
      event: AuditEvent.FEATURE_DELETED,
    };
    return createAudit(newAudit);
  },
  logUserFeatureCreate: async (
    userFeature: UserFeature,
    info?: string
  ): Promise<Audit> => {
    await dbConnect();
    const newAudit: NewAudit = {
      oldValue: null,
      newValue: userFeature,
      info: info ?? null,
      event: AuditEvent.USER_FEATURE_CREATED,
    };
    return createAudit(newAudit);
  },
  logUserFeatureDelete: async (userFeature: UserFeature, info?: string) => {
    await dbConnect();
    const newAudit: NewAudit = {
      oldValue: userFeature,
      newValue: null,
      info: info ?? null,
      event: AuditEvent.USER_FEATURE_DELETED,
    };
    return createAudit(newAudit);
  },
  logUserFeatureUpdate: async (
    originalUserFeature: UserFeature,
    updatedUserFeature: UserFeature,
    info?: string
  ) => {
    await dbConnect();
    const newAudit: NewAudit = {
      oldValue: originalUserFeature,
      newValue: updatedUserFeature,
      info: info ?? null,
      event: AuditEvent.USER_FEATURE_UPDATED,
    };
    return createAudit(newAudit);
  },
};
