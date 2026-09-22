import React from 'react';
import { Users, Scale, Droplet, Heart, AlertOctagon, TrendingUp, TrendingDown, Check } from 'lucide-react';
import { KPISummary } from '../utils/statistics';

interface KPISummaryCardsProps {
  summary: KPISummary;
  totalDatasetCount: number;
}

export const KPISummaryCards: React.FC<KPISummaryCardsProps> = ({
  summary,
  totalDatasetCount,
}) => {
  return (
    <section aria-label="สรุปตัวชี้วัดสุขภาพสำคัญ" className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            สรุปข้อมูลตัวชี้วัดสำคัญ (Key Health Indicators)
          </h2>
          <p className="text-xs text-slate-500">
            สรุปภาพรวม จำนวนประชากร ค่าเฉลี่ย ค่าต่ำสุด-สูงสุด สัดส่วน และร้อยละ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: จำนวนประชากรที่คัดกรอง (Total Population) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                ประชากรคัดกรอง
              </span>
              <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                <Users className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
                {summary.totalCount}
              </span>
              <span className="text-xs font-medium text-slate-500">
                จาก {totalDatasetCount} คน (100%)
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-1">
              สัดส่วนชาย-หญิง เท่ากัน 50:50 (ชาย 15 / หญิง 15)
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[11px] text-slate-500 block">อายุเฉลี่ย</span>
              <span className="font-semibold text-slate-800">{summary.avgAge} ปี</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">ช่วงอายุ (Min-Max)</span>
              <span className="font-semibold text-slate-800">{summary.minAge} - {summary.maxAge} ปี</span>
            </div>
          </div>
        </div>

        {/* KPI 2: ดัชนีมวลกาย BMI (Average, Min, Max) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                ดัชนีมวลกาย (BMI)
              </span>
              <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <Scale className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
                {summary.avgBmi}
              </span>
              <span className="text-xs font-medium text-slate-500">kg/m² (เฉลี่ย)</span>
            </div>

            <div className="mt-1 flex items-center gap-1.5">
              <span className="inline-flex items-center text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                เกินเกณฑ์มาตรฐาน (&gt;23)
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[11px] text-slate-500 block">ต่ำสุด (Min)</span>
              <span className="font-semibold text-emerald-700">{summary.minBmi} kg/m²</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">สูงสุด (Max)</span>
              <span className="font-semibold text-rose-700">{summary.maxBmi} kg/m²</span>
            </div>
          </div>
        </div>

        {/* KPI 3: ระดับน้ำตาลในเลือด (Fasting Blood Sugar) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                ระดับน้ำตาลเฉลี่ย
              </span>
              <div className="h-8 w-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                <Droplet className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
                {summary.avgBloodSugar}
              </span>
              <span className="text-xs font-medium text-slate-500">mg/dL (เฉลี่ย)</span>
            </div>

            <div className="mt-1">
              <span className="text-xs text-rose-700 font-medium">
                เสี่ยงเบาหวาน {summary.diabetesRiskCount} คน ({summary.diabetesRiskPct}%)
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[11px] text-slate-500 block">ต่ำสุด (Min)</span>
              <span className="font-semibold text-emerald-700">{summary.minBloodSugar} mg/dL</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">สูงสุด (Max)</span>
              <span className="font-semibold text-rose-700">{summary.maxBloodSugar} mg/dL</span>
            </div>
          </div>
        </div>

        {/* KPI 4: ความดันโลหิตและกลุ่มเสี่ยงสูง (Blood Pressure & High Risk) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                ความดันโลหิตเฉลี่ย
              </span>
              <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Heart className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
                {summary.avgSbp}/{summary.avgDbp}
              </span>
              <span className="text-xs font-medium text-slate-500">mmHg</span>
            </div>

            <div className="mt-1">
              <span className="text-xs text-amber-800 font-medium">
                เสี่ยงความดันสูง {summary.hypertensionRiskCount} คน ({summary.hypertensionRiskPct}%)
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[11px] text-slate-500 block">SBP ต่ำสุด - สูงสุด</span>
              <span className="font-semibold text-slate-800">{summary.minSbp} - {summary.maxSbp}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">ชีพจรเฉลี่ย</span>
              <span className="font-semibold text-slate-800">{summary.avgPulse} bpm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Proportions & Risk Level Banner */}
      <div className="mt-4 bg-slate-900 text-white rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <AlertOctagon className="h-5 w-5 text-amber-400" />
              <h3 className="font-semibold text-sm sm:text-base">
                สัดส่วนระดับความเสี่ยงสุขภาพโดยรวม (Risk Level Breakdown)
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              คำนวณจากเกณฑ์คะแนนความเสี่ยงสุขภาพ (คะแนนเฉลี่ย: {summary.avgRiskScore} / 7 คะแนน)
            </p>
          </div>

          {/* Three Risk Tier Pills */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* High Risk */}
            <div className="bg-rose-950/80 border border-rose-800/80 rounded-lg p-2.5 text-center">
              <span className="text-[11px] text-rose-300 font-medium block">กลุ่มเสี่ยงสูง</span>
              <span className="text-lg sm:text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                {summary.highRiskCount} คน
              </span>
              <span className="text-[11px] text-rose-300 font-semibold block mt-0.5">
                {summary.highRiskPct}%
              </span>
            </div>

            {/* Medium Risk */}
            <div className="bg-amber-950/80 border border-amber-800/80 rounded-lg p-2.5 text-center">
              <span className="text-[11px] text-amber-300 font-medium block">กลุ่มเสี่ยงปานกลาง</span>
              <span className="text-lg sm:text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                {summary.mediumRiskCount} คน
              </span>
              <span className="text-[11px] text-amber-300 font-semibold block mt-0.5">
                {summary.mediumRiskPct}%
              </span>
            </div>

            {/* Low Risk */}
            <div className="bg-emerald-950/80 border border-emerald-800/80 rounded-lg p-2.5 text-center">
              <span className="text-[11px] text-emerald-300 font-medium block">กลุ่มเสี่ยงต่ำ</span>
              <span className="text-lg sm:text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                {summary.lowRiskCount} คน
              </span>
              <span className="text-[11px] text-emerald-300 font-semibold block mt-0.5">
                {summary.lowRiskPct}%
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar Visualization of Risk Proportions */}
        <div className="mt-4">
          <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${summary.highRiskPct}%` }}
              title={`เสี่ยงสูง: ${summary.highRiskCount} คน (${summary.highRiskPct}%)`}
              className="bg-rose-500 h-full transition-all duration-500"
            />
            <div
              style={{ width: `${summary.mediumRiskPct}%` }}
              title={`เสี่ยงปานกลาง: ${summary.mediumRiskCount} คน (${summary.mediumRiskPct}%)`}
              className="bg-amber-500 h-full transition-all duration-500"
            />
            <div
              style={{ width: `${summary.lowRiskPct}%` }}
              title={`เสี่ยงต่ำ: ${summary.lowRiskCount} คน (${summary.lowRiskPct}%)`}
              className="bg-emerald-500 h-full transition-all duration-500"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-rose-500"></span> เสี่ยงสูง ({summary.highRiskPct}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span> เสี่ยงปานกลาง ({summary.mediumRiskPct}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span> เสี่ยงต่ำ ({summary.lowRiskPct}%)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
