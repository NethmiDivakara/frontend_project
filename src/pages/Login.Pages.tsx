import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/UseLogin.Hook";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import backgroundImg from "@/assets/background.jpg";
import sidePanelImg from "@/assets/sidepic.jpg";

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
      <div className="relative flex min-h-screen w-full items-center justify-center p-6">
     
      <img
        src={backgroundImg}
        alt="background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="grid w-full max-w-4xl overflow-hidden rounded-[2.5rem] shadow-xl md:grid-cols-2">
      
  <div className="flex flex-col justify-center bg-[#5b4a9a]/60 p-8 backdrop-blur-md md:p-12">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-neutral-100">Login</h1>
            <p className="text-sm text-neutral-300">Welcome back! Please enter your details to continue</p>
          </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
             <Label htmlFor="email" className="text-sm font-medium text-neutral-200">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-100 px-4 py-2  focus:border-blue-500 focus:outline-none bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-neutral-200">
              Password *
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-4 py-2 pr-10 text-neutral-900 focus:border-blue-500 focus:outline-none bg-white"
              />
           
        <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-2 my-auto h-8 w-8 text-neutral-400 hover:bg-transparent hover:text-neutral-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
                       <Label htmlFor="rememberMe" className="flex items-center gap-2 text-sm text-neutral-300">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="h-4 w-4 rounded-[4px] border-neutral-100 data-[state=checked]:bg-lime-300 data-[state=checked]:border-lime-300 data-[state=checked]:text-neutral-300"
              />
              Remember me
            </Label>
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-sm text-neutral-300 hover:text-neutral-600"
            >
              Forgot password?
            </Button>
          </div>

                  {submitError && (
            <p className="text-center text-sm text-red-500">{submitError}</p>
          )}
 
         <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-base font-semibold text-neutral-900 shadow-none hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting 
            ? "Logging In..."
             : "Log In"}
          </Button>

                    <p className="text-center text-sm text-neutral-300">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-neutral-100 hover:underline">
              <u>Register</u>
            </Link>
          </p>
          

        </form>
        </div>     
 <div className="relative hidden md:block">
  <img
    src={sidePanelImg}
    alt="side image" 
    className="absolute inset-0 h-full w-full object-cover"
  />
</div>
      </div>
    </div>
  );
}