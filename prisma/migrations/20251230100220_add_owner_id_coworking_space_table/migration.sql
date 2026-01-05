/*
  Warnings:

  - Added the required column `ownerId` to the `CoworkingSpace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoworkingSpace" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CoworkingSpace" ADD CONSTRAINT "CoworkingSpace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
