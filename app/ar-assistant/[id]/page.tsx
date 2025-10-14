// app/ar-assistant/[id]/page.tsx
import { products } from "@/lib/data";
import { doorSubcategories } from "@/utils/ar";
import '@google/model-viewer';

interface Params {
  params: { id: string };
}

export default function ARAssistantPage({ params }: Params) {
  const product = products.find(p => p._id === params.id);

  if (!product) return <div>Product not found</div>;

  // Only allow doors
  if (!doorSubcategories.includes(product.subCategoryId!))
    return <div>No AR available for this product</div>;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
<model-viewer
  src={product.modelGlb}
  ios-src={product.modelUsdz}
  ar
  ar-modes="webxr scene-viewer quick-look"
  camera-controls
  auto-rotate
  style={{ width: "100%", height: "100%" }}
/>
    </div>
  );
}
