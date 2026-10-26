# Katalhys Dental Studio: arah tampilan

Konsep portofolio fiktif dengan pendekatan katalog interior: tipografi tenang, daftar ruang bernomor, dan palet tanah yang menyatu dengan scene.

## Identitas dan palet

- Nama tampilan: Katalhys Dental Studio; penanda PORTOFOLIO / 001.
- Logo monokrom hitam dan favicon asli berasal dari proyek landing Katalhys pengguna. Simbol tidak digambar ulang.
- Watermark Katalhys memakai pola diagonal 180 × 110px, font 20px, opacity 8,5%; mencakup seluruh layar, dialog mobile, dan ekspor PNG.
- Ink `#3d3028`, terracotta `#a45138`, paper `#faf5ed`, cream `#eee2d1`, muted `#746356`.
- Area luar, background scene, dan fog menggunakan cream. Tidak ada tepi atau latar sage.
- Upholstery teal dipetakan ke `#a65d46`; biru ke `#967864`; coral ke `#c08464`.
- Lobi/klinis memakai lantai batu dengan bintik halus; konsultasi dan staf memakai kayu bernuansa walnut.

## Tipografi dan layout

- Wordmark Katalhys memakai Georgia 34px dengan simbol hitam 44px; body Trebuchet MS dengan fallback Segoe UI. Tidak memuat font eksternal agar tetap offline.
- Sidebar 320px, atau 290px pada desktop sempit, dengan garis pemisah dan daftar ruang berluas.
- Tidak memakai logo klinik nyata, testimoni, rencana personel, atau klaim bisnis.
- Di bawah 850px, model berada di atas sidebar dan dialog desktop muncul otomatis.
- Label, deskripsi, fokus, Escape, dan focus trap dialog memakai elemen native.
- Kanvas `#scene` selalu berukuran CSS 100% panel. Drawing buffer mengikuti pixel ratio secara terpisah.

## Denah

Lobi diperluas ke lebar 9m, konsultasi mulai x=9m, lounge staf mulai x=13m. Radiografi pindah ke tengah kiri; suite 01 ke belakang kiri. Gudang pindah ke tengah kanan, sterilisasi ke belakang kanan. Isi ruangan berpindah bersama; lis dinding mengikuti geometri partisi.

## Cahaya dan gerak

Matahari hangat miring, satu shadow map 2048², ambient lembut, dan empat lampu lokal tanpa shadow map. Render berhenti saat diam. Tidak menambahkan animasi dekoratif atau dependensi UI.

Terakhir diperbarui: 26 Oktober 2026.
