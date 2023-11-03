// @ts-expect-error
import * as p from "@clack/prompts";
import { Command } from "commander";
import figlet from "figlet";
import { DEFAULT_APP_NAME } from "../consts.js";
import { AvailablePackages } from "../installers";
interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
  importAlias: string;
  typescript: boolean;
}

interface CliResults {
  appName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  packages: ["typescript"],
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
    importAlias: "@/",
    typescript: true,
  },
};
export async function runCli() {
  const cliResults = defaultOptions;

  const program = new Command()
    .name("OSON APP")
    .description("A CLI for creating React/Next/Astro/Express/Nest apps easily")
    .argument("[dir]", "Application name, directory name")
    .option("--next", "Whether to use Next.js by default")
    .option("--astro", "Whether to use Next.js by default")
    .option("--react", "Whether to use Next.js by default")
    .option("--express", "Whether to use Next.js by default")
    .option("--nest", "Whether to use Next.js by default")
    .option("--ts, --typescript", "Whether to use Typescript by default")
    .option("--lint, --eslint", "Whether to use ESLint by default")
    .parse(process.argv);
  const appNameFromCli = program.args[0]
  if (appNameFromCli) cliResults.appName = appNameFromCli;
  cliResults.flags = program.opts();
  if (cliResults.flags.default) return cliResults;
  try {
    const packageManager = "pnpm";
    await figlet.text("Oson App", {
      font: "Larry 3D 2",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    },
      function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
      }
    );
    const project = await p.group({
      ...(!appNameFromCli && {
        name: () => p.text({
          message: "Enter your project name",
          defaultValue: appNameFromCli
        })
      }),
      language: () => {
        return p.select({
          message: "Will you be using Typescript or Javascript",
          options: [
            { value: "javascript", label: "Javascript", hint: "Not recommended" },
            { value: "typescript", label: "Typescript", hint: "Recommended" },
          ],
          initialValue: "typescript"
        })
      },
      framework: () => {
        return p.select({
          message: "Which framework are you going to be using?",
          options: [
            { value: "nextjs", label: "Next.js" },
            { value: "react", label: "React" },
            { value: "astro", label: "Astro" },
            { value: "express", label: "Express.js" },
            { value: "nest", label: "Nest.js" },
          ],
          initialValue: "",
        })
      },
      pkgManager: () => {
        return p.select({
          message: "Which package manager do you want to use?",
          options: [
            { value: "npm", label: "NPM", hint: "Not recommended" },
            { value: "pnpm", label: "PNPM", hint: "Recommended" },
            { value: "yarn", label: "Yarn" },
            { value: "bun", label: "Bun" }
          ],
          initialValue: "pnpm"
        })
      }
    })
    let frameworkConfig = await p.group({});
    switch (project.framework) {
      case "nextjs":
        frameworkConfig = await p.group({
          dependencies: () => p.multiselect({
            message: "Choose the needed dependencies",
            options: [
              { label: "Next Auth", value: "next-auth" },
              { label: "Next Themes", value: "next-themes" }
            ]
          })
        })
        break;
      case "react":
        frameworkConfig = await p.group({
          dependencies: () => p.multiselect({
            message: "Choose the needed dependencies",
            options: [
              { label: "Redux", value: "@redux/toolkit" },
              { label: "Zustand", value: "zustand" },
              { label: "React-Router-DOM", value: "react-router-dom" },
              { label: "Tanstack Router", value: "@tanstack/router" },
            ]
          })
        })
        break
      case "astro":
        frameworkConfig = await p.group({
          dependencies: () => p.multiselect({
            message: "Choose the needed dependencies",
            options: [
              { label: "Redux", value: "@redux/toolkit" },
              { label: "Zustand", value: "zustand" },
              { label: "React-Router-DOM", value: "react-router-dom" },
              { label: "Tanstack Router", value: "@tanstack/router" },
            ]
          })
        })
        break
      case "express":
        frameworkConfig = await p.group({
          dependencies: () => p.multiselect({
            message: "Choose the needed dependencies",
            options: [
              { label: "Prisma", value: "prisma" },
              { label: "Multer", value: "multer" },
              { label: "Mongoose", value: "mongoose" },
              { label: "Jest", value: "jest" },
              { label: "Passport", value: "jest" },
              { label: "Nodemailer", value: "nodemailer" },
              { label: "Lodash", value: "lodash" },
              { label: "Socket.IO", value: "socket.io" },
              { label: "Winston", value: "winston" },
            ]
          })
        })
        break
      case "nest":
        frameworkConfig = await p.group({
          dependencies: () => p.multiselect({
            message: "Choose the needed dependencies",
            options: [
              { label: "Prisma", value: "prisma" },
              { label: "Multer", value: "multer" },
              { label: "Mongoose", value: "mongoose" },
              { label: "Jest", value: "jest" },
              { label: "Passport", value: "jest" },
              { label: "Nodemailer", value: "nodemailer" },
              { label: "Lodash", value: "lodash" },
              { label: "Socket.IO", value: "socket.io" },
              { label: "Winston", value: "winston" },

            ]
          })
        })
        break
      default:
        frameworkConfig = await p.group({
          dependencies: () => p.multiselect({
            message: "Choose the needed dependencies",
            options: [
              { label: "Typescript", value: "typescript" },
              { label: "TS Reset", value: "@total-typescript/ts-reset" },
              { label: "Zod", value: "zod" },
              { label: "ESLint", value: "eslint" },
              { label: "Prettier", value: "prettier" }
            ]
          })
        })
        break;
    }
  } catch (error) {

  }

}