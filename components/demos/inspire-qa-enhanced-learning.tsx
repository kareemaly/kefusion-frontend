"use client"

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Helper function to format large numbers
const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

// Sample data from the attachment
const sampleData = [
  {"text":"course certification","volume":74000,"competition_level":"MEDIUM","competition_index":37,"low_bid":0.103838,"high_bid":2.301821,"trend":59.51},
  {"text":"pmp certification","volume":301000,"competition_level":"MEDIUM","competition_index":59,"low_bid":0.935125,"high_bid":6.15,"trend":2.78},
  {"text":"project management certification","volume":165000,"competition_level":"HIGH","competition_index":68,"low_bid":1.666035,"high_bid":12.34,"trend":7.67},
  {"text":"cyber security certifications","volume":90500,"competition_level":"MEDIUM","competition_index":35,"low_bid":1.57,"high_bid":20.3,"trend":16.1},
  {"text":"google certification","volume":60500,"competition_level":"LOW","competition_index":20,"low_bid":1.31,"high_bid":15.02,"trend":-0.92},
  {"text":"cna classes near me","volume":135000,"competition_level":"MEDIUM","competition_index":43,"low_bid":2.24,"high_bid":16.15,"trend":4.72},
  {"text":"google certification courses","volume":33100,"competition_level":"LOW","competition_index":27,"low_bid":0.966457,"high_bid":13.75,"trend":5.73},
  {"text":"scrum master certification","volume":74000,"competition_level":"MEDIUM","competition_index":61,"low_bid":0.958922,"high_bid":5.03,"trend":-0.47},
  {"text":"google data analytics certification","volume":90500,"competition_level":"MEDIUM","competition_index":35,"low_bid":2.02,"high_bid":20.85,"trend":5.58},
  {"text":"data analytics certification","volume":49500,"competition_level":"MEDIUM","competition_index":64,"low_bid":1.8,"high_bid":14.449301,"trend":2.24},
  {"text":"six sigma certification","volume":74000,"competition_level":"MEDIUM","competition_index":50,"low_bid":0.5,"high_bid":4.05,"trend":3.22},
  {"text":"project management courses","volume":110000,"competition_level":"HIGH","competition_index":69,"low_bid":0.750423,"high_bid":7.945788,"trend":1.56},
  {"text":"online teaching degree","volume":22200,"competition_level":"MEDIUM","competition_index":44,"low_bid":5.74,"high_bid":50.256668,"trend":20.08},
  {"text":"google analytics certification","volume":49500,"competition_level":"LOW","competition_index":25,"low_bid":0.704629,"high_bid":9.79,"trend":1.1},
  {"text":"google career certificates","volume":40500,"competition_level":"LOW","competition_index":25,"low_bid":0.63,"high_bid":10.08,"trend":-3.11},
  {"text":"comptia a+","volume":135000,"competition_level":"LOW","competition_index":32,"low_bid":0.75,"high_bid":6.59,"trend":0.73},
  {"text":"life coach certification","volume":33100,"competition_level":"MEDIUM","competition_index":62,"low_bid":1.72,"high_bid":10.88,"trend":4.41},
  {"text":"google project management certificate","volume":60500,"competition_level":"LOW","competition_index":27,"low_bid":1.03,"high_bid":13.24,"trend":5.86},
  {"text":"business analyst course","volume":60500,"competition_level":"HIGH","competition_index":70,"low_bid":0.722396,"high_bid":3.066513,"trend":0.13},
  {"text":"comptia security+","volume":110000,"competition_level":"MEDIUM","competition_index":38,"low_bid":0.555218,"high_bid":7.69,"trend":2.21},
  {"text":"online certificate programs","volume":33100,"competition_level":"MEDIUM","competition_index":59,"low_bid":3.29,"high_bid":21.75,"trend":8.07},
  {"text":"cissp certification","volume":49500,"competition_level":"MEDIUM","competition_index":46,"low_bid":0.997244,"high_bid":9,"trend":1.55},
  {"text":"tefl","volume":74000,"competition_level":"LOW","competition_index":33,"low_bid":0.35,"high_bid":2.848658,"trend":1.19},
  {"text":"itil certification","volume":60500,"competition_level":"MEDIUM","competition_index":43,"low_bid":0.45,"high_bid":3.13,"trend":-1.29},
  {"text":"medical coding certification online","volume":14800,"competition_level":"MEDIUM","competition_index":51,"low_bid":5.18,"high_bid":41.36,"trend":45.8},
  {"text":"sql certification","volume":27100,"competition_level":"MEDIUM","competition_index":56,"low_bid":0.96894,"high_bid":7.72,"trend":4.77},
  {"text":"lean six sigma certification","volume":40500,"competition_level":"MEDIUM","competition_index":54,"low_bid":0.553268,"high_bid":5.22,"trend":2.03},
  {"text":"product management certification","volume":18100,"competition_level":"HIGH","competition_index":68,"low_bid":1.778346,"high_bid":10.22,"trend":3.16},
  {"text":"osha 30 certification","volume":22200,"competition_level":"MEDIUM","competition_index":49,"low_bid":1.43,"high_bid":5.8,"trend":9.75},
  {"text":"google it support professional certificate","volume":22200,"competition_level":"LOW","competition_index":29,"low_bid":0.84,"high_bid":15.22,"trend":4.83},
  {"text":"osha 10 certification","volume":33100,"competition_level":"MEDIUM","competition_index":42,"low_bid":1.23,"high_bid":4.25,"trend":10.68},
  {"text":"google ux design certificate","volume":9900,"competition_level":"LOW","competition_index":33,"low_bid":1.818544,"high_bid":16.85,"trend":1.51},
  {"text":"medical coding classes online","volume":40500,"competition_level":"MEDIUM","competition_index":35,"low_bid":1.773184,"high_bid":39.04,"trend":17.4},
  {"text":"medical billing and coding online classes","volume":74000,"competition_level":"LOW","competition_index":24,"low_bid":10.39,"high_bid":74.66,"trend":32.58},
  {"text":"google data analytics professional certificate","volume":40500,"competition_level":"MEDIUM","competition_index":34,"low_bid":0.4,"high_bid":5.53,"trend":6.89},
  {"text":"medical billing and coding certification online","volume":18100,"competition_level":"MEDIUM","competition_index":55,"low_bid":9.08,"high_bid":65.21,"trend":6.01},
  {"text":"business analyst certification","volume":49500,"competition_level":"MEDIUM","competition_index":57,"low_bid":0.96,"high_bid":9.25,"trend":6.4},
  {"text":"tefl certification","volume":60500,"competition_level":"MEDIUM","competition_index":43,"low_bid":0.236189,"high_bid":2.372572,"trend":6.12},
  {"text":"comptia a+ certification","volume":22200,"competition_level":"MEDIUM","competition_index":49,"low_bid":1.511715,"high_bid":8.77,"trend":1.2},
  {"text":"tefl course","volume":27100,"competition_level":"MEDIUM","competition_index":52,"low_bid":0.287882,"high_bid":3.106441,"trend":2.91},
  {"text":"ccna certification","volume":49500,"competition_level":"LOW","competition_index":31,"low_bid":0.268122,"high_bid":5.163626,"trend":1.92},
  {"text":"prince 2 course","volume":5400,"competition_level":"HIGH","competition_index":70,"low_bid":2.7,"high_bid":9.417563,"trend":-0.71},
  {"text":"online billing and coding classes","volume":14800,"competition_level":"MEDIUM","competition_index":41,"low_bid":11.46,"high_bid":72.71,"trend":39.17},
  {"text":"cyber security certifications online","volume":18100,"competition_level":"MEDIUM","competition_index":49,"low_bid":3.8,"high_bid":33.97,"trend":20.47},
  {"text":"online paralegal programs","volume":12100,"competition_level":"MEDIUM","competition_index":60,"low_bid":4.91,"high_bid":33.71,"trend":14.31},
  {"text":"google free certification courses","volume":22200,"competition_level":"LOW","competition_index":22,"low_bid":0.09,"high_bid":4.39,"trend":5.26},
  {"text":"a+ certification","volume":22200,"competition_level":"MEDIUM","competition_index":38,"low_bid":1.48,"high_bid":9.65,"trend":-1.32},
  {"text":"food handler certification","volume":40500,"competition_level":"MEDIUM","competition_index":47,"low_bid":0.98,"high_bid":4.46,"trend":5.89},
  {"text":"online courses with certificates","volume":368000,"competition_level":"MEDIUM","competition_index":56,"low_bid":0.18,"high_bid":2.891201,"trend":25.93},
  {"text":"ccna","volume":368000,"competition_level":"LOW","competition_index":10,"low_bid":0.249755,"high_bid":3.14,"trend":2.76},
  {"text":"google certificate programs","volume":8100,"competition_level":"MEDIUM","competition_index":35,"low_bid":2.25,"high_bid":16.629999,"trend":1.44},
  {"text":"osha 30 training","volume":6600,"competition_level":"MEDIUM","competition_index":51,"low_bid":2.736666,"high_bid":14.25,"trend":-0.58},
  {"text":"digital marketing certificate","volume":22200,"competition_level":"MEDIUM","competition_index":56,"low_bid":1.21,"high_bid":13.93,"trend":20.01},
  {"text":"cybersecurity certifications","volume":27100,"competition_level":"MEDIUM","competition_index":59,"low_bid":2.64,"high_bid":20.88,"trend":4.38},
  {"text":"python certification","volume":33100,"competition_level":"MEDIUM","competition_index":41,"low_bid":0.76,"high_bid":6.56,"trend":1.11},
  {"text":"bookkeeping certification","volume":9900,"competition_level":"MEDIUM","competition_index":64,"low_bid":2.1,"high_bid":7.3,"trend":2.84},
  {"text":"google certification courses free","volume":12100,"competition_level":"LOW","competition_index":24,"low_bid":0.088761,"high_bid":3.15,"trend":-2.94},
  {"text":"capm certification","volume":40500,"competition_level":"MEDIUM","competition_index":47,"low_bid":0.617333,"high_bid":5.17,"trend":2.85},
  {"text":"cipd level 3","volume":6600,"competition_level":"MEDIUM","competition_index":59,"low_bid":3.630901,"high_bid":10.39501,"trend":11.94},
  {"text":"food hygiene certificate","volume":14800,"competition_level":"MEDIUM","competition_index":53,"low_bid":0.717875,"high_bid":3.229991,"trend":4.51},
  {"text":"power bi certification","volume":49500,"competition_level":"MEDIUM","competition_index":50,"low_bid":0.621604,"high_bid":4.64,"trend":2.77},
  {"text":"servsafe certification","volume":49500,"competition_level":"MEDIUM","competition_index":39,"low_bid":0.308333,"high_bid":6.22,"trend":4.95},
  {"text":"american heart association bls","volume":49500,"competition_level":"LOW","competition_index":28,"low_bid":0.86,"high_bid":2.93,"trend":2.39},
  {"text":"it certificate programs","volume":3600,"competition_level":"MEDIUM","competition_index":51,"low_bid":4.19,"high_bid":24.02,"trend":7.89},
  {"text":"osha certification","volume":27100,"competition_level":"MEDIUM","competition_index":36,"low_bid":0.66,"high_bid":3.07,"trend":5.22},
  {"text":"six sigma green belt","volume":33100,"competition_level":"MEDIUM","competition_index":44,"low_bid":0.508437,"high_bid":4.250341,"trend":1.19}
]

const competitionColors = {
  LOW: "bg-green-500",
  MEDIUM: "bg-yellow-500",
  HIGH: "bg-red-500"
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658']

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("volume")

  const filteredAndSortedData = useMemo(() => {
    return sampleData
      .filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => b[sortBy] - a[sortBy])
  }, [searchTerm, sortBy])

  const topCourses = useMemo(() => filteredAndSortedData.slice(0, 10), [filteredAndSortedData])

  const competitionDistribution = useMemo(() => {
    const distribution = filteredAndSortedData.reduce((acc, item) => {
      acc[item.competition_level] = (acc[item.competition_level] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    return Object.entries(distribution).map(([name, value]) => ({ name, value }))
  }, [filteredAndSortedData])

  const averageTrend = useMemo(() => {
    const sum = filteredAndSortedData.reduce((acc, item) => acc + item.trend, 0)
    return sum / filteredAndSortedData.length
  }, [filteredAndSortedData])

  const totalVolume = useMemo(() => {
    return filteredAndSortedData.reduce((acc, item) => acc + item.volume, 0)
  }, [filteredAndSortedData])

  const averageBidRange = useMemo(() => {
    const sum = filteredAndSortedData.reduce((acc, item) => acc + (item.high_bid - item.low_bid), 0)
    return sum / filteredAndSortedData.length
  }, [filteredAndSortedData])

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Enhanced Certification Courses Analysis</h1>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Input 
          type="text" 
          placeholder="Search courses..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="volume">Volume</SelectItem>
            <SelectItem value="trend">Trend</SelectItem>
            <SelectItem value="competition_index">Competition</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Courses by Search Volume</CardTitle>
            <CardDescription>Monthly search volume for top certification courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCourses}>
                <XAxis dataKey="text" angle={-45} textAnchor="end" height={100} interval={0} />
                <YAxis tickFormatter={formatNumber} />
                <Tooltip formatter={(value) => formatNumber(value as number)} />
                <Bar dataKey="volume">
                  {topCourses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competition Level Distribution</CardTitle>
            <CardDescription>Distribution of competition levels among courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={competitionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {competitionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trend vs Competition Index</CardTitle>
            <CardDescription>Scatter plot of trend and competition index</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="competition_index" name="Competition Index" />
                <YAxis type="number" dataKey="trend" name="Trend (%)" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Courses" data={filteredAndSortedData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bid Range Analysis</CardTitle>
            <CardDescription>Low and high bids for top courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCourses} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="text" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="low_bid" fill="#8884d8" name="Low Bid" />
                <Bar dataKey="high_bid" fill="#82ca9d" name="High Bid" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Trend Analysis</CardTitle>
            <CardDescription>Trend values for all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filteredAndSortedData}>
                <XAxis dataKey="text" angle={-45} textAnchor="end" height={100} interval={0} />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="trend" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
          <CardDescription>Key metrics for the certification courses market</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Total Search Volume</h3>
            <p className="text-3xl font-bold">{formatNumber(totalVolume)}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Average Trend</h3>
            <p className="text-3xl font-bold">
              <Badge variant={averageTrend >= 0 ? "default" : "destructive"}>
                {averageTrend.toFixed(2)}%
              </Badge>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Average Bid Range</h3>
            <p className="text-3xl font-bold">${averageBidRange.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Top Performing Course</h3>
            <p className="text-xl">{topCourses[0]?.text}</p>
            <p>Volume: {formatNumber(topCourses[0]?.volume)}</p>
            <p>Trend: {topCourses[0]?.trend.toFixed(2)}%</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Course Information</CardTitle>
          <CardDescription>Comprehensive data for each certification course</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Search Volume</TableHead>
                  <TableHead>Competition</TableHead>
                  <TableHead>Competition Index</TableHead>
                  <TableHead>Low Bid</TableHead>
                  <TableHead>High Bid</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedData.map((item) => (
                  <TableRow key={item.text}>
                    <TableCell>{item.text}</TableCell>
                    <TableCell>{formatNumber(item.volume)}</TableCell>
                    <TableCell>
                      <Badge className={competitionColors[item.competition_level]}>
                        {item.competition_level}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.competition_index}</TableCell>
                    <TableCell>${item.low_bid.toFixed(2)}</TableCell>
                    <TableCell>${item.high_bid.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={item.trend >= 0 ? "default" : "destructive"}>
                        {item.trend.toFixed(2)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}