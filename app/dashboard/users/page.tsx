
"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Switch } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  phone:string;
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: `1px solid var(--border)`,
  borderRadius: "var(--radius-lg)",
  fontFamily: "var(--font-sans)",
  backgroundColor: "var(--background)",
  color: "var(--foreground)",

  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    fontWeight: 600,
    borderBottom: `1px solid var(--border)`,
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    borderTop: `1px solid var(--border)`,
  },
  "& .MuiDataGrid-row": {
    borderBottom: `1px solid var(--border)`,
    "&:hover": {
      backgroundColor: "var(--primary)/10",
      boxShadow: "0 0 10px var(--primary)/30",
    },
  },
  "& .MuiDataGrid-cell": {
    color: "var(--foreground)",
  },
  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
    outline: "none",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-actionsCell .MuiSvgIcon-root": {
    color: "var(--primary)",
    transition: "all 0.2s",
    "&:hover": {
      color: "white",
      backgroundColor: "orange",
      borderRadius: "4px",
      transform: "scale(1.1)",
    },
  },
}));

export default function UsersPage() {
  const { user, loggedIn, loading } = useAuth();
  const [rows, setRows] = useState<UserRow[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const hasAccess = user
    ? user.role === "admin" 
    : false;

  useEffect(() => {
    if (!loggedIn || !user || !hasAccess) {
      setPageLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user`, { withCredentials: true });
        setRows(
          res.data.map((u: any) => ({
            id: u._id,
            name: u.name,
            email: u.email,
            role: u.role,
            isActive: u.isActive,
            phone:u.phone,
          }))
        );
      } catch (err) {
        console.error("Error fetching users", err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchUsers();
  }, [loggedIn, user]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/user/${id}`, { withCredentials: true });
      setRows((prev) => prev.filter((row) => row.id !== id));
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  const handleUpdate = async (id: string, field: string, value: any) => {
    try {
      await axios.put(`${BASE_URL}/user/${id}`, { [field]: value }, { withCredentials: true });
      setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, editable: hasAccess },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1, editable: hasAccess },
    { field: "phone", headerName: "phone", flex: 1, editable: hasAccess },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      renderCell: (params) =>
        hasAccess ? (
          <Switch
            checked={params.value}
            onChange={(e) => handleUpdate(params.id as string, "isActive", e.target.checked)}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "white",
                "& + .MuiSwitch-track": { backgroundColor: "var(--primary)" },
              },
              "& .MuiSwitch-track": { backgroundColor: "gray" },
            }}
          />
        ) : (
          <span>{params.value ? "Yes" : "No"}</span>
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params) =>
        hasAccess
          ? [
              <GridActionsCellItem
                key="edit"
                icon={<Edit />}
                label="Edit"
                onClick={() => router.push(`/dashboard/users/${params.id}`)}
              />,
              <GridActionsCellItem
                key="delete"
                icon={<Delete />}
                label="Delete"
                onClick={() => handleDelete(params.id as string)}
              />,
            ]
          : [],
    },
  ];

  if (loading || pageLoading) return <p>Loading...</p>;

  if (!hasAccess) {
    return (
      <p className="text-red-500 font-semibold text-center mt-10">
        You do not have access to this page. It's just for admin and project manager with privilege (admin)
      </p>
    );
  }

  return (
    <section className="min-h-screen bg-background text-foreground py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading font-bold">Users Management</h1>
        {hasAccess && (
          <Link href="/dashboard/users/new">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition">
              Add User
            </button>
          </Link>
        )}
      </div>

      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: typeof window !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light",
          },
        })}
      >
        <StyledDataGrid
          rows={rows}
          columns={columns}
          loading={pageLoading}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
        />
      </ThemeProvider>
    </section>
  );
}
