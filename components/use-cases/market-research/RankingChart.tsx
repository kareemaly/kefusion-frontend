import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RankingChartProps {
  data: Array<{
    month: string;
    globalRank: number;
    countryRank: number;
  }>;
}

export function RankingChart({ data }: RankingChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking History</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="globalRank"
              stroke="#8884d8"
              name="Global Rank"
            />
            <Line
              type="monotone"
              dataKey="countryRank"
              stroke="#82ca9d"
              name="Country Rank"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
