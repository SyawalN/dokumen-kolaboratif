## Setup

1\. Install dependencies yang dibutuhkan untuk project, gunakan perintah dibawah:
```bash
npm install --production=false
```

2\. Konfigurasi .env file untuk membuat variabel yang dibutuhkan untuk project, silahkan ikuti instruksi pada file .env.example

3\. Project juga membutuhkan dependency lain seperti MongoDB agar dapat menyimpan data

<br />

## Menjalankan Project

### 1\. Run Client
Client dijalankan dengan NextJS, gunakan perintah dibawah pada terminal:
```bash
npm run dev
```
###### Note: Client URL dapat diubah dengan menambahkan ```-H <ip_address> -p <port>``` pada file package.json dibagian ```"dev": "next dev"``` ,
###### (Contoh) ```"dev": "next dev -H 192.0.2.1 -p 3005"``` akan menjalankan NextJS pada ip 192.0.2.1 dan port 3005.

### 2\. Run Server
Server akan dijalankan dengan Nodemon, gunakan perintah dibawah pada terminal lain / terminal baru:
```bash
npm run devStart
```

<br />

### Kelompok 20
1. 2101020070 - Marsela Zailanti
2. 2201020099 - Syawal Nopyandi
3. 2201020105 - Maulana Fitra Ramadhani
4. 2201020109 - M. Wisnu Adjie Pramudya
5. 2201020122 - Zeldiyan Arafat
6. 2201020136 - Kuncoro Lukito

<br />

Project ini dibuat oleh <b>Kelompok 20</b> untuk memenuhi tugas Final Project mata kuliah <b>Sistem Terdistribusi</b>.
