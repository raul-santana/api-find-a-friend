/*
  Warnings:

  - Added the required column `author_name` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "author_name" TEXT NOT NULL;
