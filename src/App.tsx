/**
 * MagangKuy - Full Screen Mobile Application (SMA/SMK Internship Platform)
 * Production-ready mobile interface without exposing internal database records.
 */

import React, { useState } from 'react';
import { MobileApp } from './components/MobileApp';
import { FlutterCodeViewer } from './components/FlutterCodeViewer';
import { FileCode, Smartphone, X } from 'lucide-react';

export default function App() {
  const [showCodeModal, setShowCodeModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 font-sans relative selection:bg-indigo-500 selection:text-white">
      {/* Main Full-Screen Mobile App Experience */}
      <MobileApp />

      {/* Floating Developer Code Access Pill (Subtle, non-intrusive) */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowCodeModal(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-950 text-white text-xs font-semibold shadow-xl border border-slate-700 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Lihat Kode Flutter Dart (main.dart, login_screen.dart, student_dashboard.dart)"
        >
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span className="hidden sm:inline">Source Code Flutter</span>
          <span className="sm:hidden">Dart Code</span>
        </button>
      </div>

      {/* Flutter Codebase Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-5xl h-[88vh] bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <FileCode className="w-4 h-4 text-indigo-400" />
                <span>Source Code Flutter MagangKuy (Production-Ready)</span>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Code Viewer */}
            <div className="flex-1 overflow-hidden p-2">
              <FlutterCodeViewer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
