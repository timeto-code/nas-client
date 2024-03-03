import { File as PrismaFile, Folder as PrismaFolder } from "@prisma/client";

declare interface FolderWithChildres extends PrismaFolder {
  files: PrismaFile[];
  subFolders: PrismaFolder[];
}
