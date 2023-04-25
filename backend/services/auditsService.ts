import dbConnect from "@/lib/dbConnect";
import { AuditEvent, Audit } from "@/models/audit";
import { Feature } from "@/models/feature";
import { OrgFeature } from "@/models/orgFeature";
import AuditModel, { NewAudit, toAudit } from "../documents/audits";

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
  logOrgFeatureCreate: async (
    orgFeature: OrgFeature,
    info?: string
  ): Promise<Audit> => {
    await dbConnect();
    const newAudit: NewAudit = {
      oldValue: null,
      newValue: orgFeature,
      info: info ?? null,
      event: AuditEvent.ORG_FEATURE_CREATED,
    };
    return createAudit(newAudit);
  },
  logOrgFeatureDelete: async (orgFeature: OrgFeature, info?: string) => {
    await dbConnect();
    const newAudit: NewAudit = {
      oldValue: orgFeature,
      newValue: null,
      info: info ?? null,
      event: AuditEvent.ORG_FEATURE_DELETED,
    };
    return createAudit(newAudit);
  },
  logOrgFeatureUpdate: async (
    originalOrgFeature: OrgFeature,
    updatedOrgFeature: OrgFeature,
    info?: string
  ) => {
    await dbConnect();
    const newAudit: NewAudit = {
      oldValue: originalOrgFeature,
      newValue: updatedOrgFeature,
      info: info ?? null,
      event: AuditEvent.ORG_FEATURE_UPDATED,
    };
    return createAudit(newAudit);
  },
};
