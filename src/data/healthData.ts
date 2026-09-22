import { HealthRecord } from '../types';

export const GOOGLE_SHEET_ID = '1uazhWjyrHOp5qOKilJNbSB_UfCMYI0AY4FO_Wmn0A3o';
export const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv`;
export const GOOGLE_SHEET_VIEW_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit`;

// Exact 30 records from Google Sheet as initial & resilient offline fallback
export const INITIAL_HEALTH_RECORDS: HealthRecord[] = [
  { id: 'H0001', screenDate: '3/1/2026', area: 'เมือง', gender: 'หญิง', age: 24, heightCm: 158, weightKg: 52, bmi: 20.8, sbp: 112, dbp: 72, pulse: 76, bloodSugar: 91, smoking: 'ไม่สูบ', alcohol: 'ไม่ดื่ม', exercise: 'สม่ำเสมอ', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 0, riskLevel: 'ต่ำ', month: '2026-01' },
  { id: 'H0002', screenDate: '5/1/2026', area: 'เหนือ', gender: 'ชาย', age: 45, heightCm: 170, weightKg: 78, bmi: 27.0, sbp: 138, dbp: 88, pulse: 82, bloodSugar: 118, smoking: 'สูบ', alcohol: 'ดื่ม', exercise: 'บางครั้ง', diabetesRisk: 'ไม่มี', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 2, riskLevel: 'ปานกลาง', month: '2026-01' },
  { id: 'H0003', screenDate: '8/1/2026', area: 'ตะวันออก', gender: 'หญิง', age: 63, heightCm: 155, weightKg: 69, bmi: 28.7, sbp: 151, dbp: 94, pulse: 86, bloodSugar: 142, smoking: 'ไม่สูบ', alcohol: 'ดื่ม', exercise: 'ไม่ออกกำลังกาย', diabetesRisk: 'มีแนวโน้ม/เสี่ยง', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 6, riskLevel: 'สูง', month: '2026-01' },
  { id: 'H0004', screenDate: '11/1/2026', area: 'ตะวันตก', gender: 'ชาย', age: 37, heightCm: 175, weightKg: 70, bmi: 22.9, sbp: 121, dbp: 78, pulse: 74, bloodSugar: 97, smoking: 'ไม่สูบ', alcohol: 'ไม่ดื่ม', exercise: 'สม่ำเสมอ', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 0, riskLevel: 'ต่ำ', month: '2026-01' },
  { id: 'H0005', screenDate: '14/1/2026', area: 'ใต้', gender: 'หญิง', age: 52, heightCm: 160, weightKg: 74, bmi: 28.9, sbp: 146, dbp: 92, pulse: 88, bloodSugar: 131, smoking: 'ไม่สูบ', alcohol: 'ดื่ม', exercise: 'บางครั้ง', diabetesRisk: 'มีแนวโน้ม/เสี่ยง', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 5, riskLevel: 'สูง', month: '2026-01' },
  { id: 'H0006', screenDate: '17/1/2026', area: 'เมือง', gender: 'ชาย', age: 29, heightCm: 168, weightKg: 63, bmi: 22.3, sbp: 117, dbp: 76, pulse: 80, bloodSugar: 89, smoking: 'สูบ', alcohol: 'ไม่ดื่ม', exercise: 'บางครั้ง', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 1, riskLevel: 'ต่ำ', month: '2026-01' },
  { id: 'H0007', screenDate: '20/1/2026', area: 'เหนือ', gender: 'หญิง', age: 41, heightCm: 162, weightKg: 67, bmi: 25.5, sbp: 129, dbp: 84, pulse: 79, bloodSugar: 108, smoking: 'ไม่สูบ', alcohol: 'ไม่ดื่ม', exercise: 'บางครั้ง', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 1, riskLevel: 'ต่ำ', month: '2026-01' },
  { id: 'H0008', screenDate: '23/1/2026', area: 'ตะวันออก', gender: 'ชาย', age: 68, heightCm: 165, weightKg: 82, bmi: 30.1, sbp: 158, dbp: 98, pulse: 91, bloodSugar: 154, smoking: 'สูบ', alcohol: 'ดื่ม', exercise: 'ไม่ออกกำลังกาย', diabetesRisk: 'มีแนวโน้ม/เสี่ยง', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 7, riskLevel: 'สูง', month: '2026-01' },
  { id: 'H0009', screenDate: '26/1/2026', area: 'ตะวันตก', gender: 'หญิง', age: 56, heightCm: 157, weightKg: 61, bmi: 24.7, sbp: 134, dbp: 86, pulse: 83, bloodSugar: 113, smoking: 'ไม่สูบ', alcohol: 'ไม่ดื่ม', exercise: 'สม่ำเสมอ', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 1, riskLevel: 'ต่ำ', month: '2026-01' },
  { id: 'H0010', screenDate: '29/1/2026', area: 'ใต้', gender: 'ชาย', age: 48, heightCm: 172, weightKg: 86, bmi: 29.1, sbp: 143, dbp: 91, pulse: 87, bloodSugar: 126, smoking: 'ไม่สูบ', alcohol: 'ดื่ม', exercise: 'บางครั้ง', diabetesRisk: 'มีแนวโน้ม/เสี่ยง', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 4, riskLevel: 'สูง', month: '2026-01' },
  { id: 'H0011', screenDate: '2/2/2026', area: 'เมือง', gender: 'หญิง', age: 33, heightCm: 161, weightKg: 58, bmi: 22.4, sbp: 118, dbp: 75, pulse: 77, bloodSugar: 94, smoking: 'ไม่สูบ', alcohol: 'ไม่ดื่ม', exercise: 'สม่ำเสมอ', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 0, riskLevel: 'ต่ำ', month: '2026-02' },
  { id: 'H0012', screenDate: '5/2/2026', area: 'เหนือ', gender: 'ชาย', age: 59, heightCm: 169, weightKg: 81, bmi: 28.4, sbp: 148, dbp: 93, pulse: 89, bloodSugar: 137, smoking: 'ไม่สูบ', alcohol: 'ดื่ม', exercise: 'บางครั้ง', diabetesRisk: 'มีแนวโน้ม/เสี่ยง', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 5, riskLevel: 'สูง', month: '2026-02' },
  { id: 'H0013', screenDate: '8/2/2026', area: 'ตะวันออก', gender: 'หญิง', age: 27, heightCm: 154, weightKg: 55, bmi: 23.2, sbp: 109, dbp: 70, pulse: 72, bloodSugar: 87, smoking: 'ไม่สูบ', alcohol: 'ไม่ดื่ม', exercise: 'สม่ำเสมอ', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 0, riskLevel: 'ต่ำ', month: '2026-02' },
  { id: 'H0014', screenDate: '11/2/2026', area: 'ตะวันตก', gender: 'ชาย', age: 51, heightCm: 178, weightKg: 92, bmi: 29.0, sbp: 141, dbp: 89, pulse: 84, bloodSugar: 124, smoking: 'สูบ', alcohol: 'ดื่ม', exercise: 'ไม่ออกกำลังกาย', diabetesRisk: 'ไม่มี', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 4, riskLevel: 'สูง', month: '2026-02' },
  { id: 'H0015', screenDate: '14/2/2026', area: 'ใต้', gender: 'หญิง', age: 46, heightCm: 159, weightKg: 72, bmi: 28.5, sbp: 136, dbp: 87, pulse: 81, bloodSugar: 116, smoking: 'ไม่สูบ', alcohol: 'ไม่ดื่ม', exercise: 'บางครั้ง', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 2, riskLevel: 'ปานกลาง', month: '2026-02' },
  { id: 'H0016', screenDate: '17/2/2026', area: 'เมือง', gender: 'ชาย', age: 22, heightCm: 173, weightKg: 64, bmi: 21.4, sbp: 110, dbp: 68, pulse: 75, bloodSugar: 83, smoking: 'ไม่สูบ', alcohol: 'ไม่ดื่ม', exercise: 'สม่ำเสมอ', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 0, riskLevel: 'ต่ำ', month: '2026-02' },
  { id: 'H0017', screenDate: '20/2/2026', area: 'เหนือ', gender: 'หญิง', age: 65, heightCm: 156, weightKg: 76, bmi: 31.2, sbp: 155, dbp: 96, pulse: 92, bloodSugar: 149, smoking: 'ไม่สูบ', alcohol: 'ดื่ม', exercise: 'ไม่ออกกำลังกาย', diabetesRisk: 'มีแนวโน้ม/เสี่ยง', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 6, riskLevel: 'สูง', month: '2026-02' },
  { id: 'H0018', screenDate: '23/2/2026', area: 'ตะวันออก', gender: 'ชาย', age: 39, heightCm: 171, weightKg: 75, bmi: 25.6, sbp: 127, dbp: 82, pulse: 79, bloodSugar: 103, smoking: 'สูบ', alcohol: 'ไม่ดื่ม', exercise: 'บางครั้ง', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 2, riskLevel: 'ปานกลาง', month: '2026-02' },
  { id: 'H0019', screenDate: '26/2/2026', area: 'ตะวันตก', gender: 'หญิง', age: 58, heightCm: 163, weightKg: 70, bmi: 26.3, sbp: 139, dbp: 89, pulse: 85, bloodSugar: 121, smoking: 'ไม่สูบ', alcohol: 'ดื่ม', exercise: 'บางครั้ง', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 2, riskLevel: 'ปานกลาง', month: '2026-02' },
  { id: 'H0020', screenDate: '1/3/2026', area: 'ใต้', gender: 'ชาย', age: 67, heightCm: 166, weightKg: 88, bmi: 31.9, sbp: 162, dbp: 101, pulse: 94, bloodSugar: 161, smoking: 'สูบ', alcohol: 'ดื่ม', exercise: 'ไม่ออกกำลังกาย', diabetesRisk: 'มีแนวโน้ม/เสี่ยง', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 7, riskLevel: 'สูง', month: '2026-03' },
  { id: 'H0021', screenDate: '4/3/2026', area: 'เมือง', gender: 'หญิง', age: 35, heightCm: 160, weightKg: 63, bmi: 24.6, sbp: 122, dbp: 79, pulse: 76, bloodSugar: 99, smoking: 'ไม่สูบ', alcohol: 'ไม่ดื่ม', exercise: 'สม่ำเสมอ', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 0, riskLevel: 'ต่ำ', month: '2026-03' },
  { id: 'H0022', screenDate: '7/3/2026', area: 'เหนือ', gender: 'ชาย', age: 43, heightCm: 174, weightKg: 83, bmi: 27.4, sbp: 135, dbp: 86, pulse: 82, bloodSugar: 111, smoking: 'ไม่สูบ', alcohol: 'ดื่ม', exercise: 'บางครั้ง', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 2, riskLevel: 'ปานกลาง', month: '2026-03' },
  { id: 'H0023', screenDate: '10/3/2026', area: 'ตะวันออก', gender: 'หญิง', age: 61, heightCm: 152, weightKg: 68, bmi: 29.4, sbp: 149, dbp: 94, pulse: 88, bloodSugar: 139, smoking: 'ไม่สูบ', alcohol: 'ไม่ดื่ม', exercise: 'ไม่ออกกำลังกาย', diabetesRisk: 'มีแนวโน้ม/เสี่ยง', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 5, riskLevel: 'สูง', month: '2026-03' },
  { id: 'H0024', screenDate: '13/3/2026', area: 'ตะวันตก', gender: 'ชาย', age: 31, heightCm: 180, weightKg: 79, bmi: 24.4, sbp: 116, dbp: 74, pulse: 78, bloodSugar: 92, smoking: 'สูบ', alcohol: 'ไม่ดื่ม', exercise: 'สม่ำเสมอ', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 1, riskLevel: 'ต่ำ', month: '2026-03' },
  { id: 'H0025', screenDate: '16/3/2026', area: 'ใต้', gender: 'หญิง', age: 49, heightCm: 158, weightKg: 78, bmi: 31.2, sbp: 145, dbp: 91, pulse: 86, bloodSugar: 128, smoking: 'ไม่สูบ', alcohol: 'ดื่ม', exercise: 'ไม่ออกกำลังกาย', diabetesRisk: 'มีแนวโน้ม/เสี่ยง', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 5, riskLevel: 'สูง', month: '2026-03' },
  { id: 'H0026', screenDate: '19/3/2026', area: 'เมือง', gender: 'ชาย', age: 26, heightCm: 169, weightKg: 67, bmi: 23.5, sbp: 114, dbp: 72, pulse: 74, bloodSugar: 88, smoking: 'ไม่สูบ', alcohol: 'ไม่ดื่ม', exercise: 'สม่ำเสมอ', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 0, riskLevel: 'ต่ำ', month: '2026-03' },
  { id: 'H0027', screenDate: '22/3/2026', area: 'เหนือ', gender: 'หญิง', age: 54, heightCm: 164, weightKg: 73, bmi: 27.1, sbp: 137, dbp: 88, pulse: 83, bloodSugar: 117, smoking: 'ไม่สูบ', alcohol: 'ดื่ม', exercise: 'บางครั้ง', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 2, riskLevel: 'ปานกลาง', month: '2026-03' },
  { id: 'H0028', screenDate: '25/3/2026', area: 'ตะวันออก', gender: 'ชาย', age: 64, heightCm: 167, weightKg: 85, bmi: 30.5, sbp: 153, dbp: 97, pulse: 90, bloodSugar: 145, smoking: 'สูบ', alcohol: 'ดื่ม', exercise: 'ไม่ออกกำลังกาย', diabetesRisk: 'มีแนวโน้ม/เสี่ยง', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 7, riskLevel: 'สูง', month: '2026-03' },
  { id: 'H0029', screenDate: '28/3/2026', area: 'ตะวันตก', gender: 'หญิง', age: 40, heightCm: 157, weightKg: 60, bmi: 24.3, sbp: 124, dbp: 80, pulse: 77, bloodSugar: 101, smoking: 'ไม่สูบ', alcohol: 'ไม่ดื่ม', exercise: 'สม่ำเสมอ', diabetesRisk: 'ไม่มี', hypertensionRisk: 'ไม่มี', riskScore: 0, riskLevel: 'ต่ำ', month: '2026-03' },
  { id: 'H0030', screenDate: '31/3/2026', area: 'ใต้', gender: 'ชาย', age: 57, heightCm: 172, weightKg: 89, bmi: 30.1, sbp: 147, dbp: 92, pulse: 87, bloodSugar: 133, smoking: 'ไม่สูบ', alcohol: 'ดื่ม', exercise: 'บางครั้ง', diabetesRisk: 'มีแนวโน้ม/เสี่ยง', hypertensionRisk: 'มีแนวโน้ม/เสี่ยง', riskScore: 5, riskLevel: 'สูง', month: '2026-03' },
];

// Helper to parse CSV line handling potential quotes
function parseCSVLine(text: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export function parseHealthCSV(csvText: string): HealthRecord[] {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return INITIAL_HEALTH_RECORDS;

  const records: HealthRecord[] = [];

  // Line 0 is header
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 19) continue;

    const id = cols[0].replace(/^"|"$/g, '').trim();
    if (!id || !id.startsWith('H')) continue;

    const record: HealthRecord = {
      id,
      screenDate: cols[1].replace(/^"|"$/g, '').trim(),
      area: cols[2].replace(/^"|"$/g, '').trim(),
      gender: cols[3].replace(/^"|"$/g, '').trim() as 'ชาย' | 'หญิง',
      age: parseFloat(cols[4]) || 0,
      heightCm: parseFloat(cols[5]) || 0,
      weightKg: parseFloat(cols[6]) || 0,
      bmi: parseFloat(cols[7]) || 0,
      sbp: parseFloat(cols[8]) || 0,
      dbp: parseFloat(cols[9]) || 0,
      pulse: parseFloat(cols[10]) || 0,
      bloodSugar: parseFloat(cols[11]) || 0,
      smoking: cols[12].replace(/^"|"$/g, '').trim() as 'สูบ' | 'ไม่สูบ',
      alcohol: cols[13].replace(/^"|"$/g, '').trim() as 'ดื่ม' | 'ไม่ดื่ม',
      exercise: cols[14].replace(/^"|"$/g, '').trim() as 'สม่ำเสมอ' | 'บางครั้ง' | 'ไม่ออกกำลังกาย',
      diabetesRisk: cols[15].replace(/^"|"$/g, '').trim() as 'ไม่มี' | 'มีแนวโน้ม/เสี่ยง',
      hypertensionRisk: cols[16].replace(/^"|"$/g, '').trim() as 'ไม่มี' | 'มีแนวโน้ม/เสี่ยง',
      riskScore: parseFloat(cols[17]) || 0,
      riskLevel: cols[18].replace(/^"|"$/g, '').trim() as 'ต่ำ' | 'ปานกลาง' | 'สูง',
      month: cols[19]?.replace(/^"|"$/g, '').trim() || '2026-01',
    };

    records.push(record);
  }

  return records.length > 0 ? records : INITIAL_HEALTH_RECORDS;
}

export async function fetchLiveGoogleSheetData(): Promise<{ records: HealthRecord[]; isLive: boolean; error?: string }> {
  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL, {
      method: 'GET',
      headers: {
        'Accept': 'text/csv, text/plain, */*',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const csvText = await res.text();
    const records = parseHealthCSV(csvText);
    return { records, isLive: true };
  } catch (err: unknown) {
    console.warn('Unable to fetch live Google Sheet, using verified cached records:', err);
    return {
      records: INITIAL_HEALTH_RECORDS,
      isLive: false,
      error: err instanceof Error ? err.message : 'Fetch error',
    };
  }
}
