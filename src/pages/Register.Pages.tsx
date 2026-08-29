import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";


type FormErrors = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}>;

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
 
  const hasNoNumbers = (value: string) => !/\d/.test(value);
  const isExactlyTenDigits = (value: string) => /^\d{10}$/.test(value);
 
  const validate = (): FormErrors => {
    const next: FormErrors = {};
 
    if (!firstName.trim()) {
      next.firstName = "First name is required.";
    } else if (!hasNoNumbers(firstName)) {
      next.firstName = "First name cannot contain numbers.";
    }
 
    if (!lastName.trim()) {
      next.lastName = "Last name is required.";
    } else if (!hasNoNumbers(lastName)) {
      next.lastName = "Last name cannot contain numbers.";
    }
 
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
 
    if (!dob) {
      next.dob = "Birthday is required.";
    }
 
    if (!phoneNumber.trim()) {
      next.phoneNumber = "Phone number is required.";
    } else if (!isExactlyTenDigits(phoneNumber)) {
      next.phoneNumber = "Phone number must be exactly 10 digits.";
    }
 
    if (!password) {
      next.password = "Password is required.";
    } else if (password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }
 
    if (!confirmPassword) {
      next.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      next.confirmPassword = "Passwords do not match.";
    }
 
    return next;
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
 
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
 
    console.log({ firstName, lastName, email, password, dob, phoneNumber });
  };
 
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
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-neutral-700">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                aria-invalid={!!errors.firstName}
                className="h-12 rounded-full border-0 bg-neutral-50 px-5 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-lime-300"
              />
              {errors.firstName && (
                <p className="px-2 text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-neutral-700">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                aria-invalid={!!errors.lastName}
                className="h-12 rounded-full border-0 bg-neutral-50 px-5 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-lime-300"
              />
              {errors.lastName && (
                <p className="px-2 text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>
 
          <div className="space-y-2">
            <label htmlFor="birthday" className="text-sm font-medium text-neutral-700">
              Birthday
            </label>
            <div className="relative">
              <Input
                id="birthday"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                aria-invalid={!!errors.dob}
                className="h-12 rounded-full border-0 bg-neutral-50 px-5 pr-12 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-lime-300"
              />
              
            </div>
            {errors.dob && <p className="px-2 text-xs text-red-500">{errors.dob}</p>}
          </div>
 
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-neutral-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
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
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              aria-invalid={!!errors.phoneNumber}
              className="h-12 rounded-full border-0 bg-neutral-50 px-5 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-lime-300"
            />
            {errors.phoneNumber && (
              <p className="px-2 text-xs text-red-500">{errors.phoneNumber}</p>
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
                value={password}
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
                value={confirmPassword}
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
 
          <Button
            type="submit"
            className="h-12 w-full rounded-full bg-lime-300 text-base font-semibold text-neutral-900 shadow-none hover:bg-lime-400"
          >
            Sign Up
          </Button>
 
       

        </form>
      </div>
    </div>
  );
}
 