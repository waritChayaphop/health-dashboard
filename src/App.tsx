/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { HealthRecord, FilterState, TabType } from './types';
import { INITIAL_HEALTH_RECORDS, fetchLiveGoogleSheetData, GOOGLE_SHEET_ID, GOOGLE_SHEET_VIEW_URL } from './data/healthData';
import { computeKPISummary } from './utils/statistics';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { FiltersBar } from './components/FiltersBar';
import { KPISummaryCards } from './components/KPISummaryCards';
import { VisualizationsRiskTrend } from './components/VisualizationsRiskTrend';
import { VisualizationsBehavior } from './components/VisualizationsBehavior';
import { DataTableDetailView } from './components/DataTableDetailView';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { ExternalLink, Heart, Shield, CheckCircle2 } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  searchTerm: '',
  area: 'all',
  gender: 'all',
  riskLevel: 'all',
  diabetesRisk: 'all',
  hypertensionRisk: 'all',
  smoking: 'all',
  alcohol: 'all',
  exercise: 'all',
  ageGroup: 'all',
  month: 'all',
};

export default function App() {
  const [records, setRecords] = useState<HealthRecord[]>(INITIAL_HEALTH_RECORDS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Format current Thai date-time
  const getThaiDateTimeString = useCallback(() => {
    const now = new Date();
    return now.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' น.';
  }, []);

  // Fetch data on initial mount
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchLiveGoogleSheetData();
      if (result.records && result.records.length > 0) {
        setRecords(result.records);
        setIsLive(result.isLive);
      }
    } catch (err) {
      console.error('Error fetching Google Sheet:', err);
      setIsLive(false);
    } finally {
      setIsLoading(false);
      setLastUpdated(getThaiDateTimeString());
    }
  }, [getThaiDateTimeString]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Distinct areas for filter dropdown
  const areaOptions = useMemo(() => {
    const areas = Array.from(new Set(records.map(r => r.area))).filter(Boolean);
    return areas.sort();
  }, [records]);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      // Search term
      if (filters.searchTerm.trim()) {
        const term = filters.searchTerm.toLowerCase().trim();
        const matchesId = r.id.toLowerCase().includes(term);
        const matchesArea = r.area.toLowerCase().includes(term);
        if (!matchesId && !matchesArea) return false;
      }

      // Area
      if (filters.area !== 'all' && r.area !== filters.area) return false;

      // Gender
      if (filters.gender !== 'all' && r.gender !== filters.gender) return false;

      // Risk Level
      if (filters.riskLevel !== 'all' && r.riskLevel !== filters.riskLevel) return false;

      // Diabetes Risk
      if (filters.diabetesRisk !== 'all' && r.diabetesRisk !== filters.diabetesRisk) return false;

      // Hypertension Risk
      if (filters.hypertensionRisk !== 'all' && r.hypertensionRisk !== filters.hypertensionRisk) return false;

      // Smoking
      if (filters.smoking !== 'all' && r.smoking !== filters.smoking) return false;

      // Alcohol
      if (filters.alcohol !== 'all' && r.alcohol !== filters.alcohol) return false;

      // Exercise
      if (filters.exercise !== 'all' && r.exercise !== filters.exercise) return false;

      // Age Group
      if (filters.ageGroup !== 'all') {
        if (filters.ageGroup === '<30' && r.age >= 30) return false;
        if (filters.ageGroup === '30-49' && (r.age < 30 || r.age > 49)) return false;
        if (filters.ageGroup === '50-59' && (r.age < 50 || r.age > 59)) return false;
        if (filters.ageGroup === '60+' && r.age < 60) return false;
      }

      // Month
      if (filters.month !== 'all' && r.month !== filters.month) return false;

      return true;
    });
  }, [records, filters]);

  // Summary KPIs for current filtered data
  const kpiSummary = useMemo(() => {
    return computeKPISummary(filteredRecords);
  }, [filteredRecords]);

  const isFilterActive = useMemo(() => {
    return (
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
      filters.month !== 'all'
    );
  }, [filters]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Prompt',sans-serif]">
      {/* Header with Title, Description, Last Updated, Author: วริษฐ์ ชยภพ */}
      <Header
        lastUpdated={lastUpdated}
        isLive={isLive}
        isLoading={isLoading}
        onRefresh={loadData}
        totalRecords={records.length}
      />

      {/* Navigation Tabs */}
      <Navigation
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        filteredCount={filteredRecords.length}
        totalCount={records.length}
        isFilterActive={isFilterActive}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters Bar (at least 3 filters) */}
        <FiltersBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          areaOptions={areaOptions}
        />

        {/* Tab 1: Overview & KPIs */}
        {currentTab === 'overview' && (
          <div className="space-y-6">
            <KPISummaryCards
              summary={kpiSummary}
              totalDatasetCount={records.length}
            />

            <ExecutiveSummary
              summary={kpiSummary}
              records={filteredRecords}
              onNavigateTab={setCurrentTab}
            />

            {/* Combined preview charts in Overview */}
            <div className="pt-2">
              <VisualizationsRiskTrend records={filteredRecords} />
            </div>
          </div>
        )}

        {/* Tab 2: Health Risk & Trends */}
        {currentTab === 'risk_trend' && (
          <div className="space-y-6">
            <VisualizationsRiskTrend records={filteredRecords} />
          </div>
        )}

        {/* Tab 3: Health Behavior & Correlations */}
        {currentTab === 'behavior_correlation' && (
          <div className="space-y-6">
            <VisualizationsBehavior records={filteredRecords} />
          </div>
        )}

        {/* Tab 4: Detailed Data Table & Individual Deep Dive */}
        {currentTab === 'datatable' && (
          <div className="space-y-6">
            <DataTableDetailView
              records={filteredRecords}
              allRecords={records}
            />
          </div>
        )}
      </main>

      {/* Footer with metadata and credits */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-teal-600" />
            <span className="font-semibold text-slate-800">Health Overview Dashboard</span>
            <span>&bull; จัดทำโดย <strong className="text-slate-900">วริษฐ์ ชยภพ</strong></span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>ข้อมูลจาก Google Sheet ID: <code className="font-mono font-semibold text-slate-700">{GOOGLE_SHEET_ID}</code></span>
            <a
              href={GOOGLE_SHEET_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 hover:text-teal-800 font-medium inline-flex items-center gap-1"
            >
              เปิดสเปรดชีตต้นฉบับ <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
