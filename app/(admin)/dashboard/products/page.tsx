import  connectToDB  from "@/lib/db";
import  Product  from "@/models/Product";
import ProductTable from "@/components/ProductTable"; 

export default async function ProductsPage() {
  await connectToDB();

  const products = await Product.find().sort({ createdAt: -1 });

  const formattedProducts = products.map((product) => ({
    name: product.name,
    price: product.price,
    stock: product.stock,
    category: product.category,
    brand: product.brand,
    description: product.description,
    imageUrl: product.imageUrl,
    isFeatured:product.isFeatured,
    _id: product._id.toString(),
  }));

  return (
    <div className="p-5">
      <ProductTable products={formattedProducts} />
    </div>
  );
}