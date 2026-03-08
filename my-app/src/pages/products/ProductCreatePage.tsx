import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productService";
import toast from "react-hot-toast";
import type { ProductRequest } from "../../types";

type FormValues = { name: string; price: number };

export default function ProductCreatePage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues): Promise<void> => {
    const payload: ProductRequest = { id: 0, name: data.name, price: parseFloat(String(data.price)) };
    await createProduct(payload);
    toast.success("Product created!");
    navigate("/products");
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <button onClick={() => navigate("/products")} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </button>

      <div className="card p-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-white">Add New Product</h1>
          <p className="text-white/40 text-sm mt-1">Fill in the details to add a new product</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Product Name</label>
            <input {...register("name")} className="input-field" placeholder="Enter product name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Price (₹)</label>
            <input {...register("price")} type="number" step="0.01" className="input-field" placeholder="0.00" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate("/products")} className="flex-1 btn-secondary py-3 text-center rounded-xl">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 btn-primary">
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}