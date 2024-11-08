import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface RankingData {
  month: string;
  rank: number;
  dataKey: "globalRank" | "countryRank";
}

export function RankingChart({ data }: RankingChartProps) {
  // Custom tooltip to show if rank improved or worsened
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const currentValue = payload[0].value;
      const dataIndex = data.findIndex((item) => item.month === label);
      const previousValue =
        dataIndex > 0
          ? data[dataIndex - 1][payload[0].dataKey as keyof (typeof data)[0]]
          : currentValue;
      const change = previousValue - currentValue;
      const improved = change > 0;

      return (
        <div className="bg-background p-2 border rounded shadow">
          <p className="font-bold">{label}</p>
          <p>{`Rank: ${currentValue.toLocaleString()}`}</p>
          {dataIndex > 0 && (
            <p className={improved ? "text-green-600" : "text-red-600"}>
              {improved ? "▲" : "▼"} {Math.abs(change).toLocaleString()}
              {improved ? " (Improved)" : " (Declined)"}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom dot to show improvement/decline
  const CustomDot = ({ cx, cy, payload, dataKey }: any) => {
    const dataIndex = data.findIndex((item) => item.month === payload.month);
    if (dataIndex === 0) return null;

    const previousValue =
      data[dataIndex - 1][dataKey as keyof (typeof data)[0]];
    const currentValue = payload[dataKey];
    const improved = previousValue > currentValue;

    return (
      <svg x={cx - 6} y={cy - 6} width={12} height={12}>
        <circle
          cx="6"
          cy="6"
          r="5"
          fill={improved ? "#10B981" : "#EF4444"}
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    );
  };

  const RankChart = ({
    dataKey,
    color,
  }: {
    dataKey: "globalRank" | "countryRank";
    color: string;
  }) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis reversed domain={["auto", "auto"]} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          dot={<CustomDot />}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking History</CardTitle>
        <p className="text-sm text-muted-foreground">
          Note: Lower rank numbers indicate better performance
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="global">Global Rank</TabsTrigger>
            <TabsTrigger value="country">Country Rank</TabsTrigger>
          </TabsList>
          <TabsContent value="global">
            <div className="pt-4">
              <RankChart dataKey="globalRank" color="#8884d8" />
            </div>
          </TabsContent>
          <TabsContent value="country">
            <div className="pt-4">
              <RankChart dataKey="countryRank" color="#82ca9d" />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
