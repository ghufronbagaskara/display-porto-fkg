# NARA: catatan portofolio

Tanggal: 26 Oktober 2026.

## Perubahan konsep

Nama, judul browser, copy sidebar, paket aplikasi, nama ekspor PNG, loading state, dan identitas scene memakai NARA Dental Studio. UI secara eksplisit menyebutnya konsep fiktif untuk portofolio.

Sidebar diganti menjadi katalog berwarna paper dengan aksen terracotta, daftar bernomor, luas ruang, serta mode Orbit/Denah/Interior. Latar luar, fog, dan ground memakai krem. Furnitur beraksen teal/biru/coral dipetakan ulang ke warna tanah; tanaman tetap berwarna alami.

Lobi diperluas menjadi 9 × 3,5m. Batas konsultasi dan lounge staf dipindah sehingga keduanya berukuran 4 × 3,5m dan 3 × 3,5m. Posisi pintu utama serta bukaan koridor depan mengikuti batas baru. Kursi tunggu disusun berhadapan, dan penerimaan berada di dekat pintu masuk.

Radiografi menempati tengah kiri, suite 01 belakang kiri, gudang tengah kanan, dan sterilisasi belakang kanan. Furniture, alat, apron, papan radiografi, meja, serta AC pada ruang yang dipindah ditranslasikan bersama. Lis partisi tetap mengikuti dinding.

Lantai lobi dan area klinis menjadi batu krem berbintik; kayu walnut digunakan pada konsultasi serta lounge staf.

## Sumber aset

56 GLB berlisensi CC0 menurut metadata 3DAssets.dev:

- [Dental Practice and Surgery](https://3dassets.dev/packs/dental-practice-and-surgery)
- [Home Appliances and Utility Room](https://3dassets.dev/packs/home-appliances-and-utility)
- [Downtown Office Interiors](https://3dassets.dev/packs/downtown-office-interiors)
- [Fitted Kitchen and Bathroom Builder](https://3dassets.dev/packs/fitted-kitchen-and-bathroom-builder)
- [Hospital Wards and Clinic Operations](https://3dassets.dev/packs/hospital-wards-and-clinic-operations)
- [Clinic and Veterinary Practice](https://3dassets.dev/packs/clinic-and-veterinary-practice)

Aset digunakan kembali dengan pemetaan warna material. Sumber dan lisensi setiap model tersedia di ASSET_LICENSES.json.

## Beban dan batas

Scene memuat sekitar 130 ribu segitiga dan 960 mesh. Aset GLB berjumlah 2.106.796 byte; bundle offline sekitar 3,47 MB sebelum kompresi HTTP. Ini bukan hasil benchmark FPS. Tidak ada penambahan dependensi atau model eksternal pada perubahan konsep ini.

Konsep tetap merupakan studi visual, bukan rancangan bangunan klinis yang siap dibangun. Dimensi merupakan asumsi, dan audit seluruh kemungkinan overlap antarperabot belum dilakukan.


## Verifikasi perubahan NARA

- Build esbuild dan npm test lolos. Pemeriksaan Node mencakup identitas, background/fog/ground krem, upholstery terracotta, luas total 216 m², ruang tanpa overlap, serta posisi alat setelah perpindahan ruang.
- Browser bawaan menampilkan seluruh model tanpa error/warning konsol. Semua sepuluh pilihan ruang, mode Denah dan Interior, dinding rendah/penuh, serta Reset diperiksa.
- Pada viewport 390×844, dialog desktop tampil, kanvas sesuai panel, dan tidak ada overflow horizontal. Screenshot desktop, mobile, serta denah diperbarui.
- Verifikasi unduhan Simpan PNG lewat otomasi browser terhenti karena timeout, sehingga unduhan belum dikonfirmasi. Nama ekspor pada source sudah menjadi Nara-Dental-Studio.
- Deploy Vercel dan pengukuran FPS perangkat belum dilakukan.
