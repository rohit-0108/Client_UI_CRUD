import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/productService";
import toast from "react-hot-toast";
import type { ProductRequest } from "../../types";

type FormValues = { name: string; price: number };

export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<FormValues>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getProductById(Number(id)).then((res) => {
        setValue("name", res.data.name);
        setValue("price", res.data.price);
      });
    }
  }, [id]);

  const onSubmit = async (data: FormValues): Promise<void> => {
    const payload: ProductRequest = { id: Number(id), name: data.name, price: parseFloat(String(data.price)) };
    await updateProduct(payload);
    toast.success("Product updated!");
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
          <h1 className="font-display text-2xl font-bold text-white">Edit Product</h1>
          <p className="text-white/40 text-sm mt-1">Update the details for product #{id}</p>
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}