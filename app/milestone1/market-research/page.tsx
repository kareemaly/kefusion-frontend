"use client";

import React from "react";
import { Globe, Users, Laptop, Smartphone, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/use-cases/market-research/StatCard";
import { VisitsChart } from "@/components/use-cases/market-research/VisitsChart";
import { RankingChart } from "@/components/use-cases/market-research/RankingChart";
import { TrafficSourcesPieChart } from "@/components/use-cases/market-research/TrafficSourcesPieChart";
import { GeographyChart } from "@/components/use-cases/market-research/GeographyChart";
import { TechnologiesGrid } from "@/components/use-cases/market-research/TechnologiesGrid";
import { PreviewCard } from "@/components/use-cases/market-research/PreviewCard";
import { SearchTermsTable } from "@/components/use-cases/market-research/SearchTermsTable";
import { AnalyticsSchema, SearchTermSchema } from "./schemas";
import { z } from "zod";

// Import both datasets
import oneMedicalKeywords from "@/data/one-medical/market-research/google-keyword-insight1_globalurl.json";
import oneMedicalAnalytics from "@/data/one-medical/market-research/similarweb12_v2_website-analytics.json";
import inspireQaKeywords from "@/data/inspire-qa/market-research/google-keyword-insight1_globalurl.json";
import inspireQaAnalytics from "@/data/inspire-qa/market-research/similarweb12_v2_website-analytics.json";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

// Transform data function
const transformData = (rawAnalytics: any, rawKeywords: any) => {
  const analyticsData = AnalyticsSchema.parse(rawAnalytics);
  const healthcareTerms = z.array(SearchTermSchema).parse(rawKeywords);

  const trafficData = analyticsData.traffic.history.map((item) => ({
    month: new Date(item.date).toLocaleString("default", { month: "short" }),
    visits: item.visits,
  }));

  const rankingData = analyticsData.ranking.globalRankHistory.map(
    (item, index) => ({
      month: new Date(item.date).toLocaleString("default", { month: "short" }),
      globalRank: item.rank,
      countryRank: analyticsData.ranking.countryRankHistory[index]?.rank || 0,
    })
  );

  const trafficSourcesData = [
    {
      name: "Organic Search",
      value: analyticsData.trafficSources.organicSearchVisitsShare,
    },
    {
      name: "Direct",
      value: analyticsData.trafficSources.directVisitsShare,
    },
    {
      name: "Referral",
      value: analyticsData.trafficSources.referralVisitsShare,
    },
    {
      name: "Social",
      value: analyticsData.trafficSources.socialNetworksVisitsShare,
    },
    { name: "Ads", value: analyticsData.trafficSources.adsVisitsShare },
    { name: "Mail", value: analyticsData.trafficSources.mailVisitsShare },
  ].filter((item) => item.value > 0);

  // Transform geography data
  const geographyData = analyticsData.geography.topCountriesTraffics.map(
    (country) => ({
      country: country.countryAlpha2Code,
      share: country.visitsShare,
    })
  );

  return {
    analyticsData,
    healthcareTerms,
    trafficData,
    rankingData,
    trafficSourcesData,
    geographyData,
  };
};

export default function Dashboard() {
  // Transform the data based on tab value
  const getDataForTab = (tabValue: string) => {
    const rawAnalytics =
      tabValue === "one-medical" ? oneMedicalAnalytics : inspireQaAnalytics;
    const rawKeywords =
      tabValue === "one-medical" ? oneMedicalKeywords : inspireQaKeywords;
    return transformData(rawAnalytics, rawKeywords);
  };

  const renderDashboardContent = (tabValue: string) => {
    const {
      analyticsData,
      healthcareTerms,
      trafficData,
      rankingData,
      trafficSourcesData,
      geographyData,
    } = getDataForTab(tabValue);
    const { overview } = analyticsData;

    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">
          {tabValue === "one-medical" ? "One Medical" : "Inspire QA"} Insights
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Visits (Oct)"
            value={overview.visitsTotalCount.toLocaleString()}
            icon={Globe}
            trend={{
              value: `${(
                analyticsData.traffic.visitsTotalCountChange * 100
              ).toFixed(2)}% from last month`,
              isPositive: analyticsData.traffic.visitsTotalCountChange > 0,
            }}
          />
          <StatCard
            title="Bounce Rate"
            value={`${(overview.bounceRate * 100).toFixed(2)}%`}
            icon={Users}
          />
          <StatCard
            title="Global Rank"
            value={`#${overview.globalRank.toLocaleString()}`}
            icon={Globe}
            trend={{
              value: `Improved by ${overview.globalRankChange.toLocaleString()}`,
              isPositive: overview.globalRankChange > 0,
            }}
          />
          <StatCard
            title="Country Rank (AU)"
            value={`#${overview.countryRank.toLocaleString()}`}
            icon={Globe}
            trend={{
              value: `Improved by ${overview.countryRankChange.toLocaleString()}`,
              isPositive: overview.countryRankChange > 0,
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <VisitsChart data={trafficData} />
          <RankingChart data={rankingData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TrafficSourcesPieChart data={trafficSourcesData} colors={COLORS} />
          <GeographyChart data={geographyData} />
        </div>

        <TechnologiesGrid
          technologies={analyticsData.technologies.categories.map((tech) => ({
            id: tech.topTechIconUrl.split("id=")[1],
            name: tech.topTechName,
            imageUrl: tech.topTechIconUrl,
          }))}
        />

        {/* @ts-ignore */}
        <SearchTermsTable terms={healthcareTerms} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PreviewCard
            title="Desktop Preview"
            icon={Laptop}
            imageUrl={analyticsData.previewDesktop}
          />
          <PreviewCard
            title="Mobile Preview"
            icon={Smartphone}
            imageUrl={analyticsData.previewMobile}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <Tabs defaultValue="one-medical" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="one-medical">One Medical</TabsTrigger>
          <TabsTrigger value="inspire-qa">Inspire QA</TabsTrigger>
        </TabsList>
        <TabsContent value="one-medical" className="mt-6">
          {renderDashboardContent("one-medical")}
        </TabsContent>
        <TabsContent value="inspire-qa" className="mt-6">
          {renderDashboardContent("inspire-qa")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
