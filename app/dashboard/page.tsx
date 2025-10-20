"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

interface UserRoles {
  superAdmins: number;
  projectManagers: number;
  contributors: number;
}

interface Counts {
  users: number;
  usersByRole: UserRoles;
  projects: number;
  events: number;
  sponsors: number;
}

export default function DashboardPage() {
  const { user, loggedIn, loading } = useAuth();
  const [counts, setCounts] = useState<Counts>({
    users: 0,
    usersByRole: { superAdmins: 0, projectManagers: 0, contributors: 0 },
    projects: 0,
    events: 0,
    sponsors: 0,
  });
  const [pageLoading, setPageLoading] = useState(true);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!loggedIn || !user || user.role !== "admin") {
      setPageLoading(false);
      return;
    }

    const fetchCounts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/dashboard-counts`, { withCredentials: true });
        setCounts(res.data);
      } catch (error) {
        console.error("Error fetching dashboard counts", error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchCounts();
  }, [loggedIn, user]);

  if (loading || pageLoading) return <p>Loading...</p>;
  if (!user || user.role !== "admin") return <p className="text-red-500 text-center mt-10">You do not have access to this page. Its just for admin and project manager with privilage (admin)
  </p>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome, {user.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">Here's an overview of your platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* General counts */}
        {[
          { title: "Users", count: counts.users },
          { title: "Projects", count: counts.projects },
          { title: "Events", count: counts.events },
          { title: "Sponsors", count: counts.sponsors },
        ].map((card) => (
          <div
            key={card.title}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{card.title}</h2>
            <p className="text-3xl font-bold mt-4">{card.count}</p>
          </div>
        ))}
      </div>

      {/* User role breakdown */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: "Super Admins", count: counts.usersByRole.superAdmins },
          { title: "Project Managers", count: counts.usersByRole.projectManagers },
          { title: "Contributors", count: counts.usersByRole.contributors },
        ].map((card) => (
          <div
            key={card.title}
            className="p-6 bg-blue-50 dark:bg-blue-900 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-200">{card.title}</h2>
            <p className="text-3xl font-bold mt-4">{card.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
