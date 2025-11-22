"use client";
import { AuthForm } from "@/components/AuthForm";
import { useState } from "react";
import { RegisterUserWithConfirmData } from "@/lib/auth.schema";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { AuthRoute } from "@/components/AuthRoute";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (data: RegisterUserWithConfirmData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // calling the api
      const { confirmPassword, ...userData } = data;
      const response = await api.post("auth/register", userData);
      setAuth(response.data.token,{
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      }); // save token in storage
      router.push("/dashboard");// Redirect on success

    } catch (err: Error | unknown | any) {
      console.log("error",err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthRoute>
      <div className="container min-h-screen mt-34 flex items-start justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
            <Card className="border-border mx-4 md:mx-0">
              <CardHeader className="space-y-3 text-center">
                 <div className="flex justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icons.logo className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Create  Account
                </CardTitle>
                <CardDescription>
                  Start tracking your calories today
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <AuthForm
                  mode="register"
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  error={error}
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                  <div className="flex justify-center text-sm items-center flex-col md:flex-row">
                    <p className="text-muted-foreground">Already have an account?</p>
                    <Button
                      variant="link"
                      onClick={() => router.push("/login")}
                      className="cursor-pointer"
                    >
                      Sign in
                    </Button>
                  </div>
              </CardFooter>
            </Card>
        </div>
      </div>
    </AuthRoute>
  )
}
