"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

// ✅ Define a TypeScript interface matching your backend model
interface Category {
  _id: string;
  title: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        if (!res.ok) throw new Error(`Failed to fetch categories (${res.status})`);

        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground text-lg">Loading categories...</p>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground text-lg">No categories found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-balance">
            Explore by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Browse our comprehensive range of home solutions designed to elevate your living space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category._id}`}
              className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={
                    category.image
                      ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${category.image}`
                      : "/placeholder.svg"
                  }
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-semibold text-xl mb-2">{category.title}</h3>
                <div className="flex items-center text-sm font-medium">
                  View Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
