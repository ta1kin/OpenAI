-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Guest');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Guest',
    "isVerify" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "nickname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Info" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Не задано',
    "about" TEXT NOT NULL DEFAULT 'Не задано',
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Config" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'light',
    "icon" BYTEA NOT NULL DEFAULT '\x',
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Data_nickname_key" ON "Data"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Data_phone_key" ON "Data"("phone");

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Info" ADD CONSTRAINT "Info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Config" ADD CONSTRAINT "Config_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
