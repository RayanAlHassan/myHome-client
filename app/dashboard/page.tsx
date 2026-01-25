"use client";

import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign,
  Calendar,
  Download
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AnalyticsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const isManager =  user?.role === "admin";

  // Redirect non-managers
  React.useEffect(() => {
    if (user && !isManager) {
      router.replace("/dashboard");
    }
  }, [user, isManager, router]);

  if (!isManager) {
    return null; // Will redirect
  }

  const stats = [
    { label: "Total Users", value: "1,254", change: "+12%", icon: Users, color: "blue" },
    { label: "Active Products", value: "542", change: "+8%", icon: Package, color: "green" },
    { label: "Monthly Revenue", value: "$12,450", change: "+15%", icon: DollarSign, color: "amber" },
    { label: "Conversion Rate", value: "3.2%", change: "+0.4%", icon: TrendingUp, color: "purple" },
  ];

  return (
    <section className="min-h-screen bg-background text-foreground p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights and performance metrics
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-xl border bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-100 text-${stat.color}-600 dark:bg-${stat.color}-900/30 dark:text-${stat.color}-400`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-xl border bg-card">
          <h3 className="font-semibold text-lg mb-4">User Growth</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg border-border">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">User growth chart would appear here</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-xl border bg-card">
          <h3 className="font-semibold text-lg mb-4">Revenue Trends</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg border-border">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Revenue chart would appear here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Data Table */}
      <div className="rounded-xl border bg-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">Recent Activity</h3>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm text-muted-foreground">Last 30 days</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Action</th>
                <th className="text-left py-3 px-4 font-medium">User</th>
                <th className="text-left py-3 px-4 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-4">2024-01-{15 + item}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {item % 2 === 0 ? 'Created' : 'Updated'}
                    </span>
                  </td>
                  <td className="py-3 px-4">User {item}</td>
                  <td className="py-3 px-4">
                    {item % 2 === 0 ? 'Added new product' : 'Modified category'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}