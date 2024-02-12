-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('Anak', 'Istri', 'Suami');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Laki-Laki', 'Perempuan');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu');

-- CreateEnum
CREATE TYPE "Blood" AS ENUM ('A', 'B', 'O', 'AB');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "img_url" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "gelar_depan" VARCHAR(100) NOT NULL,
    "gelar_belakang" VARCHAR(100) NOT NULL,
    "tempat_lahir" VARCHAR(100) NOT NULL,
    "tanggal_lahir" DATE NOT NULL,
    "jenis_kelamin" "Gender" NOT NULL,
    "Agama" "Religion" NOT NULL,
    "golongan_darah" "Blood" NOT NULL,
    "status_kepegawaian" VARCHAR(100) NOT NULL,
    "nomor_hp" VARCHAR(100) NOT NULL,
    "alamat" VARCHAR(100) NOT NULL,
    "kelurahan" VARCHAR(100) NOT NULL,
    "kecamatan" VARCHAR(100) NOT NULL,
    "kota_kabupaten" VARCHAR(100) NOT NULL,
    "provinsi" VARCHAR(100) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainings" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "penyelenggara" VARCHAR(100) NOT NULL,
    "jam_pembelajaran" VARCHAR(100) NOT NULL,
    "tahun_diklat" VARCHAR(4) NOT NULL,
    "sertif_url" VARCHAR(100),

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" SERIAL NOT NULL,
    "jenjang" VARCHAR(100) NOT NULL,
    "instansi" VARCHAR(100) NOT NULL,
    "jurusan" VARCHAR(100) NOT NULL,
    "tahun_lulus" VARCHAR(4) NOT NULL,
    "ijazah_url" VARCHAR(100),

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "no_SK" INTEGER NOT NULL,
    "tgl_sk" DATE NOT NULL,
    "tmt" DATE NOT NULL,
    "gaji_pokok" INTEGER NOT NULL,
    "sk_url" VARCHAR(100),

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "families" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "nik" INTEGER NOT NULL,
    "hubungan_kel" "Relationship" NOT NULL,
    "tgl_lahir" DATE NOT NULL,
    "jenis_kelamin" "Gender" NOT NULL,
    "agama" "Religion" NOT NULL,

    CONSTRAINT "families_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "tingkatan" VARCHAR(100) NOT NULL,
    "tahun" VARCHAR(4) NOT NULL,
    "penyelenggara" VARCHAR(100) NOT NULL,
    "sertif_url" VARCHAR(100),

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performances" (
    "id" SERIAL NOT NULL,
    "nilai_kerja" INTEGER NOT NULL,
    "predikat" VARCHAR(100) NOT NULL,
    "dokumen_url" VARCHAR(100),

    CONSTRAINT "performances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "titles" (
    "id" SERIAL NOT NULL,
    "jabatan" VARCHAR(100) NOT NULL,
    "unit_kerja" VARCHAR(100) NOT NULL,
    "tmt" DATE NOT NULL,
    "tanggal_berakhir" DATE NOT NULL,
    "no_sk" INTEGER NOT NULL,
    "tgl_sk" DATE NOT NULL,
    "sertif_url" VARCHAR(100),

    CONSTRAINT "titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_documents" (
    "id" SERIAL NOT NULL,
    "jenis_dokumen" VARCHAR(100) NOT NULL,
    "file_url" VARCHAR(100),

    CONSTRAINT "personal_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
