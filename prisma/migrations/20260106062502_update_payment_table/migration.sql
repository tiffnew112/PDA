/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `stripePaymentId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `externalId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "paymentStatus";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "method",
DROP COLUMN "stripePaymentId",
ADD COLUMN     "externalId" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
