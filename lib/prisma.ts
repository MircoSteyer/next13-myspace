import {
  PrismaClient,
  User,
  Account,
  Session,
  VerificationToken,
  Follows,
} from "@prisma/client";

export const prisma = new PrismaClient();

export type { User, Account, Session, VerificationToken, Follows };
