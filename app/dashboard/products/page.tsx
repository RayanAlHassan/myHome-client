"use client";

import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface ProductRow {
  id: string;
  title: string;
  description: string;
  price: number;
  dimension?: string;
  category?: string;
  subCategory?: string;
  images: string[];
  modelGlb?: string | null;   // ✅ add this

  createdAt: string;
  updatedAt: string;
  

  user?: {
    name: string;
    role: string;
    email?: string;
    vendorProfile?: any;
  } | null; // Add null type
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
}));

export default function ProductsPage() {
  const { user, loggedIn, loading } = useAuth();
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const hasAccess = user ? user.role === "admin"|| user.role==="vendore" : false;

  useEffect(() => {
    if (!loggedIn || !user || !hasAccess) {
      setPageLoading(false);
      return;
    }
 // In your dashboard products page, change the API endpoint:
const fetchProducts = async () => {
  try {
    // Use dashboard endpoint instead of public endpoint
    const res = await axios.get(`${BASE_URL}/dashboard/products`, {
      withCredentials: true,
    });
    
    const formatted = res.data.map((p: any) => {
      const createdBy = p.vendorId || p.userId || {};
      
      return {
        id: p._id,
        title: p.title,
        description: p.description,
        price: p.price,
        dimension: p.dimension,
        images: p.images || [],
        modelGlb: p.modelGlb || null, // ✅ add this

        category: p.categoryId?.title || "N/A",
        subCategory: p.subCategoryId?.title || "N/A",
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        user: createdBy,
      };
    });
    setRows(formatted);
  } catch (err) {
    console.error("Error fetching dashboard products", err);
  } finally {
    setPageLoading(false);
  }
};
    // const fetchProducts = async () => {
    //   try {
    //     const res = await axios.get(`${BASE_URL}/products`, {
    //       withCredentials: true,
    //     });
    //     const formatted = res.data.map((p: any) => ({
    //       id: p._id,
    //       title: p.title,
    //       description: p.description,

    //       price: p.price,
    //       dimension: p.dimension,
    //       images: p.images || [],
    //       category: p.categoryId?.title || "N/A",
    //       subCategory: p.subCategoryId?.title || "N/A",
    //       createdAt: p.createdAt,
    //       updatedAt: p.updatedAt,
    //       user: p.userId || p.vendorId,
    //     }));
    //     setRows(formatted);
    //   } catch (err) {
    //     console.error("Error fetching products", err);
    //   } finally {
    //     setPageLoading(false);
    //   }
    // };

    fetchProducts();
  }, [loggedIn, user]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/products/${id}`, {
        withCredentials: true,
      });
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },

    { field: "price", headerName: "Price", flex: 1 },
    { field: "dimension", headerName: "Dimension", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "subCategory", headerName: "Subcategory", flex: 1 },
    {
      field: "images",
      headerName: "Images",
      flex: 1.5,
      renderCell: (params) =>
        params.value?.length ? (
          <div className="flex gap-1">
            {params.value.slice(0, 3).map((img: string, i: number) => (
              <Image
                key={i}
                src={`${BASE_URL}/uploads/images/${img}`}
                alt="product"
                width={40}
                height={40}
                className="rounded object-cover"
              />
            ))}
            {params.value.length > 3 && (
              <span className="text-xs text-gray-400">
                +{params.value.length - 3}
              </span>
            )}
          </div>
        ) : (
          <span>No Images</span>
        ),
    },
    {
      field: "modelGlb",
      headerName: "3D Model",
      flex: 0.7,
      renderCell: (params) => {
        const hasGlb = !!params.value;
        return (
          <span className={hasGlb ? "text-green-600 font-semibold" : "text-gray-500"}>
            {hasGlb ? "Yes" : "No"}
          </span>
        );
      },
    },
    {
      field: "user",
      headerName: "Created By",
      flex: 1.2,
      renderCell: (params) => {
        const user = params.value;
        return user ? (
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleViewUser(user)}
          >
            {user.name} ({user.role})
          </Button>
        ) : (
          "N/A"
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      renderCell: (params) =>
        new Date(params.row.createdAt).toLocaleDateString(),
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
                onClick={() =>
                  router.push(`/dashboard/products/${params.id}`)
                }
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
      <p className="text-red-500 text-center mt-10">
        Access Denied — Admins Only.
      </p>
    );
  }

  return (
    <section className="min-h-screen bg-background text-foreground py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products Management</h1>
        {hasAccess && (
          <Link href="/dashboard/products/new">
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition">
              Add Product
            </button>
          </Link>
        )}
      </div>

      <ThemeProvider
        theme={createTheme({
          palette: {
            mode:
              typeof window !== "undefined" &&
              document.documentElement.classList.contains("dark")
                ? "dark"
                : "light",
          },
        })}
      >
        <StyledDataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
        />
      </ThemeProvider>

      {/* ---- USER MODAL ---- */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          className="bg-background text-foreground p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-32"
        >
          <Typography variant="h6" className="mb-3">
            User Information
          </Typography>
          {selectedUser ? (
            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email || "N/A"}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>

              {selectedUser.role === "vendore" && selectedUser.vendorProfile && (
                <div className="mt-4 border-t pt-2">
                  <h4 className="font-semibold mb-1">Vendor Details</h4>
                  <p><strong>Company:</strong> {selectedUser.vendorProfile.companyName || "N/A"}</p>
                  <p><strong>Phone:</strong> {selectedUser.vendorProfile.companyPhone || "N/A"}</p>
                  <p><strong>Address:</strong> {selectedUser.vendorProfile.companyAddress || "N/A"}</p>
                  <p><strong>Status:</strong> {selectedUser.vendorProfile.status || "N/A"}</p>
                </div>
              )}
            </div>
          ) : (
            <p>No user data available.</p>
          )}

          <div className="mt-4 text-right">
            <Button variant="contained" color="primary" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </section>
  );
}
