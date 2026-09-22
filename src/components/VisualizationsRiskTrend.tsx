import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { HealthRecord } from '../types';
import { AlertTriangle, TrendingUp, MapPin, Calendar, Activity, ShieldAlert } from 'lucide-react';

interface VisualizationsRiskTrendProps {
  records: HealthRecord[];
}

export const VisualizationsRiskTrend: React.FC<VisualizationsRiskTrendProps> = ({ records }) => {
  // 1. Health Risk: Risk Level Distribution (ต่ำ, ปานกลาง, สูง)
  const riskCounts = {
    ต่ำ: records.filter(r => r.riskLevel === 'ต่ำ').length,
    ปานกลาง: records.filter(r => r.riskLevel === 'ปานกลาง').length,
    สูง: records.filter(r => r.riskLevel === 'สูง').length,
  };

  const riskPieData = [
    { name: 'เสี่ยงต่ำ', value: riskCounts['ต่ำ'], color: '#10b981' },
    { name: 'เสี่ยงปานกลาง', value: riskCounts['ปานกลาง'], color: '#f59e0b' },
    { name: 'เสี่ยงสูง', value: riskCounts['สูง'], color: '#ef4444' },
  ].filter(d => d.value > 0);

  // 2. Health Risk: Dual Screening Comparison (เบาหวาน vs ความดันโลหิตสูง)
  const dualScreeningData = [
    {
      category: 'ผลคัดกรองเบาหวาน',
      เสี่ยง: records.filter(r => r.diabetesRisk === 'มีแนวโน้ม/เสี่ยง').length,
      ปกติ: records.filter(r => r.diabetesRisk === 'ไม่มี').length,
    },
    {
      category: 'ผลคัดกรองความดันสูง',
      เสี่ยง: records.filter(r => r.hypertensionRisk === 'มีแนวโน้ม/เสี่ยง').length,
      ปกติ: records.filter(r => r.hypertensionRisk === 'ไม่มี').length,
    },
  ];

  // 3. Health Risk: Risk Score Distribution (0-7 points)
  const scoreCounts: { [score: number]: number } = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  records.forEach(r => {
    scoreCounts[r.riskScore] = (scoreCounts[r.riskScore] || 0) + 1;
  });
  const riskScoreDistData = Object.keys(scoreCounts).map(score => ({
    score: `${score} คะแนน`,
    count: scoreCounts[Number(score)],
  }));

  // 4. Health Trend: Monthly Trend (2026-01, 2026-02, 2026-03)
  const monthMap: { [key: string]: { sugarSum: number; sbpSum: number; dbpSum: number; count: number; highRiskCount: number } } = {
    '2026-01': { sugarSum: 0, sbpSum: 0, dbpSum: 0, count: 0, highRiskCount: 0 },
    '2026-02': { sugarSum: 0, sbpSum: 0, dbpSum: 0, count: 0, highRiskCount: 0 },
    '2026-03': { sugarSum: 0, sbpSum: 0, dbpSum: 0, count: 0, highRiskCount: 0 },
  };

  records.forEach(r => {
    if (monthMap[r.month]) {
      monthMap[r.month].sugarSum += r.bloodSugar;
      monthMap[r.month].sbpSum += r.sbp;
      monthMap[r.month].dbpSum += r.dbp;
      monthMap[r.month].count += 1;
      if (r.riskLevel === 'สูง') {
        monthMap[r.month].highRiskCount += 1;
      }
    }
  });

  const monthLabels: { [key: string]: string } = {
    '2026-01': 'ม.ค. 2569',
    '2026-02': 'ก.พ. 2569',
    '2026-03': 'มี.ค. 2569',
  };

  const monthlyTrendData = Object.keys(monthMap).map(m => {
    const d = monthMap[m];
    const c = d.count || 1;
    return {
      month: monthLabels[m] || m,
      avgSugar: +(d.sugarSum / c).toFixed(1),
      avgSbp: +(d.sbpSum / c).toFixed(1),
      avgDbp: +(d.dbpSum / c).toFixed(1),
      highRiskCount: d.highRiskCount,
      totalCount: d.count,
    };
  });

  // 5. Additional: กลุ่มอายุที่มีความเสี่ยงสูง (High Risk by Age Group)
  const ageGroups = [
    { label: '<30 ปี', filter: (age: number) => age < 30 },
    { label: '30-45 ปี', filter: (age: number) => age >= 30 && age <= 45 },
    { label: '46-59 ปี', filter: (age: number) => age >= 46 && age <= 59 },
    { label: '60 ปีขึ้นไป', filter: (age: number) => age >= 60 },
  ];

  const ageRiskData = ageGroups.map(ag => {
    const inGroup = records.filter(r => ag.filter(r.age));
    const total = inGroup.length;
    const high = inGroup.filter(r => r.riskLevel === 'สูง').length;
    const medium = inGroup.filter(r => r.riskLevel === 'ปานกลาง').length;
    const low = inGroup.filter(r => r.riskLevel === 'ต่ำ').length;
    return {
      ageGroup: ag.label,
      เสี่ยงสูง: high,
      เสี่ยงปานกลาง: medium,
      เสี่ยงต่ำ: low,
      total,
      highRiskPct: total > 0 ? +((high / total) * 100).toFixed(0) : 0,
    };
  });

  // 6. Additional: พื้นที่ที่มีผู้เสี่ยงสูง (High Risk by Area)
  const areas = ['เมือง', 'เหนือ', 'ตะวันออก', 'ตะวันตก', 'ใต้'];
  const areaRiskData = areas.map(area => {
    const inArea = records.filter(r => r.area === area);
    const total = inArea.length;
    const high = inArea.filter(r => r.riskLevel === 'สูง').length;
    const medium = inArea.filter(r => r.riskLevel === 'ปานกลาง').length;
    const low = inArea.filter(r => r.riskLevel === 'ต่ำ').length;
    return {
      area,
      เสี่ยงสูง: high,
      เสี่ยงปานกลาง: medium,
      เสี่ยงต่ำ: low,
      total,
    };
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            การวิเคราะห์ความเสี่ยงและแนวโน้มสุขภาพ (Health Risk & Trend Analysis)
          </h2>
          <p className="text-xs text-slate-500">
            วิเคราะห์ 4 ปัจจัยความเสี่ยง, แนวโน้มค่าเฉลี่ย 2 ตัวชี้วัดตามเดือน, กลุ่มอายุ และพื้นที่เสี่ยง
          </p>
        </div>
      </div>

      {/* Row 1: Health Risk Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart 1: Donut Chart - Risk Level Proportions */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              ระดับความเสี่ยงสุขภาพ (Risk Level)
            </h3>
            <span className="text-[11px] text-slate-500">3 ระดับ</span>
          </div>
          <p className="text-[11px] text-slate-500 mb-2">
            สัดส่วนผู้เข้ารับการคัดกรองตามกลุ่มความเสี่ยง
          </p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} คน`, name]}
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={32}
                  formatter={(value) => <span className="text-xs text-slate-700">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Dual Screening - Diabetes vs Hypertension */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-amber-500" />
              คัดกรองเบาหวาน vs ความดันโลหิตสูง
            </h3>
            <span className="text-[11px] text-slate-500">ผลคัดกรอง</span>
          </div>
          <p className="text-[11px] text-slate-500 mb-2">
            เปรียบเทียบผู้มีแนวโน้มเสี่ยงกับผู้มีผลตรวจปกติ
          </p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dualScreeningData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#475569' }} />
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
                <Bar dataKey="เสี่ยง" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ปกติ" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Risk Score Distribution (0-7 Points) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-indigo-500" />
              การกระจายคะแนนความเสี่ยง (0-7 คะแนน)
            </h3>
            <span className="text-[11px] text-slate-500">Histogram</span>
          </div>
          <p className="text-[11px] text-slate-500 mb-2">
            จำนวนคนในแต่ละระดับคะแนนความเสี่ยงสะสม
          </p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskScoreDistData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="score" tick={{ fontSize: 10, fill: '#475569' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#475569' }} />
                <Tooltip
                  formatter={(val: any) => [`${val} คน`, 'จำนวน']}
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]}>
                  {riskScoreDistData.map((entry, index) => {
                    const score = parseInt(entry.score);
                    let color = '#10b981';
                    if (score >= 2 && score <= 3) color = '#f59e0b';
                    if (score >= 4) color = '#ef4444';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Health Trend & Additional Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Chart 4: Health Trend (น้ำตาล และ ความดันเฉลี่ยตามเดือน) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-teal-600" />
                แนวโน้มสุขภาพตามเดือน (Health Trend: Jan - Mar 2026)
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                เปรียบเทียบแนวโน้มระดับน้ำตาลในเลือด (mg/dL) และความดันตัวบน SBP (mmHg)
              </p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              2 Fields วิเคราะห์แนวโน้ม
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData} margin={{ top: 15, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#475569' }} />
                <YAxis domain={[80, 160]} tick={{ fontSize: 11, fill: '#475569' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={32}
                  formatter={(value) => {
                    const label = value === 'avgSugar' ? 'ระดับน้ำตาลเฉลี่ย (mg/dL)' : 'ความดัน SBP เฉลี่ย (mmHg)';
                    return <span className="text-xs text-slate-700">{label}</span>;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="avgSugar"
                  name="avgSugar"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#ef4444' }}
                />
                <Line
                  type="monotone"
                  dataKey="avgSbp"
                  name="avgSbp"
                  stroke="#0284c7"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#0284c7' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span>เกณฑ์ปกติ: น้ำตาล &lt; 100 mg/dL | ความดัน SBP &lt; 120 mmHg</span>
            <span className="text-amber-700 font-medium">มีนาคมพบแนวโน้มสูงขึ้น</span>
          </div>
        </div>

        {/* Chart 5: กลุ่มอายุที่มีความเสี่ยงสูง (High Risk by Age Group) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-purple-600" />
                กลุ่มอายุที่มีความเสี่ยงสูง (High Risk by Age Group)
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                สัดส่วนระดับความเสี่ยงแยกตาม 4 กลุ่มวัย
              </p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
              วิเคราะห์อายุ
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageRiskData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="ageGroup" tick={{ fontSize: 11, fill: '#475569' }} />
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
                <Bar dataKey="เสี่ยงสูง" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
                <Bar dataKey="เสี่ยงปานกลาง" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="เสี่ยงต่ำ" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span>กลุ่ม 60 ปีขึ้นไป มีสัดส่วนเสี่ยงสูง 100% (6 ใน 6 คน)</span>
            <span className="text-rose-600 font-semibold">กลุ่มเฝ้าระวังพิเศษ</span>
          </div>
        </div>
      </div>

      {/* Row 3: พื้นที่ที่มีผู้เสี่ยงสูง (Area Analysis) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-emerald-600" />
              พื้นที่ที่มีผู้เสี่ยงสูง (High Risk by Geographic Area)
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              การกระจายตัวของระดับความเสี่ยงใน 5 พื้นที่บริการสุขภาพ (เมือง, เหนือ, ตะวันออก, ตะวันตก, ใต้)
            </p>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
            การกระจายเชิงพื้นที่
          </span>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={areaRiskData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="area" tick={{ fontSize: 11, fill: '#475569' }} />
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

        <div className="mt-3 pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          {areaRiskData.map(item => (
            <div key={item.area} className="bg-slate-50 rounded-lg p-2 border border-slate-100">
              <span className="font-semibold text-slate-800 block">{item.area}</span>
              <span className="text-[11px] text-slate-500 block">เสี่ยงสูง: <strong className="text-rose-600">{item.เสี่ยงสูง}</strong>/{item.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
