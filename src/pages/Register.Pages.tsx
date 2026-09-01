import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import {Label} from "../components/ui/label";
import { useRegister } from "../hooks/UseRegister.Hooks";
import backgroundImg from "@/assets/background.jpg";
import sidePanelImg from "@/assets/sidepic.jpg";


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
   <div className="relative flex min-h-screen w-full items-center justify-center p-5">
      <img
        src={backgroundImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
<div className="grid w-full max-w-6xl overflow-hidden rounded-[2.5rem] shadow-xl md:grid-cols-2">
        <div className="flex flex-col justify-center bg-[#5b4a9a]/60 p-7 backdrop-blur-md md:p-12">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-100">
              Get Started Now
            </h1>

          </div>
 
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          
<div className="grid grid-cols-2 gap-4 ">
 <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-neutral-200">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={values.name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
              className="h-12 rounded-full border-0 bg-white px-5 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-sky-400"
            />
            {errors.name && <p className="px-2 text-xs text-red-500">{errors.name}</p>}
          </div>
                    <div className="space-y-1.5">
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-neutral-200">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={values.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              aria-invalid={!!errors.phoneNumber}
              className="h-12 rounded-full border-0 bg-white px-4 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-sky-400"
            />
            {errors.phoneNumber && (
              <p className="px-2 text-xs text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          </div>
 
 
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-neutral-200 ">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              className="h-12 rounded-full border-0 bg-white px-5 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-sky-400"
            />
            {errors.email && <p className="px-2 text-xs text-red-500">{errors.email}</p>}
          </div>
           
 


           <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-neutral-200">
              Address
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter your address"
              value={values.address}
              onChange={(e) => setAddress(e.target.value)}
              aria-invalid={!!errors.address}
              className="h-12 rounded-full border-0 bg-white px-5 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-sky-400"
            />
            {errors.address && (
              <p className="px-2 text-xs text-red-500">{errors.address}</p>
            )}
          </div>
 
          <div className="space-y-2">
             <Label htmlFor="password" className="text-sm font-medium text-neutral-200">
              Set Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={values.password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                className="h-12 rounded-full border-0 bg-white px-5 pr-12 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-sky-400"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-2 my-auto h-8 w-8 text-neutral-400 hover:bg-transparent hover:text-neutral-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
             </div>
            {errors.password && (
              <p className="px-2 text-xs text-red-500">{errors.password}</p>
            )}
          </div>
 
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-200">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                value={values.confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-invalid={!!errors.confirmPassword}
                className="h-12 rounded-full border-0 bg-white px-5 pr-12 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-sky-400"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute inset-y-0 right-2 my-auto h-8 w-8 text-neutral-400 hover:bg-transparent hover:text-neutral-600"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
{showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="px-2 text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {successMessage && (
              <p className="text-center text-sm font-medium text-green-400">
                {successMessage}
              </p>
            )}

            {submitError && (
              <p className="text-center text-sm text-red-500">{submitError}</p>
            )}

 
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-base font-semibold text-neutral-900 shadow-none hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
                                <p className="text-center text-sm text-neutral-300">
            Already have an account? {" "}
            <Link to="/login" className="font-semibold text-neutral-100 hover:underline">
              <u>Login</u>
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