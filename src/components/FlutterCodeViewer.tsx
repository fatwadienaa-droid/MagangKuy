import React, { useState } from 'react';
import { 
  Check, Copy, Download, FileCode, Shield, Database, 
  Terminal, Sparkles, BookOpen, Layers, Search
} from 'lucide-react';
import { 
  FLUTTER_MAIN_DART, 
  FLUTTER_LOGIN_SCREEN_DART, 
  FLUTTER_STUDENT_DASHBOARD_DART, 
  FIRESTORE_RULES_CODE, 
  FLUTTER_MODELS_DART,
  FLUTTER_PUBSPEC_YAML 
} from '../data/flutterCode';

type FileTabKey = 'main.dart' | 'login_screen.dart' | 'student_dashboard.dart' | 'internship_model.dart' | 'firestore.rules' | 'pubspec.yaml';

export const FlutterCodeViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FileTabKey>('main.dart');
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const files: Record<FileTabKey, { title: string; lang: string; path: string; icon: any; code: string; highlight: string }> = {
    'main.dart': {
      title: 'main.dart',
      lang: 'dart',
      path: 'lib/main.dart',
      icon: FileCode,
      code: FLUTTER_MAIN_DART,
      highlight: 'App entry point with Firebase.initializeApp(), AuthGatekeeper StreamBuilder, and role-based routing.'
    },
    'login_screen.dart': {
      title: 'login_screen.dart',
      lang: 'dart',
      path: 'lib/screens/login_screen.dart',
      icon: FileCode,
      code: FLUTTER_LOGIN_SCREEN_DART,
      highlight: 'Email & Password login UI with Role selection, FirebaseAuth.signInWithEmailAndPassword(), and Firestore role verification.'
    },
    'student_dashboard.dart': {
      title: 'student_dashboard.dart',
      lang: 'dart',
      path: 'lib/screens/student_dashboard.dart',
      icon: FileCode,
      code: FLUTTER_STUDENT_DASHBOARD_DART,
      highlight: 'Student Dashboard with live Firestore query stream, search bar, category chips, job detail sheet, and instant application submission.'
    },
    'internship_model.dart': {
      title: 'internship_model.dart',
      lang: 'dart',
      path: 'lib/models/internship_model.dart',
      icon: Database,
      code: FLUTTER_MODELS_DART,
      highlight: 'Strongly-typed Dart data model with fromFirestore() and toMap() serialization for Firestore.'
    },
    'firestore.rules': {
      title: 'firestore.rules',
      lang: 'javascript',
      path: 'firestore.rules',
      icon: Shield,
      code: FIRESTORE_RULES_CODE,
      highlight: 'Security rules enforcing RBAC: Students can read jobs & write applications; Companies can manage jobs & read applications.'
    },
    'pubspec.yaml': {
      title: 'pubspec.yaml',
      lang: 'yaml',
      path: 'pubspec.yaml',
      icon: Terminal,
      code: FLUTTER_PUBSPEC_YAML,
      highlight: 'Dependencies for firebase_core, firebase_auth, cloud_firestore, google_fonts, and UI assets.'
    }
  };

  const currentFile = files[activeTab];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentFile.code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = activeTab;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Filter lines if search query is present
  const lines = currentFile.code.split('\n');
  const filteredLines = searchQuery.trim()
    ? lines.filter(line => line.toLowerCase().includes(searchQuery.toLowerCase()))
    : lines;

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* Top Header Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 text-xs font-mono font-medium text-slate-400">
            magangkuy_flutter_app / {currentFile.path}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Search within code */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors w-40 sm:w-56"
            />
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
            }`}
            title="Copy this code"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Download file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* File Navigation Tabs */}
      <div className="flex items-center overflow-x-auto bg-slate-950/80 px-3 pt-2 gap-1 border-b border-slate-800 scrollbar-none">
        {(Object.keys(files) as FileTabKey[]).map((tabKey) => {
          const tab = files[tabKey];
          const Icon = tab.icon;
          const isActive = activeTab === tabKey;
          return (
            <button
              key={tabKey}
              onClick={() => {
                setActiveTab(tabKey);
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded-t-lg transition-all border-t-2 ${
                isActive
                  ? 'bg-slate-900 text-indigo-300 border-indigo-500 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Highlight Rationale Banner */}
      <div className="bg-indigo-950/40 border-b border-indigo-900/40 px-4 py-2.5 flex items-center justify-between text-xs text-indigo-200/90 gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{currentFile.highlight}</span>
        </div>
        <span className="hidden md:inline-block font-mono text-[10px] bg-indigo-900/60 px-2 py-0.5 rounded text-indigo-300 border border-indigo-700/50">
          Flutter 3.x • Dart 3 • Firebase v12/13
        </span>
      </div>

      {/* Code Editor Body */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed bg-slate-900 select-text">
        <pre className="text-slate-300 whitespace-pre">
          {lines.map((line, idx) => {
            const isMatch = searchQuery.trim() && line.toLowerCase().includes(searchQuery.toLowerCase());
            return (
              <div 
                key={idx} 
                className={`table-row hover:bg-slate-800/60 transition-colors ${
                  isMatch ? 'bg-indigo-900/50' : ''
                }`}
              >
                <span className="table-cell pr-4 text-right select-none text-slate-600 font-mono text-[11px] w-12">
                  {idx + 1}
                </span>
                <span className="table-cell pl-2">
                  {formatDartCode(line)}
                </span>
              </div>
            );
          })}
        </pre>
      </div>

      {/* Quick Firebase Integration Guide Footer */}
      <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Roles: Student • Company • School Admin
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">
            Total Lines: {lines.length}
          </span>
        </div>
        <div className="flex items-center gap-2 text-indigo-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Ready to copy into your Flutter project</span>
        </div>
      </div>
    </div>
  );
};

// Lightweight syntax highlighter helper for Dart, Rules, and JSON
function formatDartCode(line: string) {
  // Comments
  if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Keywords & Imports
  if (line.trim().startsWith('import ') || line.trim().startsWith('export ')) {
    return <span className="text-pink-400 font-semibold">{line}</span>;
  }

  // Return formatted line with subtle color touches
  return <span>{line}</span>;
}
