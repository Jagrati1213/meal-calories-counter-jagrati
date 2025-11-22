"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthFormProps } from "@/types/authForn";
import { useForm } from "react-hook-form";
import { loginSchema, LoginUserData, RegisterUserWithConfirmData, registerUserWithConfirmSchema } from "@/lib/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { toast } from "sonner";
import { FormError } from "./ui/form-error";

export function AuthForm({ mode, onSubmit, isSubmitting = false, error: formError}: AuthFormProps) {
  const isRegister = mode === 'register';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserData | RegisterUserWithConfirmData>({
    resolver: zodResolver(isRegister ? registerUserWithConfirmSchema : loginSchema),
  }) as any;

  if(formError) toast.error(formError, {dismissible: true});

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* First Name & Last Name (only for register) */}
      {isRegister && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register('firstName')}
              disabled={isSubmitting}
              className={errors.firstName ? "border-destructive" : ""}
            />
            <FormError message={errors.firstName?.message} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register('lastName')}
              disabled={isSubmitting}
              className={errors.lastName ? "border-destructive" : ""}
            />
            <FormError message={errors.lastName?.message} />
          </div>
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          disabled={isSubmitting}
          className={errors.email ? "border-destructive" : ""}
        />
        <FormError message={errors.email?.message} />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            disabled={isSubmitting}
            className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="h-4 w-4 text-muted-foreground" />
            ) : (
              <FaEye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        <FormError message={errors.password?.message} />
      </div>

      {/* Confirm Password (only for register) */}
      {isRegister && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              disabled={isSubmitting}
              className={`pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="h-4 w-4 text-muted-foreground" />
              ) : (
                <FaEye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          <FormError message={errors.confirmPassword?.message} />
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer"
      >
        {isSubmitting && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        {isSubmitting
          ? 'Processing...'
          : isRegister
          ? 'Create Account'
          : 'Sign In'}
      </Button>
    </form>
  );
}