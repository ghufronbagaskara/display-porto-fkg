# Elora: catatan enhancement

Tanggal: 26 Oktober 2026.

Gambar referensi pengguna dipakai sebagai acuan detail interior, lantai, pencahayaan hangat, dan bayangan pada tampilan potongan atas. Denah rumah dalam gambar tidak menggantikan pembagian ruang klinik. Hasil ini masih viewer realtime; kesetaraan visual dengan render referensi belum terverifikasi.

## Aset internet yang dipakai

21 GLB tambahan diunduh, sehingga tersedia 56 model unik. Sumber, lisensi, ukuran, dan jumlah segitiga per file tercatat di `ASSET_LICENSES.json`.

- [Dental Practice and Surgery](https://3dassets.dev/packs/dental-practice-and-surgery): alat dental, model rahang, tray cetak, kotak model, panel plafon.
- [Home Appliances and Utility Room](https://3dassets.dev/packs/home-appliances-and-utility): AC indoor/outdoor, kulkas staf, ketel.
- [Downtown Office Interiors](https://3dassets.dev/packs/downtown-office-interiors): kursi kerja/pasien, monitor, keyboard, mouse, lemari berkas.
- [Fitted Kitchen and Bathroom Builder](https://3dassets.dev/packs/fitted-kitchen-and-bathroom-builder): WC, wastafel, cermin, tempat tisu.
- [Hospital Wards and Clinic Operations](https://3dassets.dev/packs/hospital-wards-and-clinic-operations): loker dan rak stok.
- [Clinic and Veterinary Practice](https://3dassets.dev/packs/clinic-and-veterinary-practice): viewer rontgen.

Sumber mencantumkan CC0 dan penggunaan AI dalam pembuatan aset. Lisensi diperiksa saat download. Model ini properti visual; dimensinya bukan spesifikasi vendor yang diverifikasi. Apron, papan radiografi, lantai, lis, dan meja sederhana dibuat dalam source scene, bukan hasil download.

## Kandidat alat panoramik

- [Rayscan Alpha Panorama, CGTrader](https://www.cgtrader.com/3d-models/science/medical/rayscan-alpha-panorama-3d-model).
- [Planmeca ProMax, Free3D](https://free3d.com/3d-model/dental-x-ray-system-planmeca-promax-8939.html).

Keduanya kandidat aset berbayar; tidak dibeli atau dimasukkan. Implementasi sekarang memakai rontgen intraoral dental, bukan mesin X-ray meja rumah sakit yang berbeda fungsi. Model dari Sketchfab yang ditemukan berlisensi nonkomersial tidak dimasukkan ke contoh portofolio bisnis ini.

## Isi ruang

| Ruang | Penambahan/pelengkapan |
| --- | --- |
| Radiografi | Kursi pasien, lengan intraoral di dinding, sensor di meja, viewer, komputer operator, apron, papan, AC |
| Tindakan 1–3 | Scaler, curing light, sharps bin, dispenser, hand gel, AC |
| Konsultasi | Kursi dokter dan dua tamu, komputer, model rahang, lemari arsip, AC |
| Staf | Kursi, loker, kulkas, ketel, kabinet, AC |
| Sterilisasi | Wastafel, dispenser, bin, alat pemrosesan instrumen yang sudah ada |
| Toilet | WC, wastafel, cermin, tisu, hand gel, bin |
| Gudang | Rak stok, kotak model, kabinet steril |
| Tunggu | Material lantai kayu, AC; perabot dental reception yang sudah ada tetap dipakai |

## Beban web dan pengujian

Scene: 130.564 segitiga, 960 mesh. 56 GLB berjumlah 2.106.796 byte; bundle offline sekitar 3,47 MB, sebelum kompresi HTTP. Ukuran file dan jumlah segitiga tidak membuktikan FPS. Banyak mesh tetap dapat menjadi beban draw call pada perangkat lemah.

Model berulang berbagi geometri/material. Hanya matahari memakai shadow map 2048², diperbarui ketika isi scene atau mode dinding berubah. Empat lampu lokal tidak membuat shadow map tambahan. Render berhenti saat kamera dan tampilan diam. Tidak memakai efek postprocessing atau tekstur resolusi besar.

`npm test` memeriksa parsing semua GLB, batas ruang furnitur, ketinggian lantai, framing kamera pada 1100×850, 550×900, 375×450, dan 1800×650, pergantian mode, Reset, serta penghentian render saat diam. Pemeriksaan memakai geometri Three.js asli dengan DOM, renderer, dan kontrol pengganti. Build dan pemeriksaan sintaks JS/Python dijalankan.

Pada sesi lanjutan, kontrol browser bawaan berhasil. Ukuran kanvas yang salah dikonfirmasi pada devicePixelRatio 1,25: panel 1220×1109 CSS px, kanvas 1525×1386 CSS px. Penyebabnya ID `scene` belum terpasang sehingga aturan CSS ukuran 100% tidak berlaku. Sesudah perbaikan, batas kanvas sama dengan batas panel. Screenshot desktop memperlihatkan seluruh klinik serta sinar/bayangan yang lebih jelas. Mode mobile 390×844 menampilkan dialog desktop otomatis; tombol lanjut menutupnya dan tidak ada overflow horizontal. Tes geometri sebelumnya tidak mengukur layout DOM aktual sehingga masalah CSS ini lolos.

Tampilan GPU sudah diperiksa di browser bawaan. FPS perangkat pengguna dan overlap seluruh perabot dalam setiap sudut belum diaudit. Belum ada klaim kualitas render setara referensi.

Pemeriksaan lanjutan: Floor Plan, Eye Level, dan Reset merespons klik di browser bawaan. Output `dist/` berhasil memuat seluruh aset, kanvas tetap sesuai panel, dan tidak mencatat warning/error konsol pada tab pengujian baru. Build, tes regresi, sintaks bundle, serta kesamaan file root dan `dist` lolos. Pembukaan otomatis lewat `file://` diblokir kebijakan browser bawaan, sehingga jalur klik file lokal tidak diuji langsung; format bundle klasik dan aset tertanam tetap dipertahankan.

Proyek masih memakai esbuild, bukan Vite/React. Konfigurasi Vercel sudah disiapkan: root `elora_klinik_dental`, preset Other, build `npm run build`, output `dist`. Folder output hanya berisi HTML dan bundle offline. Belum melakukan publikasi ke Vercel atau migrasi React. `index.html` lokal tetap dapat dibuka langsung.
