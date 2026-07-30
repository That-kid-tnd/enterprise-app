"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkeletonCard } from "@/components/loading/skeleton-card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Stats {
  totalUsers: number;
  activeSessions: number;
  revenue: number;
  chartData: { name: string; value: number }[];
}

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery<Stats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonCard className="h-72" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>Unable to load dashboard data.</p>
        <button
          className="mt-2 px-4 py-2 bg-primary text-white rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-semibold">{data?.totalUsers}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Active Sessions</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-semibold">{data?.activeSessions}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Revenue (MTD)</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-semibold">${data?.revenue.toLocaleString()}</p></CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Monthly Activity</CardTitle></CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
