import { Audit, AuditEvent } from "@/models/audit";
import { Feature } from "@/models/feature";
import { OrgFeature } from "@/models/orgFeature";
import { models, Schema, model } from "mongoose";

export interface AuditDocument {
  __id: string;
  __v: number;
  id: string;
  createdAt: Date;
  newValue: Feature | OrgFeature | null;
  oldValue: Feature | OrgFeature | null;
  event: AuditEvent;
  info: string | null;
}

export interface NewAudit {
  oldValue: Feature | OrgFeature | null;
  newValue: Feature | OrgFeature | null;
  info: string | null;
  event: AuditEvent;
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
