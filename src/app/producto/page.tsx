import { redirect } from "next/navigation";
import { FEATURED_SLUG } from "@/lib/products";

// Bare /producto → the featured book's detail page.
export default function Producto() {
  redirect(`/producto/${FEATURED_SLUG}`);
}
