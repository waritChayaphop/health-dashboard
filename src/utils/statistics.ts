import { HealthRecord } from '../types';

export interface KPISummary {
  totalCount: number;
  // Averages
  avgAge: number;
  avgBmi: number;
  avgSbp: number;
  avgDbp: number;
  avgPulse: number;
  avgBloodSugar: number;
  avgRiskScore: number;
  // Min-Max
  minBmi: number;
  maxBmi: number;
  minSbp: number;
  maxSbp: number;
  minBloodSugar: number;
  maxBloodSugar: number;
  minAge: number;
  maxAge: number;
  // Proportions & Percentages
  highRiskCount: number;
  highRiskPct: number;
  mediumRiskCount: number;
  mediumRiskPct: number;
  lowRiskCount: number;
  lowRiskPct: number;
  diabetesRiskCount: number;
  diabetesRiskPct: number;
  hypertensionRiskCount: number;
  hypertensionRiskPct: number;
  // Behaviors
  smokingCount: number;
  smokingPct: number;
  alcoholCount: number;
  alcoholPct: number;
  noExerciseCount: number;
  noExercisePct: number;
  regularExerciseCount: number;
  regularExercisePct: number;
}

export function computeKPISummary(records: HealthRecord[]): KPISummary {
  const n = records.length;
  if (n === 0) {
    return {
      totalCount: 0,
      avgAge: 0, avgBmi: 0, avgSbp: 0, avgDbp: 0, avgPulse: 0, avgBloodSugar: 0, avgRiskScore: 0,
      minBmi: 0, maxBmi: 0, minSbp: 0, maxSbp: 0, minBloodSugar: 0, maxBloodSugar: 0, minAge: 0, maxAge: 0,
      highRiskCount: 0, highRiskPct: 0,
      mediumRiskCount: 0, mediumRiskPct: 0,
      lowRiskCount: 0, lowRiskPct: 0,
      diabetesRiskCount: 0, diabetesRiskPct: 0,
      hypertensionRiskCount: 0, hypertensionRiskPct: 0,
      smokingCount: 0, smokingPct: 0,
      alcoholCount: 0, alcoholPct: 0,
      noExerciseCount: 0, noExercisePct: 0,
      regularExerciseCount: 0, regularExercisePct: 0,
    };
  }

  const sumAge = records.reduce((acc, r) => acc + r.age, 0);
  const sumBmi = records.reduce((acc, r) => acc + r.bmi, 0);
  const sumSbp = records.reduce((acc, r) => acc + r.sbp, 0);
  const sumDbp = records.reduce((acc, r) => acc + r.dbp, 0);
  const sumPulse = records.reduce((acc, r) => acc + r.pulse, 0);
  const sumBloodSugar = records.reduce((acc, r) => acc + r.bloodSugar, 0);
  const sumRiskScore = records.reduce((acc, r) => acc + r.riskScore, 0);

  const bmis = records.map(r => r.bmi);
  const sbps = records.map(r => r.sbp);
  const sugars = records.map(r => r.bloodSugar);
  const ages = records.map(r => r.age);

  const highRiskCount = records.filter(r => r.riskLevel === 'สูง').length;
  const mediumRiskCount = records.filter(r => r.riskLevel === 'ปานกลาง').length;
  const lowRiskCount = records.filter(r => r.riskLevel === 'ต่ำ').length;

  const diabetesRiskCount = records.filter(r => r.diabetesRisk === 'มีแนวโน้ม/เสี่ยง').length;
  const hypertensionRiskCount = records.filter(r => r.hypertensionRisk === 'มีแนวโน้ม/เสี่ยง').length;

  const smokingCount = records.filter(r => r.smoking === 'สูบ').length;
  const alcoholCount = records.filter(r => r.alcohol === 'ดื่ม').length;
  const noExerciseCount = records.filter(r => r.exercise === 'ไม่ออกกำลังกาย').length;
  const regularExerciseCount = records.filter(r => r.exercise === 'สม่ำเสมอ').length;

  return {
    totalCount: n,
    avgAge: +(sumAge / n).toFixed(1),
    avgBmi: +(sumBmi / n).toFixed(1),
    avgSbp: +(sumSbp / n).toFixed(1),
    avgDbp: +(sumDbp / n).toFixed(1),
    avgPulse: +(sumPulse / n).toFixed(1),
    avgBloodSugar: +(sumBloodSugar / n).toFixed(1),
    avgRiskScore: +(sumRiskScore / n).toFixed(1),

    minBmi: Math.min(...bmis),
    maxBmi: Math.max(...bmis),
    minSbp: Math.min(...sbps),
    maxSbp: Math.max(...sbps),
    minBloodSugar: Math.min(...sugars),
    maxBloodSugar: Math.max(...sugars),
    minAge: Math.min(...ages),
    maxAge: Math.max(...ages),

    highRiskCount,
    highRiskPct: +((highRiskCount / n) * 100).toFixed(1),
    mediumRiskCount,
    mediumRiskPct: +((mediumRiskCount / n) * 100).toFixed(1),
    lowRiskCount,
    lowRiskPct: +((lowRiskCount / n) * 100).toFixed(1),

    diabetesRiskCount,
    diabetesRiskPct: +((diabetesRiskCount / n) * 100).toFixed(1),
    hypertensionRiskCount,
    hypertensionRiskPct: +((hypertensionRiskCount / n) * 100).toFixed(1),

    smokingCount,
    smokingPct: +((smokingCount / n) * 100).toFixed(1),
    alcoholCount,
    alcoholPct: +((alcoholCount / n) * 100).toFixed(1),
    noExerciseCount,
    noExercisePct: +((noExerciseCount / n) * 100).toFixed(1),
    regularExerciseCount,
    regularExercisePct: +((regularExerciseCount / n) * 100).toFixed(1),
  };
}

export function getAgeCategory(age: number): string {
  if (age < 30) return '<30 ปี';
  if (age <= 45) return '30-45 ปี';
  if (age <= 59) return '46-59 ปี';
  return '60 ปีขึ้นไป';
}

export function getBMICategory(bmi: number): { label: string; color: string; bg: string } {
  if (bmi < 18.5) return { label: 'น้ำหนักน้อย', color: 'text-sky-700', bg: 'bg-sky-50 border-sky-200' };
  if (bmi < 23) return { label: 'ปกติ (สมส่วน)', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
  if (bmi < 25) return { label: 'น้ำหนักเกิน (ท้วม)', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' };
  if (bmi < 30) return { label: 'อ้วนระดับ 1', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' };
  return { label: 'อ้วนระดับ 2 (อันตราย)', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' };
}

export function getBloodSugarCategory(sugar: number): { label: string; color: string; bg: string } {
  if (sugar < 100) return { label: 'ปกติ (<100)', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
  if (sugar <= 125) return { label: 'เสี่ยงเบาหวาน (100-125)', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' };
  return { label: 'เบาหวาน (≥126)', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' };
}

export function getBPCategory(sbp: number, dbp: number): { label: string; color: string; bg: string } {
  if (sbp < 120 && dbp < 80) return { label: 'ปกติ', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
  if (sbp <= 139 || dbp <= 89) return { label: 'เสี่ยงสูง (Pre-HT)', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' };
  return { label: 'ความดันสูง (≥140/90)', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' };
}

export function getRiskLevelBadge(level: 'ต่ำ' | 'ปานกลาง' | 'สูง'): { label: string; color: string; bg: string; dot: string } {
  if (level === 'ต่ำ') return { label: 'เสี่ยงต่ำ', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-300', dot: 'bg-emerald-500' };
  if (level === 'ปานกลาง') return { label: 'เสี่ยงปานกลาง', color: 'text-amber-800', bg: 'bg-amber-50 border-amber-300', dot: 'bg-amber-500' };
  return { label: 'เสี่ยงสูง', color: 'text-rose-800', bg: 'bg-rose-50 border-rose-300', dot: 'bg-rose-500' };
}
