import {
  PrismaClient,
  User,
  Account,
  Session,
  VerificationToken,
} from "@prisma/client";

export const prisma = new PrismaClient();

export type { User, Account, Session, VerificationToken };
