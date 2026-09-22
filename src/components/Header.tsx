import React from 'react';
import { Activity, RefreshCw, CheckCircle2, AlertCircle, FileSpreadsheet, User, Clock, ExternalLink } from 'lucide-react';
import { GOOGLE_SHEET_ID, GOOGLE_SHEET_VIEW_URL } from '../data/healthData';

interface HeaderProps {
  lastUpdated: string;
  isLive: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  totalRecords: number;
}

export const Header: React.FC<HeaderProps> = ({
  lastUpdated,
  isLive,
  isLoading,
  onRefresh,
  totalRecords,
}) => {
  return (
    <header id="dashboard-header" className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Title and Short Description */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="h-10 w-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs">
                <Activity className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                    Health Overview
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200/80">
                    ระบบติดตามสุขภาพ
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  แดชบอร์ดติดตามและประเมินความเสี่ยงสุขภาพ การคัดกรองเบาหวาน ความดันโลหิตสูง และพฤติกรรมสุขภาพของประชาชน
                </p>
              </div>
            </div>
          </div>

          {/* Author, Update timestamp, and Sheet sync status */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            {/* Author Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              <User className="h-3.5 w-3.5 text-teal-600" />
              <span className="text-slate-500 font-normal">ผู้จัดทำ:</span>
              <span className="font-semibold text-slate-800">วริษฐ์ ชยภพ</span>
            </div>

            {/* Last Updated */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-slate-500 font-normal">อัปเดต:</span>
              <span className="font-medium text-slate-800">{lastUpdated}</span>
            </div>

            {/* Google Sheet Link & Sync Indicator */}
            <div className="inline-flex items-center gap-2">
              <a
                href={GOOGLE_SHEET_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                title={`Google Sheet ID: ${GOOGLE_SHEET_ID}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
                <span className="font-medium hidden sm:inline">Google Sheet</span>
                <span className="font-mono text-[11px] text-emerald-700">({totalRecords} รายการ)</span>
                <ExternalLink className="h-3 w-3 text-emerald-600" />
              </a>

              <button
                id="btn-refresh-sheet"
                onClick={onRefresh}
                disabled={isLoading}
                title="รีเฟรชข้อมูลล่าสุดจาก Google Sheet ID"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium transition-all shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">รีเฟรชข้อมูล</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live sync sub-banner */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span>
              เชื่อมโยง Sheet ID: <code className="font-mono text-slate-700 font-semibold">{GOOGLE_SHEET_ID}</code>
            </span>
            {isLive ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 className="h-3 w-3" /> ออนไลน์ (Live Synced)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-slate-600">
                <AlertCircle className="h-3 w-3 text-amber-500" /> ข้อมูลชุดมาตรฐาน 30 รายการ
              </span>
            )}
          </div>
          <span className="hidden md:inline text-slate-400">
            ระบบคัดกรองเบาหวาน ความดันโลหิต และพฤติกรรมเสี่ยง
          </span>
        </div>
      </div>
    </header>
  );
};
