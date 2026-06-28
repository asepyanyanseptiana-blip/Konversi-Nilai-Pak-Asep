import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Settings, 
  Printer, 
  Copy, 
  Check, 
  BookOpen, 
  User, 
  School, 
  Calendar, 
  Layers, 
  Clock, 
  HelpCircle,
  Eye,
  Plus,
  Trash2,
  Video,
  ListOrdered,
  ChevronRight,
  Sparkles,
  Upload,
  BookOpenCheck
} from 'lucide-react';

export default function App() {
  // State Navigasi Tab Utama
  const [activeTab, setActiveTab] = useState('form'); // 'form' atau 'preview'

  // State Jenis Kegiatan (Intrakurikuler vs Kokurikuler P5)
  const [jenisKegiatan, setJenisKegiatan] = useState('Intrakurikuler'); // 'Intrakurikuler' atau 'Kokurikuler'

  // State Form Identitas & Administrasi (Default Generik Bersih)
  const [penyusun, setPenyusun] = useState('Guru SD Negeri Margaasih');
  const [nip, setNip] = useState('-'); 
  const [kepalaSekolah, setKepalaSekolah] = useState('Kepala Sekolah SD Negeri Margaasih');
  const [nipKepalaSekolah, setNipKepalaSekolah] = useState('-');
  const [satuanPendidikan, setSatuanPendidikan] = useState('SD Negeri Margaasih');
  const [tahunPenyusunan, setTahunPenyusunan] = useState('2026/2027');
  const [semester, setSemester] = useState('2');
  
  // State Intrakurikuler
  const [mapel, setMapel] = useState('Matematika');
  const [materiPokok, setMateriPokok] = useState('Membandingkan dan Mengurutkan Tinggi Benda');
  const [fase, setFase] = useState('A');
  const [kelas, setKelas] = useState('I');
  const [alokasiWaktu, setAlokasiWaktu] = useState('2 x 35 menit (1 pertemuan)');
  const [pendekatan, setPendekatan] = useState('Pendekatan Tafakur-Tadzakkur / Deep Learning');
  const [modelPembelajaran, setModelPembelajaran] = useState('PBL');
  
  // State Rujukan Bahan Ajar Mandiri (NEW Upload/Paste)
  const [bahanAjarRujukan, setBahanAjarRujukan] = useState(
    'Atribut Tinggi Benda: Tinggi merupakan dimensi vertikal dari suatu objek diukur dari alas permukaan datar. Membandingkan tinggi dua benda wajib diletakkan di atas lantai atau meja yang sama rata (baseline sejajar). Kosakata pembanding: Lebih tinggi dari, Lebih pendek dari, atau Sama tinggi dengan.'
  );

  // State Capaian Pembelajaran, ATP, dan TP (Untuk Intrakurikuler)
  const [capaianPembelajaran, setCapaianPembelajaran] = useState(
    'Peserta didik dapat membandingkan dan mengurutkan panjang dan berat benda secara langsung, dan mengukur panjang dan berat benda menggunakan satuan tidak baku.'
  );
  const [alurTujuan, setAlurTujuan] = useState(
    '1.1 Mengidentifikasi perbedaan tinggi benda secara visual. \n1.2 Membandingkan tinggi dua benda secara langsung dengan posisi sejajar di alas rata. \n1.3 Mengurutkan tinggi tiga benda atau lebih secara runtut.'
  );
  const [tujuanPembelajaran, setTujuanPembelajaran] = useState([
    'Peserta didik dapat membandingkan tinggi dua benda dengan menggunakan istilah "lebih tinggi", "lebih pendek", atau "sama tinggi" secara tepat.',
    'Peserta didik dapat mengurutkan benda-benda konkret berdasarkan tinggi benda secara runtut.'
  ]);

  // State Khusus Kokurikuler (P5)
  const [temaProjek, setTemaProjek] = useState('Kearifan Lokal');
  const [namaProjek, setNamaProjek] = useState('Melestarikan Kaulinan Lembur Sumedang');
  const [deskripsiProjek, setDeskripsiProjek] = useState(
    'Projek ini dirancang untuk memperkenalkan dan melestarikan kembali permainan tradisional (kaulinan lembur) khas Sumedang seperti ucing sumput, egrang, dan rorodaan, guna memupuk karakter gotong royong dan kemandirian siswa.'
  );
  const [targetDimensiProjek, setTargetDimensiProjek] = useState(
    'Dimensi Gotong Royong (Elemen Kolaborasi & Kepedulian) dan Dimensi Berkebinekaan Global (Elemen Mengenal dan Menghargai Budaya Khas Sumedang).'
  );

  const [inputTP, setInputTP] = useState('');

  // State Metode Pembelajaran
  const [metodeList, setMetodeList] = useState([
    'Diskusi Kelompok', 'Ceramah Interaktif', 'Tanya Jawab Pemantik', 'Demonstrasi Konkret', 'Penugasan Berbasis Aktivitas', 'Presentasi Hasil Karya', 'Permainan & Gamifikasi'
  ]);

  // State Dimensi Profil Lulusan (SKL 2025)
  const [dimensiList, setDimensiList] = useState({
    dim1: true, // Beriman & Bertakwa
    dim2: false, // Berkebinekaan Global
    dim3: true, // Bergotong Royong
    dim4: false, // Mandiri
    dim5: true, // Bernalar Kritis
    dim6: false, // Kreatif
  });

  // State Notifikasi
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const printRef = useRef();

  // Database Default Template per Mata Pelajaran (Intrakurikuler)
  const mapelTemplates = {
    'Matematika': {
      materi: 'Membandingkan dan Mengurutkan Tinggi Benda',
      fase: 'A',
      kelas: 'I',
      cp: 'Peserta didik dapat membandingkan dan mengurutkan panjang dan berat benda secara langsung, dan mengukur panjang dan berat benda menggunakan satuan tidak baku.',
      atp: '1.1 Mengidentifikasi perbedaan tinggi benda secara visual.\n1.2 Membandingkan tinggi dua benda secara langsung dengan posisi sejajar di alas rata.\n1.3 Mengurutkan tinggi tiga benda atau lebih secara runtut.',
      tp: [
        'Peserta didik dapat membandingkan tinggi dua benda dengan menggunakan istilah "lebih tinggi", "lebih pendek", atau "sama tinggi" secara tepat.',
        'Peserta didik dapat mengurutkan benda-benda konkret berdasarkan tinggi benda secara runtut.'
      ],
      rujukan: 'Pengukuran Tinggi: Tinggi diukur vertikal dari dasar ke atas. Alas ukur wajib sejajar agar adil. Benda A setinggi 12cm, Benda B setinggi 8cm, maka Benda A lebih tinggi daripada Benda B.'
    },
    'Bahasa Sunda': {
      materi: 'Nyarita jeung Maca Dongeng Sato (Fabel)',
      fase: 'A',
      kelas: 'I',
      cp: 'Peserta didik nitenan, nyangkem, jeung mintonkeun teks dongeng sato (fabel) ku cara maca atawa ngaregepkeun kalayan bentes jeung sopan luyu jeung undak-usuk basa.',
      atp: '1.1 Ngaregepkeun dongeng fabel anu dibacakeun ku guru kalayan saregep.\n1.2 Nyebutkeun tokoh jeung pasipatan tokoh dina dongeng.\n1.3 Mintonkeun deui eusi dongeng sacara ringkes ku basa Sunda anu luyu jeung sopan.',
      tp: [
        'Murid tiasa nyebutkeun tokoh-tokoh sareng watakna dina dongeng sato kalayan leres.',
        'Murid tiasa nyaritakeun deui eusi dongeng sacara basajan nganggo basa hormat/sopan.'
      ],
      rujukan: 'Teks Dongeng Sakadang Kuya jeung Sakadang Monyet: Ngajarkeun sipat jujur jeung sabar (Kuya) sarta sipat rakus jeung licik (Monyet). Gunakeun Ragam Basa Hormat keur ka batur, jeung Loma keur ka babaturan saluhureun.'
    },
    'Ilmu Pengetahuan Alam dan Sosial (IPAS)': {
      materi: 'Bagian Tubuh Manusia dan Fungsinya (Pancaindra)',
      fase: 'B',
      kelas: 'IV',
      cp: 'Peserta didik menganalisis hubungan antara bentuk serta fungsi bagian tubuh pada manusia (pancaindra) serta mengaitkannya dengan perilaku hidup sehat.',
      atp: '1.1 Mengidentifikasi organ pancaindra pada manusia.\n1.2 Menganalisis fungsi masing-masing indra dalam mendeteksi lingkungan sekitar.\n1.3 Mensimulasikan pola hidup bersih untuk menjaga kesehatan organ indra.',
      tp: [
        'Peserta didik dapat mengidentifikasi pancaindra manusia dan fungsinya dengan benar.',
        'Peserta didik dapat menganalisis cara menjaga kesehatan pancaindra dalam kehidupan sehari-hari.'
      ],
      rujukan: 'Pancaindra Manusia: (1) Mata untuk melihat, (2) Telinga untuk mendengar, (3) Hidung untuk mencium bau, (4) Lidah untuk mengecap rasa, (5) Kulit untuk meraba. Cara perawatan: Membersihkan indra pendengaran dengan teratur, avoiding reading in dim light.'
    },
    'Bahasa Indonesia': {
      materi: 'Membaca Kata Berawalan Huruf "B"',
      fase: 'A',
      kelas: 'I',
      cp: 'Peserta didik memiliki kemampuan berbahasa untuk berkomunikasi dan bernalar, sesuai dengan tujuan, kepada teman sebaya dan orang dewasa tentang hal-hal menarik di lingkungannya.',
      atp: '1.1 Mengenali bentuk dan bunyi huruf "B" secara tepat.\n1.2 Mengeja suku kata yang diawali dengan huruf "B" (ba, bi, bu, be, bo).\n1.3 Membaca kata-kata berawalan huruf "B" dengan lancar.',
      tp: [
        'Peserta didik dapat melafalkan bunyi huruf "B" dan merangkaikannya menjadi suku kata dengan tepat.',
        'Peserta didik dapat membaca kata-kata sederhana yang berawalan huruf "B" secara lancar.'
      ],
      rujukan: 'Pengenalan Huruf B: Suku kata ba, bi, bu, be, bo. Contoh kosakata konkrit kelas 1: Bola, Buku, Baju, Batu, Biru, Boni. Kegiatan membacanya menggunakan media kartu kata bergambar.'
    },
    'Pendidikan Pancasila dan Kewarganegaraan': {
      materi: 'Aturan dan Tata Tertib di Rumah dan Sekolah',
      fase: 'A',
      kelas: 'I',
      cp: 'Peserta didik mampu mengidentifikasi dan mematuhi aturan di keluarga dan sekolah, serta menceritakan contoh sikap patuh terhadap aturan.',
      atp: '1.1 Menyebutkan contoh aturan yang berlaku di rumah dan sekolah.\n1.2 Menjelaskan manfaat menaati aturan di lingkungan terdekat.\n1.3 Menunjukkan sikap patuh aturan di kelas secara konsisten.',
      tp: [
        'Peserta didik dapat menyebutkan minimal 3 aturan di sekolah dengan benar.',
        'Peserta didik dapat mempraktikkan sikap patuh terhadap tata tertib kelas.'
      ],
      rujukan: 'Tata Tertib Sekolah: (1) Datang tepat waktu sebelum bel masuk, (2) Berpakaian rapi sesuai seragam hari itu, (3) Membuang sampah pada tempatnya, (4) Menjaga ketertiban di lingkungan kelas SDN Margaasih.'
    },
    'PAIBP': {
      materi: 'Kasih Sayang Nabi Muhammad SAW dan Membaca Basmalah',
      fase: 'A',
      kelas: 'I',
      cp: 'Peserta didik memahami perilaku kasih sayang terhadap sesama sebagai cerminan akhlak mulia dan terbiasa melafalkan basmalah dalam mengawali aktivitas.',
      atp: '1.1 Menjelaskan keteladanan sikap kasih sayang Nabi Muhammad SAW.\n1.2 Melafalkan kalimat Basmalah beserta artinya dengan fasih.',
      tp: [
        'Peserta didik dapat menceritakan kisah singkat keteladanan Nabi Muhammad SAW dengan baik.',
        'Peserta didik dapat mempraktikkan pembacaan Basmalah di setiap awal kegiatan belajar.'
      ],
      rujukan: 'Materi PAI: Meneladani sikap Rasulullah SAW yang penuh welas asih kepada anak yatim, orang tua, dan binatang. Melafalkan "Bismillahirrahmanirrahim" (Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang).'
    },
    'Pendidikan Jasmani, Olahraga, dan Kesehatan': {
      materi: 'Gerak Dasar Lokomotor (Jalan, Lari, Lompat)',
      fase: 'A',
      kelas: 'I',
      cp: 'Peserta didik memahami dan mempraktikkan variasi pola gerak dasar lokomotor sesuai dengan konsep tubuh dan ruang.',
      atp: '1.1 Mempraktikkan gerakan berjalan lurus secara stabil.\n1.2 Melakukan koordinasi gerakan lari dan lompat melewati rintangan sederhana.',
      tp: [
        'Peserta didik dapat mempraktikkan prosedur gerak berjalan dengan sikap tubuh tegak secara konsisten.',
        'Peserta didik dapat bermain permainan modifikasi lompat rintangan dengan rukun.'
      ],
      rujukan: 'Gerak Lokomotor: Gerak tubuh yang menyebabkan perpindahan tempat. Contohnya berjalan ke depan, berlari zig-zag, dan melompat sejauh mungkin. Latihan wajib dilakukan dengan pemanasan dan pendinginan.'
    },
    'Seni Budaya': {
      materi: 'Membuat Karya Kolase Berbahan Alam Sekitar',
      fase: 'A',
      kelas: 'I',
      cp: 'Peserta didik mengenal unsur rupa (garis, bentuk, warna) dan memanfaatkannya untuk membuat karya kolase dua dimensi.',
      atp: '1.1 Mengidentifikasi rupa bahan alam (daun kering, biji-bijian) di sekitar sekolah.\n1.2 Menyusun kolase dekoratif sederhana menggunakan lem kertas.',
      tp: [
        'Peserta didik dapat memilih bahan alam yang sesuai untuk diaplikasikan ke sketsa gambar.',
        'Peserta didik dapat menghasilkan satu karya seni kolase yang bersih dan rapi secara kreatif.'
      ],
      rujukan: 'Seni Kolase Dua Dimensi: Teknik menempel berbagai bahan (daun kering, biji kacang hijau, jagung) di atas bidang gambar ber-pola. Memerlukan tingkat ketelitian dan kerapihan lem yang tinggi.'
    },
    'Bahasa Inggris': {
      materi: 'Greeting and Saying Goodbye',
      fase: 'A',
      kelas: 'I',
      cp: 'Peserta didik menggunakan bahasa Inggris sederhana untuk berinteraksi mengekspresikan sapaan dan perpisahan di lingkup kelas.',
      atp: '1.1 Melafalkan sapaan "Good Morning", "Hello", "How are you" secara lisan.\n1.2 Menggunakan ungkapan perpisahan "Goodbye" atau "See you" dengan tepat.',
      tp: [
        'Peserta didik dapat menyapa guru dan teman sekelas menggunakan bahasa Inggris secara percaya diri.',
        'Peserta didik dapat merespon sapaan sederhana dari lawan bicara dengan benar.'
      ],
      rujukan: 'Greetings: "Good Morning" (Selamat Pagi), "Good Afternoon" (Selamat Siang), "How are you?" (Bagaimana kabarmu?), "I am fine, thank you" (Saya baik-baik saja, terima kasih). Perpisahan: "Goodbye" (Selamat tinggal).'
    }
  };

  // Database Default Template untuk Kokurikuler (P5)
  const temaP5Templates = {
    'Kearifan Lokal': {
      projek: 'Melestarikan Kaulinan Lembur Sumedang',
      deskripsi: 'Projek ini dirancang untuk memperkenalkan dan melestarikan kembali permainan tradisional (kaulinan lembur) khas Sumedang seperti ucing sumput, egrang, dan rorodaan, guna memupuk karakter gotong royong dan kemandirian siswa.',
      targetDimensi: 'Dimensi Gotong Royong (Elemen Kolaborasi & Kepedulian) dan Dimensi Berkebinekaan Global (Elemen Mengenal Budaya Daerah).'
    },
    'Gaya Hidup Berkelanjutan': {
      projek: 'Pilah Sampah Jadi Berkah di SDN Margaasih',
      deskripsi: 'Murid belajar memahami dampak sampah plastik bagi kelestarian lingkungan sekolah, lalu mempraktikkan pemilahan sampah organik dan anorganik untuk diolah kembali menjadi pupuk kompos atau kerajinan tangan bernilai guna.',
      targetDimensi: 'Dimensi Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia (Elemen Akhlak kepada Alam) dan Dimensi Kreatif (Elemen Menghasilkan Karya).'
    },
    'Kewirausahaan': {
      projek: 'Kreasi Kuliner Tradisional Berbahan Singkong',
      deskripsi: 'Siswa kelas tinggi (Fase C) belajar mengolah komoditas lokal singkong khas pedesaan Conggeang menjadi jajanan modern kreatif, melakukan pengemasan, serta menyimulasikan pasar kelas (market day) di sekolah.',
      targetDimensi: 'Dimensi Mandiri (Elemen Regulasi Diri) dan Dimensi Kreatif (Elemen Keluwesan Berpikir dalam Memecahkan Masalah).'
    },
    'Bhinneka Tunggal Ika': {
      projek: 'Panggung Seni Nusantara Margaasih',
      deskripsi: 'Siswa berkolaborasi menggelar pentas budaya yang menampilkan rupa-rupa tarian, baju adat, lagu daerah, dan cerita rakyat dari berbagai pulau di Indonesia untuk meningkatkan rasa toleransi.',
      targetDimensi: 'Dimensi Berkebinekaan Global (Elemen Menghargai Perbedaan) dan Dimensi Bergotong Royong.'
    }
  };

  // Efek ketika merubah mata pelajaran (Intrakurikuler)
  const handleMapelChange = (selectedMapel) => {
    setMapel(selectedMapel);
    if (mapelTemplates[selectedMapel]) {
      const template = mapelTemplates[selectedMapel];
      setMateriPokok(template.materi);
      setFase(template.fase);
      setKelas(template.kelas);
      setCapaianPembelajaran(template.cp);
      setAlurTujuan(template.atp);
      setTujuanPembelajaran(template.tp);
      setBahanAjarRujukan(template.rujukan || '');
    }
    if (selectedMapel === 'Bahasa Sunda') {
      setDimensiList(prev => ({ ...prev, dim2: true }));
    }
  };

  // Efek ketika merubah Tema P5 (Kokurikuler)
  const handleTemaP5Change = (selectedTema) => {
    setTemaProjek(selectedTema);
    if (temaP5Templates[selectedTema]) {
      const template = temaP5Templates[selectedTema];
      setNamaProjek(template.projek);
      setDeskripsiProjek(template.deskripsi);
      setTargetDimensiProjek(template.targetDimensi);
    }
  };

  // Tambah / Hapus Tujuan Pembelajaran secara manual
  const handleAddTP = () => {
    if (inputTP.trim() !== '') {
      setTujuanPembelajaran([...tujuanPembelajaran, inputTP.trim()]);
      setInputTP('');
    }
  };

  const handleRemoveTP = (index) => {
    const updated = tujuanPembelajaran.filter((_, i) => i !== index);
    setTujuanPembelajaran(updated);
  };

  const handleMetodeCheckbox = (metode) => {
    if (metodeList.includes(metode)) {
      setMetodeList(metodeList.filter(item => item !== metode));
    } else {
      setMetodeList([...metodeList, metode]);
    }
  };

  // Model Pembelajaran Data (Untuk Intrakurikuler)
  const modelOptions = {
    'PjBL': {
      title: 'Project Based Learning (PjBL)',
      deskripsi: 'Menghasilkan karya atau proyek sederhana.',
      sintaks: [
        { tahap: 'Pertanyaan Mendasar', kegiatan: `Guru mengajukan masalah riil terkait ${materiPokok}. Siswa ditantang merencanakan pembuatan hasil karya sederhana yang memecahkan masalah tersebut secara berkelompok.` },
        { tahap: 'Mendesain Perencanaan Proyek', kegiatan: 'Siswa merancang sketsa gambar, mendata bahan alam/buatan yang diperlukan, serta membagi tugas kerja sama dalam kelompok masing-masing.' },
        { tahap: 'Menyusun Jadwal Pembuatan', kegiatan: 'Guru dan siswa menyepakati tenggat waktu durasi pengerjaan proyek (misal: 25 menit) beserta rincian langkah pengerjaan yang terstruktur.' },
        { tahap: 'Memonitor Perkembangan Proyek', kegiatan: 'Siswa merakit karya proyek mereka dengan aktif. Guru berkeliling memberikan umpan balik dan memberikan instruksi keamanan alat.' },
        { tahap: 'Menguji Hasil Karya', kegiatan: 'Masing-masing kelompok menampilkan hasil karya mereka di depan kelas. Kelompok lain dipandu untuk mengapresiasi dan memberikan saran.' },
        { tahap: 'Evaluasi Pengalaman Belajar', kegiatan: 'Guru dan siswa bersama-sama mengevaluasi kendala pengerjaan proyek serta mengonfirmasi prinsip keilmuan yang didapatkan.' }
      ]
    },
    'PBL': {
      title: 'Problem Based Learning (PBL)',
      deskripsi: 'Melatih pemecahan masalah kontekstual.',
      sintaks: [
        { tahap: 'Orientasi Peserta Didik pada Masalah', kegiatan: `Guru menyajikan gambar/narasi kasus kehidupan sehari-hari yang berkaitan dengan ${materiPokok}. Siswa diajak mengidentifikasi letak ketidaksesuaian masalah.` },
        { tahap: 'Mengorganisasikan Peserta Didik', kegiatan: 'Siswa berkumpul dalam kelompok heterogen. Mereka berbagi tugas penyelidikan untuk memecahkan teka-teki kasus yang diberikan di LKPD.' },
        { tahap: 'Membimbing Penyelidikan', kegiatan: 'Siswa mengumpulkan data konkret atau melakukan observasi fisik terarah di dalam ruang kelas. Guru memandu proses penalaran logis.' },
        { tahap: 'Menyajikan Hasil Karya', kegiatan: 'Siswa menuliskan simpulan pemecahan kasus pada lembar LKPD, lalu perwakilan kelompok mendemonstrasikan hasilnya di hadapan kelas.' },
        { tahap: 'Mengevaluasi Pemecahan Masalah', kegiatan: 'Guru meluruskan miskonsepsi yang sempat terjadi, memberikan konfirmasi kebenaran teoretis, dan memberikan penguatan nilai karakter.' }
      ]
    },
    'Inquiry': {
      title: 'Inquiry Learning',
      deskripsi: 'Sangat cocok untuk kegiatan penyelidikan terarah.',
      sintaks: [
        { tahap: 'Orientasi Lingkungan', kegiatan: 'Guru merangsang perhatian siswa terhadap objek-objek di sekitarnya yang memuat fenomena ilmiah.' },
        { tahap: 'Merumuskan Masalah', kegiatan: 'Siswa merumuskan hipotesis pertanyaan ilmiah mandiri terkait struktur atau perilaku objek pengamatan.' },
        { tahap: 'Mengumpulkan Data', kegiatan: 'Siswa mengumpulkan data konkret melalui observasi fisik, pengukuran, atau wawancara menggunakan lembar panduan LKPD.' },
        { tahap: 'Menguji Hipotesis', kegiatan: 'Siswa mencocokkan data observasi kelompok dengan praduga teoretis awal mereka secara kritis.' },
        { tahap: 'Merumuskan Kesimpulan', kegiatan: 'Siswa menyimpulkan prinsip ilmiah dasar yang didapat dan mempresentasikannya di mading kelas.' }
      ]
    },
    'Discovery': {
      title: 'Discovery Learning',
      deskripsi: 'Siswa didorong menemukan pola konsep secara mandiri.',
      sintaks: [
        { tahap: 'Pemberian Rangsangan (Stimulation)', kegiatan: `Guru meletakkan media peraga acak tentang ${materiPokok} di meja depan tanpa penjelasan lisan apa pun.` },
        { tahap: 'Identifikasi Masalah (Problem Statement)', kegiatan: 'Siswa didorong mengidentifikasi pola keanehan atau keunikan dari tumpukan benda tersebut.' },
        { tahap: 'Pengumpulan Data', kegiatan: 'Siswa maju secara bergantian untuk memegang, menyusun, dan mencatat urutan rupa benda di buku harian.' },
        { tahap: 'Pembuktian (Verification)', kegiatan: 'Siswa mencocokkan hasil analisis pola mandiri mereka dengan kunci kebenaran buku teks.' },
        { tahap: 'Generalisasi', kegiatan: 'Siswa secara mandiri merumuskan aturan umum/kesimpulan ilmiah dari apa yang telah mereka temukan.' }
      ]
    },
    'Cooperative': {
      title: 'Cooperative Learning (Think-Pair-Share)',
      deskripsi: 'Mengedepankan kolaborasi berpasangan sebelum pleno kelas.',
      sintaks: [
        { tahap: 'Thinking (Berpikir Mandiri)', kegiatan: 'Guru melempar satu studi kasus analitis kepada kelas. Siswa menganalisis pemecahannya secara mandiri terlebih dahulu.' },
        { tahap: 'Pairing (Berpasangan)', kegiatan: 'Siswa berdiskusi dengan teman sebangkunya untuk bertukar argumen, menyatukan gagasan, dan saling mengoreksi.' },
        { tahap: 'Sharing (Berbagi)', kegiatan: 'Setiap pasangan memaparkan gagasan gabungan mereka secara terbuka. Guru merangkum tanggapan seluruh pasangan.' },
        { tahap: 'Apresiasi Tim', kegiatan: 'Guru memberikan apresiasi prestasi kolaborasi kepada pasangan-pasangan terbaik.' }
      ]
    },
    'CTL': {
      title: 'Contextual Teaching and Learning (CTL)',
      deskripsi: 'Mengaitkan langsung konsep abstrak dengan kehidupan nyata siswa.',
      sintaks: [
        { tahap: 'Konstruktivisme', kegiatan: 'Siswa menggali ingatan pengalaman domestik harian mereka di lingkungan rumah masing-masing.' },
        { tahap: 'Pemodelan (Modeling)', kegiatan: 'Guru menyajikan model tiruan konkrit atau mendemonstrasikan perilaku objek di depan siswa.' },
        { tahap: 'Masyarakat Belajar', kegiatan: 'Siswa berdiskusi menyelesaikan tantangan fungsional benda secara melingkar di dalam kelompok belajar.' },
        { tahap: 'Refleksi Nyata', kegiatan: 'Siswa menulis jurnal harian singkat tentang pentingnya mengaplikasikan materi ini dalam keselamatan harian.' }
      ]
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const snippet = text.slice(0, 500);
        setBahanAjarRujukan(snippet + " (Diunggah dari rujukan file: " + file.name + ")");
        triggerToast('Bahan ajar berhasil diekstrak dari dokumen!');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800 font-sans print:bg-white print:text-black">
      
      {/* HEADER UTAMA (Sembunyi saat cetak) */}
      <header className="bg-slate-900 text-white py-4 px-6 flex justify-between items-center border-b border-indigo-500 shadow-md print:hidden shrink-0">
        <div className="flex items-center gap-3">
          <img src="https://iili.io/CR5u5s1.png" alt="Logo SDN Margaasih" className="h-10 w-10 object-contain bg-white rounded-full p-0.5" />
          <div>
            <h1 className="text-base font-bold uppercase tracking-wider">Aplikasi Generator Rencana Pembelajaran SDN Margaasih</h1>
            <p className="text-xs text-slate-400 font-medium font-sans">Kurikulum Merdeka Terintegrasi &amp; Deep Learning (Times New Roman 12, Spasi 1.5)</p>
          </div>
        </div>
        <div className="text-xs text-slate-400 text-right hidden md:block">
          <span>Conggeang, Kabupaten Sumedang</span>
        </div>
      </header>

      {/* TAB SYSTEM NAVIGATION (Sembunyi saat cetak) */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex justify-between items-center print:hidden shrink-0 shadow-sm">
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('form')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'form' 
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            1. Form Pengisian Parameter
          </button>
          <button 
            onClick={() => {
              setActiveTab('preview');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'preview' 
                ? 'bg-indigo-600 text-white border border-indigo-700 shadow animate-pulse' 
                : 'text-slate-600 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <Eye className="w-4 h-4" />
            2. Lihat Preview &amp; Cetak
          </button>
        </div>

        {/* Jenis Kegiatan Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider pl-1 text-[10px]">Jenis Kegiatan:</span>
          <button
            onClick={() => {
              setJenisKegiatan('Intrakurikuler');
              handleMapelChange('Matematika');
            }}
            className={`px-3 py-1 font-bold rounded-md transition ${jenisKegiatan === 'Intrakurikuler' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-white/60'}`}
          >
            Intrakurikuler
          </button>
          <button
            onClick={() => {
              setJenisKegiatan('Kokurikuler');
              setTemaProjek('Kearifan Lokal');
              setNamaProjek('Melestarikan Kaulinan Lembur Sumedang');
            }}
            className={`flex items-center gap-1 px-3 py-1 h-full text-xs font-bold rounded-md transition ${
              jenisKegiatan === 'Kokurikuler'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Kokurikuler (Projek P5)
          </button>
        </div>
      </div>

      {/* BODY AREA */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* VIEW 1: FORM PENGISIAN */}
        {activeTab === 'form' && (
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-5xl mx-auto w-full print:hidden">
            
            {/* IDENTITAS SEKOLAH, GURU, DAN KEPALA SEKOLAH */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
              
              <div className="flex items-center gap-2 border-b pb-3">
                <Sparkles className="text-indigo-600 w-5 h-5" />
                <h2 className="text-base font-bold text-slate-800">Langkah 1: Identitas Guru &amp; Kepala Sekolah</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Nama Guru Penyusun</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={penyusun} 
                      onChange={(e) => setPenyusun(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">NIP Guru</label>
                  <input 
                    type="text" 
                    value={nip} 
                    onChange={(e) => setNip(e.target.value)}
                    placeholder="Masukkan NIP Guru atau gunakan '-'"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Nama Kepala Sekolah</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={kepalaSekolah} 
                      onChange={(e) => setKepalaSekolah(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">NIP Kepala Sekolah</label>
                  <input 
                    type="text" 
                    value={nipKepalaSekolah} 
                    onChange={(e) => setNipKepalaSekolah(e.target.value)}
                    placeholder="Masukkan NIP Kepala Sekolah atau gunakan '-'"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Satuan Pendidikan</label>
                  <div className="relative">
                    <School className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={satuanPendidikan} 
                      onChange={(e) => setSatuanPendidikan(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Tahun Pelajaran</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={tahunPenyusunan} 
                      onChange={(e) => setTahunPenyusunan(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Semester</label>
                  <select 
                    value={semester} 
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded"
                  >
                    <option value="1">Semester 1 (Ganjil)</option>
                    <option value="2">Semester 2 (Genap)</option>
                  </select>
                </div>

                {/* Dinamis Base on Kegiatan Type */}
                {jenisKegiatan === 'Intrakurikuler' ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Pilih Mata Pelajaran</label>
                      <select 
                        value={mapel} 
                        onChange={(e) => handleMapelChange(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-indigo-50 border border-indigo-200 text-indigo-900 rounded font-semibold"
                      >
                        <option value="PAIBP">PAIBP</option>
                        <option value="Pendidikan Pancasila dan Kewarganegaraan">Pendidikan Pancasila dan Kewarganegaraan</option>
                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                        <option value="Matematika">Matematika</option>
                        <option value="Ilmu Pengetahuan Alam dan Sosial (IPAS)">Ilmu Pengetahuan Alam dan Sosial (IPAS)</option>
                        <option value="Pendidikan Jasmani, Olahraga, dan Kesehatan">Pendidikan Jasmani, Olahraga, dan Kesehatan</option>
                        <option value="Seni Budaya">Seni Budaya</option>
                        <option value="Bahasa Sunda">Bahasa Sunda</option>
                        <option value="Bahasa Inggris">Bahasa Inggris</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Materi Pokok</label>
                      <input 
                        type="text" 
                        value={materiPokok} 
                        onChange={(e) => setMateriPokok(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Pilih Tema Projek P5</label>
                      <select 
                        value={temaProjek} 
                        onChange={(e) => handleTemaP5Change(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-emerald-50 border border-emerald-200 text-emerald-900 rounded font-semibold"
                      >
                        <option value="Kearifan Lokal">Kearifan Lokal (Kaulinan Lembur / Kebudayaan)</option>
                        <option value="Gaya Hidup Berkelanjutan">Gaya Hidup Berkelanjutan (Lingkungan &amp; Sampah)</option>
                        <option value="Kewirausahaan">Kewirausahaan (Kuliner Tradisional Singkong)</option>
                        <option value="Bhinneka Tunggal Ika">Bhinneka Tunggal Ika (Pentas Seni Nusantara)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Nama Projek Kokurikuler</label>
                      <input 
                        type="text" 
                        value={namaProjek} 
                        onChange={(e) => setNamaProjek(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Fase</label>
                    <select 
                      value={fase} 
                      onChange={(e) => setFase(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded"
                    >
                      <option value="A">A (Kelas 1-2)</option>
                      <option value="B">B (Kelas 3-4)</option>
                      <option value="C">C (Kelas 5-6)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Kelas</label>
                    <select 
                      value={kelas} 
                      onChange={(e) => setKelas(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded"
                    >
                      <option value="I">I</option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                      <option value="V">V</option>
                      <option value="VI">VI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Alokasi Waktu</label>
                    <input type="text" value={alokasiWaktu} onChange={(e) => setAlokasiWaktu(e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Pendekatan Pembelajaran</label>
                  <select 
                    value={pendekatan} 
                    onChange={(e) => setPendekatan(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded"
                  >
                    <option value="Pendekatan Berpusat pada Murid (Student-Centered)">Berpusat pada Murid (Student-Centered)</option>
                    <option value="Pendekatan Saintifik (5M)">Saintifik (Scientific Approach)</option>
                    <option value="Pendekatan TPACK (Technological Pedagogical Content Knowledge)">TPACK (Integrasi Teknologi)</option>
                    <option value="Pendekatan Tafakur-Tadzakkur / Deep Learning">Tafakur-Tadzakkur (Deep Learning)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* INTEGRASI BAHAN AJAR (UPLOAD ATAU PASTE RUJUKAN) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 border-b pb-3">
                <BookOpenCheck className="text-indigo-600 w-5 h-5" />
                <h2 className="text-base font-bold text-slate-800">Langkah 2: Integrasikan Bahan Ajar / Sumber Belajar Rujukan</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div className="md:col-span-2 space-y-3">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Rujukan Teks / Ringkasan Materi Pelajaran</label>
                  <textarea 
                    rows="4"
                    value={bahanAjarRujukan}
                    onChange={(e) => setBahanAjarRujukan(e.target.value)}
                    placeholder="Tempel (paste) ringkasan materi pelajaran, teks buku paket, atau materi rujukan di sini agar generator menyisipkannya ke dalam Bab Bahan Ajar..."
                    className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 font-sans"
                  />
                </div>

                <div className="space-y-3 bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
                  <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-indigo-700" />
                    Unggah Berkas Bahan Ajar
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Unggah berkas bahan ajar lokal Anda (.txt atau .docx berformat teks biasa) untuk secara otomatis mengekstrak rujukan materinya.
                  </p>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".txt" 
                      onChange={handleFileUpload} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold py-2 px-3 rounded border border-slate-300 text-center flex items-center justify-center gap-2 transition shadow-sm">
                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                      Pilih Berkas Bahan Ajar
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DRAF CP, ATP, TP ATAU TARGET DIMENSI P5 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-2 border-b pb-3">
                <ListOrdered className="text-indigo-600 w-5 h-5" />
                <h2 className="text-base font-bold text-slate-800">
                  Langkah 3: Sesuaikan {jenisKegiatan === 'Kokurikuler' ? 'Parameter Projek P5' : 'CP, ATP, &amp; TP'}
                </h2>
              </div>

              {jenisKegiatan === 'Intrakurikuler' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Capaian Pembelajaran (CP) Elemen</label>
                    <textarea 
                      rows="3" 
                      value={capaianPembelajaran}
                      onChange={(e) => setCapaianPembelajaran(e.target.value)}
                      className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Alur Tujuan Pembelajaran (ATP)</label>
                    <textarea 
                      rows="4" 
                      value={alurTujuan}
                      onChange={(e) => setAlurTujuan(e.target.value)}
                      className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded font-mono text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Tujuan Pembelajaran (TP)</label>
                    <div className="space-y-2 mb-3">
                      {tujuanPembelajaran.map((tp, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-200 text-sm">
                          <span className="flex-1 pr-2">{tp}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveTP(idx)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={inputTP}
                        onChange={(e) => setInputTP(e.target.value)}
                        placeholder="Tambah tujuan pembelajaran baru..."
                        className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded"
                      />
                      <button 
                        type="button"
                        onClick={handleAddTP}
                        className="bg-slate-800 text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-1 hover:bg-slate-700 transition"
                      >
                        <Plus className="w-4 h-4" />
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Deskripsi Singkat Projek</label>
                    <textarea 
                      rows="3" 
                      value={deskripsiProjek}
                      onChange={(e) => setDeskripsiProjek(e.target.value)}
                      className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider font-semibold text-emerald-800">Target Dimensi &amp; Sub-Elemen Profil Pelajar Pancasila</label>
                    <textarea 
                      rows="3" 
                      value={targetDimensiProjek}
                      onChange={(e) => setTargetDimensiProjek(e.target.value)}
                      className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* MODEL, METODE, & DIMENSI */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Model Pembelajaran */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-1.5">
                    <BookOpen className="text-indigo-600 w-4 h-4" />
                    Model / Kerangka Pengolahan
                  </h3>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {Object.keys(modelOptions).map((key) => (
                      <label 
                        key={key}
                        className={`flex flex-col p-2.5 rounded border cursor-pointer transition-all ${
                          modelPembelajaran === key 
                            ? 'bg-indigo-50 border-indigo-500 shadow-sm' 
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-800">{modelOptions[key].title}</span>
                          <input 
                            type="radio" 
                            name="model" 
                            checked={modelPembelajaran === key}
                            onChange={() => setModelPembelajaran(key)}
                            className="text-indigo-600 focus:ring-indigo-500 h-3 w-3"
                          />
                        </div>
                        <span className="text-[11px] text-slate-500 mt-0.5">{modelOptions[key].deskripsi}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Metode Pembelajaran */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center gap-1.5">
                    <ListOrdered className="text-indigo-600 w-4 h-4" />
                    Metode Pelaksanaan
                  </h3>
                  <div className="grid grid-cols-1 gap-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
                    {['Diskusi Kelompok', 'Ceramah Interaktif', 'Tanya Jawab Pemantik', 'Demonstrasi Konkret', 'Penugasan Berbasis Aktivitas', 'Presentasi Hasil Karya', 'Permainan &amp; Gamifikasi'].map((m) => (
                      <label key={m} className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={metodeList.includes(m)}
                          onChange={() => handleMetodeCheckbox(m)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                        />
                        <span>{m}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Dimensi Profil Lulusan */}
              <div className="space-y-3 pt-4 border-t">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Layers className="text-indigo-600 w-4 h-4" />
                  Dimensi Profil Lulusan (SKL 2025)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
                  <label className="flex items-start space-x-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={dimensiList.dim1} onChange={(e) => setDimensiList({...dimensiList, dim1: e.target.checked})} className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Beriman, Bertakwa kepada Tuhan YME, &amp; Berakhlak Mulia</span>
                  </label>
                  <label className="flex items-start space-x-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={dimensiList.dim2} onChange={(e) => setDimensiList({...dimensiList, dim2: e.target.checked})} className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Berkebinekaan Global</span>
                  </label>
                  <label className="flex items-start space-x-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={dimensiList.dim3} onChange={(e) => setDimensiList({...dimensiList, dim3: e.target.checked})} className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Bergotong Royong</span>
                  </label>
                  <label className="flex items-start space-x-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={dimensiList.dim4} onChange={(e) => setDimensiList({...dimensiList, dim4: e.target.checked})} className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Mandiri</span>
                  </label>
                  <label className="flex items-start space-x-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={dimensiList.dim5} onChange={(e) => setDimensiList({...dimensiList, dim5: e.target.checked})} className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Bernalar Kritis</span>
                  </label>
                  <label className="flex items-start space-x-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={dimensiList.dim6} onChange={(e) => setDimensiList({...dimensiList, dim6: e.target.checked})} className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Kreatif</span>
                  </label>
                </div>
              </div>

            </div>

            {/* BUTTON KE TAB PREVIEW */}
            <div className="flex justify-end pt-4">
              <button 
                type="button"
                onClick={() => {
                  setActiveTab('preview');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 transition flex items-center gap-2 animate-pulse"
              >
                <span>Lihat Preview &amp; Cetak Modul</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        )}

        {/* VIEW 2: PREVIEW & CETAK DOKUMEN */}
        {activeTab === 'preview' && (
          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-100 flex flex-col items-center">
            
            {/* TOOLBAR NO-PRINT */}
            <div className="no-print w-full max-w-[210mm] flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-600">Dokumen {jenisKegiatan} Siap Cetak</span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 text-xs font-semibold rounded transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Salin Teks
                </button>
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded shadow-sm transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Cetak / Simpan PDF
                </button>
              </div>
            </div>

            {/* AREA DOKUMEN TIMES NEW ROMAN - SIAP CETAK */}
            <article 
              ref={printRef}
              className="w-full max-w-[210mm] min-h-[297mm] bg-white p-[20mm] md:p-[25mm] shadow-2xl border border-slate-300 print:shadow-none print:border-none print:p-0 print:m-0"
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '12pt',
                lineHeight: '1.5',
                color: '#000000',
                boxSizing: 'border-box'
              }}
            >
              {/* KOP SURAT SEKOLAH */}
              <div className="border-b-[4px] border-double border-black pb-3 mb-6 flex items-center">
                <div className="w-[15%] flex-shrink-0">
                  <img src="https://iili.io/CR5u5s1.png" alt="Logo SDN Margaasih" className="h-16 w-16 object-contain" />
                </div>
                <div className="flex-1 text-center pr-[10%]">
                  <h2 className="text-sm font-bold uppercase tracking-wider leading-tight">Pemerintah Kabupaten Sumedang</h2>
                  <h3 className="text-xs font-bold uppercase tracking-wider leading-none">Dinas Pendidikan</h3>
                  <h1 className="text-base font-extrabold uppercase tracking-widest mt-1">SD Negeri Margaasih</h1>
                  <p className="text-[9px] italic mt-1 leading-tight font-normal">Alamat: Dusun Tenjolaut RT.003 RW.001 Desa Padaasih, Kecamatan Conggeang, Kabupaten Sumedang, Kode Pos 45391</p>
                </div>
              </div>

              {/* JUDUL */}
              <div className="text-center mb-6">
                <h2 className="text-[12pt] font-bold uppercase tracking-wide">
                  {jenisKegiatan === 'Intrakurikuler' ? 'RANCANGAN PEMBELAJARAN DEEP LEARNING' : 'PANDUAN PROJEK KOKURIKULER (P5)'}
                </h2>
                <h2 className="text-[12pt] font-bold uppercase tracking-wide">
                  {jenisKegiatan === 'Intrakurikuler' ? `MATERI POKOK: ${materiPokok.toUpperCase()}` : `TEMA PROJEK: ${temaProjek.toUpperCase()}`}
                </h2>
              </div>

              {/* I. INFORMASI UMUM */}
              <div className="mb-6">
                <h3 className="font-bold underline mb-2">I. INFORMASI UMUM</h3>
                <table className="w-full text-[12pt]" style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td className="w-[30%] py-1 align-top">Nama Penyusun</td>
                      <td className="w-[3%] py-1 align-top">:</td>
                      <td className="w-[67%] py-1 align-top font-bold">{penyusun}</td>
                    </tr>
                    <tr>
                      <td className="py-1 align-top">NIP</td>
                      <td className="py-1 align-top">:</td>
                      <td className="py-1 align-top">{nip}</td>
                    </tr>
                    <tr>
                      <td className="py-1 align-top">Satuan Pendidikan</td>
                      <td className="py-1 align-top">:</td>
                      <td className="py-1 align-top">{satuanPendidikan}</td>
                    </tr>
                    <tr>
                      <td className="py-1 align-top">Tahun Pelajaran</td>
                      <td className="py-1 align-top">:</td>
                      <td className="py-1 align-top">{tahunPenyusunan}</td>
                    </tr>
                    {jenisKegiatan === 'Intrakurikuler' ? (
                      <>
                        <tr>
                          <td className="py-1 align-top">Mata Pelajaran</td>
                          <td className="py-1 align-top">:</td>
                          <td className="py-1 align-top font-semibold">{mapel}</td>
                        </tr>
                        <tr>
                          <td className="py-1 align-top">Materi Pokok</td>
                          <td className="py-1 align-top">:</td>
                          <td className="py-1 align-top font-bold">{materiPokok}</td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td className="py-1 align-top">Tema Projek P5</td>
                          <td className="py-1 align-top">:</td>
                          <td className="py-1 align-top font-semibold">{temaProjek}</td>
                        </tr>
                        <tr>
                          <td className="py-1 align-top">Nama Projek</td>
                          <td className="py-1 align-top">:</td>
                          <td className="py-1 align-top font-bold">{namaProjek}</td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td className="py-1 align-top">Fase / Kelas / Sem.</td>
                      <td className="py-1 align-top">:</td>
                      <td className="py-1 align-top">Fase {fase} / Kelas {kelas} / Semester {semester} ({semester === '1' ? 'Ganjil' : 'Genap'})</td>
                    </tr>
                    <tr>
                      <td className="py-1 align-top">Alokasi Waktu</td>
                      <td className="py-1 align-top">:</td>
                      <td className="py-1 align-top">{alokasiWaktu}</td>
                    </tr>
                    <tr>
                      <td className="py-1 align-top">Pendekatan</td>
                      <td className="py-1 align-top">:</td>
                      <td className="py-1 align-top">{pendekatan}</td>
                    </tr>
                    <tr>
                      <td className="py-1 align-top">Model Pelaksanaan</td>
                      <td className="py-1 align-top">:</td>
                      <td className="py-1 align-top font-semibold">{modelOptions[modelPembelajaran].title}</td>
                    </tr>
                    <tr>
                      <td className="py-1 align-top">Metode Pelaksanaan</td>
                      <td className="py-1 align-top">:</td>
                      <td className="py-1 align-top">{metodeList.join(', ')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* II. IDENTIFIKASI & ANALISIS KEBUTUHAN BELAJAR */}
              <div className="mb-6 page-break-before">
                <h3 className="font-bold underline mb-2">II. IDENTIFIKASI &amp; TARGET KARAKTER</h3>
                <div className="pl-4 space-y-2">
                  <p><strong>1. Analisis Kesiapan Belajar &amp; Latar Belakang:</strong></p>
                  <p className="text-justify pl-4">
                    {jenisKegiatan === 'Intrakurikuler' 
                      ? `Sebagian besar peserta didik di ${satuanPendidikan} memiliki pemahaman intuitif awal yang cukup baik mengenai topik ini. Namun, mereka memerlukan bantuan terstruktur untuk mengidentifikasi pola, struktur konsep, dan alur pemecahan masalah secara matematis/logis.` 
                      : `Siswa SDN Margaasih memerlukan wadah kokurikuler kontekstual untuk merefleksikan kembali nilai-nilai kearifan lokal daerah Sumedang, melestarikan ekosistem, serta melatih kolaborasi aktif melalui kegiatan projek ${namaProjek}.`
                    }
                  </p>
                  <p><strong>2. Minat Peserta Didik:</strong></p>
                  <p className="text-justify pl-4">
                    Peserta didik menunjukkan motivasi dan keterlibatan emosional (*engagement*) yang sangat tinggi apabila diberikan tantangan yang berinteraksi langsung dengan lingkungan fisik, kesenian, jajanan tradisional, maupun kolaborasi berkelompok.
                  </p>
                  
                  {jenisKegiatan === 'Intrakurikuler' ? (
                    <>
                      <p><strong>3. Klasifikasi Pengetahuan:</strong></p>
                      <ul className="list-disc pl-8">
                        <li><em>Pengetahuan Konseptual:</em> Memahami prinsip dasar, aturan, tata krama, dan konsep teoritis esensial dari {materiPokok}.</li>
                        <li><em>Pengetahuan Prosedural:</em> Langkah-langkah pelaksanaan praktik, pengisian lembar LKPD, dan penarikan kesimpulan logis.</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p><strong>3. Deskripsi Singkat Kegiatan Projek Kokurikuler:</strong></p>
                      <p className="text-justify pl-4 italic">
                        "{deskripsiProjek}"
                      </p>
                    </>
                  )}
                  
                  <p><strong>4. Dimensi Profil Pelajar Pancasila yang Disasar (SKL 2025):</strong></p>
                  <ul className="list-disc pl-8">
                    {jenisKegiatan === 'Intrakurikuler' ? (
                      <>
                        {dimensiList.dim1 && <li>Beriman, Bertakwa kepada Tuhan YME, &amp; Berakhlak Mulia</li>}
                        {dimensiList.dim2 && <li>Berkebinekaan Global (Apresiasi ragam adat &amp; seni lokal khas Sumedang)</li>}
                        {dimensiList.dim3 && <li>Bergotong Royong (Kolaborasi kelompok dalam kelas)</li>}
                        {dimensiList.dim4 && <li>Mandiri (Tanggung jawab pengerjaan asesmen mandiri)</li>}
                        {dimensiList.dim5 && <li>Bernalar Kritis (Analisis data pemecahan kasus)</li>}
                        {dimensiList.dim6 && <li>Kreatif (Penyajian karya kelompok)</li>}
                      </>
                    ) : (
                      <li className="font-semibold text-indigo-950">{targetDimensiProjek}</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* III. CAPAIAN, ALUR, & TUJUAN PEMBELAJARAN (UNTUK KOKURIKULER) */}
              <div className="mb-6">
                {jenisKegiatan === 'Intrakurikuler' ? (
                  <>
                    <h3 className="font-bold underline mb-2">III. CAPAIAN &amp; ALUR TUJUAN PEMBELAJARAN</h3>
                    <div className="pl-4 space-y-3">
                      <div>
                        <p className="font-semibold">A. Capaian Pembelajaran (CP) Elemen:</p>
                        <p className="text-justify pl-4 italic">"{capaianPembelajaran}"</p>
                      </div>
                      <div>
                        <p className="font-semibold">B. Alur Tujuan Pembelajaran (ATP):</p>
                        <div className="pl-4 whitespace-pre-line text-justify">{alurTujuan}</div>
                      </div>
                      <div>
                        <p className="font-semibold">C. Tujuan Pembelajaran (TP):</p>
                        <ol className="list-decimal pl-8 space-y-1">
                          {tujuanPembelajaran.map((tp, i) => (
                            <li key={i} className="text-justify">{tp}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold underline mb-2">III. ALUR DAN TARGET PENCAPAIAN PROJEK</h3>
                    <div className="pl-4 space-y-2">
                      <p><strong>A. Alur Kegiatan Utama Projek P5 (M-E-R-D-E-K-A):</strong></p>
                      <ol className="list-decimal pl-8 space-y-1 text-justify">
                        <li><strong>Mulai dari Diri (Sosialisasi):</strong> Murid menyimak pemaparan guru tentang makna penting pelestarian tema projek, mengidentifikasi ketertarikan awal murid.</li>
                        <li><strong>Eksplorasi Concept (Kontekstualisasi):</strong> Murid mengamati kondisi lingkungan sekitar SDN Margaasih yang relevan dengan tema projek.</li>
                        <li><strong>Ruang Kolaborasi (Aksi):</strong> Murid bekerja kelompok merancang, berkreasi, dan mempraktikkan langsung kegiatan projek kokurikuler secara gotong royong.</li>
                        <li><strong>Demonstrasi Kontekstual (Pameran Karya):</strong> Murid menggelar hasil karya proyek atau memamerkan simulasi produk di halaman sekolah.</li>
                        <li><strong>Elaborasi Pemahaman (Refleksi):</strong> Murid bersama fasilitator merefleksikan nilai-nilai karakter P5 yang telah diasah selama projek.</li>
                        <li><strong>Koneksi Antar Materi &amp; Aksi Nyata (Tindak Lanjut):</strong> Murid membiasakan karakter positif tersebut di rumah dan lingkungan tempat tinggalnya di Conggeang.</li>
                      </ol>
                    </div>
                  </>
                )}
              </div>

              {/* IV. SKENARIO LANGKAH-LANGKAH PEMBELAJARAN (TABLE FORMAT) */}
              <div className="mb-6 page-break-before">
                <h3 className="font-bold underline mb-3">IV. SKENARIO KEGIATAN PEMBELAJARAN MENDALAM (DEEP LEARNING)</h3>
                <table className="w-full text-[10pt] border border-black" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr className="bg-slate-100 border-b border-black text-left">
                      <th className="border border-black p-2 w-[18%]">Tahap / Fase</th>
                      <th className="border border-black p-2 w-[38%]">Aktivitas Guru (Fasilitator)</th>
                      <th className="border border-black p-2 w-[34%]">Aktivitas Murid</th>
                      <th className="border border-black p-2 w-[10%] text-center">Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Pendahuluan */}
                    <tr className="align-top">
                      <td className="border border-black p-2 font-bold">Pendahuluan</td>
                      <td className="border border-black p-2 text-justify">
                        1. Guru membuka kelas dengan mengucapkan salam hangat.<br />
                        2. Guru menunjuk ketua kelas memimpin doa bersama secara khidmat.<br />
                        3. Guru melakukan pemeriksaan absensi kehadiran.<br />
                        4. Guru mengajak siswa menyanyikan lagu nasional dengan penuh semangat.<br />
                        5. Apersepsi: Guru memberikan pertanyaan pemantik berbasis objek konkrit di kelas untuk memicu minat.
                      </td>
                      <td className="border border-black p-2 text-justify">
                        1. Siswa menjawab salam secara tertib.<br />
                        2. Siswa berdoa secara khusyuk.<br />
                        3. Siswa merespon panggilan absen.<br />
                        4. Siswa bernyanyi bersama.<br />
                        5. Siswa mengamati objek dan merespon pertanyaan pemantik secara kritis.
                      </td>
                      <td className="border border-black p-2 text-center font-bold">10 Menit</td>
                    </tr>
                    {/* Kegiatan Inti */}
                    {modelOptions[modelPembelajaran].sintaks.map((s, idx) => (
                      <tr key={idx} className="align-top">
                        <td className="border border-black p-2 font-bold">
                          Inti - Fase {idx + 1}<br />
                          <span className="text-[8pt] font-normal italic">{s.tahap}</span>
                        </td>
                        <td className="border border-black p-2 text-justify">
                          {s.kegiatan}
                        </td>
                        <td className="border border-black p-2 text-justify">
                          Siswa merespon, berpartisipasi aktif dalam kelompok heterogen, mengolah LKPD secara gotong royong, dan mempresentasikan hasil karya penyelidikan sesuai arahan fase guru.
                        </td>
                        <td className="border border-black p-2 text-center font-bold">
                          {idx === 2 ? '15 Menit' : '7 Menit'}
                        </td>
                      </tr>
                    ))}
                    {/* Penutup */}
                    <tr className="align-top">
                      <td className="border border-black p-2 font-bold">Penutup</td>
                      <td className="border border-black p-2 text-justify">
                        1. Guru memandu kuis interaktif yang menyenangkan di platform <strong>Wordwall</strong>.<br />
                        2. Guru bersama siswa merangkum poin penting pembelajaran.<br />
                        3. Guru membagikan PR evaluasi mandiri dan menutup dengan doa bersama.
                      </td>
                      <td className="border border-black p-2 text-justify">
                        1. Siswa menjawab kuis Wordwall secara klasikal gembira.<br />
                        2. Siswa merefleksikan perasaannya hari ini.<br />
                        3. Siswa berdoa penutup kelas secara tertib.
                      </td>
                      <td className="border border-black p-2 text-center font-bold">10 Menit</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* V. BAHAN AJAR, REFERENSI & YOUTUBE */}
              <div className="mb-6 page-break-before">
                <h3 className="font-bold underline mb-2">V. BAHAN AJAR, REFERENSI, &amp; MATERI RUJUKAN</h3>
                <div className="pl-4 space-y-2">
                  <p><strong>A. Buku Sumber:</strong> Buku Guru dan Panduan Pelaksanaan Projek Penguatan Profil Pelajar Pancasila (P5) Kemendikbudristek RI.</p>
                  <p><strong>B. Ringkasan Materi Rujukan Guru (Berdasarkan Sumber Belajar):</strong></p>
                  <div className="p-3 bg-slate-50 border border-black rounded text-justify text-[11pt] leading-relaxed italic">
                    "{bahanAjarRujukan}"
                  </div>
                  <p><strong>C. Media Konkrit:</strong> Peralatan penunjang demonstrasi karya, modul bahan lokal sekitar Sumedang, dan sarana proyeksi SDN Margaasih.</p>
                  <div className="p-3 bg-slate-50 border border-black flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg">
                    <span className="text-[11pt] font-semibold flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-red-600" />
                      Referensi Pendukung Video Pembelajaran YouTube:
                    </span>
                    <a 
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(jenisKegiatan === 'Intrakurikuler' ? mapel + ' ' + materiPokok : 'Projek P5 SD Tema ' + temaProjek)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-indigo-600 font-bold underline print:text-black mt-1 sm:mt-0"
                    >
                      Buka Video Pembelajaran (Klik Link)
                    </a>
                  </div>
                </div>
              </div>

              {/* VI. ASESMEN & EVALUASI */}
              <div className="mb-6">
                <h3 className="font-bold underline mb-2">VI. ASESMEN, TINDAK LANJUT, &amp; REFLEKSI</h3>
                
                <div className="pl-4 space-y-3">
                  <p className="font-semibold">A. Pemetaan Jenis Asesmen:</p>
                  <table className="w-full text-xs text-left border border-black" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr className="bg-slate-50 border-b border-black">
                        <th className="border border-black p-1.5">Jenis</th>
                        <th className="border border-black p-1.5">Teknik Penilaian</th>
                        <th className="border border-black p-1.5">Bentuk Instrumen</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-1.5 font-bold">Diagnostik</td>
                        <td className="border border-black p-1.5">Tanya Jawab Lisan &amp; Observasi</td>
                        <td className="border border-black p-1.5">Daftar Pertanyaan Pemantik Sederhana</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-1.5 font-bold">Formatif Sikap</td>
                        <td className="border border-black p-1.5">Observasi Perilaku Guru</td>
                        <td className="border border-black p-1.5">Rubrik Gotong Royong &amp; Bernalar Kritis</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-1.5 font-bold">Formatif Performa</td>
                        <td className="border border-black p-1.5">Unjuk Kerja Kinerja Kelompok</td>
                        <td className="border border-black p-1.5">Rubrik Penyelidikan &amp; Pengisian LKPD</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-1.5 font-bold">Sumatif</td>
                        <td className="border border-black p-1.5">Evaluasi Akhir Projek / Tes Tertulis</td>
                        <td className="border border-black p-1.5">Jurnal Laporan Projek atau Pilihan Ganda (PG)</td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="font-semibold">B. Skenario Tindak Lanjut Terstruktur:</p>
                  <table className="w-full text-xs text-left border border-black" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr className="bg-slate-50 border-b border-black">
                        <th className="border border-black p-1.5 w-[20%]">Program</th>
                        <th className="border border-black p-1.5 w-[60%]">Strategi Pembelajaran</th>
                        <th className="border border-black p-1.5 w-[20%]">Waktu &amp; Media</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-1.5 font-bold text-red-700 print:text-black">Remedial</td>
                        <td className="border border-black p-1.5 text-justify">Bimbingan belajar ulang terfokus secara individu atau kelompok kecil dengan alat peraga manipulasi visual konkrit yang lebih sederhana.</td>
                        <td className="border border-black p-1.5">15 menit pasca jam sekolah berakhir.</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-1.5 font-bold text-emerald-700 print:text-black">Pengayaan</td>
                        <td className="border border-black p-1.5 text-justify">Pemberian tugas eksplorasi berpikir tingkat tinggi (HOTS) atau kepemimpinan projek dalam aktivitas kokurikuler berkelanjutan.</td>
                        <td className="border border-black p-1.5">Mandiri di sekolah / rumah.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* VII. LAMPIRAN INSTRUMEN PENILAIAN KOMPLIT */}
              <div className="mb-6 page-break-before">
                <h3 className="font-bold underline mb-2">VII. LAMPIRAN INSTRUMEN PENILAIAN</h3>
                
                <div className="pl-4 space-y-4">
                  
                  {/* Lampiran 1: Asesmen Diagnostik */}
                  <div>
                    <p className="font-bold">A. Kisi-Kisi &amp; Lembar Penilaian Diagnostik Awal:</p>
                    <table className="w-full text-[10pt] border border-black text-left mb-4" style={{ borderCollapse: 'collapse' }}>
                      <thead>
                        <tr className="bg-slate-50 border-b border-black">
                          <th className="border border-black p-1.5 text-center w-[10%]">No</th>
                          <th className="border border-black p-1.5 w-[60%]">Instrumen Pertanyaan Diagnostik Kognitif/Non-Kognitif</th>
                          <th className="border border-black p-1.5 w-[30%]">Tindak Lanjut Pedagogis</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-black p-1.5 text-center">1</td>
                          <td className="border border-black p-1.5">"Bagaimana perasaanmu sebelum memulai aktivitas belajar kelompok hari ini?" (Non-Kognitif)</td>
                          <td className="border border-black p-1.5">Mempersiapkan motivasi belajar kelompok bagi siswa cemas.</td>
                        </tr>
                        <tr>
                          <td className="border border-black p-1.5 text-center">2</td>
                          <td className="border border-black p-1.5">"Sebutkan dua contoh benda nyata di dalam kelas yang memiliki ukuran berbeda!" (Kognitif)</td>
                          <td className="border border-black p-1.5">Menilai kesiapan kognitif awal siswa secara verbal.</td>
                        </tr>
                        <tr>
                          <td className="border border-black p-1.5 text-center">3</td>
                          <td className="border border-black p-1.5">"Bagaimana cara memastikan tinggi dua botol minuman dibandingkan secara adil?" (Kognitif)</td>
                          <td className="border border-black p-1.5">Mengukur pemahaman syarat kesetaraan alas (baseline).</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Lampiran 2: Formatif Sikap */}
                  <div>
                    <p className="font-bold">B. Lembar Rubrik Penilaian Formatif Sikap / Nilai P5:</p>
                    <table className="w-full text-[10pt] border border-black text-left" style={{ borderCollapse: 'collapse' }}>
                      <thead>
                        <tr className="bg-slate-50 border-b border-black">
                          <th className="border border-black p-1.5">Karakter / Dimensi</th>
                          <th className="border border-black p-1.5">Skor 4 (Sangat Baik)</th>
                          <th className="border border-black p-1.5">Skor 3 (Baik)</th>
                          <th className="border border-black p-1.5">Skor 2 (Cukup)</th>
                          <th className="border border-black p-1.5">Skor 1 (Kurang)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-black p-1.5 font-semibold">Bergotong Royong</td>
                          <td className="border border-black p-1.5">Sangat aktif bekerja sama, toleran, dan tuntas membantu anggota kelompok.</td>
                          <td className="border border-black p-1.5">Bekerja sama secara aktif menyelesaikan tugas kelompok secara adil.</td>
                          <td className="border border-black p-1.5">Hanya bekerja jika diminta khusus oleh rekan kelompoknya.</td>
                          <td className="border border-black p-1.5">Pasif dan tidak menunjukkan kepedulian terhadap tim.</td>
                        </tr>
                        <tr>
                          <td className="border border-black p-1.5 font-semibold">Bernalar Kritis / Mandiri</td>
                          <td className="border border-black p-1.5">Mampu merumuskan keputusan kelompok secara logis, kreatif, dan mandiri.</td>
                          <td className="border border-black p-1.5">Mampu menjawab teka-teki logika berdasarkan data nyata.</td>
                          <td className="border border-black p-1.5">Mengikuti jawaban rekan tanpa analisis mandiri.</td>
                          <td className="border border-black p-1.5">Pasif dan tidak menunjukkan nalar logis ilmiah.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Lampiran 3: Formatif Performa */}
                  <div className="page-break-before">
                    <p className="font-bold">C. Lembar Rubrik Penilaian Formatif Keterampilan Performa / Kinerja:</p>
                    <table className="w-full text-[10pt] border border-black text-left mb-4" style={{ borderCollapse: 'collapse' }}>
                      <thead>
                        <tr className="bg-slate-50 border-b border-black">
                          <th className="border border-black p-1.5">Kriteria Performa</th>
                          <th className="border border-black p-1.5">Skor 4 (Sangat Baik)</th>
                          <th className="border border-black p-1.5">Skor 3 (Baik)</th>
                          <th className="border border-black p-1.5">Skor 2 (Cukup)</th>
                          <th className="border border-black p-1.5">Skor 1 (Kurang)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-black p-1.5 font-semibold">Ketepatan Prosedur</td>
                          <td className="border border-black p-1.5">Melakukan perbandingan secara akurat di atas alas yang sejajar tanpa kesalahan.</td>
                          <td className="border border-black p-1.5">Melakukan perbandingan secara akurat dengan bantuan pengingat dari guru.</td>
                          <td className="border border-black p-1.5">Terjadi kesalahan prosedur, posisi alas benda diabaikan.</td>
                          <td className="border border-black p-1.5">Tidak mampu meragakan prosedur pembandingan benda secara logis.</td>
                        </tr>
                        <tr>
                          <td className="border border-black p-1.5 font-semibold">Kerapihan Laporan (LKPD)</td>
                          <td className="border border-black p-1.5">Menulis laporan secara rapi, sistematis, bersih, dan selesai tepat waktu.</td>
                          <td className="border border-black p-1.5">Menulis laporan secara rapi, terdapat sedikit coretan tidak perlu.</td>
                          <td className="border border-black p-1.5">Laporan kurang rapi, terdapat banyak coretan atau tidak terstruktur.</td>
                          <td className="border border-black p-1.5">Laporan tidak selesai, kotor, dan pengerjaan tertunda.</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-[10pt] italic">Rumus Nilai Performa: (Skor Perolehan / Skor Maksimal [8]) x 100</p>
                  </div>

                  {/* Lampiran 4: Soal Sumatif Ber-stimulus */}
                  <div className="page-break-before">
                    <p className="font-bold">D. Soal Asesmen Sumatif (Pilihan Ganda HOTS):</p>
                    <p className="text-[11pt] mb-2 font-semibold">Berilah tanda silang (X) pada huruf a, b, atau c pada jawaban yang paling tepat!</p>
                    <div className="border border-black p-4 space-y-4 text-justify text-[11pt]">
                      <div>
                        <p><strong>1. Perhatikan gambar ilustrasi berikut!</strong><br />
                        <br />
                        Pernyataan komparasi tinggi yang paling sesuai untuk menggambarkan gambar tersebut adalah...</p>
                        <p className="pl-4">a. Gedung Rumah Sakit lebih pendek daripada gedung sekolah dasar.</p>
                        <p className="pl-4 font-bold">b. Gedung Rumah Sakit lebih tinggi daripada gedung sekolah dasar.</p>
                        <p className="pl-4">c. Gedung Rumah Sakit sama tinggi dengan gedung sekolah dasar.</p>
                      </div>
                      <div>
                        <p><strong>2. Amatilah gambar tiga kemasan minuman ringan di bawah ini!</strong><br />
                        <br />
                        Urutan kemasan minuman di atas jika disusun dari yang <strong>paling tinggi ke yang paling pendek</strong> adalah...</p>
                        <p className="pl-4 font-bold">a. Kemasan A, Kemasan C, dan Kemasan B</p>
                        <p className="pl-4">b. Kemasan B, Kemasan C, dan Kemasan A</p>
                        <p className="pl-4">c. Kemasan C, Kemasan A, dan Kemasan B</p>
                      </div>
                      <div>
                        <p><strong>3. Ujang membandingkan tinggi kotak pensil di atas meja dengan menaruh kotak pensil miliknya berdiri di atas tumpukan buku tebal, sedangkan milik Asep di atas permukaan meja langsung. Mengapa cara tersebut kurang tepat?</strong></p>
                        <p className="pl-4">a. Karena warna kotak pensil mereka berbeda.</p>
                        <p className="pl-4 font-bold">b. Karena bagian bawah (alas) kedua kotak pensil diletakkan di tempat yang tidak sejajar tinggi permukaannya.</p>
                        <p className="pl-4">c. Karena tumpukan buku milik Ujang memiliki warna yang kotor.</p>
                      </div>
                      <div>
                        <p><strong>4. Perhatikan posisi tinggi dua tanaman hias berikut!</strong><br />
                        <br />
                        Hasil perbandingan tinggi yang benar dari kedua pohon tersebut menunjukkan bahwa...</p>
                        <p className="pl-4">a. Pohon Mawar lebih tinggi dari pohon Melati.</p>
                        <p className="pl-4">b. Pohon Mawar lebih pendek dari pohon Melati.</p>
                        <p className="pl-4 font-bold">c. Pohon Mawar sama tinggi dengan pohon Melati.</p>
                      </div>
                      <div>
                        <p><strong>5. Dina mempunyai pita merah sepanjang 15 cm. Soni mempunyai pita biru sepanjang 10 cm. Andi mempunyai pita hijau sepanjang 12 cm. Pernyataan logis yang tepat adalah...</strong></p>
                        <p className="pl-4 font-bold">a. Pita milik Dina merupakan pita yang paling panjang/tinggi jika didirikan.</p>
                        <p className="pl-4">b. Pita milik Soni lebih panjang dari pita milik Andi.</p>
                        <p className="pl-4">c. Pita milik Andi lebih pendek dari pita milik Soni.</p>
                      </div>
                    </div>
                    <div className="mt-3 text-xs pl-4">
                      <p><strong>Kunci Jawaban:</strong> 1 (B), 2 (A), 3 (B), 4 (C), 5 (A)</p>
                      <p><strong>Skor Penilaian:</strong> Setiap jawaban benar bernilai 1 poin. Nilai Akhir = (Skor Perolehan / Total Skor Maksimal [5]) x 100</p>
                    </div>
                  </div>

                  {/* Lampiran 5: Gemini Vision AI Integration */}
                  <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <p className="font-bold text-indigo-950 mb-1 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      E. Panduan Koreksi Otomatis Gambar Hasil Kerja Siswa (Gemini Vision AI):
                    </p>
                    <p className="text-[10pt] text-slate-700 leading-relaxed mb-2">
                      Guna menunjang efektivitas mengajar guru SDN Margaasih di era teknologi, Anda dapat berinteraksi langsung menggunakan gambar/foto hasil pengerjaan LKPD siswa. Ambil foto lembar kerja murid, unggah bersamaan dengan instruksi prompt di bawah ini:
                    </p>
                    <div className="p-2.5 bg-white border border-slate-300 rounded text-[9.5pt] font-mono leading-relaxed select-all cursor-pointer text-slate-800">
                      "Bertindaklah sebagai Asisten Korektor SDN Margaasih. Analisis gambar lembar hasil kerja tentang materi {jenisKegiatan === 'Intrakurikuler' ? materiPokok : namaProjek} ini. Evaluasi hasil pengerjaan tulisan tangan siswa sesuai rubrik penilaian. Berikan skor per aspek (skala 1-4) beserta justifikasi singkatnya, hitung nilai akhir dengan rumus baku, dan sertakan 2 kalimat umpan balik positif yang ramah anak dalam Bahasa Indonesia yang menyemangati murid!"
                    </div>
                  </div>

                </div>
              </div>

              {/* TANDA TANGAN */}
              <div className="mt-12 flex justify-between text-xs page-break-inside-avoid">
                <div className="w-[40%] text-center">
                  <p>Mengetahui,</p>
                  <p>Kepala Sekolah SD Negeri Margaasih</p>
                  <div className="h-20"></div>
                  <p className="font-bold underline">{kepalaSekolah}</p>
                  <p>NIP. {nipKepalaSekolah}</p>
                </div>
                <div className="w-[45%] text-center">
                  <p>Sumedang, Juni 2026</p>
                  <p>Guru Kelas,</p>
                  <div className="h-20"></div>
                  <p className="font-bold underline">{penyusun}</p>
                  <p>NIP. {nip}</p>
                </div>
              </div>

            </article>

            {/* Bottom Margin Helper */}
            <div className="h-10 print:hidden"></div>
          </div>
        )}

      </div>

      {/* TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white text-xs py-2.5 px-4 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700 z-50 animate-bounce print:hidden">
          <Check className="text-emerald-400 w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* STYLE KHUSUS PRINT */}
      <style>{`
        @media print {
          body {
            background-color: #ffffff !important;
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:text-black {
            color: #000000 !important;
          }
          .page-break-before {
            page-break-before: always;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
          @page {
            size: A4;
            margin: 2cm;
          }
        }
      `}</style>
    </div>
  );
}