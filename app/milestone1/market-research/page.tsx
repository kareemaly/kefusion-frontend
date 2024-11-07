"use client";

import { Globe, Users, Laptop, Smartphone, Search } from "lucide-react";
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

import rawKeywords from "@/data/one-medical/market-research/google-keyword-insight1_globalurl.json";
import rawAnalytics from "@/data/one-medical/market-research/similarweb12_v2_website-analytics.json";

// import rawKeywords from "@/data/inspire-qa/market-research/google-keyword-insight1_globalurl.json";
// import rawAnalytics from "@/data/inspire-qa/market-research/similarweb12_v2_website-analytics.json";

// Parse and validate data
const analyticsData = AnalyticsSchema.parse(rawAnalytics);
const healthcareTerms = z.array(SearchTermSchema).parse(rawKeywords);

// Transform traffic history data
const trafficData = analyticsData.traffic.history.map((item) => ({
  month: new Date(item.date).toLocaleString("default", { month: "short" }),
  visits: item.visits,
}));

// Transform ranking history data
const rankingData = analyticsData.ranking.globalRankHistory.map(
  (item, index) => ({
    month: new Date(item.date).toLocaleString("default", { month: "short" }),
    globalRank: item.rank,
    countryRank: analyticsData.ranking.countryRankHistory[index]?.rank || 0,
  })
);

// Transform traffic sources data
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

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

// Transform geography data
const geographyData = analyticsData.geography.topCountriesTraffics.map(
  (country) => ({
    country: country.countryAlpha2Code,
    share: country.visitsShare,
  })
);

export default function Dashboard() {
  const { overview } = analyticsData;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">
        One Medical Insights Dashboard
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
}
