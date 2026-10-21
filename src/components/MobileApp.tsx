import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Search, MapPin, Briefcase, Clock, ShieldCheck, 
  Send, Sparkles, Building2, User, School, LogOut, CheckCircle, 
  X, Eye, EyeOff, AlertCircle, ChevronRight, FileText, 
  RefreshCw, CheckCircle2, Bookmark, Bell, Share2, ArrowLeft,
  Calendar, Award, Check
} from 'lucide-react';
import { 
  UserProfile, InternshipItem, ApplicationItem, 
  INITIAL_USERS, INITIAL_INTERNSHIPS, INITIAL_APPLICATIONS 
} from '../data/mockFirebaseData';

export const MobileApp: React.FC = () => {
  // Internal state (database is never exposed to the user as raw data)
  const [users] = useState<UserProfile[]>(INITIAL_USERS);
  const [internships, setInternships] = useState<InternshipItem[]>(INITIAL_INTERNSHIPS);
  const [applications, setApplications] = useState<ApplicationItem[]>(INITIAL_APPLICATIONS);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job_flutter_001']);

  // Current Auth State (default logged in as Student)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_USERS[0]);

  // Login Screen Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<'student' | 'company' | 'school'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Student Dashboard Navigation & Filter State
  const [studentTab, setStudentTab] = useState<'browse' | 'applications' | 'saved' | 'profile'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedWorkType, setSelectedWorkType] = useState('Semua');

  // Selected Internship Modal & Apply Flow
  const [selectedJob, setSelectedJob] = useState<InternshipItem | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applyStep, setApplyStep] = useState<'detail' | 'form' | 'success'>('detail');
  const [coverNote, setCoverNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    'Semua',
    'Rekayasa Perangkat Lunak',
    'Desain Komunikasi Visual',
    'Teknik Komputer & Jaringan',
    'Akuntansi & Keuangan',
    'Teknik Otomotif',
    'Bisnis Digital'
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    setTimeout(() => {
      setIsLoggingIn(false);
      const matchedUser = users.find(u => u.email.toLowerCase() === loginEmail.trim().toLowerCase());
      if (!matchedUser) {
        setLoginError('Akun tidak terdaftar. Gunakan tombol demo di bawah untuk mencoba.');
        return;
      }

      if (matchedUser.role !== loginRole) {
        setLoginError(`Peran '${loginRole}' tidak cocok dengan akun ini (${matchedUser.role}).`);
        return;
      }

      setCurrentUser(matchedUser);
      setStudentTab('browse');
      showToast(`Selamat datang kembali, ${matchedUser.displayName}!`);
    }, 500);
  };

  const handleQuickLogin = (role: 'student' | 'company' | 'school') => {
    const user = users.find(u => u.role === role);
    if (!user) return;
    setLoginEmail(user.email);
    setLoginPassword('MagangKuy2026!');
    setLoginRole(role);
    setLoginError(null);
    setCurrentUser(user);
    setStudentTab('browse');
    showToast(`Masuk sebagai ${user.displayName}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
    setSelectedJob(null);
    showToast('Berhasil keluar dari akun.');
  };

  const toggleSaveJob = (jobId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds(savedJobIds.filter(id => id !== jobId));
      showToast('Dihapus dari lowongan tersimpan');
    } else {
      setSavedJobIds([...savedJobIds, jobId]);
      showToast('Disimpan ke lowongan favorit ⭐');
    }
  };

  // Submit Application handler
  const handleApplyForJob = () => {
    if (!currentUser || !selectedJob) return;

    const alreadyApplied = applications.some(
      app => app.studentId === currentUser.uid && app.internshipId === selectedJob.id
    );

    if (alreadyApplied) {
      alert('Kamu sudah mengirimkan lamaran untuk lowongan ini sebelumnya.');
      return;
    }

    setIsApplying(true);

    setTimeout(() => {
      const newApp: ApplicationItem = {
        id: `app_${Date.now().toString().slice(-6)}`,
        internshipId: selectedJob.id,
        internshipTitle: selectedJob.title,
        studentId: currentUser.uid,
        studentName: currentUser.displayName,
        studentSchool: currentUser.studentProfile?.schoolName || 'SMK Partner BKK',
        studentMajor: currentUser.studentProfile?.major || 'Kejuruan',
        companyId: selectedJob.companyId,
        companyName: selectedJob.companyName,
        status: 'applied',
        resumeUrl: currentUser.studentProfile?.resumeUrl || 'https://storage.googleapis.com/.../cv.pdf',
        coverLetter: coverNote.trim() || `Saya sangat berminat mengikuti program PKL di ${selectedJob.companyName}.`,
        appliedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setApplications([newApp, ...applications]);
      setIsApplying(false);
      setApplyStep('success');

      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // confetti fallback
      }
    }, 700);
  };

  // Filter internships for Student Dashboard
  const filteredInternships = internships.filter(job => {
    if (job.status !== 'open') return false;
    if (selectedCategory !== 'Semua' && job.category !== selectedCategory) return false;
    if (selectedWorkType !== 'Semua' && job.workType !== selectedWorkType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.companyName.toLowerCase().includes(q);
      const matchLoc = job.location.toLowerCase().includes(q);
      const matchMajor = job.targetMajors.some(m => m.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchLoc && !matchMajor) return false;
    }
    return true;
  });

  const myApplications = applications.filter(app => app.studentId === currentUser?.uid);
  const mySavedJobs = internships.filter(job => savedJobIds.includes(job.id));

  return (
    <div className="w-full min-h-screen bg-slate-100 flex justify-center selection:bg-indigo-500 selection:text-white">
      {/* Full-Screen Mobile App Container: Maximum native-app feel */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl min-h-screen bg-[#F8FAFC] flex flex-col shadow-2xl relative border-x border-slate-200">
        
        {/* Mobile App Header Bar */}
        <div className="bg-white px-4 pt-3 pb-2.5 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-slate-900 tracking-tight">MagangKuy</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                  SMA/SMK
                </span>
              </div>
            </div>
          </div>

          {/* Quick Profile / Role info or Demo switcher */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-600 hidden sm:inline">
                  {currentUser.displayName.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <span className="text-[11px] text-slate-400 font-medium">Masuk Akun</span>
            )}
          </div>
        </div>

        {/* Global In-App Toast Notification */}
        {toastMessage && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* MAIN BODY: LOGIN OR ROLE DASHBOARD */}
        {/* ============================================================ */}
        {!currentUser ? (
          /* 1. LOGIN SCREEN */
          <div className="flex-1 flex flex-col justify-center px-6 py-8 bg-white overflow-y-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25">
                <Briefcase className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">MagangKuy ✨</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Portal Magang & PKL Siswa SMA/SMK Terpercaya & Terverifikasi Sekolah
              </p>
            </div>

            {/* Role Tabs */}
            <div className="bg-slate-100 p-1 rounded-2xl mb-5">
              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => setLoginRole('student')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    loginRole === 'student'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Siswa</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginRole('company')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    loginRole === 'company'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Mitra</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginRole('school')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    loginRole === 'school'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <School className="w-3.5 h-3.5" />
                  <span>Sekolah</span>
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Akun
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder={loginRole === 'student' ? 'siswa@smk.sch.id' : 'perusahaan@industri.com'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-slate-50/50"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <span className="text-[11px] text-indigo-600 font-semibold cursor-pointer hover:underline">
                    Lupa password?
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-slate-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                {isLoggingIn ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Masuk ke MagangKuy</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Login Fillers */}
            <div className="mt-8 pt-5 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 block mb-2.5 text-center uppercase tracking-wider">
                ⚡ Masuk Cepat Akun Contoh
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleQuickLogin('student')}
                  className="py-2 px-1 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
                >
                  Siswa RPL
                </button>
                <button
                  onClick={() => handleQuickLogin('company')}
                  className="py-2 px-1 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
                >
                  HR Perusahaan
                </button>
                <button
                  onClick={() => handleQuickLogin('school')}
                  className="py-2 px-1 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
                >
                  Guru BKK
                </button>
              </div>
            </div>
          </div>
        ) : currentUser.role === 'student' ? (
          /* 2. STUDENT DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Student Header Info */}
            <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.photoUrl}
                  alt={currentUser.displayName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Halo, {currentUser.displayName} 👋
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {currentUser.studentProfile?.schoolName} • {currentUser.studentProfile?.major.split(' ')[0]}
                  </p>
                </div>
              </div>

              {/* Notification icon */}
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 relative">
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 absolute top-1.5 right-1.5" />
              </div>
            </div>

            {/* TAB: BROWSE INTERNSHIPS */}
            {studentTab === 'browse' && (
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 scrollbar-thin">
                
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                  <input
                    type="text"
                    placeholder="Cari lowongan, posisi, perusahaan, kota..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white rounded-2xl pl-10 pr-9 py-2.5 text-xs text-slate-800 placeholder-slate-400 border border-slate-200 shadow-xs focus:outline-none focus:border-indigo-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Indonesian SMK Jurusan Category Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                        selectedCategory === cat
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Filter and Count Summary */}
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="font-bold text-slate-800">
                    {filteredInternships.length} Lowongan PKL Tersedia
                  </span>
                  <div className="flex gap-1">
                    {(['Semua', 'WFO', 'WFH', 'Hybrid'] as const).map(wt => (
                      <button
                        key={wt}
                        onClick={() => setSelectedWorkType(wt)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors ${
                          selectedWorkType === wt
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {wt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Internships List */}
                <div className="space-y-3 pb-4">
                  {filteredInternships.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 my-4">
                      <Briefcase className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                      <div className="text-xs font-bold text-slate-700">Tidak ada lowongan ditemukan</div>
                      <div className="text-[11px] text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter jurusan</div>
                    </div>
                  ) : (
                    filteredInternships.map((job) => {
                      const hasApplied = applications.some(
                        app => app.studentId === currentUser.uid && app.internshipId === job.id
                      );
                      const isSaved = savedJobIds.includes(job.id);

                      return (
                        <div
                          key={job.id}
                          onClick={() => {
                            setSelectedJob(job);
                            setApplyStep('detail');
                          }}
                          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-indigo-400 cursor-pointer transition-all active:scale-[0.99] relative"
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={job.companyLogo}
                              alt={job.companyName}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0 pr-6">
                              <h4 className="text-sm font-bold text-slate-900 leading-snug truncate">
                                {job.title}
                              </h4>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                <span className="truncate">{job.companyName}</span>
                                {job.companyVerified && (
                                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                )}
                              </div>
                            </div>

                            {/* Bookmark button */}
                            <button
                              onClick={(e) => toggleSaveJob(job.id, e)}
                              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                            >
                              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mt-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-medium">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                              {job.workType}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                              <Clock className="w-3 h-3" />
                              {job.durationMonths} Bulan PKL
                            </span>
                          </div>

                          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-extrabold text-slate-900">
                              {job.stipendText}
                            </span>
                            {hasApplied ? (
                              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" /> Dilamar
                              </span>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedJob(job);
                                  setApplyStep('detail');
                                }}
                                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs"
                              >
                                Lamar Magang
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* TAB: MY APPLICATIONS */}
            {studentTab === 'applications' && (
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 scrollbar-thin">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">
                    Status Lamaran Saya ({myApplications.length})
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
                  </span>
                </div>

                {myApplications.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 mt-4">
                    <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <div className="text-xs font-bold text-slate-700">Belum Ada Lamaran</div>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                      Pilih lowongan yang sesuai dengan keahlianmu dan kirim berkas lamaran pertamamu.
                    </p>
                    <button
                      onClick={() => setStudentTab('browse')}
                      className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                    >
                      Cari Lowongan Sekarang
                    </button>
                  </div>
                ) : (
                  myApplications.map((app) => (
                    <div key={app.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug">{app.internshipTitle}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{app.companyName}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                          app.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'in_review' ? 'bg-amber-100 text-amber-800' :
                          app.status === 'interview_scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-indigo-100 text-indigo-800'
                        }`}>
                          {app.status === 'applied' ? 'Terkirim' :
                           app.status === 'in_review' ? 'Sedang Ditinjau' :
                           app.status === 'interview_scheduled' ? 'Jadwal Interview' :
                           app.status === 'accepted' ? 'Diterima Magang 🎉' : 'Belum Lolos'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-600 italic">
                        "{app.coverLetter}"
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Tanggal: {new Date(app.appliedAt).toLocaleDateString()}</span>
                        <span className="text-indigo-600 font-semibold">{app.studentSchool}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: SAVED JOBS */}
            {studentTab === 'saved' && (
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
                <h3 className="text-sm font-bold text-slate-800">
                  Lowongan Tersimpan ({mySavedJobs.length})
                </h3>

                {mySavedJobs.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 mt-4">
                    <Bookmark className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <div className="text-xs font-bold text-slate-700">Belum Ada Lowongan Disimpan</div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Tekan ikon bookmark pada lowongan untuk menyimpannya ke daftar ini.
                    </p>
                  </div>
                ) : (
                  mySavedJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => {
                        setSelectedJob(job);
                        setApplyStep('detail');
                      }}
                      className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{job.title}</h4>
                          <p className="text-[11px] text-slate-500">{job.companyName} • {job.location}</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-600">{job.stipendText}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: STUDENT PROFILE */}
            {studentTab === 'profile' && (
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
                <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center shadow-xs">
                  <img
                    src={currentUser.photoUrl}
                    alt={currentUser.displayName}
                    className="w-18 h-18 rounded-full mx-auto object-cover ring-4 ring-indigo-50 shadow-sm"
                  />
                  <h3 className="text-base font-extrabold text-slate-900 mt-2.5">{currentUser.displayName}</h3>
                  <p className="text-xs text-indigo-600 font-bold">{currentUser.studentProfile?.major}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{currentUser.studentProfile?.schoolName}</p>

                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <div className="text-xs font-bold text-slate-800">{currentUser.studentProfile?.grade}</div>
                      <div className="text-[10px] text-slate-400">Tingkat Sekolah</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <div className="text-xs font-bold text-slate-800">{currentUser.studentProfile?.nisn}</div>
                      <div className="text-[10px] text-slate-400">NISN Terdaftar</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                  <h4 className="text-xs font-bold text-slate-800 mb-2">Keahlian & Penguasaan Skill</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentUser.studentProfile?.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
                  <h4 className="text-xs font-bold text-slate-800">Kontak & Rekomendasi BKK</h4>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>WhatsApp: <span className="font-semibold text-slate-800">{currentUser.phoneNumber}</span></div>
                    <div>Email: <span className="font-semibold text-slate-800">{currentUser.email}</span></div>
                    <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                      <Award className="w-3.5 h-3.5" /> Surat Izin & Pengantar PKL Sekolah Terverifikasi
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar dari Akun</span>
                </button>
              </div>
            )}

            {/* Native-like Mobile Bottom Navigation Bar */}
            <div className="bg-white border-t border-slate-100 px-4 py-2 flex items-center justify-around z-20 shadow-lg">
              <button
                onClick={() => setStudentTab('browse')}
                className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-bold transition-all ${
                  studentTab === 'browse' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Search className="w-5 h-5" />
                <span>Eksplor</span>
              </button>

              <button
                onClick={() => setStudentTab('applications')}
                className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-bold transition-all relative ${
                  studentTab === 'applications' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Lamaran</span>
                {myApplications.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-indigo-600 absolute top-1 right-3" />
                )}
              </button>

              <button
                onClick={() => setStudentTab('saved')}
                className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-bold transition-all ${
                  studentTab === 'saved' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Bookmark className="w-5 h-5" />
                <span>Disimpan</span>
              </button>

              <button
                onClick={() => setStudentTab('profile')}
                className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-bold transition-all ${
                  studentTab === 'profile' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profil</span>
              </button>
            </div>
          </div>
        ) : currentUser.role === 'company' ? (
          /* 3. COMPANY VIEW */
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{currentUser.displayName}</h3>
                <p className="text-xs text-emerald-600 font-semibold">Mitra Industri Terverifikasi</p>
              </div>
              <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-600">
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                  Dashboard Rekrutmen PKL
                </span>
                <h4 className="text-lg font-black text-indigo-950 mt-1">
                  {applications.length} Berkas Pelamar Siswa
                </h4>
                <p className="text-xs text-indigo-800/80 mt-1">
                  Meninjau pelamar magang dari sekolah mitra BKK (SMK Taruna Bhakti, SMKN 1 Jakarta)
                </p>
              </div>

              <h4 className="text-xs font-bold text-slate-800">Daftar Berkas Pelamar</h4>
              {applications.map((app) => (
                <div key={app.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] text-slate-500">{app.studentSchool} • {app.studentMajor}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                      {app.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{app.coverLetter}"</p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => {
                        setApplications(apps => apps.map(a => a.id === app.id ? { ...a, status: 'accepted' } : a));
                        showToast(`Status diperbarui: ${app.studentName} DITERIMA! 🎉`);
                      }}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                    >
                      Terima Magang
                    </button>
                    <button
                      onClick={() => {
                        setApplications(apps => apps.map(a => a.id === app.id ? { ...a, status: 'interview_scheduled' } : a));
                        showToast(`Undangan interview dikirim ke WhatsApp ${app.studentName}`);
                      }}
                      className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                    >
                      Undang Interview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 4. SCHOOL ADMIN VIEW */
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{currentUser.displayName}</h3>
                <p className="text-xs text-indigo-600 font-semibold">{currentUser.schoolProfile?.schoolName}</p>
              </div>
              <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-600">
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Monitoring Penyaluran PKL
                </span>
                <div className="text-2xl font-black text-emerald-950 mt-1">94% Siswa Siap Magang</div>
                <p className="text-xs text-emerald-800/80 mt-1">
                  Jurusan RPL, TKJ, dan DKV telah terhubung dengan industri mitra resmi BKK.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 mb-2.5">Perusahaan Mitra MoU</h4>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>PT Nusantara Media Tech (Software & Mobile)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>PT Telko Cyber Infra (Jaringan & NOC)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Bank Syariah Prima (Administrasi & Akuntansi)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM SHEET MODAL: JOB DETAIL & APPLICATION FLOW */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end backdrop-blur-xs">
            <div className="bg-white rounded-t-3xl max-h-[90%] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200 shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">
              
              {/* Drag indicator */}
              <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto my-3 shrink-0" />

              <div className="flex items-center justify-between px-5 pb-2 border-b border-slate-100 shrink-0">
                <span className="text-xs font-bold text-indigo-600">
                  {applyStep === 'detail' ? 'Detail Lowongan Magang' : applyStep === 'form' ? 'Kirim Lamaran Magang' : 'Lamaran Terkirim'}
                </span>
                <button
                  onClick={() => {
                    setSelectedJob(null);
                    setApplyStep('detail');
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {applyStep === 'detail' && (
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin text-xs">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {selectedJob.title}
                    </h3>
                    <p className="text-xs text-indigo-600 font-bold mt-0.5">{selectedJob.companyName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Uang Saku Bulanan</span>
                      <span className="font-bold text-slate-900">{selectedJob.stipendText}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Durasi & Tipe</span>
                      <span className="font-bold text-slate-900">{selectedJob.durationMonths} Bulan • {selectedJob.workType}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 text-xs mb-1">Deskripsi Posisi</h4>
                    <p className="text-slate-600 leading-relaxed text-xs">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 text-xs mb-2">Persyaratan Siswa SMA/SMK</h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {selectedJob.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 text-xs mb-2">Benefit & Fasilitas</h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {selectedJob.perks.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setApplyStep('form')}
                      className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Ajukan Lamaran PKL</span>
                    </button>
                  </div>
                </div>
              )}

              {applyStep === 'form' && (
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin text-xs">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Konfirmasi Berkas Siswa</h4>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Data profil dan berkas CV Anda akan langsung dikirimkan ke HR {selectedJob.companyName}.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-slate-800">{currentUser?.displayName}</div>
                    <div className="text-slate-500 text-[11px]">{currentUser?.studentProfile?.schoolName}</div>
                    <div className="text-indigo-600 font-semibold text-[11px]">{currentUser?.studentProfile?.major}</div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Pesan Singkat / Motivasi Magang
                    </label>
                    <textarea
                      rows={3}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Jelaskan secara singkat alasan kamu ingin magang di perusahaan ini..."
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setApplyStep('detail')}
                      className="py-3 px-4 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={handleApplyForJob}
                      disabled={isApplying}
                      className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      {isApplying ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Kirim Sekarang</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {applyStep === 'success' && (
                <div className="p-6 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">Lamaran Terkirim! 🎉</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Lamaran kamu berhasil dikirim ke {selectedJob.companyName}. Pantau status terbaru di tab "Lamaran".
                  </p>
                  <button
                    onClick={() => {
                      setSelectedJob(null);
                      setApplyStep('detail');
                      setStudentTab('applications');
                    }}
                    className="w-full py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
                  >
                    Lihat Status Lamaran Saya
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
