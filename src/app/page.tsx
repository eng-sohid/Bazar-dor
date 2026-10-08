import { getProducts } from "../lib/api";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="pb-12">
      <Hero />
      <ProductSection title="🔺 আজ দাম বেড়েছে ▲" products={risers} />
      <ProductSection title="🔻 আজ দাম কমেছে ▼" products={fallers} />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="সব ক্যাটাগরির আজকের দাম ও পরিবর্তন"
        products={products}
      />
    </div>
  );
}
