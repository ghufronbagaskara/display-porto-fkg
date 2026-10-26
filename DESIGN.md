# Elora: arah tampilan

Tampilan klinik Scandinavian dengan putih hangat, kayu, dan hijau sage mengikuti viewer yang sudah ada serta gambar referensi pengguna. Perubahan sesi ini terbatas pada posisi kanvas, sinar matahari, dan dialog mobile.

- Layout: sidebar 330px dan panel 3D fleksibel; di bawah 850px panel berada di atas daftar ruang.
- Kanvas: `#scene`, lebar/tinggi CSS 100% panel; resolusi drawing buffer mengikuti device pixel ratio secara terpisah.
- Dialog: native `dialog`, latar `#f9faf7`, teks `#173c33` / `#435d50`, tombol hijau dengan tinggi minimal 48px; label, deskripsi, autofocus, dan Escape memakai perilaku browser.
- Typography: mengikuti font yang sudah digunakan viewer; dialog menggunakan judul Georgia dan body dari halaman.
- Lighting: matahari hangat `#ffdfad`, arah miring, ambient lembut, satu shadow map 2048², empat lampu lokal tanpa shadow map.
- Tidak menambahkan animasi dialog atau dependensi UI.

Terakhir diperbarui: 26 Oktober 2026.
