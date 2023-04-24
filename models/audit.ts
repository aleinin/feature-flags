import { models, model, Schema } from "mongoose";
import { Feature } from "./feature";
import { UserFeature } from "./userFeature";

export interface Audit {
  id: string;
  createdAt: Date;
  newValue: Feature | UserFeature | null;
  oldValue: Feature | UserFeature | null;
  event: AuditEvent;
  info: string | null;
}

export interface AuditDocument {
  __id: string;
  __v: number;
  id: string;
  createdAt: Date;
  newValue: Feature | UserFeature | null;
  oldValue: Feature | UserFeature | null;
  event: AuditEvent;
  info: string | null;
}

export enum AuditEvent {
  FEATURE_CREATED = "FEATURE_CREATED",
  FEATURE_UPDATED = "FEATURE_UPDATED",
  FEATURE_DELETED = "FEATURE_DELETED",
  USER_FEATURE_CREATED = "USER_FEATURE_CREATED",
  USER_FEATURE_DELETED = "USER_FEATURE_DELETED",
  USER_FEATURE_UPDATED = "USER_FEATURE_UPDATED",
}

export const toAudit = (auditDocument: AuditDocument): Audit => ({
  id: auditDocument.id,
  createdAt: auditDocument.createdAt,
  newValue: auditDocument.newValue,
  oldValue: auditDocument.oldValue,
  event: auditDocument.event,
  info: auditDocument.info,
});

const auditSchema = new Schema<Audit>(
  {
    newValue: {
      type: Object,
    },
    oldValue: {
      type: Object,
    },
    info: {
      type: String,
    },
    event: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Audit || model("Audit", auditSchema);
