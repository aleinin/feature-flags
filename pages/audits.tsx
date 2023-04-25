import { Audit, AuditEventStringMap } from "@/models/audit";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState, useEffect } from "react";

const AuditsPage = () => {
  const [rows, setRows] = useState<Audit[]>([]);
  useEffect(() => {
    fetch("/api/audits")
      .then((response) => response.json())
      .then((audits) => setRows(audits));
  }, []);
  return <AuditTable rows={rows} />;
};

interface AuditTableProps {
  rows: Audit[];
}
const AuditTable = ({ rows }: AuditTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Change</TableCell>
            <TableCell>Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.createdAt.toString()}
              </TableCell>
              <TableCell>{AuditEventStringMap[row.event]}</TableCell>
              <TableCell>{"todo"}</TableCell>
              <TableCell>{row.info}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AuditsPage;
