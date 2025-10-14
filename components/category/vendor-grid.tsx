import Image from "next/image";

type Vendor = {
  _id: string;
  companyName: string;
  image: string;
};

type VendorGridProps = {
  vendors: Vendor[];
};

export function VendorGrid({ vendors }: VendorGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 my-8">
      {vendors.map((vendor) => (
        <div
          key={vendor._id}
          className="flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-lg transition"
        >
          <div className="w-20 h-20 relative mb-2">
            <Image
              src={vendor.image || "/placeholder.svg"}
              alt={vendor.companyName}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <h3 className="text-sm font-medium text-center">{vendor.companyName}</h3>
        </div>
      ))}
    </div>
  );
}
