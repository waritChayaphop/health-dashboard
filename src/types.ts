export interface HealthRecord {
  id: string;                    // รหัสบุคคล เช่น H0001
  screenDate: string;            // วันที่คัดกรอง เช่น 3/1/2026
  area: string;                  // พื้นที่: เมือง, เหนือ, ตะวันออก, ตะวันตก, ใต้
  gender: 'ชาย' | 'หญิง';         // เพศ
  age: number;                   // อายุ (ปี)
  heightCm: number;              // ส่วนสูง (cm)
  weightKg: number;              // น้ำหนัก (kg)
  bmi: number;                   // BMI
  sbp: number;                   // SBP (mmHg)
  dbp: number;                   // DBP (mmHg)
  pulse: number;                 // ชีพจร (bpm)
  bloodSugar: number;            // น้ำตาล (mg/dL)
  smoking: 'สูบ' | 'ไม่สูบ';       // สูบบุหรี่
  alcohol: 'ดื่ม' | 'ไม่ดื่ม';     // ดื่มแอลกอฮอล์
  exercise: 'สม่ำเสมอ' | 'บางครั้ง' | 'ไม่ออกกำลังกาย'; // การออกกำลังกาย
  diabetesRisk: 'ไม่มี' | 'มีแนวโน้ม/เสี่ยง';  // เบาหวาน_คัดกรอง
  hypertensionRisk: 'ไม่มี' | 'มีแนวโน้ม/เสี่ยง'; // ความดันโลหิตสูง_คัดกรอง
  riskScore: number;             // คะแนนความเสี่ยง (0-7)
  riskLevel: 'ต่ำ' | 'ปานกลาง' | 'สูง'; // ระดับความเสี่ยง
  month: string;                 // เดือน เช่น 2026-01, 2026-02, 2026-03
}

export interface FilterState {
  searchTerm: string;
  area: string;                  // 'all' or specific area
  gender: string;                // 'all', 'ชาย', 'หญิง'
  riskLevel: string;             // 'all', 'ต่ำ', 'ปานกลาง', 'สูง'
  diabetesRisk: string;          // 'all', 'ไม่มี', 'มีแนวโน้ม/เสี่ยง'
  hypertensionRisk: string;      // 'all', 'ไม่มี', 'มีแนวโน้ม/เสี่ยง'
  smoking: string;               // 'all', 'สูบ', 'ไม่สูบ'
  alcohol: string;               // 'all', 'ดื่ม', 'ไม่ดื่ม'
  exercise: string;              // 'all', 'สม่ำเสมอ', 'บางครั้ง', 'ไม่ออกกำลังกาย'
  ageGroup: string;              // 'all', '<30', '30-49', '50-59', '60+'
  month: string;                 // 'all', '2026-01', '2026-02', '2026-03'
}

export type TabType = 'overview' | 'risk_trend' | 'behavior_correlation' | 'datatable';
