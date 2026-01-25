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

interface CategoryRow {
  id: string;
  title: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
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

export default function CategoriesPage() {
  const { user, loggedIn, loading } = useAuth();
  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const hasAccess = user ? user.role === "admin" : false;

  useEffect(() => {
    if (!loggedIn || !user || !hasAccess) {
      setPageLoading(false);
      return;
    }

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories`, { withCredentials: true });
        setRows(
          res.data.map((c: any) => ({
            id: c._id,
            title: c.title,
            image: c.image,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
          }))
        );
      } catch (err) {
        console.error("Error fetching categories", err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchCategories();
  }, [loggedIn, user]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/categories/${id}`, { withCredentials: true });
      setRows((prev) => prev.filter((row) => row.id !== id));
    } catch (err) {
      console.error("Error deleting category", err);
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1, editable: hasAccess },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <img
            src={`${BASE_URL}/uploads/images/${params.value}`}
            alt={params.row.title}
            className="h-10 w-10 object-cover rounded"
          />
        ) : (
          <span>No Image</span>
        ),
    },
    { field: "createdAt", headerName: "Created At", flex: 1, renderCell: (params) =>
    params.row.createdAt
      ? new Date(params.row.createdAt).toLocaleString()
      : "N/A", },
    { field: "updatedAt", headerName: "Updated At", flex: 1 , renderCell: (params) =>
    params.row.createdAt
      ? new Date(params.row.createdAt).toLocaleString()
      : "N/A",},
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
                onClick={() => router.push(`/dashboard/categories/${params.id}`)}
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
      <section className="min-h-screen bg-background text-foreground py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading font-bold">Users Management</h1>
      </div>
      <div className="text-center mt-10 p-6 border border-red-300 rounded-lg bg-red-50 dark:bg-red-900/20">
        <p className="text-red-500 font-semibold text-xl">
          Access Denied
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          You do not have permission to access this page. Only administrators can manage Categories.
        </p>
        {/* <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition"
        >
          Go to Dashboard
        </button> */}
      </div>
    </section>
    );
  }

  return (
    <section className="min-h-screen bg-background text-foreground py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading font-bold">Categories Management</h1>
        {hasAccess && (
          <Link href="/dashboard/categories/new">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition">
              Add Category
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
