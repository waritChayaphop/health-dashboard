import React from 'react';
import { Search, RotateCcw, SlidersHorizontal, MapPin, Users, AlertTriangle, Activity, Dumbbell } from 'lucide-react';
import { FilterState } from '../types';

interface FiltersBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  areaOptions: string[];
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  areaOptions,
}) => {
  const isFiltered =
    filters.searchTerm !== '' ||
    filters.area !== 'all' ||
    filters.gender !== 'all' ||
    filters.riskLevel !== 'all' ||
    filters.diabetesRisk !== 'all' ||
    filters.hypertensionRisk !== 'all' ||
    filters.smoking !== 'all' ||
    filters.alcohol !== 'all' ||
    filters.exercise !== 'all' ||
    filters.ageGroup !== 'all' ||
    filters.month !== 'all';

  return (
    <section aria-label="ตัวกรองข้อมูลสุขภาพ" className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-5 mb-6">
      <div className="flex flex-col gap-3.5">
        {/* Top bar: title, search & reset button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-teal-600" />
            <h2 className="text-sm font-semibold text-slate-800">
              ตัวกรองข้อมูลสุขภาพ (Filters System)
            </h2>
            <span className="text-xs text-slate-500 hidden md:inline">
              เลือกเงื่อนไขเพื่อวิเคราะห์กลุ่มเป้าหมายเฉพาะ
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                id="filter-search-input"
                type="text"
                placeholder="ค้นหารหัสบุคคล เช่น H0001..."
                value={filters.searchTerm}
                onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Reset Button */}
            {isFiltered && (
              <button
                id="btn-reset-filters"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-700 bg-slate-100 hover:bg-rose-50 rounded-lg border border-slate-200 hover:border-rose-200 transition-all cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>รีเซ็ตตัวกรอง</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters grid with key criteria */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          {/* Filter 1: พื้นที่ (Area) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-area" className="text-[11px] font-medium text-slate-600 flex items-center gap-1">
              <MapPin className="h-3 w-3 text-teal-600" /> พื้นที่ (Area)
            </label>
            <select
              id="filter-area"
              value={filters.area}
              onChange={(e) => onFilterChange({ area: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="all">ทุกพื้นที่ (ทั้งหมด)</option>
              {areaOptions.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Filter 2: เพศ (Gender) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-gender" className="text-[11px] font-medium text-slate-600 flex items-center gap-1">
              <Users className="h-3 w-3 text-teal-600" /> เพศ (Gender)
            </label>
            <select
              id="filter-gender"
              value={filters.gender}
              onChange={(e) => onFilterChange({ gender: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="all">ทุกเพศ (ชาย/หญิง)</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>
          </div>

          {/* Filter 3: ระดับความเสี่ยง (Risk Level) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-risk" className="text-[11px] font-medium text-slate-600 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-amber-500" /> ระดับความเสี่ยง (Risk)
            </label>
            <select
              id="filter-risk"
              value={filters.riskLevel}
              onChange={(e) => onFilterChange({ riskLevel: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
            >
              <option value="all">ทุกระดับความเสี่ยง</option>
              <option value="ต่ำ" className="text-emerald-700 font-medium">เสี่ยงต่ำ</option>
              <option value="ปานกลาง" className="text-amber-700 font-medium">เสี่ยงปานกลาง</option>
              <option value="สูง" className="text-rose-700 font-medium">เสี่ยงสูง</option>
            </select>
          </div>

          {/* Filter 4: กลุ่มอายุ (Age Group) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-age" className="text-[11px] font-medium text-slate-600 flex items-center gap-1">
              <Activity className="h-3 w-3 text-teal-600" /> ช่วงอายุ (Age)
            </label>
            <select
              id="filter-age"
              value={filters.ageGroup}
              onChange={(e) => onFilterChange({ ageGroup: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="all">ทุกช่วงอายุ</option>
              <option value="<30">ต่ำกว่า 30 ปี</option>
              <option value="30-49">30 - 49 ปี</option>
              <option value="50-59">50 - 59 ปี</option>
              <option value="60+">60 ปีขึ้นไป</option>
            </select>
          </div>

          {/* Filter 5: การออกกำลังกาย (Exercise Behavior) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-exercise" className="text-[11px] font-medium text-slate-600 flex items-center gap-1">
              <Dumbbell className="h-3 w-3 text-teal-600" /> การออกกำลังกาย
            </label>
            <select
              id="filter-exercise"
              value={filters.exercise}
              onChange={(e) => onFilterChange({ exercise: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="all">ทุกรูปแบบ</option>
              <option value="สม่ำเสมอ">สม่ำเสมอ</option>
              <option value="บางครั้ง">บางครั้ง</option>
              <option value="ไม่ออกกำลังกาย">ไม่ออกกำลังกาย</option>
            </select>
          </div>

          {/* Filter 6: คัดกรองโรค (Diabetes / HT Risk) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-disease" className="text-[11px] font-medium text-slate-600 flex items-center gap-1">
              <Activity className="h-3 w-3 text-rose-500" /> คัดกรองเบาหวาน
            </label>
            <select
              id="filter-disease"
              value={filters.diabetesRisk}
              onChange={(e) => onFilterChange({ diabetesRisk: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="all">ทั้งหมด</option>
              <option value="ไม่มี">ปกติ (ไม่มีความเสี่ยง)</option>
              <option value="มีแนวโน้ม/เสี่ยง">มีแนวโน้ม/เสี่ยง</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Badges for Risk levels */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
          <span className="text-slate-500 mr-1">เลือกด่วน:</span>
          <button
            onClick={() => onFilterChange({ riskLevel: 'all', area: 'all', gender: 'all' })}
            className={`px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
              filters.riskLevel === 'all'
                ? 'bg-slate-800 text-white border-slate-800 font-medium'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            ทั้งหมด (30 คน)
          </button>
          <button
            onClick={() => onFilterChange({ riskLevel: 'สูง' })}
            className={`px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
              filters.riskLevel === 'สูง'
                ? 'bg-rose-600 text-white border-rose-600 font-medium'
                : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
            }`}
          >
            กลุ่มเสี่ยงสูง (High Risk)
          </button>
          <button
            onClick={() => onFilterChange({ riskLevel: 'ปานกลาง' })}
            className={`px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
              filters.riskLevel === 'ปานกลาง'
                ? 'bg-amber-600 text-white border-amber-600 font-medium'
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
            }`}
          >
            กลุ่มเสี่ยงปานกลาง
          </button>
          <button
            onClick={() => onFilterChange({ riskLevel: 'ต่ำ' })}
            className={`px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
              filters.riskLevel === 'ต่ำ'
                ? 'bg-emerald-600 text-white border-emerald-600 font-medium'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            กลุ่มเสี่ยงต่ำ (สุขภาพปกติ)
          </button>
          <button
            onClick={() => onFilterChange({ exercise: 'ไม่ออกกำลังกาย' })}
            className={`px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
              filters.exercise === 'ไม่ออกกำลังกาย'
                ? 'bg-purple-600 text-white border-purple-600 font-medium'
                : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
            }`}
          >
            ไม่ออกกำลังกาย
          </button>
        </div>
      </div>
    </section>
  );
};
