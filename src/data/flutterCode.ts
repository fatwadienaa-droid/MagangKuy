/**
 * Production-ready Flutter Dart Code and Firebase Architecture for MagangKuy
 * Application targeting Indonesian High School & Vocational Students (SMA/SMK)
 */

export const FIRESTORE_SCHEMA_DATA = {
  users: {
    description: "Stores user profiles across three distinct roles: Student (Siswa), Company (Perusahaan Mitra), and School Admin (Guru/Koordinator BKK).",
    fields: [
      { name: "uid", type: "string", description: "Firebase Auth User UID (Document ID)", sample: "usr_student_01" },
      { name: "email", type: "string", description: "Registered email address", sample: "rizky.pratama@smk.sch.id" },
      { name: "displayName", type: "string", description: "Full name of the user or company", sample: "Rizky Pratama" },
      { name: "role", type: "string", description: "'student' | 'company' | 'school'", sample: "student" },
      { name: "photoUrl", type: "string (optional)", description: "Avatar or company logo URL", sample: "https://images.unsplash.com/photo-1534528741775-53994a69daeb" },
      { name: "phoneNumber", type: "string", description: "WhatsApp / phone number for interview invites", sample: "+6281234567890" },
      { name: "createdAt", type: "timestamp", description: "Server timestamp of registration", sample: "2026-03-01T08:00:00Z" },
      { name: "studentProfile", type: "map (optional)", description: "Populated when role == 'student'", sample: "{\n  schoolName: 'SMK Taruna Bhakti',\n  major: 'Rekayasa Perangkat Lunak (RPL)',\n  grade: 'Kelas 11',\n  nisn: '0067891234',\n  skills: ['Flutter', 'Dart', 'Figma', 'Git'],\n  resumeUrl: 'https://storage.googleapis.com/.../cv_rizky.pdf',\n  portfolioUrl: 'https://github.com/rizkydev'\n}" },
      { name: "companyProfile", type: "map (optional)", description: "Populated when role == 'company'", sample: "{\n  companyName: 'PT Telkom Indonesia Digital',\n  industry: 'Information Technology',\n  address: 'Jakarta Selatan, DKI Jakarta',\n  website: 'https://telkom.co.id',\n  verified: true,\n  mouWithSchools: ['SMK Taruna Bhakti', 'SMKN 1 Jakarta']\n}" },
      { name: "schoolProfile", type: "map (optional)", description: "Populated when role == 'school'", sample: "{\n  schoolName: 'SMK Taruna Bhakti Depok',\n  npsn: '20229231',\n  contactPerson: 'Drs. Bambang Sutrisno, M.Kom',\n  address: 'Jl. Pekapuran, Depok, Jawa Barat'\n}" }
    ]
  },
  internships: {
    description: "Contains all internship/PKL opportunities posted by verified companies, targeted to vocational school majors.",
    fields: [
      { name: "id", type: "string", description: "Firestore generated Document ID", sample: "job_flutter_001" },
      { name: "companyId", type: "string", description: "Reference to users collection (company UID)", sample: "comp_telkom_01" },
      { name: "companyName", type: "string", description: "Cached company name for rapid querying", sample: "PT Nusantara Media Tech" },
      { name: "companyLogo", type: "string", description: "Company logo URL", sample: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe" },
      { name: "title", type: "string", description: "Position title", sample: "Junior Mobile Developer (Flutter) Intern" },
      { name: "category", type: "string", description: "General field category (IT, Design, Accounting, etc.)", sample: "Rekayasa Perangkat Lunak" },
      { name: "targetMajors", type: "array<string>", description: "Eligible SMK/SMA majors", sample: "['RPL', 'SIJA', 'Teknik Informatika']" },
      { name: "location", type: "string", description: "City / district", sample: "Jakarta Selatan (Kuningan)" },
      { name: "workType", type: "string", description: "'WFO' | 'WFH' | 'Hybrid'", sample: "Hybrid" },
      { name: "stipendMonthly", type: "number", description: "Monthly stipend in IDR (0 if unpaid)", sample: "1500000" },
      { name: "stipendText", type: "string", description: "Human friendly stipend description", sample: "Rp 1.500.000 / bulan + Transport" },
      { name: "durationMonths", type: "number", description: "PKL duration in months (typically 3 or 6 months)", sample: "6" },
      { name: "quota", type: "number", description: "Number of students accepted", sample: "4" },
      { name: "description", type: "string", description: "Detailed job role overview", sample: "Membantu tim mobile engineer membangun fitur baru di aplikasi klien, belajar state management Bloc, dan integrasi REST API." },
      { name: "requirements", type: "array<string>", description: "List of requirements for SMA/SMK students", sample: "['Siswa SMK jurusan RPL/SIJA kelas 11 atau 12', 'Menguasai dasar Dart & Flutter widget tree', 'Memiliki laptop sendiri', 'Mendapat surat izin rekomendasi sekolah/BKK']" },
      { name: "perks", type: "array<string>", description: "Internship benefits", sample: "['Sertifikat PKL Resmi Kemendikbud', 'Mentoring 1-on-1 dari Senior Tech Lead', 'Uang Saku & Uang Makan', 'Free Snack & Kopi di Kantor']" },
      { name: "status", type: "string", description: "'open' | 'closed' | 'draft'", sample: "open" },
      { name: "deadline", type: "timestamp", description: "Application closing deadline", sample: "2026-05-30T23:59:59Z" },
      { name: "createdAt", type: "timestamp", description: "Creation timestamp", sample: "2026-03-01T08:00:00Z" }
    ]
  },
  applications: {
    description: "Tracks student internship submissions and application lifecycles from submission through review, interview, and acceptance.",
    fields: [
      { name: "id", type: "string", description: "Document ID", sample: "app_982317" },
      { name: "internshipId", type: "string", description: "Target internship Document ID", sample: "job_flutter_001" },
      { name: "internshipTitle", type: "string", description: "Cached position title for student history", sample: "Junior Mobile Developer (Flutter) Intern" },
      { name: "studentId", type: "string", description: "Applicant UID from users collection", sample: "usr_student_01" },
      { name: "studentName", type: "string", description: "Applicant full name", sample: "Rizky Pratama" },
      { name: "studentSchool", type: "string", description: "Applicant SMK / SMA name", sample: "SMK Taruna Bhakti" },
      { name: "studentMajor", type: "string", description: "Applicant vocational major", sample: "Rekayasa Perangkat Lunak (RPL)" },
      { name: "companyId", type: "string", description: "Recipient company UID", sample: "comp_telkom_01" },
      { name: "companyName", type: "string", description: "Company name", sample: "PT Nusantara Media Tech" },
      { name: "status", type: "string", description: "'applied' | 'in_review' | 'interview_scheduled' | 'accepted' | 'rejected'", sample: "applied" },
      { name: "resumeUrl", type: "string", description: "URL to uploaded CV / Portfolio PDF", sample: "https://storage.googleapis.com/.../cv_rizky.pdf" },
      { name: "coverLetter", type: "string", description: "Brief pitch from the student", sample: "Saya sangat bersemangat untuk magang di tim Mobile Apps untuk mempraktikkan Flutter dan berkontribusi langsung pada proyek nyata." },
      { name: "interviewDate", type: "timestamp (optional)", description: "Scheduled interview date if shortlisted", sample: "null" },
      { name: "feedbackNotes", type: "string (optional)", description: "HR review feedback note", sample: "" },
      { name: "appliedAt", type: "timestamp", description: "Timestamp of application", sample: "2026-03-15T10:30:00Z" },
      { name: "updatedAt", type: "timestamp", description: "Last state change timestamp", sample: "2026-03-15T10:30:00Z" }
    ]
  }
};

export const FIRESTORE_RULES_CODE = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions for clean & secure authorization
    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    // Fetches the user document to verify roles securely from the database
    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }

    function hasRole(requiredRole) {
      return isSignedIn() && getUserData().role == requiredRole;
    }

    // ==========================================
    // 1. USERS COLLECTION
    // ==========================================
    // Authenticated users can read profiles.
    // Users can only create and edit their own profile.
    match /users/{userId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn() && request.auth.uid == userId;
      allow update: if isOwner(userId) && 
        // Prevent users from tampering with their role after creation
        (!request.resource.data.diff(resource.data).affectedKeys().hasAny(['role']));
      allow delete: if false; // Soft delete only via backend admin
    }

    // ==========================================
    // 2. INTERNSHIPS COLLECTION
    // ==========================================
    // Anyone signed in can browse active internships.
    // Only verified Company accounts can create, update, or archive internships.
    match /internships/{internshipId} {
      // Students, schools, and companies can read all published listings
      allow read: if isSignedIn();

      // Only companies can create job postings, and companyId must match auth.uid
      allow create: if hasRole('company') && 
        request.resource.data.companyId == request.auth.uid &&
        request.resource.data.status in ['open', 'draft'];

      // Only the company owner can edit or close their own listing
      allow update: if hasRole('company') && 
        resource.data.companyId == request.auth.uid;

      // Restrict deletion to prevent accidental data loss (set status: 'closed' instead)
      allow delete: if hasRole('company') && 
        resource.data.companyId == request.auth.uid;
    }

    // ==========================================
    // 3. APPLICATIONS COLLECTION
    // ==========================================
    // Students can submit and view their own applications.
    // Companies can read & update status for applications directed to their company.
    // School admins can read applications of their enrolled students.
    match /applications/{applicationId} {
      // Read access: Student owner OR recipient Company OR School Admin
      allow read: if isSignedIn() && (
        resource.data.studentId == request.auth.uid ||
        resource.data.companyId == request.auth.uid ||
        hasRole('school')
      );

      // Create access: Only verified students can submit applications for themselves
      allow create: if hasRole('student') && 
        request.resource.data.studentId == request.auth.uid &&
        request.resource.data.status == 'applied';

      // Update access: 
      // - Company can update status ('in_review', 'interview_scheduled', 'accepted', 'rejected')
      // - Student can cancel their application if still in 'applied' status
      allow update: if isSignedIn() && (
        (resource.data.companyId == request.auth.uid && hasRole('company')) ||
        (resource.data.studentId == request.auth.uid && resource.data.status == 'applied')
      );

      allow delete: if false;
    }
  }
}`;

export const FLUTTER_MAIN_DART = `// ============================================================================
// FILE: lib/main.dart
// MAGANGKUY - Mobile Internship Finder for Vocational & High School Students
// Modern, Minimalist Gen-Z Theme with Firebase Auth & Role-based Routing
// ============================================================================

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:google_fonts/google_fonts.dart';

// Screen Imports
import 'screens/login_screen.dart';
import 'screens/student_dashboard.dart';
import 'screens/company_dashboard.dart';
import 'screens/school_dashboard.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Set preferred mobile system UI overlay style
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
      systemNavigationBarColor: Colors.white,
      systemNavigationBarIconBrightness: Brightness.dark,
    ),
  );

  // Initialize Firebase App
  // Note: For production, generate firebase_options.dart using 'flutterfire configure'
  try {
    await Firebase.initializeApp();
  } catch (e) {
    debugPrint('Firebase initialization error: $e');
  }

  runApp(const MagangKuyApp());
}

class MagangKuyApp extends StatelessWidget {
  const MagangKuyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Gen-Z Friendly Color Palette: Electric Indigo, Vivid Violet, Emerald & Warm Amber
    const primaryIndigo = Color(0xFF4F46E5);
    const accentViolet = Color(0xFF7C3AED);
    const bgLight = Color(0xFFF8FAFC);
    const textDark = Color(0xFF0F172A);

    return MaterialApp(
      title: 'MagangKuy',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: bgLight,
        colorScheme: ColorScheme.fromSeed(
          seedColor: primaryIndigo,
          primary: primaryIndigo,
          secondary: accentViolet,
          surface: Colors.white,
          brightness: Brightness.light,
        ),
        textTheme: GoogleFonts.plusJakartaSansTextTheme(
          Theme.of(context).textTheme,
        ).apply(
          bodyColor: textDark,
          displayColor: textDark,
        ),
        appBarTheme: AppBarTheme(
          elevation: 0,
          backgroundColor: Colors.white,
          foregroundColor: textDark,
          centerTitle: false,
          titleTextStyle: GoogleFonts.plusJakartaSans(
            fontSize: 20,
            fontWeight: FontWeight.w700,
            color: textDark,
          ),
        ),
        cardTheme: CardTheme(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
            side: const BorderSide(color: Color(0xFFF1F5F9), width: 1.5),
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: primaryIndigo,
            foregroundColor: Colors.white,
            elevation: 0,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            textStyle: GoogleFonts.plusJakartaSans(
              fontSize: 16,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white,
          contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: Color(0xFFE2E8F0), width: 1.5),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: Color(0xFFE2E8F0), width: 1.5),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: primaryIndigo, width: 2),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: Color(0xFFEF4444), width: 1.5),
          ),
        ),
      ),
      home: const AuthGatekeeper(),
      routes: {
        '/login': (context) => const LoginScreen(),
        '/student_dashboard': (context) => const StudentDashboard(),
        '/company_dashboard': (context) => const CompanyDashboard(),
        '/school_dashboard': (context) => const SchoolDashboard(),
      },
    );
  }
}

/// Listens to Firebase Auth changes and routes user dynamically based on their role in Firestore
class AuthGatekeeper extends StatelessWidget {
  const AuthGatekeeper({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        // While checking auth status
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            body: Center(
              child: CircularProgressIndicator(color: Color(0xFF4F46E5)),
            ),
          );
        }

        // If not logged in, show Login Screen
        if (!snapshot.hasData || snapshot.data == null) {
          return const LoginScreen();
        }

        // User is logged in, query user document from Firestore to read their role
        final uid = snapshot.data!.uid;
        return FutureBuilder<DocumentSnapshot>(
          future: FirebaseFirestore.instance.collection('users').doc(uid).get(),
          builder: (context, userDocSnapshot) {
            if (userDocSnapshot.connectionState == ConnectionState.waiting) {
              return const Scaffold(
                body: Center(
                  child: CircularProgressIndicator(color: Color(0xFF4F46E5)),
                ),
              );
            }

            if (!userDocSnapshot.hasData || !userDocSnapshot.data!.exists) {
              // User document missing or incomplete profile, fallback to login
              return const LoginScreen();
            }

            final data = userDocSnapshot.data!.data() as Map<String, dynamic>?;
            final role = data?['role'] as String? ?? 'student';

            // Route dynamically based on user role stored in Firestore
            switch (role) {
              case 'company':
                return const CompanyDashboard();
              case 'school':
                return const SchoolDashboard();
              case 'student':
              default:
                return const StudentDashboard();
            }
          },
        );
      },
    );
  }
}
`;

export const FLUTTER_LOGIN_SCREEN_DART = `// ============================================================================
// FILE: lib/screens/login_screen.dart
// MAGANGKUY - Clean, Minimalist Gen-Z Auth Screen
// Supports Role Selection (Siswa SMK/SMA, Mitra Perusahaan, Guru/BKK Sekolah)
// ============================================================================

import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:google_fonts/google_fonts.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  // Selected Role for initial sign-in validation: 'student', 'company', 'school'
  String _selectedRole = 'student';
  bool _isLoading = false;
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  /// Authenticate with Firebase Auth and verify the user's role against Firestore
  Future<void> _handleLogin() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      // 1. Sign in with Firebase Authentication
      final credential = await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: _emailController.text.trim(),
        password: _passwordController.text,
      );

      final uid = credential.user?.uid;
      if (uid == null) throw Exception("User ID tidak ditemukan");

      // 2. Fetch User Profile from Firestore to verify assigned Role
      final userDoc = await FirebaseFirestore.instance.collection('users').doc(uid).get();

      if (!userDoc.exists) {
        throw FirebaseAuthException(
          code: 'user-not-found',
          message: 'Data profil pengguna belum terdaftar di Firestore database.',
        );
      }

      final userData = userDoc.data()!;
      final actualRole = userData['role'] as String? ?? 'student';

      // 3. Validate selected role matches Firestore role
      if (actualRole != _selectedRole) {
        await FirebaseAuth.instance.signOut();
        throw Exception(
          'Peran yang dipilih ($_selectedRole) tidak cocok dengan akun Anda ($actualRole). Silakan ubah pilihan peran.',
        );
      }

      if (!mounted) return;

      // 4. Route to the correct dashboard based on role
      _navigateToDashboard(actualRole);

    } on FirebaseAuthException catch (e) {
      String errorMessage = 'Gagal masuk. Periksa email dan password.';
      if (e.code == 'user-not-found') {
        errorMessage = 'Akun tidak ditemukan. Silakan daftar terlebih dahulu.';
      } else if (e.code == 'wrong-password' || e.code == 'invalid-credential') {
        errorMessage = 'Password atau email salah. Coba lagi.';
      } else if (e.code == 'invalid-email') {
        errorMessage = 'Format email tidak valid.';
      }

      _showErrorSnackBar(errorMessage);
    } catch (e) {
      _showErrorSnackBar(e.toString().replaceAll('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  void _navigateToDashboard(String role) {
    switch (role) {
      case 'company':
        Navigator.of(context).pushReplacementNamed('/company_dashboard');
        break;
      case 'school':
        Navigator.of(context).pushReplacementNamed('/school_dashboard');
        break;
      case 'student':
      default:
        Navigator.of(context).pushReplacementNamed('/student_dashboard');
        break;
    }
  }

  void _showErrorSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message, style: GoogleFonts.plusJakartaSans(fontWeight: FontWeight.w600)),
        backgroundColor: const Color(0xFFEF4444),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        margin: const EdgeInsets.all(16),
      ),
    );
  }

  // Quick Demo Account Helper for testing during presentation
  void _fillDemoCredentials(String email, String role) {
    setState(() {
      _emailController.text = email;
      _passwordController.text = 'MagangKuy2026!';
      _selectedRole = role;
    });
  }

  @override
  Widget build(BuildContext context) {
    const primaryIndigo = Color(0xFF4F46E5);

    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 20.0),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // App Branding & Gen-Z Greeting
                  Center(
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [Color(0xFF4F46E5), Color(0xFF7C3AED)],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(24),
                        boxShadow: [
                          BoxShadow(
                            color: primaryIndigo.withOpacity(0.3),
                            blurRadius: 20,
                            offset: const Offset(0, 10),
                          ),
                        ],
                      ),
                      child: const Icon(
                        Icons.rocket_launch_rounded,
                        color: Colors.white,
                        size: 38,
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Text(
                    'MagangKuy ✨',
                    textAlign: TextAlign.center,
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 28,
                      fontWeight: FontWeight.w800,
                      color: const Color(0xFF0F172A),
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Portal Magang & PKL Siswa SMA/SMK Terpercaya',
                    textAlign: TextAlign.center,
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 14,
                      color: const Color(0xFF64748B),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 32),

                  // Role Selector Card
                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(18),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'MASUK SEBAGAI',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 0.8,
                            color: const Color(0xFF64748B),
                          ),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            _buildRoleTab('student', 'Siswa', Icons.school_rounded),
                            const SizedBox(width: 8),
                            _buildRoleTab('company', 'Mitra', Icons.business_rounded),
                            const SizedBox(width: 8),
                            _buildRoleTab('school', 'Sekolah', Icons.account_balance_rounded),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Email Input Field
                  Text(
                    'Email Terdaftar',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFF1E293B),
                    ),
                  ),
                  const SizedBox(height: 6),
                  TextFormField(
                    controller: _emailController,
                    keyboardType: TextInputType.emailAddress,
                    decoration: const InputDecoration(
                      hintText: 'nama@smk.sch.id atau email@perusahaan.com',
                      prefixIcon: Icon(Icons.mail_outline_rounded, color: Color(0xFF94A3B8)),
                    ),
                    validator: (value) {
                      if (value == null || value.trim().isEmpty) return 'Email wajib diisi';
                      if (!value.contains('@')) return 'Format email tidak valid';
                      return null;
                    },
                  ),
                  const SizedBox(height: 16),

                  // Password Input Field
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Password',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: const Color(0xFF1E293B),
                        ),
                      ),
                      TextButton(
                        onPressed: () {},
                        style: TextButton.styleFrom(padding: EdgeInsets.zero),
                        child: Text(
                          'Lupa password?',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: primaryIndigo,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  TextFormField(
                    controller: _passwordController,
                    obscureText: _obscurePassword,
                    decoration: InputDecoration(
                      hintText: 'Minimal 8 karakter',
                      prefixIcon: const Icon(Icons.lock_outline_rounded, color: Color(0xFF94A3B8)),
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscurePassword ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                          color: const Color(0xFF94A3B8),
                        ),
                        onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) return 'Password wajib diisi';
                      if (value.length < 6) return 'Password minimal 6 karakter';
                      return null;
                    },
                  ),
                  const SizedBox(height: 24),

                  // Submit Button
                  ElevatedButton(
                    onPressed: _isLoading ? null : _handleLogin,
                    child: _isLoading
                        ? const SizedBox(
                            height: 22,
                            width: 22,
                            child: CircularProgressIndicator(
                              strokeWidth: 2.5,
                              color: Colors.white,
                            ),
                          )
                        : Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text('Masuk ke MagangKuy', style: GoogleFonts.plusJakartaSans(fontSize: 15)),
                              const SizedBox(width: 8),
                              const Icon(Icons.arrow_forward_rounded, size: 18),
                            ],
                          ),
                  ),
                  const SizedBox(height: 24),

                  // Quick Demo Accounts Fillers (Great for testing & review)
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF8FAFC),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '⚡ QUICK DEMO LOGINS:',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 10,
                            fontWeight: FontWeight.w800,
                            color: const Color(0xFF94A3B8),
                          ),
                        ),
                        const SizedBox(height: 8),
                        Wrap(
                          spacing: 8,
                          runSpacing: 6,
                          children: [
                            _buildQuickDemoChip('Siswa RPL', 'rizky@smk.sch.id', 'student'),
                            _buildQuickDemoChip('HR PT Telkom', 'hrd@telkom.co.id', 'company'),
                            _buildQuickDemoChip('Guru BKK', 'bkk@smktarunabhakti.sch.id', 'school'),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildRoleTab(String role, String label, IconData icon) {
    final isSelected = _selectedRole == role;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _selectedRole = role),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 10),
          decoration: BoxDecoration(
            color: isSelected ? Colors.white : Colors.transparent,
            borderRadius: BorderRadius.circular(12),
            boxShadow: isSelected
                ? [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.06),
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ]
                : null,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                size: 16,
                color: isSelected ? const Color(0xFF4F46E5) : const Color(0xFF64748B),
              ),
              const SizedBox(width: 6),
              Text(
                label,
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 13,
                  fontWeight: isSelected ? FontWeight.w700 : FontWeight.w600,
                  color: isSelected ? const Color(0xFF4F46E5) : const Color(0xFF64748B),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildQuickDemoChip(String label, String email, String role) {
    return ActionChip(
      label: Text(label, style: GoogleFonts.plusJakartaSans(fontSize: 11, fontWeight: FontWeight.w600)),
      backgroundColor: Colors.white,
      side: const BorderSide(color: Color(0xFFCBD5E1)),
      onPressed: () => _fillDemoCredentials(email, role),
    );
  }
}
`;

export const FLUTTER_STUDENT_DASHBOARD_DART = `// ============================================================================
// FILE: lib/screens/student_dashboard.dart
// MAGANGKUY - Student Dashboard with Firestore Real-time Queries & Application Flow
// Dynamic Internship Search, Category Filtering, & Instant Apply Modal
// ============================================================================

import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:google_fonts/google_fonts.dart';

class StudentDashboard extends StatefulWidget {
  const StudentDashboard({super.key});

  @override
  State<StudentDashboard> createState() => _StudentDashboardState();
}

class _StudentDashboardState extends State<StudentDashboard> {
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';
  String _selectedCategory = 'Semua';

  // SMK / SMA Target Categories popular in Indonesia
  final List<String> _categories = [
    'Semua',
    'Rekayasa Perangkat Lunak',
    'Desain Komunikasi Visual',
    'Teknik Komputer & Jaringan',
    'Akuntansi & Keuangan',
    'Teknik Otomotif',
    'Bisnis Digital',
  ];

  @override
  void initState() {
    super.initState();
    _searchController.addListener(() {
      setState(() {
        _searchQuery = _searchController.text.trim().toLowerCase();
      });
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  /// Sign out current user
  Future<void> _handleSignOut() async {
    await FirebaseAuth.instance.signOut();
    if (mounted) {
      Navigator.of(context).pushReplacementNamed('/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    final currentUserId = FirebaseAuth.instance.currentUser?.uid;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: _buildCustomAppBar(currentUserId),
      body: RefreshIndicator(
        onRefresh: () async => setState(() {}),
        color: const Color(0xFF4F46E5),
        child: CustomScrollView(
          slivers: [
            // 1. Search Bar & Filter Header
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 12, 20, 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildSearchBar(),
                    const SizedBox(height: 16),
                    _buildCategoryFilterList(),
                    const SizedBox(height: 20),
                    _buildSectionHeader(),
                  ],
                ),
              ),
            ),

            // 2. Dynamic Firestore Internships ListView
            _buildFirestoreInternshipsList(),
          ],
        ),
      ),
    );
  }

  PreferredSizeWidget _buildCustomAppBar(String? uid) {
    return AppBar(
      backgroundColor: Colors.white,
      elevation: 0,
      titleSpacing: 20,
      title: FutureBuilder<DocumentSnapshot>(
        future: uid != null
            ? FirebaseFirestore.instance.collection('users').doc(uid).get()
            : null,
        builder: (context, snapshot) {
          final data = snapshot.data?.data() as Map<String, dynamic>?;
          final studentName = data?['displayName'] ?? 'Siswa Magang';
          final schoolName = data?['studentProfile']?['schoolName'] ?? 'SMK Mitra BKK';

          return Row(
            children: [
              CircleAvatar(
                radius: 20,
                backgroundColor: const Color(0xFFEEF2FF),
                child: Text(
                  studentName.isNotEmpty ? studentName[0] : 'S',
                  style: GoogleFonts.plusJakartaSans(
                    fontWeight: FontWeight.w800,
                    color: const Color(0xFF4F46E5),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'Halo, $studentName 👋',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFF0F172A),
                    ),
                  ),
                  Text(
                    schoolName,
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: const Color(0xFF64748B),
                    ),
                  ),
                ],
              ),
            ],
          );
        },
      ),
      actions: [
        IconButton(
          icon: const Icon(Icons.logout_rounded, color: Color(0xFF64748B)),
          tooltip: 'Keluar',
          onPressed: _handleSignOut,
        ),
        const SizedBox(width: 8),
      ],
    );
  }

  Widget _buildSearchBar() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: TextField(
        controller: _searchController,
        style: GoogleFonts.plusJakartaSans(fontSize: 14),
        decoration: InputDecoration(
          hintText: 'Cari lowongan magang, perusahaan, kota...',
          hintStyle: GoogleFonts.plusJakartaSans(
            color: const Color(0xFF94A3B8),
            fontSize: 13,
          ),
          prefixIcon: const Icon(Icons.search_rounded, color: Color(0xFF4F46E5)),
          suffixIcon: _searchQuery.isNotEmpty
              ? IconButton(
                  icon: const Icon(Icons.clear_rounded, size: 18),
                  onPressed: () => _searchController.clear(),
                )
              : null,
          border: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        ),
      ),
    );
  }

  Widget _buildCategoryFilterList() {
    return SizedBox(
      height: 38,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: _categories.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final cat = _categories[index];
          final isSelected = _selectedCategory == cat;
          return FilterChip(
            label: Text(cat),
            selected: isSelected,
            labelStyle: GoogleFonts.plusJakartaSans(
              fontSize: 12,
              fontWeight: isSelected ? FontWeight.w700 : FontWeight.w600,
              color: isSelected ? Colors.white : const Color(0xFF475569),
            ),
            backgroundColor: Colors.white,
            selectedColor: const Color(0xFF4F46E5),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
              side: BorderSide(
                color: isSelected ? const Color(0xFF4F46E5) : const Color(0xFFE2E8F0),
              ),
            ),
            showCheckmark: false,
            onSelected: (selected) {
              setState(() => _selectedCategory = cat);
            },
          );
        },
      ),
    );
  }

  Widget _buildSectionHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          'Lowongan Magang Tersedia',
          style: GoogleFonts.plusJakartaSans(
            fontSize: 18,
            fontWeight: FontWeight.w800,
            color: const Color(0xFF0F172A),
          ),
        ),
        Text(
          'Terverifikasi BKK',
          style: GoogleFonts.plusJakartaSans(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: const Color(0xFF10B981),
          ),
        ),
      ],
    );
  }

  /// Dynamic StreamBuilder fetching internships from Cloud Firestore
  Widget _buildFirestoreInternshipsList() {
    // Basic query for published & active internships
    Query query = FirebaseFirestore.instance
        .collection('internships')
        .where('status', isEqualTo: 'open');

    // Filter by category if not 'Semua'
    if (_selectedCategory != 'Semua') {
      query = query.where('category', isEqualTo: _selectedCategory);
    }

    return StreamBuilder<QuerySnapshot>(
      stream: query.snapshots(),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return SliverFillRemaining(
            child: Center(
              child: Text(
                'Terjadi kesalahan saat memuat data: \${snapshot.error}',
                style: GoogleFonts.plusJakartaSans(color: const Color(0xFFEF4444)),
              ),
            ),
          );
        }

        if (snapshot.connectionState == ConnectionState.waiting) {
          return const SliverFillRemaining(
            child: Center(
              child: CircularProgressIndicator(color: Color(0xFF4F46E5)),
            ),
          );
        }

        final docs = snapshot.data?.docs ?? [];

        // Client-side search filtering by keyword across title, company, and location
        final filteredDocs = docs.where((doc) {
          if (_searchQuery.isEmpty) return true;
          final data = doc.data() as Map<String, dynamic>;
          final title = (data['title'] ?? '').toString().toLowerCase();
          final company = (data['companyName'] ?? '').toString().toLowerCase();
          final location = (data['location'] ?? '').toString().toLowerCase();
          return title.contains(_searchQuery) ||
              company.contains(_searchQuery) ||
              location.contains(_searchQuery);
        }).toList();

        if (filteredDocs.isEmpty) {
          return SliverFillRemaining(
            hasScrollBody: false,
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.work_off_outlined, size: 64, color: Color(0xFF94A3B8)),
                  const SizedBox(height: 12),
                  Text(
                    'Belum Ada Lowongan',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFF475569),
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Coba ganti kata kunci pencarian atau kategori.',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 13,
                      color: const Color(0xFF94A3B8),
                    ),
                  ),
                ],
              ),
            ),
          );
        }

        return SliverPadding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          sliver: SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final doc = filteredDocs[index];
                final data = doc.data() as Map<String, dynamic>;
                return _buildInternshipCard(doc.id, data);
              },
              childCount: filteredDocs.length,
            ),
          ),
        );
      },
    );
  }

  Widget _buildInternshipCard(String id, Map<String, dynamic> data) {
    final title = data['title'] ?? 'Posisi Magang';
    final companyName = data['companyName'] ?? 'Perusahaan Mitra';
    final location = data['location'] ?? 'Indonesia';
    final workType = data['workType'] ?? 'WFO';
    final stipendText = data['stipendText'] ?? 'Uang Saku Industri';
    final duration = '\${data['durationMonths'] ?? 3} Bulan';
    final quota = data['quota'] ?? 1;

    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(20),
          onTap: () => _openInternshipDetailsModal(id, data),
          child: Padding(
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Company & Badges Header
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        color: const Color(0xFFEEF2FF),
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: Center(
                        child: Text(
                          companyName.isNotEmpty ? companyName[0] : 'M',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 20,
                            fontWeight: FontWeight.w800,
                            color: const Color(0xFF4F46E5),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            title,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 16,
                              fontWeight: FontWeight.w700,
                              color: const Color(0xFF0F172A),
                            ),
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              Text(
                                companyName,
                                style: GoogleFonts.plusJakartaSans(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w600,
                                  color: const Color(0xFF64748B),
                                ),
                              ),
                              const SizedBox(width: 6),
                              const Icon(Icons.verified_rounded, size: 14, color: Color(0xFF3B82F6)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14),

                // Location & Details Badges
                Wrap(
                  spacing: 8,
                  runSpacing: 6,
                  children: [
                    _buildTag(Icons.location_on_outlined, location, const Color(0xFFF1F5F9), const Color(0xFF475569)),
                    _buildTag(Icons.apartment_rounded, workType, const Color(0xFFEEF2FF), const Color(0xFF4F46E5)),
                    _buildTag(Icons.schedule_rounded, duration, const Color(0xFFF0FDF4), const Color(0xFF16A34A)),
                  ],
                ),
                const SizedBox(height: 14),
                const Divider(height: 1, color: Color(0xFFF1F5F9)),
                const SizedBox(height: 12),

                // Stipend & Apply Trigger
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.monetization_on_rounded, size: 16, color: Color(0xFFF59E0B)),
                        const SizedBox(width: 6),
                        Text(
                          stipendText,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 13,
                            fontWeight: FontWeight.w700,
                            color: const Color(0xFF0F172A),
                          ),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: const Color(0xFF4F46E5),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        'Lamar',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTag(IconData icon, String label, Color bgColor, Color textColor) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: textColor),
          const SizedBox(width: 5),
          Text(
            label,
            style: GoogleFonts.plusJakartaSans(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: textColor,
            ),
          ),
        ],
      ),
    );
  }

  /// Detail Modal Bottom Sheet with Instant Application to Firestore
  void _openInternshipDetailsModal(String internshipId, Map<String, dynamic> data) {
    final title = data['title'] ?? 'Posisi Magang';
    final companyName = data['companyName'] ?? 'Perusahaan';
    final description = data['description'] ?? 'Tidak ada deskripsi.';
    final requirements = List<String>.from(data['requirements'] ?? []);
    final perks = List<String>.from(data['perks'] ?? []);

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return DraggableScrollableSheet(
          initialChildSize: 0.85,
          maxChildSize: 0.95,
          minChildSize: 0.5,
          builder: (_, scrollController) {
            return Container(
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
              ),
              child: Column(
                children: [
                  // Drag indicator
                  Container(
                    margin: const EdgeInsets.only(top: 12, bottom: 8),
                    width: 44,
                    height: 5,
                    decoration: BoxDecoration(
                      color: const Color(0xFFCBD5E1),
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),

                  Expanded(
                    child: ListView(
                      controller: scrollController,
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                      children: [
                        Text(
                          title,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 22,
                            fontWeight: FontWeight.w800,
                            color: const Color(0xFF0F172A),
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          companyName,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 15,
                            fontWeight: FontWeight.w600,
                            color: const Color(0xFF4F46E5),
                          ),
                        ),
                        const SizedBox(height: 20),

                        // Section: Deskripsi Pekerjaan
                        Text(
                          'Tentang Program Magang',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          description,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 14,
                            height: 1.6,
                            color: const Color(0xFF475569),
                          ),
                        ),
                        const SizedBox(height: 20),

                        // Section: Kualifikasi Siswa
                        Text(
                          'Persyaratan Siswa SMA/SMK',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const SizedBox(height: 8),
                        ...requirements.map(
                          (req) => Padding(
                            padding: const EdgeInsets.only(bottom: 6),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Icon(Icons.check_circle_rounded, size: 18, color: Color(0xFF10B981)),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: Text(
                                    req,
                                    style: GoogleFonts.plusJakartaSans(fontSize: 13, color: const Color(0xFF475569)),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 20),

                        // Section: Fasilitas & Benefit
                        if (perks.isNotEmpty) ...[
                          Text(
                            'Benefit & Uang Saku',
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 16,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          const SizedBox(height: 8),
                          ...perks.map(
                            (perk) => Padding(
                              padding: const EdgeInsets.only(bottom: 6),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Icon(Icons.stars_rounded, size: 18, color: Color(0xFFF59E0B)),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      perk,
                                      style: GoogleFonts.plusJakartaSans(fontSize: 13, color: const Color(0xFF475569)),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                        const SizedBox(height: 30),
                      ],
                    ),
                  ),

                  // Bottom Action: Apply Button
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      border: const Border(top: BorderSide(color: Color(0xFFF1F5F9))),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.04),
                          blurRadius: 10,
                          offset: const Offset(0, -4),
                        ),
                      ],
                    ),
                    child: ElevatedButton(
                      onPressed: () => _submitApplication(internshipId, data),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.send_rounded, size: 18),
                          const SizedBox(width: 8),
                          Text(
                            'Kirim Lamaran Magang',
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 15,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  /// Write new application document into Firestore 'applications' collection
  Future<void> _submitApplication(String internshipId, Map<String, dynamic> jobData) async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) return;

    Navigator.pop(context); // Close bottom sheet

    // Show loading indicator
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => const Center(
        child: CircularProgressIndicator(color: Color(0xFF4F46E5)),
      ),
    );

    try {
      // 1. Fetch current student's full profile
      final userDoc = await FirebaseFirestore.instance.collection('users').doc(user.uid).get();
      final userData = userDoc.data() ?? {};
      final studentProfile = userData['studentProfile'] as Map<String, dynamic>? ?? {};

      // 2. Prevent duplicate application for the same internship
      final existingApp = await FirebaseFirestore.instance
          .collection('applications')
          .where('studentId', isEqualTo: user.uid)
          .where('internshipId', isEqualTo: internshipId)
          .limit(1)
          .get();

      if (existingApp.docs.isNotEmpty) {
        if (!mounted) return;
        Navigator.pop(context); // Dismiss loading
        _showApplicationResult(
          isSuccess: false,
          title: 'Sudah Dilamar!',
          message: 'Kamu sudah mengirimkan lamaran untuk posisi ini sebelumnya.',
        );
        return;
      }

      // 3. Insert application into Firestore
      await FirebaseFirestore.instance.collection('applications').add({
        'internshipId': internshipId,
        'internshipTitle': jobData['title'] ?? '',
        'studentId': user.uid,
        'studentName': userData['displayName'] ?? 'Siswa Magang',
        'studentSchool': studentProfile['schoolName'] ?? 'SMK Terdaftar',
        'studentMajor': studentProfile['major'] ?? 'Umum',
        'companyId': jobData['companyId'] ?? '',
        'companyName': jobData['companyName'] ?? '',
        'status': 'applied',
        'resumeUrl': studentProfile['resumeUrl'] ?? '',
        'coverLetter': 'Saya berminat untuk mengikuti program magang ini sesuai kurikulum PKL sekolah saya.',
        'appliedAt': FieldValue.serverTimestamp(),
        'updatedAt': FieldValue.serverTimestamp(),
      });

      if (!mounted) return;
      Navigator.pop(context); // Dismiss loading

      _showApplicationResult(
        isSuccess: true,
        title: 'Lamaran Terkirim! 🎉',
        message: 'Lamaran kamu berhasil dikirim ke \${jobData['companyName']}. BKK sekolah dan HRD akan meninjau berkasmu.',
      );
    } catch (e) {
      if (!mounted) return;
      Navigator.pop(context);
      _showApplicationResult(
        isSuccess: false,
        title: 'Gagal Mengirim',
        message: 'Terjadi kendala koneksi ke Firebase: $e',
      );
    }
  }

  void _showApplicationResult({required bool isSuccess, required String title, required String message}) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Row(
          children: [
            Icon(
              isSuccess ? Icons.check_circle_rounded : Icons.info_rounded,
              color: isSuccess ? const Color(0xFF10B981) : const Color(0xFFEF4444),
            ),
            const SizedBox(width: 8),
            Text(title, style: GoogleFonts.plusJakartaSans(fontWeight: FontWeight.w700, fontSize: 18)),
          ],
        ),
        content: Text(
          message,
          style: GoogleFonts.plusJakartaSans(fontSize: 14, color: const Color(0xFF475569)),
        ),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('OK, Mengerti'),
          ),
        ],
      ),
    );
  }
}
`;

export const FLUTTER_PUBSPEC_YAML = `name: magangkuy
description: "Platform Magang Siswa SMA/SMK - Flutter & Firebase"
publish_to: "none"
version: 1.0.0+1

environment:
  sdk: ">=3.3.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter

  # Firebase Core & Backend Services
  firebase_core: ^3.10.1
  firebase_auth: ^5.4.4
  cloud_firestore: ^5.6.5
  firebase_storage: ^12.4.4

  # UI, Icons, Typography & Utilities
  google_fonts: ^6.2.1
  flutter_svg: ^2.0.10+1
  intl: ^0.19.0
  cached_network_image: ^3.4.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^5.0.0

flutter:
  uses-material-design: true
`;

export const FLUTTER_MODELS_DART = `// ============================================================================
// FILE: lib/models/internship_model.dart
// MagangKuy - Strong-Typed Dart Models for Firestore Serialization
// ============================================================================

import 'package:cloud_firestore/cloud_firestore.dart';

class Internship {
  final String id;
  final String companyId;
  final String companyName;
  final String companyLogo;
  final String title;
  final String category;
  final List<String> targetMajors;
  final String location;
  final String workType;
  final int stipendMonthly;
  final String stipendText;
  final int durationMonths;
  final int quota;
  final String description;
  final List<String> requirements;
  final List<String> perks;
  final String status;

  Internship({
    required this.id,
    required this.companyId,
    required this.companyName,
    required this.companyLogo,
    required this.title,
    required this.category,
    required this.targetMajors,
    required this.location,
    required this.workType,
    required this.stipendMonthly,
    required this.stipendText,
    required this.durationMonths,
    required this.quota,
    required this.description,
    required this.requirements,
    required this.perks,
    required this.status,
  });

  factory Internship.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return Internship(
      id: doc.id,
      companyId: data['companyId'] ?? '',
      companyName: data['companyName'] ?? '',
      companyLogo: data['companyLogo'] ?? '',
      title: data['title'] ?? '',
      category: data['category'] ?? '',
      targetMajors: List<String>.from(data['targetMajors'] ?? []),
      location: data['location'] ?? '',
      workType: data['workType'] ?? 'WFO',
      stipendMonthly: (data['stipendMonthly'] ?? 0) as int,
      stipendText: data['stipendText'] ?? '',
      durationMonths: (data['durationMonths'] ?? 3) as int,
      quota: (data['quota'] ?? 1) as int,
      description: data['description'] ?? '',
      requirements: List<String>.from(data['requirements'] ?? []),
      perks: List<String>.from(data['perks'] ?? []),
      status: data['status'] ?? 'open',
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'companyId': companyId,
      'companyName': companyName,
      'companyLogo': companyLogo,
      'title': title,
      'category': category,
      'targetMajors': targetMajors,
      'location': location,
      'workType': workType,
      'stipendMonthly': stipendMonthly,
      'stipendText': stipendText,
      'durationMonths': durationMonths,
      'quota': quota,
      'description': description,
      'requirements': requirements,
      'perks': perks,
      'status': status,
    };
  }
}
`;

