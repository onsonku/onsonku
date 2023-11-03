export const availablePackages = [
  "react-query",
  "zustand",
  "tailwindcss",
  "typescript",
  "shadcn",
  "react-hook-form",
  "zod",
  "express-file-upload",
  "prisma",
  "drizzle",
  "cors",
  "nextAuth",
] as const;
export type AvailablePackages = (typeof availablePackages)[number]