/*
  Warnings:

  - You are about to drop the `adoption_requirements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "adoption_requirements" DROP CONSTRAINT "adoption_requirements_pet_id_fkey";

-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "whatsapp_number" SET DATA TYPE TEXT,
ALTER COLUMN "cep" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "adoption_requirements" TEXT[];

-- DropTable
DROP TABLE "adoption_requirements";
