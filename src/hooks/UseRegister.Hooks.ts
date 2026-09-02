import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/AuthConfig.Service";
import {
  validateRegisterForm,
  type RegisterFormErrors,
} from "../lib/Validators.Lib";


export function useRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    const values = {
      name,
      email,
      phoneNumber,
      address,
      password,
      confirmPassword,
    };

    const validationErrors = validateRegisterForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const responseOfRegister = await register({
        name: name.trim(),
        email,
        password,
        password_confirmation: confirmPassword,
        phone: phoneNumber,
        address,
      });

      const { user, auth } = responseOfRegister.data;

      localStorage.setItem("access_token", auth.access_token);
      localStorage.setItem("refresh_token", auth.refresh_token);
      localStorage.setItem("access_expires_at", auth.expires_at);
      localStorage.setItem("refresh_expires_at", auth.refresh_expires_at);
      localStorage.setItem("user", JSON.stringify(user));

      setSuccessMessage("Successful registration!");

      if (user) {
        navigate("/dashboard");
      }
    } catch (err) {
      const message =
        typeof err === "object" && err !== null && "message" in err
          ? String((err as { message?: string }).message)
          : "Registration failed.";

      setSubmitError(message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values: { name, email, password, confirmPassword, phoneNumber, address },
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
  };
}