export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'student' | 'company' | 'school';
  photoUrl: string;
  phoneNumber: string;
  createdAt: string;
  studentProfile?: {
    schoolName: string;
    major: string;
    grade: string;
    nisn: string;
    skills: string[];
    resumeUrl: string;
    portfolioUrl: string;
  };
  companyProfile?: {
    companyName: string;
    industry: string;
    address: string;
    website: string;
    verified: boolean;
    mouWithSchools: string[];
  };
  schoolProfile?: {
    schoolName: string;
    npsn: string;
    contactPerson: string;
    address: string;
  };
}

export interface InternshipItem {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyVerified: boolean;
  title: string;
  category: string;
  targetMajors: string[];
  location: string;
  workType: 'WFO' | 'WFH' | 'Hybrid';
  stipendMonthly: number;
  stipendText: string;
  durationMonths: number;
  quota: number;
  description: string;
  requirements: string[];
  perks: string[];
  status: 'open' | 'closed' | 'draft';
  deadline: string;
  createdAt: string;
}

export interface ApplicationItem {
  id: string;
  internshipId: string;
  internshipTitle: string;
  studentId: string;
  studentName: string;
  studentSchool: string;
  studentMajor: string;
  companyId: string;
  companyName: string;
  status: 'applied' | 'in_review' | 'interview_scheduled' | 'accepted' | 'rejected';
  resumeUrl: string;
  coverLetter: string;
  appliedAt: string;
  updatedAt: string;
  interviewDate?: string;
}

export const INITIAL_USERS: UserProfile[] = [
  {
    uid: "usr_student_01",
    email: "rizky@smk.sch.id",
    displayName: "Rizky Pratama",
    role: "student",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phoneNumber: "+6281234567890",
    createdAt: "2026-01-10T08:00:00Z",
    studentProfile: {
      schoolName: "SMK Taruna Bhakti Depok",
      major: "Rekayasa Perangkat Lunak",
      grade: "Kelas 11 (Semester 2)",
      nisn: "0067891234",
      skills: ["Flutter", "Dart", "Firebase", "Git", "Figma"],
      resumeUrl: "https://storage.googleapis.com/magangkuy-cv/cv_rizky_pratama.pdf",
      portfolioUrl: "https://github.com/rizkypratama-dev"
    }
  },
  {
    uid: "comp_telkom_01",
    email: "hrd@telkom.co.id",
    displayName: "PT Nusantara Media Tech",
    role: "company",
    photoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    phoneNumber: "+62215551234",
    createdAt: "2025-11-20T08:00:00Z",
    companyProfile: {
      companyName: "PT Nusantara Media Tech",
      industry: "Information Technology & Software",
      address: "Kuningan, Jakarta Selatan",
      website: "https://nusantara-tech.id",
      verified: true,
      mouWithSchools: ["SMK Taruna Bhakti Depok", "SMKN 1 Jakarta", "SMK Telkom Sandhy Putra"]
    }
  },
  {
    uid: "sch_bkk_01",
    email: "bkk@smktarunabhakti.sch.id",
    displayName: "Drs. Bambang Sutrisno, M.Kom",
    role: "school",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phoneNumber: "+6281987654321",
    createdAt: "2025-08-15T08:00:00Z",
    schoolProfile: {
      schoolName: "SMK Taruna Bhakti Depok",
      npsn: "20229231",
      contactPerson: "Drs. Bambang Sutrisno (Ketua BKK)",
      address: "Jl. Pekapuran, Depok, Jawa Barat"
    }
  }
];

export const INITIAL_INTERNSHIPS: InternshipItem[] = [
  {
    id: "job_flutter_001",
    companyId: "comp_telkom_01",
    companyName: "PT Nusantara Media Tech",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    companyVerified: true,
    title: "Junior Mobile Developer (Flutter) Intern",
    category: "Rekayasa Perangkat Lunak",
    targetMajors: ["RPL", "SIJA", "Teknik Komputer"],
    location: "Jakarta Selatan",
    workType: "Hybrid",
    stipendMonthly: 1500000,
    stipendText: "Rp 1.500.000 / bln",
    durationMonths: 6,
    quota: 4,
    description: "Bergabung bersama tim Product Engineering kami untuk mengembangkan aplikasi mobile konsumen berbasis Flutter dan Firebase. Cocok untuk siswa SMK RPL yang bersemangat mengasah keahlian coding profesional, code review, dan kolaborasi Agile Scrum.",
    requirements: [
      "Siswa aktif SMK jurusan RPL atau SIJA (Kelas 11 atau 12)",
      "Memahami dasar bahasa pemrograman Dart dan Widget Tree Flutter",
      "Pernah menghubungkan aplikasi Flutter dengan Firebase atau REST API (proyek sekolah/pribadi)",
      "Mendapat surat rekomendasi / izin magang dari pihak sekolah / BKK",
      "Memiliki laptop pribadi dengan RAM minimal 8GB"
    ],
    perks: [
      "Uang saku bulanan Rp 1.500.000 & insentif transportasi",
      "Sertifikat Magang Industri resmi diakui Kemendikbudristek",
      "Mentoring 1-on-1 langsung dari Senior Flutter Engineer",
      "Kesempatan rekrutmen karyawan tetap setelah lulus SMK"
    ],
    status: "open",
    deadline: "30 Mei 2026",
    createdAt: "2026-03-01T08:00:00Z"
  },
  {
    id: "job_design_002",
    companyId: "comp_kreatif_02",
    companyName: "Kreatif Studio Indonesia",
    companyLogo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=150&auto=format&fit=crop&q=80",
    companyVerified: true,
    title: "UI/UX & Brand Graphic Designer Intern",
    category: "Desain Komunikasi Visual",
    targetMajors: ["DKV", "Multimedia", "Animasi"],
    location: "Bandung (Dago)",
    workType: "WFH",
    stipendMonthly: 1200000,
    stipendText: "Rp 1.200.000 / bln",
    durationMonths: 3,
    quota: 3,
    description: "Membantu desainer senior membuat aset media sosial, mockup wireframe di Figma, ilustrasi vektor, dan materi presentasi klien agensi digital.",
    requirements: [
      "Siswa SMK jurusan DKV, Multimedia, atau Desain Grafis",
      "Mahir menggunakan Figma, Adobe Illustrator, atau Canva Pro",
      "Menyertakan link portofolio karya visual/desain UI",
      "Kreatif, komunikatif, dan tepat waktu memenuhi deadline"
    ],
    perks: [
      "Uang saku Rp 1.200.000 / bulan",
      "Fleksibel kerja jarak jauh (Work From Home 100%)",
      "Akses subscription Adobe Creative Cloud & Figma Organization gratis",
      "Sertifikat industri dan surat penilaian BKK"
    ],
    status: "open",
    deadline: "15 Juni 2026",
    createdAt: "2026-03-05T08:00:00Z"
  },
  {
    id: "job_network_003",
    companyId: "comp_telko_03",
    companyName: "PT Telko Cyber Infra",
    companyLogo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&auto=format&fit=crop&q=80",
    companyVerified: true,
    title: "Junior Network & NOC Support Assistant",
    category: "Teknik Komputer & Jaringan",
    targetMajors: ["TKJ", "Sistem Informasi Jaringan", "Teknik Telekomunikasi"],
    location: "Surabaya Pusat",
    workType: "WFO",
    stipendMonthly: 1400000,
    stipendText: "Rp 1.400.000 / bln",
    durationMonths: 6,
    quota: 5,
    description: "Praktik langsung konfigurasi perangkat router & switch Mikrotik/Cisco, crimping kabel fiber optik & UTP, monitoring server di NOC room, dan troubleshooting jaringan klien B2B.",
    requirements: [
      "Siswa SMK kelas 11/12 jurusan TKJ / Telekomunikasi",
      "Paham konsep Subnetting, IP Addressing, VLAN, dan Routing dasar",
      "Siap bekerja di lapangan / Data Center Surabaya",
      "Disiplin, teliti, dan mematuhi SOP K3 (Keselamatan Kerja)"
    ],
    perks: [
      "Uang saku Rp 1.400.000 + Uang makan harian",
      "Pelatihan gratis sertifikasi MTCNA / CCNA dasar",
      "Peralatan safety dan seragam teknisi disediakan",
      "Sertifikat magang industri"
    ],
    status: "open",
    deadline: "20 Juni 2026",
    createdAt: "2026-03-10T08:00:00Z"
  },
  {
    id: "job_acc_004",
    companyId: "comp_bank_04",
    companyName: "Bank Syariah Prima",
    companyLogo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=150&auto=format&fit=crop&q=80",
    companyVerified: true,
    title: "Staff Administrasi & Keuangan PKL",
    category: "Akuntansi & Keuangan",
    targetMajors: ["Akuntansi", "Perbankan Syariah", "Manajemen Perkantoran"],
    location: "Jakarta Pusat",
    workType: "WFO",
    stipendMonthly: 1800000,
    stipendText: "Rp 1.800.000 / bln",
    durationMonths: 6,
    quota: 2,
    description: "Membantu proses rekonsiliasi data transaksi perbankan, pengarsipan berkas nasabah, input jurnal voucher di sistem SAP/Excel, dan pelayanan loket operasional magang.",
    requirements: [
      "Siswa SMK jurusan Akuntansi dan Keuangan Lembaga (AKL)",
      "Mahir Microsoft Excel (VLOOKUP, PIVOT, SUMIF)",
      "Berpenampilan rapi, teliti, jujur, dan berintegritas tinggi",
      "Nilai rapor mata pelajaran akuntansi memuaskan"
    ],
    perks: [
      "Uang saku tertinggi Rp 1.800.000 / bulan",
      "Makan siang disediakan di kantor",
      "Pengalaman resmi di sektor industri perbankan nasional",
      "Surat referensi kerja dari Kepala Cabang"
    ],
    status: "open",
    deadline: "10 Juli 2026",
    createdAt: "2026-03-12T08:00:00Z"
  },
  {
    id: "job_auto_005",
    companyId: "comp_auto_05",
    companyName: "Auto2000 Mitra Karawang",
    companyLogo: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=150&auto=format&fit=crop&q=80",
    companyVerified: true,
    title: "Teknisi Otomotif & Servis Berkala",
    category: "Teknik Otomotif",
    targetMajors: ["TKR (Teknik Kendaraan Ringan)", "TSM (Teknik Sepeda Motor)"],
    location: "Karawang Barat",
    workType: "WFO",
    stipendMonthly: 1600000,
    stipendText: "Rp 1.600.000 / bln",
    durationMonths: 6,
    quota: 6,
    description: "Mengikuti alur servis berkala kendaraan roda empat, rotasi ban, tune up mesin EFI, perbaikan sistem rem, dan standarisasi bengkel resmi authorized dealer.",
    requirements: [
      "Siswa SMK jurusan TKR Otomotif",
      "Memahami fungsi komponen mesin kendaraan & alat perkakas bengkel",
      "Fisik sehat dan siap mematuhi aturan kedisiplinan bengkel",
      "Membawa surat pengantar PKL dari sekolah"
    ],
    perks: [
      "Uang saku Rp 1.600.000 / bulan",
      "Free makan siang & susu operasional",
      "Sertifikasi kelayakan teknisi resmi dari principal",
      "Tool set & wearpack keselamatan kerja lengkap"
    ],
    status: "open",
    deadline: "25 Juli 2026",
    createdAt: "2026-03-14T08:00:00Z"
  },
  {
    id: "job_digmar_006",
    companyId: "comp_kuy_06",
    companyName: "KuyBelajar Edutech",
    companyLogo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80",
    companyVerified: false,
    title: "Digital Marketing & TikTok Content Creator",
    category: "Bisnis Digital",
    targetMajors: ["Bisnis Digital", "Pemasaran", "DKV"],
    location: "Yogyakarta",
    workType: "Hybrid",
    stipendMonthly: 1100000,
    stipendText: "Rp 1.100.000 / bln",
    durationMonths: 3,
    quota: 4,
    description: "Membuat video konten edukasi TikTok/Instagram Reels bertema tips belajar SMA/SMK, menganalisis performa postingan, dan live streaming interaktif.",
    requirements: [
      "Siswa SMK jurusan Bisnis Digital / Pemasaran / DKV",
      "Percaya diri di depan kamera dan kreatif mengikuti tren konten viral",
      "Bisa mengoperasikan CapCut atau Premiere Pro dasar",
      "Aktif di media sosial"
    ],
    perks: [
      "Uang saku bulanan + bonus jika video tembus FYP",
      "Lingkungan kerja startup yang santai dan seru",
      "Sertifikat magang industri digital"
    ],
    status: "open",
    deadline: "1 Agustus 2026",
    createdAt: "2026-03-16T08:00:00Z"
  }
];

export const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: "app_sample_101",
    internshipId: "job_flutter_001",
    internshipTitle: "Junior Mobile Developer (Flutter) Intern",
    studentId: "usr_student_01",
    studentName: "Rizky Pratama",
    studentSchool: "SMK Taruna Bhakti Depok",
    studentMajor: "Rekayasa Perangkat Lunak",
    companyId: "comp_telkom_01",
    companyName: "PT Nusantara Media Tech",
    status: "in_review",
    resumeUrl: "https://storage.googleapis.com/magangkuy-cv/cv_rizky.pdf",
    coverLetter: "Saya siswa kelas 11 RPL yang sangat tertarik memperdalam Flutter dan berkontribusi nyata di PT Nusantara Media Tech.",
    appliedAt: "2026-03-12T09:15:00Z",
    updatedAt: "2026-03-13T14:30:00Z"
  }
];
