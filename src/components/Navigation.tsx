import React from 'react';
import { LayoutDashboard, TrendingUp, HeartPulse, Table, Filter } from 'lucide-react';
import { TabType } from '../types';

interface NavigationProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  filteredCount: number;
  totalCount: number;
  isFilterActive: boolean;
  onToggleFilters?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  filteredCount,
  totalCount,
  isFilterActive,
}) => {
  const tabs = [
    {
      id: 'overview' as TabType,
      label: 'ภาพรวมและตัวชี้วัด',
      sublabel: 'Overview & KPIs',
      icon: LayoutDashboard,
    },
    {
      id: 'risk_trend' as TabType,
      label: 'วิเคราะห์ความเสี่ยงและแนวโน้ม',
      sublabel: 'Health Risk & Trends',
      icon: TrendingUp,
    },
    {
      id: 'behavior_correlation' as TabType,
      label: 'พฤติกรรมและความสัมพันธ์',
      sublabel: 'Behavior & Correlations',
      icon: HeartPulse,
    },
    {
      id: 'datatable' as TabType,
      label: 'ตารางข้อมูลเชิงลึก',
      sublabel: 'Data Table & Details',
      icon: Table,
    },
  ];

  return (
    <nav id="dashboard-navigation" aria-label="หมวดหมู่หลักของแดชบอร์ด" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-1">
          {/* Main Navigation Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  className={`group relative flex items-center gap-2 px-3.5 py-2.5 rounded-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <div className="flex flex-col text-left">
                    <span>{tab.label}</span>
                    <span className={`text-[10px] ${isActive ? 'text-teal-600' : 'text-slate-400'}`}>
                      {tab.sublabel}
                    </span>
                  </div>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-teal-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Records Counter Status */}
          <div className="flex items-center gap-2 pb-1 sm:pb-0 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 text-slate-700 font-medium">
              <Filter className={`h-3.5 w-3.5 ${isFilterActive ? 'text-teal-600' : 'text-slate-400'}`} />
              <span>แสดง:</span>
              <span className="font-bold text-teal-700">{filteredCount}</span>
              <span className="text-slate-400">/</span>
              <span className="font-semibold text-slate-600">{totalCount} คน</span>
              {isFilterActive && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  (กรองแล้ว)
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};
