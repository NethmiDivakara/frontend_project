import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/Uselogin.Hooks";

export function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    showPassword,
    setShowPassword,
    isSubmitting,
    submitError,
    handleSubmit,
  } = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-6">
      <div className="w-full max-w-sm rounded-[2.5rem] bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Login</h1>
         
          <p className="text-neutral-500 p-2 ">Please enter your details.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-4 py-2 pr-10 text-neutral-900 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-neutral-500">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="h-4 w-4 rounded-[4px] border-neutral-300 data-[state=checked]:bg-lime-300 data-[state=checked]:border-lime-300 data-[state=checked]:text-neutral-900"
              />
              Remember me
            </label>
            <button type="button" className="text-sm text-neutral-400 hover:text-neutral-600">
              Forgot password?
            </button>
          </div>

                  {submitError && (
            <p className="text-center text-sm text-red-500">{submitError}</p>
          )}
 
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-lime-300 text-base font-semibold text-neutral-900 shadow-none hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </Button>

                    <p className="text-center text-sm text-neutral-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-neutral-900 hover:underline">
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}