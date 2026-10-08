import type { Product, Category } from "../types";

const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchApi<T>(path: string): Promise<T> {
  let lastError: unknown;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as T;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export function getProducts(category?: string) {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchApi<Product[]>(`/products${q}`);
}

export function getProduct(idOrSlug: string | number) {
  return fetchApi<Product>(`/products/${idOrSlug}`);
}
export function getCategories() {
  return fetchApi<Category[]>("/categories");
}

export function getCategory(slug: string) {
  return fetchApi<Category>(`/categories/${slug}`);
}
