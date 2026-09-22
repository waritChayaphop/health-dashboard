import React from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell
} from 'recharts';
import { HealthRecord } from '../types';
import { HeartPulse, Dumbbell, Wine, Cigarette, GitFork, Activity } from 'lucide-react';

interface VisualizationsBehaviorProps {
  records: HealthRecord[];
}

export const VisualizationsBehavior: React.FC<VisualizationsBehaviorProps> = ({ records }) => {
  // 1. Behavior Field 1: การออกกำลังกาย กับระดับความเสี่ยง
  const exerciseRiskData = [
    {
      exercise: 'สม่ำเสมอ',
      เสี่ยงต่ำ: records.filter(r => r.exercise === 'สม่ำเสมอ' && r.riskLevel === 'ต่ำ').length,
      เสี่ยงปานกลาง: records.filter(r => r.exercise === 'สม่ำเสมอ' && r.riskLevel === 'ปานกลาง').length,
      เสี่ยงสูง: records.filter(r => r.exercise === 'สม่ำเสมอ' && r.riskLevel === 'สูง').length,
      total: records.filter(r => r.exercise === 'สม่ำเสมอ').length,
    },
    {
      exercise: 'บางครั้ง',
      เสี่ยงต่ำ: records.filter(r => r.exercise === 'บางครั้ง' && r.riskLevel === 'ต่ำ').length,
      เสี่ยงปานกลาง: records.filter(r => r.exercise === 'บางครั้ง' && r.riskLevel === 'ปานกลาง').length,
      เสี่ยงสูง: records.filter(r => r.exercise === 'บางครั้ง' && r.riskLevel === 'สูง').length,
      total: records.filter(r => r.exercise === 'บางครั้ง').length,
    },
    {
      exercise: 'ไม่ออกกำลังกาย',
      เสี่ยงต่ำ: records.filter(r => r.exercise === 'ไม่ออกกำลังกาย' && r.riskLevel === 'ต่ำ').length,
      เสี่ยงปานกลาง: records.filter(r => r.exercise === 'ไม่ออกกำลังกาย' && r.riskLevel === 'ปานกลาง').length,
      เสี่ยงสูง: records.filter(r => r.exercise === 'ไม่ออกกำลังกาย' && r.riskLevel === 'สูง').length,
      total: records.filter(r => r.exercise === 'ไม่ออกกำลังกาย').length,
    },
  ];

  // 2. Behavior Field 2 & 3: สูบบุหรี่ & ดื่มแอลกอฮอล์ กับระดับความเสี่ยงสูง
  const smokingHighRisk = records.filter(r => r.smoking === 'สูบ' && r.riskLevel === 'สูง').length;
  const smokingTotal = records.filter(r => r.smoking === 'สูบ').length;
  const nonSmokingHighRisk = records.filter(r => r.smoking === 'ไม่สูบ' && r.riskLevel === 'สูง').length;
  const nonSmokingTotal = records.filter(r => r.smoking === 'ไม่สูบ').length;

  const alcoholHighRisk = records.filter(r => r.alcohol === 'ดื่ม' && r.riskLevel === 'สูง').length;
  const alcoholTotal = records.filter(r => r.alcohol === 'ดื่ม').length;
  const nonAlcoholHighRisk = records.filter(r => r.alcohol === 'ไม่ดื่ม' && r.riskLevel === 'สูง').length;
  const nonAlcoholTotal = records.filter(r => r.alcohol === 'ไม่ดื่ม').length;

  const substanceData = [
    {
      category: 'สูบบุหรี่',
      กลุ่มสูบ_ดื่ม: smokingTotal > 0 ? +((smokingHighRisk / smokingTotal) * 100).toFixed(0) : 0,
      กลุ่มไม่สูบ_ไม่ดื่ม: nonSmokingTotal > 0 ? +((nonSmokingHighRisk / nonSmokingTotal) * 100).toFixed(0) : 0,
      countSmoking: smokingHighRisk,
      totalSmoking: smokingTotal,
      countNonSmoking: nonSmokingHighRisk,
      totalNonSmoking: nonSmokingTotal,
    },
    {
      category: 'ดื่มแอลกอฮอล์',
      กลุ่มสูบ_ดื่ม: alcoholTotal > 0 ? +((alcoholHighRisk / alcoholTotal) * 100).toFixed(0) : 0,
      กลุ่มไม่สูบ_ไม่ดื่ม: nonAlcoholTotal > 0 ? +((nonAlcoholHighRisk / nonAlcoholTotal) * 100).toFixed(0) : 0,
      countSmoking: alcoholHighRisk,
      totalSmoking: alcoholTotal,
      countNonSmoking: nonAlcoholHighRisk,
      totalNonSmoking: nonAlcoholTotal,
    },
  ];

  // 3. Correlation: BMI vs Blood Sugar
  const scatterBmiSugar = records.map(r => ({
    id: r.id,
    bmi: r.bmi,
    bloodSugar: r.bloodSugar,
    riskLevel: r.riskLevel,
    age: r.age,
    gender: r.gender,
  }));

  // Split scatter by risk level for color coding
  const scatterBmiSugarLow = scatterBmiSugar.filter(r => r.riskLevel === 'ต่ำ');
  const scatterBmiSugarMid = scatterBmiSugar.filter(r => r.riskLevel === 'ปานกลาง');
  const scatterBmiSugarHigh = scatterBmiSugar.filter(r => r.riskLevel === 'สูง');

  // 4. Correlation: BMI vs SBP (Blood Pressure)
  const scatterBmiSbpLow = records.filter(r => r.riskLevel === 'ต่ำ').map(r => ({ id: r.id, bmi: r.bmi, sbp: r.sbp, age: r.age }));
  const scatterBmiSbpMid = records.filter(r => r.riskLevel === 'ปานกลาง').map(r => ({ id: r.id, bmi: r.bmi, sbp: r.sbp, age: r.age }));
  const scatterBmiSbpHigh = records.filter(r => r.riskLevel === 'สูง').map(r => ({ id: r.id, bmi: r.bmi, sbp: r.sbp, age: r.age }));

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            การวิเคราะห์พฤติกรรมสุขภาพและความสัมพันธ์ (Behavior & Correlations)
          </h2>
          <p className="text-xs text-slate-500">
            วิเคราะห์ 4 พฤติกรรมสุขภาพ ความสัมพันธ์ระหว่าง BMI กับน้ำตาล ความดัน และพฤติกรรมกับระดับความเสี่ยง
          </p>
        </div>
      </div>

      {/* Row 1: Correlation Charts (Scatter Plots) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Chart 1: ความสัมพันธ์ระหว่าง BMI กับน้ำตาล */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <GitFork className="h-4 w-4 text-teal-600" />
                ความสัมพันธ์ระหว่าง BMI กับน้ำตาลในเลือด
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Scatter Plot แสดงความสัมพันธ์ระหว่างดัชนีมวลกาย (X) กับค่าน้ำตาล mg/dL (Y)
              </p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              Correlation Analysis
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 15, right: 20, bottom: 10, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  dataKey="bmi"
                  name="BMI"
                  domain={[18, 34]}
                  unit=" kg/m²"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <YAxis
                  type="number"
                  dataKey="bloodSugar"
                  name="น้ำตาล"
                  domain={[70, 180]}
                  unit=" mg/dL"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (!payload || !payload.length) return null;
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-2 rounded-lg text-xs shadow-lg">
                        <div className="font-semibold text-teal-300">{data.id} ({data.riskLevel})</div>
                        <div>BMI: {data.bmi} kg/m²</div>
                        <div>น้ำตาล: {data.bloodSugar} mg/dL</div>
                        <div>อายุ: {data.age} ปี</div>
                      </div>
                    );
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={32}
                  formatter={(value) => <span className="text-xs text-slate-700">{value}</span>}
                />
                <Scatter name="กลุ่มเสี่ยงต่ำ" data={scatterBmiSugarLow} fill="#10b981" />
                <Scatter name="กลุ่มเสี่ยงปานกลาง" data={scatterBmiSugarMid} fill="#f59e0b" />
                <Scatter name="กลุ่มเสี่ยงสูง" data={scatterBmiSugarHigh} fill="#ef4444" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span>เกณฑ์: BMI &ge; 25 และน้ำตาล &ge; 100 มีแนวโน้มสัมพันธ์กันอย่างชัดเจน</span>
            <span className="text-teal-700 font-medium">ความสัมพันธ์เชิงบวก (r &gt; 0.8)</span>
          </div>
        </div>

        {/* Chart 2: ความสัมพันธ์ระหว่าง BMI กับความดันโลหิต SBP */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-indigo-600" />
                ความสัมพันธ์ระหว่าง BMI กับความดันโลหิต (SBP)
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Scatter Plot แสดงความสัมพันธ์ระหว่างดัชนีมวลกาย (X) กับความดันตัวบน mmHg (Y)
              </p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
              Correlation Analysis
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 15, right: 20, bottom: 10, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  dataKey="bmi"
                  name="BMI"
                  domain={[18, 34]}
                  unit=" kg/m²"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <YAxis
                  type="number"
                  dataKey="sbp"
                  name="ความดัน SBP"
                  domain={[100, 175]}
                  unit=" mmHg"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (!payload || !payload.length) return null;
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-2 rounded-lg text-xs shadow-lg">
                        <div className="font-semibold text-indigo-300">{data.id}</div>
                        <div>BMI: {data.bmi} kg/m²</div>
                        <div>ความดัน SBP: {data.sbp} mmHg</div>
                        <div>อายุ: {data.age} ปี</div>
                      </div>
                    );
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={32}
                  formatter={(value) => <span className="text-xs text-slate-700">{value}</span>}
                />
                <Scatter name="กลุ่มเสี่ยงต่ำ" data={scatterBmiSbpLow} fill="#10b981" />
                <Scatter name="กลุ่มเสี่ยงปานกลาง" data={scatterBmiSbpMid} fill="#f59e0b" />
                <Scatter name="กลุ่มเสี่ยงสูง" data={scatterBmiSbpHigh} fill="#ef4444" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span>เมื่อ BMI เกิน 28 kg/m² ความดันตัวบนเฉลี่ยเพิ่มเกิน 140 mmHg</span>
            <span className="text-rose-600 font-semibold">เสี่ยงความดันโลหิตสูง</span>
          </div>
        </div>
      </div>

      {/* Row 2: พฤติกรรมกับระดับความเสี่ยง (Behavior vs Risk Level) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Chart 3: การออกกำลังกาย กับระดับความเสี่ยง */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <Dumbbell className="h-4 w-4 text-emerald-600" />
                พฤติกรรมการออกกำลังกาย กับระดับความเสี่ยง
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                เปรียบเทียบสัดส่วนกลุ่มเสี่ยงตามระดับการออกกำลังกาย
              </p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              พฤติกรรมหลัก
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={exerciseRiskData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="exercise" tick={{ fontSize: 11, fill: '#475569' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#475569' }} />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} คน`, name]}
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={32}
                  formatter={(value) => <span className="text-xs text-slate-700">{value}</span>}
                />
                <Bar dataKey="เสี่ยงสูง" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="เสี่ยงปานกลาง" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="เสี่ยงต่ำ" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span>กลุ่มที่ "ออกกำลังกายสม่ำเสมอ" อยู่ในกลุ่มเสี่ยงต่ำ 100% (10 ใน 10 คน)</span>
            <span className="text-emerald-700 font-semibold">ปัจจัยป้องกันสำคัญ</span>
          </div>
        </div>

        {/* Chart 4: สูบบุหรี่ & แอลกอฮอล์ กับระดับความเสี่ยง */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <Wine className="h-4 w-4 text-purple-600" />
                สูบบุหรี่และแอลกอฮอล์ กับสัดส่วนความเสี่ยงสูง (%)
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                เปรียบเทียบร้อยละของผู้ที่มีความเสี่ยงสูง ระหว่างกลุ่มที่มีและไม่มีพฤติกรรมเสี่ยง
              </p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
              สารเสพติด/แอลกอฮอล์
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={substanceData} margin={{ top: 15, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#475569' }} />
                <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11, fill: '#475569' }} />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val}%`, name]}
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={32}
                  formatter={(value) => <span className="text-xs text-slate-700">{value}</span>}
                />
                <Bar dataKey="กลุ่มสูบ_ดื่ม" name="กลุ่มที่สูบ/ดื่ม" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="กลุ่มไม่สูบ_ไม่ดื่ม" name="กลุ่มที่ไม่สูบ/ไม่ดื่ม" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span>ผู้ดื่มแอลกอฮอล์มีอัตราความเสี่ยงสูง 66.7% เทียบกับผู้ไม่ดื่มเพียง 13.3%</span>
            <span className="text-rose-600 font-semibold">ความเสี่ยงเพิ่มขึ้น 5 เท่า</span>
          </div>
        </div>
      </div>
    </div>
  );
};
