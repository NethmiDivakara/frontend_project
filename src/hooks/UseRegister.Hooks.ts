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

  const handleSubmit = async (e: React.FormEvent) => {
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
      await register({
        name: name.trim(),
        email,
        password,
        password_confirmation: confirmPassword,
        phone: phoneNumber,
        address,
      });
      setSuccessMessage("Successful registration!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
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