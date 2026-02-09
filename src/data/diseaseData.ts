import { DiseaseInfo } from '@/types';

export const diseaseInfo: Record<string, DiseaseInfo> = {
  BLB: {
    name_id: 'Hawar Daun Bakteri (BLB - Bacterial Leaf Blight)',
    description:
      'Penyakit bakteri yang disebabkan oleh Xanthomonas oryzae pv. oryzae. Ditandai dengan bercak kebasahan pada tepi daun yang meluas dan mengering, menciptakan pola karakteristik.',
    symptoms: [
      'Bercak kebasahan di tepi daun dengan warna hijau gelap yang progresif',
      'Daun yang terinfeksi mengering dan berubah warna menjadi kecoklatan atau abu-abu tua',
      'Bintik-bintik putih kecil di sekitar bercak, terutama terlihat pada pagi hari',
      'Pada kondisi basah, bercak mengeluarkan cairan seperti air',
    ],
    validation_questions: [
      'Apakah bercak kebasahan muncul dari tepi daun dan meluas ke dalam?',
      'Apakah daun yang terinfeksi terlihat mengering dan berwarna kecoklatan/abu-abu?',
      'Apakah muncul bintik-bintik putih kecil (eksudat) di sekitar bercak pada pagi hari?',
    ],
    solution:
      'Penanganan: (1) Gunakan varietas padi yang tahan BLB (Ciherang, IR64, Selenio, dll). (2) Kurangi penggunaan pupuk nitrogen berlebihan. (3) Terapkan rotasi tanaman. (4) Aplikasikan antibiotik seperti streptomycin 0,5% - 1% dengan interval 7-10 hari. (5) Sanitasi alat dan lahan setelah panen. (6) Hindari tanam secara bersamaan di daerah yang sama.',
    image_examples: [
      '/images/symptoms/BLB1_02ca69d3-b850-4091-af2a-bb72a07b7cd1.jpeg',
      '/images/symptoms/BLB1_0cf4a332-f2d5-41f9-ae4d-5d5407753243.jpeg',
      '/images/symptoms/BLB1_1c9d9370-961e-452b-b43f-173d3276cba0.jpeg',
      '/images/symptoms/BLB1_2a216a71-ec74-4455-bafc-7451cd5cd4c7.jpeg',
      '/images/symptoms/BLB1_2aa28bb0-c122-419a-958c-ff37386615a6.jpeg',
    ],
    severity: 'severe',
  },

  BPH: {
    name_id: 'Wereng Batang Coklat (BPH - Brown Planthopper)',
    description:
      'Hama serangga kecil (Nilaparvata lugens) yang menyerang pangkal batang padi. Menyebabkan simtom "hopperburn" dimana tanaman mengering seperti terbakar dari pangkal ke atas.',
    symptoms: [
      'Padi mengering dan berubah warna coklat seperti terbakar (hopperburn), terutama dari pangkal batang',
      'Koloni wereng berwarna coklat kecil terlihat di pangkal batang padi, mudah bergerak dan terbang',
      'Tanaman menunjukkan pertumbuhan terhambat, kerdil, dan lambat berkembang',
      'Pada tahap awal, daun menguning dan mulai mengering dari ujung',
    ],
    validation_questions: [
      'Apakah tanaman padi terlihat mengering dan berwarna coklat seperti terbakar dari pangkal?',
      'Apakah terdapat koloni serangga kecil berwarna coklat di pangkal batang yang mudah bergerak?',
      'Apakah tanaman menunjukkan pertumbuhan kerdil dan lambat dibanding tanaman normal?',
    ],
    solution:
      'Penanganan: (1) Gunakan varietas padi yang tahan wereng batang coklat (IR64, Ciherang, Inpari). (2) Tanam padi secara serempak dalam satu wilayah untuk memutus siklus populasi. (3) Aplikasikan insektisida sistemik seperti imidakloprid atau fipronil 0,3% pada 5-30 HST. (4) Kontrol gulma yang menjadi inang alternatif. (5) Karantina benih dari daerah endemis. (6) Perhatian pada musim hujan ketika populasi wereng meningkat.',
    image_examples: [
      '/images/symptoms/BPH2_d83b138c-9dd0-4236-8ff8-cb001250a15d.jpeg',
      '/images/symptoms/BPH2_de511a54-0a1f-4ffa-8b87-e2c0b07dcc25.jpeg',
      '/images/symptoms/BPH2_df0954d4-1be7-4bc0-ac40-30d5c91d5d9e.jpeg',
      '/images/symptoms/BPH2_ef9b407f-24d0-4232-96af-7a021f1ebade.jpeg',
      '/images/symptoms/BPH2_f8c506f6-1a2e-48e8-b0f0-a7540e49dd23.jpeg',
    ],
    severity: 'severe',
  },

  Brown_Spot: {
    name_id: 'Bercak Coklat (Brown Spot - Helminthosporium)',
    description:
      'Penyakit jamur yang disebabkan oleh Bipolaris oryzae (sebelumnya Helminthosporium oryzae). Ditandai dengan bercak coklat berbentuk bulat atau oval dengan pusat hitam dan tepi kuning kecoklatan.',
    symptoms: [
      'Bercak coklat bulat atau oval pada daun dengan pusat berwarna coklat tua/hitam',
      'Tepi bercak berwarna kuning atau kuning kecoklatan yang membentuk lingkaran jelas',
      'Bercak dimulai dari daun lama (bawah) dan meluas ke daun muda (atas)',
      'Pada kondisi lembab, bercak dapat menghitam dan meluas dengan cepat',
      'Bila parah, bercak coklat juga muncul di sekam dan batang padi',
    ],
    validation_questions: [
      'Apakah bercak berbentuk bulat atau oval dengan pusat hitam dan tepi kuning kecoklatan?',
      'Apakah bercak dimulai dari daun bagian bawah (daun lama) dan meluas ke atas?',
      'Apakah pada kondisi basah/lembab, bercak menghitam dan meluas dengan cepat?',
    ],
    solution:
      'Penanganan: (1) Gunakan varietas padi yang toleran ( IR64, Ciherang, Pelita, Cisadane). (2) Aplikasikan fungisida berbahan aktif propikonazol atau azoksistrobin 0,25% - 0,5%, interval 10-14 hari, dimulai sejak bibit menunjukkan gejala. (3) Jangan menggunakan benih dari ladang terserang berat. (4) Keringkan tanah setelah penggenangan sebelum tanam. (5) Pemberian pupuk K dan Si dapat meningkatkan keracunan daun. (6) Sanitasi limbah pertanian.',
    image_examples: [
      '/images/symptoms/Brown_Spot1_1a205848-6c3a-4734-9ee5-0957ad55359a.jpeg',
      '/images/symptoms/Brown_Spot1_1b0235fe-2d8b-4cc7-b181-defd369780b2.jpeg',
      '/images/symptoms/Brown_Spot1_1cf0f37d-cfce-4dce-b15c-68d9bb7bdd6b.jpeg',
      '/images/symptoms/Brown_Spot1_1dc659a6-8e2e-4bd4-a740-8fd0ac610ae4.jpeg',
      '/images/symptoms/Brown_Spot1_1dd28938-7e89-45b4-b4da-1278d80c8cde.jpeg',
    ],
    severity: 'moderate',
  },

  False_Smut: {
    name_id: 'Bulu Palsu (False Smut - Ustilaginoidea virens)',
    description:
      'Penyakit jamur yang menyerang spikelet padi, menyebabkan butiran padi berubah menjadi sporokarp berwarna jingga-kuning yang menonjol keluar dari sekam. Terlihat seperti bulu palsu di malai.',
    symptoms: [
      'Sebagian butiran padi berubah membentuk massa berwarna jingga atau kuning cerah di dalam sekam',
      'Sporokarp menonjol keluar dari sekam padi, berbentuk bulat dan berpori',
      'Pada tahap lanjut, sporokarp berubah warna menjadi gelap/kehitaman seiring waktu',
      'Biasanya menyerang 5-10% dari spikelet per malai, jarang 100%',
      'Serbuk spora berwarna jingga atau yellow-green terlihat jelas pada kondisi berembun',
    ],
    validation_questions: [
      'Apakah malai padi menunjukkan butiran yang berubah menjadi massa berwarna jingga/kuning cerah?',
      'Apakah sporokarp menonjol keluar dari sekam padi dan berbentuk bulat berpori?',
      'Apakah hanya sebagian kecil dari butiran padi yang terserang (5-10% per malai)?',
    ],
    solution:
      'Penanganan: (1) Gunakan varietas padi dengan toleransi tinggi terhadap False Smut (Inpari, Merkubumen). (2) Terapkan tanam benih tepat waktu sesuai musim. (3) Aplikasikan fungisida sistemik seperti triadimenol 1% pada fase pembungaan, interval 7-10 hari. (4) Sanitasi dengan membuang malai terserang dari lahan. (5) Hindari penggunaan pupuk nitrogen berlebihan. (6) Perhatikan drainase lahan agar tidak tergenang terus-menerus.',
    image_examples: [
      '/images/symptoms/False_Smut1_32b92f8d-9741-4053-8b90-44ed1cd26dd7.jpeg',
      '/images/symptoms/False_Smut1_3c046e68-45af-48bf-980c-b7d0df31348d.jpeg',
      '/images/symptoms/False_Smut1_7d7a56f4-19fa-4e11-bab2-1d37bd6868b3.jpeg',
      '/images/symptoms/False_Smut1_7e78df5b-083a-4dd2-bf45-c7b89a902f6e.jpeg',
      '/images/symptoms/False_Smut1_81dd98cd-74b5-4f38-8e69-1615bc27370f.jpeg',
    ],
    severity: 'mild',
  },

  Healthy_Plant: {
    name_id: 'Tanaman Padi Sehat',
    description:
      'Tanaman padi Anda terlihat sehat dan tidak menunjukkan gejala penyakit atau serangan hama yang signifikan. Pertahankan perawatan budidaya yang baik untuk hasil optimal.',
    symptoms: [
      'Daun berwarna hijau cerah dan seragam',
      'Batang kokoh dan tidak ada pertumbuhan terhambat',
      'Tidak ada bercak, noda, atau perubahan warna abnormal pada daun',
      'Tanaman berkembang normal sesuai fase pertumbuhan',
      'Akar dan pangkal batang tampak sehat dan kuat',
    ],
    validation_questions: [],
    solution:
      'Manajemen tanaman sehat: (1) Lanjutkan pengelolaan air yang baik dengan penggenangan 5 cm saat tanaman muda, dan pertahankan kelembaban optimal. (2) Terapkan pemupukan sesuai rekomendasi: N 150 kg/ha, P 60 kg/ha, K 60 kg/ha dalam 3 fase. (3) Lakukan pengendalian gulma berkala. (4) Monitor tanaman secara rutin untuk deteksi dini penyakit/hama. (5) Panen pada umur 130-140 hari atau saat 90-95% butiran penuh. (6) Aplikasikan kapur/dolomit bila pH tanah rendah.',
    image_examples: [
      '/images/symptoms/Healthy1_0a4a4157-ed02-44a4-b8ed-f11b24ca3a65.jpeg',
      '/images/symptoms/Healthy1_1fd63c0a-34da-4e10-953d-10e722c86911.jpeg',
      '/images/symptoms/Healthy1_2ad29953-d287-4737-b758-973ecb7f1854.jpeg',
      '/images/symptoms/Healthy1_2b253bef-7dfb-43bc-9040-a120aa1c2cb4.jpeg',
      '/images/symptoms/Healthy1_3cbe4733-3312-491f-be7e-e8625eb853d5.jpeg',
    ],
    severity: 'healthy',
  },

  Hispa: {
    name_id: 'Kumbang Daun Hispa (Hispa - Dicladispa armigera)',
    description:
      'Hama serangga kumbang daun berwarna hijau metalik yang menyerang daun padi. Larva dan imago meninggalkan luka panjang dan garis-garis pada daun (mining damage), menyebabkan daun terlihat berlubang.',
    symptoms: [
      'Daun padi menunjukkan garis-garis atau terusan panjang berwarna putih keabu-abuan (luka mining)',
      'Daun terlihat berlubang seperti setir/coretan panjang dari larva dengan ukuran 1-2 mm lebar',
      'Kumbang Hispa berwarna hijau metalik dengan ukuran 3-5 mm dapat dilihat di permukaan daun saat pagi',
      'Pada serangan berat, daun berubah coklat dan kering',
      'Garis-garis keputihan terlihat jelas dari pangkal hingga ujung daun saat siang hari karena transparan',
    ],
    validation_questions: [
      'Apakah daun menunjukkan garis-garis panjang atau coretan seperti luka setir dari ujung hingga pangkal?',
      'Apakah terlihat serangga kumbang kecil berwarna hijau metalik (3-5 mm) di permukaan daun padi?',
      'Apakah area luka mining terlihat putih keabu-abuan berwarna transparan?',
    ],
    solution:
      'Penanganan: (1) Lakukan penyemprotan insektisida seperti karbofuran atau permetrin 0,5% pada stadia bibit sampai 4 minggu setelah tanam. (2) Taburi benih dengan insektisida sistemik (imidakloprid) sebelum tanam. (3) Tanam bersamaan di satu wilayah untuk mengurangi sumber hama. (4) Kontrol gulma alternatif. (5) Sanitasi sisa tanaman setelah panen. (6) Gunakan varietas yang lebih toleran jika tersedia. (7) Aplikasikan predator alami seperti laba-laba.',
    image_examples: [
      '/images/symptoms/Hispa1_0a493a19-5e39-41b4-b4b0-b5e7af2186cf.jpeg',
      '/images/symptoms/Hispa1_0fb49c3b-2e7c-418c-8d67-1663268be2d1.jpeg',
      '/images/symptoms/Hispa1_1a49e669-89ea-48af-8df3-104f6b75e132.jpeg',
      '/images/symptoms/Hispa1_1bae171f-48e0-4e8a-bee7-40bca0b2857b.jpeg',
      '/images/symptoms/Hispa1_3c5a60e0-a03f-433f-b29c-029c0447e0f6.jpeg',
    ],
    severity: 'moderate',
  },

  Neck_Blast: {
    name_id: 'Blas Leher (Neck Blast - Pyricularia oryzae)',
    description:
      'Penyakit jamur yang menyerang leher malai (ruas antara batang utama dan malai), menyebabkan bercak coklat-keyu dan kePatahan. Dapat menyebabkan kegagalan panen jika menyerang pada fase critical window.',
    symptoms: [
      'Bercak kecoklatan pada leher malai (neck node) dengan warna berkisar coklat tua hingga hitam',
      'Leher malai melemah dan sering terputus, menyebabkan malai terjatuh ke tanah',
      'Bercak dapat merambat ke ruas di atas dan di bawah leher malai',
      'Pada kondisi lembab, permukaan bercak tampak abu-abu karena spora jamur',
      'Jika malai terputus, hasil padi hilang sama sekali karena malai tidak dapat di panen',
    ],
    validation_questions: [
      'Apakah terlihat bercak coklat-kehitaman pada leher malai (antara batang dan malai)?',
      'Apakah leher malai melemah dan ada malai yang terputus atau terjatuh ke tanah?',
      'Apakah pada kondisi pagi hari, bercak tampak berbulu abu-abu (spora jamur)?',
    ],
    solution:
      'Penanganan: (1) Gunakan varietas padi tahan blas leher (Inpari, IR64, Ciherang, Selenio). (2) Aplikasikan fungisida pendahuluan seperti propikonazol atau azoksistrobin 0,3% - 0,5% pada fase primordium sampai antesis (memasuki pembungaan). (3) Hindari penggunaan nitrogen berlebihan karena meningkatkan kerentanan. (4) Terapkan sanitasi lahan pasca panen. (5) Jangan tanam padi di lahan yang baru saja ditanami padi pada musim sebelumnya. (6) Gunakan benih sehat dari sumber terpercaya.',
    image_examples: [
      '/images/symptoms/Neck_Blast1_00f6aa04-7ef4-42d6-a332-c006519679c3.jpeg',
      '/images/symptoms/Neck_Blast1_0aedd7cf-1737-4bb4-be89-b7bdf1ec377d.jpeg',
      '/images/symptoms/Neck_Blast1_0b5af6c4-9713-478d-a618-fdb91c92ea16.jpeg',
      '/images/symptoms/Neck_Blast1_0c6d6e06-b78f-4314-a358-708e328c9751.jpeg',
      '/images/symptoms/Neck_Blast1_0e30be6d-a41c-409f-b79b-b426aa15f63d.jpeg',
    ],
    severity: 'severe',
  },

  Sheath_Blight_Rot: {
    name_id: 'Penyakit Pelepah Batang (Sheath Blight - Rhizoctonia solani)',
    description:
      'Penyakit jamur yang disebabkan Rhizoctonia solani, menyerang pelepah daun dan batang. Ditandai dengan bercak berbentuk oval atau elips berwarna coklat terang dengan tepi gelap. Dapat merambat ke atas dan bawah batang.',
    symptoms: [
      'Bercak berbentuk oval atau elips pada pelepah daun dengan pusat coklat terang dan tepi coklat gelap yang jelas',
      'Bercak dimulai dari pelepah daun bawah dan merambat ke atas, bisa mencapai malai pada kondisi parah',
      'Pada kelembaban tinggi, bercak membesar dengan cepat dan bisa mengakibatkan busuk basah pada pelepah',
      'Warna pelepah yang sakit secara bertahap berubah menjadi coklat kehitaman dan kering',
      'Dalam kondisi lembab, terlihat seperti lapisan tipis berwarna abu-abu pada permukaan bercak (miselia)',
    ],
    validation_questions: [
      'Apakah bercak tampak berbentuk oval dengan pusat coklat terang dan tepi coklat gelap yang teratur?',
      'Apakah bercak dimulai dari pelepah daun bawah dan merambat ke atas menuju malai?',
      'Apakah pada kelembaban tinggi, permukaan bercak terlihat berbulu abu-abu (miselia jamur)?',
    ],
    solution:
      'Penanganan: (1) Aplikasikan fungisida preventif seperti propikonazol, azoksistrobin, atau triadimenol 0,3% - 1% dengan interval 7-10 hari dimulai saat tanaman tinggi 15-20 cm. (2) Hindari penggunaan nitrogen berlebihan dan jangan menggenang air secara terus-menerus yang meningkatkan kelembaban. (3) Terapkan rotasi tanaman dengan tanaman bukan padi. (4) Sanitasi sisa tanaman setelah panen dengan pembakaran atau penguburan. (5) Gunakan varietas dengan toleransi lebih baik jika memungkinkan. (6) Pastikan drainase lahan baik agar kelembaban tidak terlalu tinggi.',
    image_examples: [
      '/images/symptoms/Sheath_Blight_Rot1_0c83d0b5-4770-4851-a58a-a3a4e3f06b38.jpeg',
      '/images/symptoms/Sheath_Blight_Rot1_17cef619-d7ef-415e-b458-1874b5763620.jpeg',
      '/images/symptoms/Sheath_Blight_Rot1_1dd82019-75dd-49e8-a08b-d25e598d89f8.jpeg',
      '/images/symptoms/Sheath_Blight_Rot1_1f390bed-9947-4d78-8beb-881f8b3fedaa.jpeg',
      '/images/symptoms/Sheath_Blight_Rot1_6b8f9a6f-bf75-4851-a18f-f1b2ce134dd2.jpeg',
    ],
    severity: 'moderate',
  },

  Stemborer: {
    name_id: 'Penggerek Batang Berpita (Stemborer - Chilo suppressalis)',
    description:
      'Hama serangga penggerek batang yang larva-nya menggali terusan dalam batang padi, menyebabkan batang menjadi rapuh dan mudah patah. Gejala awal disebut "deadheart" dimana daun pucuk mengering.',
    symptoms: [
      'Daun pucuk (top leaf) mengering dan berwarna coklat-kemerahan tanpa gejala penyakit (deadheart), biasanya pada stadia bibit hingga 6 minggu setelah tanam',
      'Pada malai, bercak hitam terlihat pada ruas batang (entry point larva), dikelilingi serbuk coklat campuran ekskresi larva',
      'Batang padi yang terserang menjadi rapuh, mudah patah, dan sering terlihat berlubang ketika dipisahkan dari malai',
      'Larva transparan berwarna putih atau kuning muda (7-8 mm) dapat ditemukan di dalam terusan batang',
      'Malai tidak isi atau kosong karena larva merusak floem dan xilem yang mengangkut nutrisi',
    ],
    validation_questions: [
      'Apakah daun pucuk padi mengering dan berwarna coklat tanpa gejala penyakit terlihat (deadheart)?',
      'Apakah terlihat bercak hitam pada ruas batang dengan serbuk coklat (entry hole + frass) di sekitarnya?',
      'Apakah batang mudah patah dan di dalamnya ada larva transparan ketika dibelah?',
    ],
    solution:
      'Penanganan: (1) Aplikasikan pestisida granul sistemik seperti karbofuran 3% atau kartap 5% pada saat tanam atau 3-5 minggu setelah tanam. (2) Tanam dengan kepadatan yang tepat (tidak terlalu rapat) untuk mengurangi suawancekah untuk serangga. (3) Terapkan rotasi tanaman dan tanam serempak untuk memutus siklus hidup penggerek. (4) Kontrol gulma inang alternatif seperti rumput-rumputan liar. (5) Sanitasi limbah pertanian dan singkong (inang alternatif) di sekitar lokasi tanaman. (6) Gunakan pheromone trap untuk monitoring populasi penggerek. (7) Aplikasikan predator alami atau parasitoid jika memungkinkan.',
    image_examples: [
      '/images/symptoms/Stemborer1_0dc12146-2e11-4ddc-a389-bba6757178c5.jpeg',
      '/images/symptoms/Stemborer1_0efce5a2-cdd4-4299-92d6-d51c41fee596.jpeg',
      '/images/symptoms/Stemborer1_1fdd6497-76c0-49ff-8c08-b1f589c21476.jpeg',
      '/images/symptoms/Stemborer1_3c1c87d1-c08d-4b3e-b292-8eb3543f7058.jpeg',
      '/images/symptoms/Stemborer1_3d99fe0a-44ea-489a-a58c-b8035ce5435d.jpeg',
    ],
    severity: 'severe',
  },
};
