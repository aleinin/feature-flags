import dbConnect from "@/lib/dbConnect";
import AuditModel, { Audit, AuditEvent, toAudit } from "@/models/audit";
import { Feature } from "@/models/feature";

interface NewAudit {
  oldValue: Feature | null;
  newValue: Feature | null;
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
};
