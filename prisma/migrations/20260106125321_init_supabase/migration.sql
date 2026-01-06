/*
  Warnings:

  - You are about to drop the column `bankCode` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceUrl` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `virtualAccountNo` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `xenditId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `provider` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Payment_externalId_key";

-- DropIndex
DROP INDEX "Payment_xenditId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "bankCode",
DROP COLUMN "createdAt",
DROP COLUMN "invoiceUrl",
DROP COLUMN "method",
DROP COLUMN "paidAt",
DROP COLUMN "updatedAt",
DROP COLUMN "virtualAccountNo",
DROP COLUMN "xenditId",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "provider" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PaymentMethod";
