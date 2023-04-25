import { ExternalOrganization } from "@/models/organization";

const mockOrgs: string[] = [
  "TechNova",
  "Cybrospace",
  "Quantumverse",
  "CodeHive",
  "Synthetix",
  "Nexify",
  "Cloudwise",
  "ZenithSoft",
  "LogiTech",
  "InnovateX",
  "ProxiTech",
  "ByteWorks",
  "PrimeTech",
  "PixelCore",
  "NeuraLink",
  "BlazeTech",
  "Hypernova",
  "OptimaTech",
  "MindSpark",
  "Circuitronix",
];

export const mockOrganizations: ExternalOrganization[] = mockOrgs.map(
  (organization, index) => ({
    name: organization,
    id: index.toString(),
  })
);
