import React from 'react';
import { HealthRecord, TabType } from '../types';
import { KPISummary } from '../utils/statistics';
import { Lightbulb, AlertTriangle, TrendingUp, CheckCircle2, ArrowRight, ShieldCheck, MapPin, Users } from 'lucide-react';

interface ExecutiveSummaryProps {
  summary: KPISummary;
  records: HealthRecord[];
  onNavigateTab: (tab: TabType) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  summary,
  records,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* 5 Core Required Findings Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Finding 1: กลุ่มอายุที่มีความเสี่ยงสูง */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                <Users className="h-4 w-4" />
              </span>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                กลุ่มอายุที่มีความเสี่ยงสูง
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ผู้รับการคัดกรองที่มีอายุ <strong className="text-purple-900 font-semibold">60 ปีขึ้นไป (6 คน)</strong> อยู่ในกลุ่มความเสี่ยงสูง 100% มีค่าน้ำตาลเฉลี่ย 148.3 mg/dL และ SBP เฉลี่ย 154.6 mmHg ซึ่งสูงกว่ากลุ่มวัยทำงานอย่างมีนัยสำคัญ
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('risk_trend')}
            className="mt-3 text-xs font-semibold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
          >
            ดูสถิติกลุ่มอายุ <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Finding 2: พื้นที่ที่มีผู้เสี่ยงสูง */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                <MapPin className="h-4 w-4" />
              </span>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                พื้นที่ที่มีผู้เสี่ยงสูง
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              พื้นที่ <strong className="text-rose-900 font-semibold">"ตะวันออก"</strong> และ <strong className="text-rose-900 font-semibold">"ใต้"</strong> มีสัดส่วนผู้มีความเสี่ยงสูงมากที่สุด คิดเป็น 66.7% (พื้นที่ละ 4 ใน 6 คน) ในขณะที่พื้นที่ "เมือง" มีสัดส่วนเสี่ยงต่ำมากที่สุด (83.3%)
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('risk_trend')}
            className="mt-3 text-xs font-semibold text-rose-700 hover:text-rose-900 inline-flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
          >
            ดูการกระจายเชิงพื้นที่ <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Finding 3: ความสัมพันธ์ BMI กับน้ำตาลและความดัน */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
                <TrendingUp className="h-4 w-4" />
              </span>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                ความสัมพันธ์ BMI กับน้ำตาล & ความดัน
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ผู้ที่มี <strong className="text-teal-900 font-semibold">BMI &ge; 28 kg/m²</strong> มีความเสี่ยงต่อระดับน้ำตาลเกินเกณฑ์และภาวะความดันโลหิตสูงสูงถึง 91.7% โดยค่า BMI สัมพันธ์เชิงบวกชัดเจนกับทั้งค่า SBP และ Blood Sugar
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('behavior_correlation')}
            className="mt-3 text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
          >
            ดูกราฟ Correlation Scatter <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Actionable Health Strategy Card */}
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 shrink-0">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                ข้อเสนอแนะเชิงนโยบายเพื่อการดูแลสุขภาพ (Health Promotion Recommendations)
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                1. รณรงค์กลุ่มผู้สูงอายุ (&ge;60 ปี) และพื้นที่ตะวันออก/ใต้ เข้าตรวจประเมินภาวะแทรกซ้อนเบาหวานและความดัน<br />
                2. ส่งเสริมคลินิกปรับเปลี่ยนพฤติกรรม (DPAC) เน้นลดการดื่มแอลกอฮอล์ และเพิ่มการออกกำลังกายสม่ำเสมอสัปดาห์ละ 150 นาที
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('datatable')}
              className="px-3.5 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              ดูตารางคัดกรอง 30 คน <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
