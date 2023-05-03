import { Audit, AuditEventStringMap } from "@/models/audit";
import { useState, useEffect } from "react";

const AuditsPage = () => {
  const [rows, setRows] = useState<Audit[]>([]);
  useEffect(() => {
    fetch("/api/audits")
      .then((response) => response.json())
      .then((audits) => setRows(audits));
  }, []);
  const tableRows = rows.map((row) => ({
    id: row.id,
    date: row.createdAt.toString(),
    event: AuditEventStringMap[row.event],
    info: row.info,
  }));
  return <AuditTable rows={tableRows} />;
};

interface AuditTableProps {
  rows: any[];
}
const AuditTable = ({ rows }: AuditTableProps) => {
  return <h1> todo </h1>;
};

export default AuditsPage;
