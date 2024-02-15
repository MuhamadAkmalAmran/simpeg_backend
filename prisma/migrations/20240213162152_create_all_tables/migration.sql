-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('Anak', 'Istri', 'Suami');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Laki-Laki', 'Perempuan');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu');

-- CreateEnum
CREATE TYPE "Blood" AS ENUM ('A', 'B', 'O', 'AB');

-- CreateEnum
CREATE TYPE "Sekolah" AS ENUM ('SD', 'SMP', 'SMA', 'S1', 'S2', 'S3', 'Profesi', 'Speasilis');

-- CreateEnum
CREATE TYPE "Dokumen" AS ENUM ('KTP', 'NBM', 'Paspor', 'Kartu Keluarga', 'NUPTK', 'NPWP', 'BPJS', 'Asuransi Lainnya');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "img_url" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "gelar_depan" VARCHAR(100) NOT NULL,
    "gelar_belakang" VARCHAR(100) NOT NULL,
    "tempat_lahir" VARCHAR(100) NOT NULL,
    "tanggal_lahir" DATE NOT NULL,
    "jenis_kelamin" "Gender" NOT NULL,
    "Agama" "Religion" NOT NULL,
    "status_kepegawaian" VARCHAR(100) NOT NULL,
    "golongan_darah" "Blood" NOT NULL,
    "nomor_telepon" INTEGER NOT NULL,
    "alamat" VARCHAR(100) NOT NULL,
    "kelurahan" VARCHAR(100) NOT NULL,
    "kecamatan" VARCHAR(100) NOT NULL,
    "kabupaten_kota" VARCHAR(100) NOT NULL,
    "provinsi" VARCHAR(100) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" TEXT NOT NULL,
    "no_sk" VARCHAR(100) NOT NULL,
    "tanggal_sk" DATE NOT NULL,
    "tmt" DATE NOT NULL,
    "gaji_pokok" INTEGER NOT NULL,
    "jenis_sk" TEXT NOT NULL,
    "file_url" VARCHAR(100),
    "verifikasi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" TEXT NOT NULL,
    "jenjang" VARCHAR(100) NOT NULL,
    "nama_instansi" VARCHAR(100) NOT NULL,
    "jurusan" VARCHAR(100) NOT NULL,
    "tahun_lulus" VARCHAR(4) NOT NULL,
    "ijazah_url" VARCHAR(100),
    "verifikasi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainings" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "penyelenggara" VARCHAR(100) NOT NULL,
    "jpl" INTEGER NOT NULL,
    "tahun_kegiatan" VARCHAR(4) NOT NULL,
    "file_url" VARCHAR(100),
    "verifikasi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "titles" (
    "id" TEXT NOT NULL,
    "jabatan" VARCHAR(100) NOT NULL,
    "unit_kerja" VARCHAR(100) NOT NULL,
    "tmt" DATE NOT NULL,
    "tanggal_berakhir" DATE NOT NULL,
    "no_sk" VARCHAR(100) NOT NULL,
    "tanggal_sk" DATE NOT NULL,
    "file_url" VARCHAR(100),
    "verifikasi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "families" (
    "id" TEXT NOT NULL,
    "nik" VARCHAR(16) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "tempat" VARCHAR(100) NOT NULL,
    "tanggal_lahir" DATE NOT NULL,
    "jenis_kelamin" "Gender" NOT NULL,
    "agama" "Religion" NOT NULL,
    "hubungan_kel" "Relationship" NOT NULL,
    "verifikasi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "families_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "tingkat" VARCHAR(100) NOT NULL,
    "tahun" VARCHAR(4) NOT NULL,
    "penyelenggara" VARCHAR(100) NOT NULL,
    "file_url" VARCHAR(100),
    "verifikasi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performances" (
    "id" SERIAL NOT NULL,
    "nilai_kerja" INTEGER NOT NULL,
    "predikat" VARCHAR(100) NOT NULL,
    "file_url" VARCHAR(100),
    "verifikasi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "performances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "jenis_dokumen" "Dokumen" NOT NULL,
    "no_dokumen" BIGINT NOT NULL,
    "file_url" VARCHAR(100),
    "verifikasi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
