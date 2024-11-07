import { z } from "zod";

export const SearchTermSchema = z.object({
  text: z.string(),
  volume: z.number(),
  competition_level: z.union([
    z.literal("LOW"),
    z.literal("MEDIUM"),
    z.literal("HIGH"),
    z.literal("UNSPECIFIED"),
  ]),
  competition_index: z.number(),
  low_bid: z.number(),
  high_bid: z.number(),
  trend: z.number(),
});

export const AnalyticsHistorySchema = z.object({
  date: z.string(),
  visits: z.number(),
});

export const RankHistorySchema = z.object({
  date: z.string(),
  rank: z.number(),
});

export const TechnologySchema = z.object({
  categoryId: z.string(),
  topTechName: z.string(),
  topTechIconUrl: z.string(),
  technologiesTotalCount: z.number(),
});

export const CountryTrafficSchema = z.object({
  countryAlpha2Code: z.string(),
  countryUrlCode: z.string(),
  visitsShare: z.number(),
  visitsShareChange: z.number().nullable(),
});

export const TrafficSourcesSchema = z.object({
  directVisitsShare: z.number(),
  referralVisitsShare: z.number(),
  organicSearchVisitsShare: z.number(),
  paidSearchVisitsShare: z.number().nullable(),
  socialNetworksVisitsShare: z.number(),
  mailVisitsShare: z.number(),
  adsVisitsShare: z.number(),
});

export const OverviewSchema = z.object({
  visitsTotalCount: z.number(),
  bounceRate: z.number(),
  globalRank: z.number(),
  globalRankChange: z.number(),
  countryRank: z.number(),
  countryRankChange: z.number(),
});

export const AnalyticsSchema = z.object({
  overview: OverviewSchema,
  traffic: z.object({
    visitsTotalCountChange: z.number(),
    history: z.array(AnalyticsHistorySchema),
  }),
  ranking: z.object({
    globalRankHistory: z.array(RankHistorySchema),
    countryRankHistory: z.array(RankHistorySchema),
  }),
  trafficSources: TrafficSourcesSchema,
  technologies: z.object({
    categories: z.array(TechnologySchema),
  }),
  geography: z.object({
    topCountriesTraffics: z.array(CountryTrafficSchema),
  }),
  previewDesktop: z.string(),
  previewMobile: z.string(),
});

export type SearchTerm = z.infer<typeof SearchTermSchema>;
export type Analytics = z.infer<typeof AnalyticsSchema>;
