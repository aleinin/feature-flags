import { ExternalUser } from "@/models/user";

const mockUsers: string[] = [
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

export const mockOrganizations: ExternalUser[] = mockUsers.map(
  (user, index) => ({
    name: user,
    id: index.toString(),
  })
);
