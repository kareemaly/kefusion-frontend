import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchTerm {
  text: string;
  volume: number;
  competition_level: "LOW" | "MEDIUM" | "HIGH";
  competition_index: number;
  low_bid: number;
  high_bid: number;
  trend: number;
}

interface SearchTermsTableProps {
  terms: SearchTerm[];
}

export function SearchTermsTable({ terms }: SearchTermsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof SearchTerm>("volume");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const filteredTerms = terms.filter((term) =>
    term.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAndFilteredTerms = [...filteredTerms].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const pageCount = Math.ceil(sortedAndFilteredTerms.length / pageSize);
  const paginatedTerms = sortedAndFilteredTerms.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleSort = (column: keyof SearchTerm) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="h-5 w-5" />
          <span>Healthcare Search Terms Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4">
          <Input
            type="text"
            placeholder="Search healthcare terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">
                  <Button variant="ghost" onClick={() => handleSort("text")}>
                    Term{" "}
                    {sortColumn === "text" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="w-[120px]">
                  <Button variant="ghost" onClick={() => handleSort("volume")}>
                    Volume{" "}
                    {sortColumn === "volume" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="w-[120px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("competition_index")}
                  >
                    Competition{" "}
                    {sortColumn === "competition_index" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="w-[120px]">
                  <Button variant="ghost" onClick={() => handleSort("low_bid")}>
                    Low Bid{" "}
                    {sortColumn === "low_bid" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="w-[120px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("high_bid")}
                  >
                    High Bid{" "}
                    {sortColumn === "high_bid" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="w-[120px]">
                  <Button variant="ghost" onClick={() => handleSort("trend")}>
                    Trend{" "}
                    {sortColumn === "trend" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTerms.map((term) => (
                <TableRow key={term.text}>
                  <TableCell className="font-medium">{term.text}</TableCell>
                  <TableCell>{term.volume.toLocaleString()}</TableCell>
                  <TableCell>
                    {term.competition_level} ({term.competition_index})
                  </TableCell>
                  <TableCell>${term.low_bid.toFixed(2)}</TableCell>
                  <TableCell>${term.high_bid.toFixed(2)}</TableCell>
                  <TableCell>
                    {term.trend > 0 ? (
                      <span className="text-green-500">
                        ↑ {term.trend.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-red-500">
                        ↓ {Math.abs(term.trend).toFixed(1)}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${pageSize}`}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setCurrentPage(0);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 50, 100].map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {currentPage + 1} of {pageCount}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(0)}
              disabled={currentPage === 0}
            >
              <span className="sr-only">Go to first page</span>
              <span>{"<<"}</span>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <span className="sr-only">Go to previous page</span>
              <span>{"<"}</span>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageCount - 1}
            >
              <span className="sr-only">Go to next page</span>
              <span>{">"}</span>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(pageCount - 1)}
              disabled={currentPage === pageCount - 1}
            >
              <span className="sr-only">Go to last page</span>
              <span>{">>"}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
