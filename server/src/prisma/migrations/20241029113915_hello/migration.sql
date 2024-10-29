-- DropForeignKey
ALTER TABLE "Info" DROP CONSTRAINT "Info_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Info" ADD CONSTRAINT "Info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
