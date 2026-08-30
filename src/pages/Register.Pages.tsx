import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/UseRegister.Hooks";


export function Register() {
  const {
    values,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setPhoneNumber,
    setAddress,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    isSubmitting,
    submitError,
    successMessage,
    handleSubmit,
  } = useRegister();
 
  return (


    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-6">
      <div className="w-full max-w-md rounded-[2.5rem] bg-white p-8 shadow-xl">
     

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Get Started Now
          </h1>
                <Link
            to="/login"
            className="flex items-center justify-center gap-1 text-sm font-semibold text-neutral-700 hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Already have an account? Log In
          </Link>
          <p className="mt-1 text-sm text-neutral-400">
            Create an account or log in to explore about our app
          </p>
        </div>
 
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          

 <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-neutral-700">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={values.name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
              className="h-12 rounded-full border-0 bg-neutral-50 px-5 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-lime-300"
            />
            {errors.name && <p className="px-2 text-xs text-red-500">{errors.name}</p>}
          </div>
 
 
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-neutral-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              className="h-12 rounded-full border-0 bg-neutral-50 px-5 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-lime-300"
            />
            {errors.email && <p className="px-2 text-xs text-red-500">{errors.email}</p>}
          </div>
 
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium text-neutral-700">
              Phone Number
            </label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={values.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              aria-invalid={!!errors.phoneNumber}
              className="h-12 rounded-full border-0 bg-neutral-50 px-5 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-lime-300"
            />
            {errors.phoneNumber && (
              <p className="px-2 text-xs text-red-500">{errors.phoneNumber}</p>
            )}
          </div>

           <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium text-neutral-700">
              Address
            </label>
            <Input
              id="address"
              type="text"
              placeholder="123 Training Blvd, Silicon Valley, CA"
              value={values.address}
              onChange={(e) => setAddress(e.target.value)}
              aria-invalid={!!errors.address}
              className="h-12 rounded-full border-0 bg-neutral-50 px-5 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-lime-300"
            />
            {errors.address && (
              <p className="px-2 text-xs text-red-500">{errors.address}</p>
            )}
          </div>
 
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-neutral-700">
              Set Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={values.password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                className="h-12 rounded-full border-0 bg-neutral-50 px-5 pr-12 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-lime-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="px-2 text-xs text-red-500">{errors.password}</p>
            )}
          </div>
 
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-700">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                value={values.confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-invalid={!!errors.confirmPassword}
                className="h-12 rounded-full border-0 bg-neutral-50 px-5 pr-12 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-lime-300"
              />
                            <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="px-2 text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

                    {successMessage && (
            <p className="text-center text-sm font-medium text-lime-600">
              {successMessage}
            </p>
          )}
 
          {submitError && (
            <p className="text-center text-sm text-red-500">{submitError}</p>
          )}
 
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-lime-300 text-base font-semibold text-neutral-900 shadow-none hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
}