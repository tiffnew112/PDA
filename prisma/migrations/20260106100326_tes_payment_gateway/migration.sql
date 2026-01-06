/*
  Warnings:

  - You are about to drop the column `createAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[xenditId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `method` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('INVOICE', 'VIRTUAL_ACCOUNT');

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "createAt",
DROP COLUMN "provider",
ADD COLUMN     "bankCode" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "invoiceUrl" TEXT,
ADD COLUMN     "method" "PaymentMethod" NOT NULL,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "virtualAccountNo" TEXT,
ADD COLUMN     "xenditId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_xenditId_key" ON "Payment"("xenditId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_externalId_key" ON "Payment"("externalId");
