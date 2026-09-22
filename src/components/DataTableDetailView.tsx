import React, { useState, useMemo } from 'react';
import {
  Search, ArrowUpDown, ChevronUp, ChevronDown, Download, Eye,
  AlertTriangle, ShieldCheck, Heart, Droplet, Scale, User, X,
  FileSpreadsheet, Sparkles, CheckCircle, Info
} from 'lucide-react';
import { HealthRecord } from '../types';
import { getBMICategory, getBloodSugarCategory, getBPCategory, getRiskLevelBadge } from '../utils/statistics';

interface DataTableDetailViewProps {
  records: HealthRecord[];
  allRecords: HealthRecord[];
}

type SortField = keyof HealthRecord;
type SortOrder = 'asc' | 'desc';

export const DataTableDetailView: React.FC<DataTableDetailViewProps> = ({ records, allRecords }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [highlightIssue, setHighlightIssue] = useState<string>('all'); // 'all', 'high_both', 'no_exercise_high_bmi'

  // Filter and sort records
  const processedRecords = useMemo(() => {
    let result = [...records];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        r =>
          r.id.toLowerCase().includes(term) ||
          r.area.toLowerCase().includes(term) ||
          r.gender.toLowerCase().includes(term) ||
          r.exercise.toLowerCase().includes(term)
      );
    }

    if (riskFilter !== 'all') {
      result = result.filter(r => r.riskLevel === riskFilter);
    }

    if (highlightIssue === 'high_both') {
      result = result.filter(r => r.diabetesRisk === 'มีแนวโน้ม/เสี่ยง' && r.hypertensionRisk === 'มีแนวโน้ม/เสี่ยง');
    } else if (highlightIssue === 'no_exercise_high_bmi') {
      result = result.filter(r => r.exercise === 'ไม่ออกกำลังกาย' && r.bmi >= 25);
    }

    result.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return sortOrder === 'asc'
        ? String(valA).localeCompare(String(valB), 'th')
        : String(valB).localeCompare(String(valA), 'th');
    });

    return result;
  }, [records, searchTerm, sortField, sortOrder, riskFilter, highlightIssue]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const exportToCSV = () => {
    const headers = [
      'รหัสบุคคล', 'วันที่คัดกรอง', 'พื้นที่', 'เพศ', 'อายุ', 'ส่วนสูง_cm',
      'น้ำหนัก_kg', 'BMI', 'SBP_mmHg', 'DBP_mmHg', 'ชีพจร_bpm', 'น้ำตาล_mg_dL',
      'สูบบุหรี่', 'ดื่มแอลกอฮอล์', 'การออกกำลังกาย', 'เบาหวาน_คัดกรอง',
      'ความดันโลหิตสูง_คัดกรอง', 'คะแนนความเสี่ยง', 'ระดับความเสี่ยง', 'เดือน'
    ];

    const rows = processedRecords.map(r => [
      r.id, r.screenDate, r.area, r.gender, r.age, r.heightCm,
      r.weightKg, r.bmi, r.sbp, r.dbp, r.pulse, r.bloodSugar,
      r.smoking, r.alcohol, r.exercise, r.diabetesRisk,
      r.hypertensionRisk, r.riskScore, r.riskLevel, r.month
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `health_overview_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Deep-dive Topic Highlight Banner */}
      <div className="bg-white rounded-xl border border-teal-200/90 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shrink-0 mt-0.5">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  ประเด็นเชิงลึกที่คัดสรร (Deep Dive Insight)
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  วิเคราะห์ปัจจัยซ้อนทับ (Multi-risk Clustering)
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                กลุ่มเสี่ยงสองโรคซ้อน (เบาหวาน + ความดันโลหิตสูง) และความสัมพันธ์กับพฤติกรรม
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
                พบประชาชน <strong className="text-rose-600">10 ใน 30 คน (33.3%)</strong> มีแนวโน้มเสี่ยงทั้งเบาหวานและความดันโลหิตสูงพร้อมกัน ทั้งหมดมีค่าเฉลี่ย BMI &ge; 28 kg/m² และ 80% มีพฤติกรรมไม่ออกกำลังกายหรือดื่มแอลกอฮอล์
              </p>
            </div>
          </div>

          {/* Quick Focus Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setHighlightIssue(highlightIssue === 'high_both' ? 'all' : 'high_both')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                highlightIssue === 'high_both'
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                  : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
              }`}
            >
              {highlightIssue === 'high_both' ? 'แสดงทั้งหมด' : 'กรองเฉพาะกลุ่มเสี่ยง 2 โรค (10 คน)'}
            </button>
            <button
              onClick={() => setHighlightIssue(highlightIssue === 'no_exercise_high_bmi' ? 'all' : 'no_exercise_high_bmi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                highlightIssue === 'no_exercise_high_bmi'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              {highlightIssue === 'no_exercise_high_bmi' ? 'แสดงทั้งหมด' : 'กลุ่มไม่ออกกำลังกาย + BMI&ge;25'}
            </button>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-teal-600" />
            <h3 className="text-sm font-semibold text-slate-800">
              ตารางข้อมูลรายบุคคล (30 Records Detailed Table)
            </h3>
            <span className="text-xs text-slate-500">
              (แสดง {processedRecords.length} รายการ)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="ค้นหารหัส, พื้นที่, เพศ..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 w-44 sm:w-56"
              />
            </div>

            {/* Export CSV */}
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              title="ดาวน์โหลดไฟล์ CSV"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">ส่งออก CSV</span>
            </button>
          </div>
        </div>

        {/* Color Legend (Conditional Formatting Guide) */}
        <div className="py-2.5 px-1 flex flex-wrap items-center gap-3 text-[11px] text-slate-600 border-b border-slate-100">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Info className="h-3.5 w-3.5 text-teal-600" /> เกณฑ์สี (Conditional Formatting):
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> ปกติ / เสี่ยงต่ำ
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span> ท้วม / เสี่ยงปานกลาง
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span> เสี่ยงสูง / เบาหวาน / ความดันสูง
          </span>
          <span className="text-slate-400 ml-auto hidden md:inline">
            *คลิกที่แถวเพื่อดูการวินิจฉัยสุขภาพเชิงลึกเฉพาะบุคคล
          </span>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-700 border-b border-slate-200 font-semibold">
                <th
                  onClick={() => handleSort('id')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    รหัสบุคคล
                    {sortField === 'id' && (sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('area')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    พื้นที่
                    {sortField === 'area' && (sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('gender')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  เพศ/อายุ
                </th>
                <th
                  onClick={() => handleSort('bmi')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    BMI (kg/m²)
                    {sortField === 'bmi' && (sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('sbp')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    ความดัน (SBP/DBP)
                    {sortField === 'sbp' && (sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('bloodSugar')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    น้ำตาล (mg/dL)
                    {sortField === 'bloodSugar' && (sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </div>
                </th>
                <th className="py-2.5 px-3 whitespace-nowrap">พฤติกรรม (สูบ/ดื่ม/ออกกำลัง)</th>
                <th className="py-2.5 px-3 whitespace-nowrap">คัดกรองเบาหวาน</th>
                <th className="py-2.5 px-3 whitespace-nowrap">คัดกรองความดัน</th>
                <th
                  onClick={() => handleSort('riskScore')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    คะแนน
                    {sortField === 'riskScore' && (sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('riskLevel')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap text-right"
                >
                  ระดับความเสี่ยง
                </th>
                <th className="py-2.5 px-2 text-center">ดูข้อมูล</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {processedRecords.map(record => {
                const bmiCat = getBMICategory(record.bmi);
                const sugarCat = getBloodSugarCategory(record.bloodSugar);
                const bpCat = getBPCategory(record.sbp, record.dbp);
                const riskBadge = getRiskLevelBadge(record.riskLevel);

                return (
                  <tr
                    key={record.id}
                    onClick={() => setSelectedRecord(record)}
                    className="hover:bg-teal-50/40 transition-colors cursor-pointer group"
                  >
                    {/* ID */}
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {record.id}
                    </td>

                    {/* Area */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        {record.area}
                      </span>
                    </td>

                    {/* Gender / Age */}
                    <td className="py-2.5 px-3 whitespace-nowrap text-slate-700">
                      {record.gender} / <strong className="text-slate-900">{record.age}</strong> ปี
                    </td>

                    {/* BMI with conditional coloring */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-semibold ${
                          record.bmi < 23
                            ? 'text-emerald-700'
                            : record.bmi < 25
                            ? 'text-amber-700'
                            : 'text-rose-700 font-bold'
                        }`}>
                          {record.bmi}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded border ${bmiCat.bg} ${bmiCat.color} hidden sm:inline`}>
                          {bmiCat.label}
                        </span>
                      </div>
                    </td>

                    {/* SBP / DBP with conditional coloring */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-semibold ${
                          record.sbp >= 140 || record.dbp >= 90
                            ? 'text-rose-700 font-bold'
                            : record.sbp >= 120 || record.dbp >= 80
                            ? 'text-amber-700'
                            : 'text-emerald-700'
                        }`}>
                          {record.sbp}/{record.dbp}
                        </span>
                        <span className="text-[10px] text-slate-500 hidden sm:inline">mmHg</span>
                      </div>
                    </td>

                    {/* Blood Sugar with conditional coloring */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-semibold ${
                          record.bloodSugar >= 126
                            ? 'text-rose-700 font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200'
                            : record.bloodSugar >= 100
                            ? 'text-amber-700 font-semibold'
                            : 'text-emerald-700'
                        }`}>
                          {record.bloodSugar}
                        </span>
                        <span className="text-[10px] text-slate-500 hidden sm:inline">mg/dL</span>
                      </div>
                    </td>

                    {/* Behaviors */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {record.smoking === 'สูบ' && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-medium" title="สูบบุหรี่">
                            สูบ
                          </span>
                        )}
                        {record.alcohol === 'ดื่ม' && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-medium" title="ดื่มแอลกอฮอล์">
                            ดื่ม
                          </span>
                        )}
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          record.exercise === 'สม่ำเสมอ'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : record.exercise === 'บางครั้ง'
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {record.exercise}
                        </span>
                      </div>
                    </td>

                    {/* Diabetes Screening */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {record.diabetesRisk === 'มีแนวโน้ม/เสี่ยง' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                          เสี่ยง
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-normal text-slate-500">
                          ไม่มี
                        </span>
                      )}
                    </td>

                    {/* Hypertension Screening */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {record.hypertensionRisk === 'มีแนวโน้ม/เสี่ยง' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                          เสี่ยง
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-normal text-slate-500">
                          ไม่มี
                        </span>
                      )}
                    </td>

                    {/* Risk Score */}
                    <td className="py-2.5 px-3 whitespace-nowrap font-mono font-bold text-center">
                      <span className={`inline-block w-6 h-6 leading-6 rounded-full text-center text-xs ${
                        record.riskScore >= 4
                          ? 'bg-rose-100 text-rose-800'
                          : record.riskScore >= 2
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {record.riskScore}
                      </span>
                    </td>

                    {/* Risk Level Badge */}
                    <td className="py-2.5 px-3 whitespace-nowrap text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${riskBadge.bg} ${riskBadge.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${riskBadge.dot}`}></span>
                        {riskBadge.label}
                      </span>
                    </td>

                    {/* Action View */}
                    <td className="py-2.5 px-2 text-center whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(record);
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                        title="ดูรายละเอียดเชิงลึก"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Health Profile Modal (Detail View) */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-mono font-bold text-base shadow-xs">
                  {selectedRecord.id}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900">
                      ข้อมูลสุขภาพเชิงลึกเฉพาะบุคคล ({selectedRecord.id})
                    </h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getRiskLevelBadge(selectedRecord.riskLevel).bg} ${getRiskLevelBadge(selectedRecord.riskLevel).color}`}>
                      {getRiskLevelBadge(selectedRecord.riskLevel).label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    วันที่คัดกรอง: {selectedRecord.screenDate} | พื้นที่: {selectedRecord.area} | เดือน: {selectedRecord.month}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-5 text-xs">
              {/* General & Body Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block">เพศ / อายุ</span>
                  <span className="text-sm font-bold text-slate-900">{selectedRecord.gender} / {selectedRecord.age} ปี</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block">ส่วนสูง / น้ำหนัก</span>
                  <span className="text-sm font-bold text-slate-900">{selectedRecord.heightCm} cm / {selectedRecord.weightKg} kg</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block">ดัชนีมวลกาย (BMI)</span>
                  <span className="text-sm font-bold text-slate-900">{selectedRecord.bmi} kg/m²</span>
                  <span className="text-[10px] text-amber-700 block mt-0.5 font-medium">{getBMICategory(selectedRecord.bmi).label}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block">คะแนนความเสี่ยง</span>
                  <span className="text-sm font-bold text-slate-900">{selectedRecord.riskScore} / 7 คะแนน</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">เกณฑ์คัดกรอง สธ.</span>
                </div>
              </div>

              {/* Vitals & Clinical Results */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h5 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-rose-500" /> ผลการตรวจสัญญาณชีพและห้องปฏิบัติการ
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">ความดันโลหิต (SBP/DBP)</span>
                    <span className="text-base font-bold text-slate-900">{selectedRecord.sbp}/{selectedRecord.dbp} mmHg</span>
                    <span className={`text-[10px] font-medium block mt-0.5 ${getBPCategory(selectedRecord.sbp, selectedRecord.dbp).color}`}>
                      {getBPCategory(selectedRecord.sbp, selectedRecord.dbp).label}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">ระดับน้ำตาลในเลือด</span>
                    <span className="text-base font-bold text-slate-900">{selectedRecord.bloodSugar} mg/dL</span>
                    <span className={`text-[10px] font-medium block mt-0.5 ${getBloodSugarCategory(selectedRecord.bloodSugar).color}`}>
                      {getBloodSugarCategory(selectedRecord.bloodSugar).label}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">ชีพจรขณะพัก (Pulse)</span>
                    <span className="text-base font-bold text-slate-900">{selectedRecord.pulse} bpm</span>
                    <span className="text-[10px] text-emerald-700 block mt-0.5 font-medium">ปกติ (60-100 bpm)</span>
                  </div>
                </div>
              </div>

              {/* Lifestyle & Behavior Status */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h5 className="font-semibold text-slate-800 text-xs">พฤติกรรมสุขภาพและปัจจัยเสี่ยง</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 block">การสูบบุหรี่</span>
                    <span className={`font-bold text-xs ${selectedRecord.smoking === 'สูบ' ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {selectedRecord.smoking}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 block">การดื่มแอลกอฮอล์</span>
                    <span className={`font-bold text-xs ${selectedRecord.alcohol === 'ดื่ม' ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {selectedRecord.alcohol}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 block">การออกกำลังกาย</span>
                    <span className={`font-bold text-xs ${selectedRecord.exercise === 'สม่ำเสมอ' ? 'text-emerald-700' : selectedRecord.exercise === 'บางครั้ง' ? 'text-amber-700' : 'text-rose-600'}`}>
                      {selectedRecord.exercise}
                    </span>
                  </div>
                </div>
              </div>

              {/* Personalized Health Guidance */}
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-1.5">
                <h5 className="font-bold text-teal-900 text-xs flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-teal-700" /> ข้อเสนอแนะและแผนการดูแลสุขภาพเฉพาะบุคคล
                </h5>
                <ul className="list-disc list-inside space-y-1 text-teal-800 text-xs">
                  {selectedRecord.riskLevel === 'สูง' && (
                    <li>ส่งต่อเข้ารับการประเมินทางการแพทย์อย่างละเอียดที่โรงพยาบาล/รพ.สต. ในพื้นที่ {selectedRecord.area}</li>
                  )}
                  {selectedRecord.bloodSugar >= 100 && (
                    <li>ควบคุมการบริโภคน้ำตาลและคาร์โบไฮเดรตเชิงเดี่ยว ตรวจระดับน้ำตาลสะสม (HbA1c) ซ้ำภายใน 1-3 เดือน</li>
                  )}
                  {selectedRecord.sbp >= 130 && (
                    <li>ลดเค็ม โซเดียมไม่เกิน 2,000 มก./วัน และตรวจวัดความดันโลหิตที่บ้านสม่ำเสมอ</li>
                  )}
                  {selectedRecord.exercise !== 'สม่ำเสมอ' && (
                    <li>เพิ่มกิจกรรมทางกายแบบแอโรบิกอย่างน้อย 150 นาทีต่อสัปดาห์ (วันละ 30 นาที 5 วัน)</li>
                  )}
                  {selectedRecord.smoking === 'สูบ' && (
                    <li>แนะนำเข้ารับคำปรึกษาเพื่อการเลิกบุหรี่ผ่านสายด่วน 1600</li>
                  )}
                  {selectedRecord.riskLevel === 'ต่ำ' && (
                    <li>รักษาระดับสุขภาพที่ดีอย่างต่อเนื่อง ตรวจสุขภาพประจำปีรอบถัดไปตามกำหนด</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
