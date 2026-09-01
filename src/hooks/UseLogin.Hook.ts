import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/AuthConfig.Service";

export function useLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!email.trim() || !password) {
      setSubmitError("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await loginUser({ email, password });
      const { user, auth } = response.data;

      
      localStorage.setItem("access_token", auth.access_token);
      localStorage.setItem("refresh_token", auth.refresh_token);
      localStorage.setItem("user", JSON.stringify(user));


     if (user) {
        navigate("/dashboard");
     }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}