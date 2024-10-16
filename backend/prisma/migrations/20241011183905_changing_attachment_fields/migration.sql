/*
  Warnings:

  - You are about to drop the column `file` on the `attachment` table. All the data in the column will be lost.
  - Added the required column `file_name` to the `attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_name` to the `attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attachment" DROP COLUMN "file",
ADD COLUMN     "file_name" TEXT NOT NULL,
ADD COLUMN     "original_name" TEXT NOT NULL;
