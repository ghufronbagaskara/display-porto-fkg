# Katalhys Dental Studio

Konsep fiktif klinik gigi untuk portofolio visualisasi 3D. Identitas, sidebar, palet terracotta-krem, material lantai, dan susunan ruang dibuat sebagai studi portofolio tersendiri.

## Membuka model

Klik dua kali `index.html`. Bundle sudah memuat renderer dan 56 aset GLB, sehingga tidak memerlukan server, CDN, atau login. Browser perlu mendukung WebGL2. Versi `dist/index.html` juga dapat digunakan setelah build.

- Orbit: putar dan perbesar model.
- Denah: tampilan atas dengan label ruang.
- Interior: sudut pandang rendah.
- Pilih ruang melalui daftar atau lantainya.
- Dinding: ganti tinggi dinding.
- Reset: kembalikan kamera dan pilihan ruang.
- Simpan PNG: ekspor gambar dengan nama Katalhys-Dental-Studio dan watermark yang menyatu dengan gambar.
- Pada layar di bawah 850px, dialog menyarankan penggunaan desktop.

## Pengembangan

Proyek menggunakan JavaScript, Three.js, dan esbuild. Tidak memakai React atau Vite.

```powershell
npm install
npm test
npm run build
```

Build memperbarui `app.bundle.js` dan menyalin HTML serta bundle ke `dist/`. Tidak ada dependensi baru untuk perubahan identitas dan layout ini.

## Deploy Vercel

Repository ini berisi `package.json` dan `index.html` langsung di root.

| Pengaturan | Nilai |
| --- | --- |
| Root Directory | `.` |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `dist` |

`vercel.json` sudah mengatur framework, build, dan output. Output publik berisi HTML, bundle, serta aset logo/favicon di `assets/brand/`. Tidak perlu menjalankan skrip pengunduh aset saat deployment.

## Identitas dan watermark

Logo hitam monokrom, favicon SVG/PNG, dan Apple touch icon disalin dari proyek landing Katalhys milik pengguna (`renoir-landing`). Aset brand ini terpisah dari lisensi CC0 model dental.

Tulisan Katalhys berulang secara diagonal setiap 180 × 110 CSS px dengan opacity 8,5%. Overlay menutupi seluruh viewport, termasuk sidebar, dan juga tersedia di dialog mobile. Overlay memakai `pointer-events: none` dan disembunyikan dari pembaca layar. Pola yang sama dikomposisikan di atas hasil renderer sebelum ekspor PNG; proses ekspor dibatalkan jika pola gagal dibuat. Palet klinik dipertahankan.

## Susunan ruang

Lobi seluas 31,5 m² menempati bagian depan, diikuti konsultasi 14 m², lounge staf 10,5 m², dan toilet 7 m². Radiografi dan gudang berada di bagian tengah. Suite perawatan 01 dan 03 serta sterilisasi berada di belakang; suite 02 di tengah. Dua koridor menghubungkan seluruh zona.

Ukuran keseluruhan 18 × 12 m, dengan tiga unit dental dan sepuluh ruang di luar koridor. Ini dimensi konsep, bukan hasil pengukuran bangunan.

## Aset dan lisensi

56 model dari 3DAssets.dev menggunakan CC0 1.0 Universal menurut metadata penerbit. URL sumber, lisensi, dimensi, dan jumlah segitiga dicatat dalam `ASSET_LICENSES.json`. Penerbit menandai aset sebagai dibuat dengan bantuan AI; ini properti visual, bukan CAD vendor yang diverifikasi.

Paket sumber: Dental Practice and Surgery, Home Appliances and Utility Room, Downtown Office Interiors, Fitted Kitchen and Bathroom Builder, Hospital Wards and Clinic Operations, serta Clinic and Veterinary Practice. Warna material pada GLB dipetakan ulang di source scene; file model asli dipertahankan.

Untuk mengunduh ulang, jalankan `python scripts/fetch_assets.py`, `python scripts/embed_assets.py`, lalu build. Cache katalog tidak dimasukkan ke Git.

## Verifikasi dan batas

`npm test` memeriksa parsing GLB, batas furnitur, perpindahan alat ke ruang yang benar, luas dan overlap ruang, warna scene/material, sizing kanvas, dialog mobile, kamera responsif, Reset, dan render saat diam. DOM dan WebGL pada tes Node memakai stand-in; pemeriksaan browser dicatat dalam `ENHANCEMENT_NOTES.md`.

Model ini bukan gambar konstruksi, panduan perizinan, atau desain fasilitas medis yang telah ditinjau profesional. Shielding, sanitasi, aksesibilitas bangunan, alur steril, HVAC, dan utilitas memerlukan perancangan terpisah sebelum digunakan pada bangunan nyata.
