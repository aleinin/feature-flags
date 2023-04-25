import { Feature } from "./feature";
import { OrgFeature } from "./orgFeature";

export interface Audit {
  id: string;
  createdAt: Date;
  newValue: Feature | OrgFeature | null;
  oldValue: Feature | OrgFeature | null;
  event: AuditEvent;
  info: string | null;
}

export enum AuditEvent {
  FEATURE_CREATED = "FEATURE_CREATED",
  FEATURE_UPDATED = "FEATURE_UPDATED",
  FEATURE_DELETED = "FEATURE_DELETED",
  ORG_FEATURE_CREATED = "ORG_FEATURE_CREATED",
  ORG_FEATURE_DELETED = "ORG_FEATURE_DELETED",
  ORG_FEATURE_UPDATED = "ORG_FEATURE_UPDATED",
}

export enum AuditEventStringMap {
  FEATURE_CREATED = "Feature created",
  FEATURE_UPDATED = "Feature updated",
  FEATURE_DELETED = "Feature deleted",
  ORG_FEATURE_CREATED = "Org feature created",
  ORG_FEATURE_DELETED = "Org feature deleted",
  ORG_FEATURE_UPDATED = "Org feature updated",
}
