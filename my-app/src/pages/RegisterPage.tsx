import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { register as registerUser } from "../services/authService";
import toast from "react-hot-toast";
import type { RegisterRequest } from "../types";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterRequest>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterRequest): Promise<void> => {
    try {
      await registerUser({ ...data, id: 0 });
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch {
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-indigo-800/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="card w-full max-w-md p-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/30 mb-4">
            <svg className="w-7 h-7 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-1">Create account</h1>
          <p className="text-white/40 text-sm">Fill in your details to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">First Name</label>
              <input
                {...register("firstName", { required: "First name is required" })}
                className={`input-field ${errors.firstName ? "border-red-500/50 focus:ring-red-500" : ""}`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs mt-1.5">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Last Name</label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                className={`input-field ${errors.lastName ? "border-red-500/50 focus:ring-red-500" : ""}`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs mt-1.5">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Username</label>
            <input
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
              className={`input-field ${errors.username ? "border-red-500/50 focus:ring-red-500" : ""}`}
              placeholder="johndoe"
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-1.5">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              type="password"
              className={`input-field ${errors.password ? "border-red-500/50 focus:ring-red-500" : ""}`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              type="password"
              className={`input-field ${errors.confirmPassword ? "border-red-500/50 focus:ring-red-500" : ""}`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1.5">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Role</label>
            <input
              {...register("role", { required: "Role is required" })}
              className={`input-field ${errors.role ? "border-red-500/50 focus:ring-red-500" : ""}`}
              placeholder='e.g. "User" or "Admin"'
            />
            {errors.role && (
              <p className="text-red-400 text-xs mt-1.5">{errors.role.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </div>
        </form>

        <p className="text-center text-white/40 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}