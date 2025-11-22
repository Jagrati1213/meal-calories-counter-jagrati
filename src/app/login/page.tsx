"use client";
import { AuthForm } from "@/components/AuthForm";
import { useState } from "react";
import { LoginUserData } from "@/lib/auth.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import api from "@/lib/api";
import { AuthRoute } from "@/components/AuthRoute";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (data: LoginUserData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const currentAuth = useAuthStore.getState(); // get current auth state

      const response = await api.post("auth/login", data);// Calling the api
      // Checking the logged in user
      const loggedInEmail = data.email;
      const storedUser = currentAuth.user;
      // Only use stored user data if the email matches
      const userData = (storedUser?.email === loggedInEmail) 
      ? storedUser
      : { 
          email: loggedInEmail,
          firstName: '',
          lastName: ''
        };
    
      setAuth(response.data.token, userData); //store token
      router.push('/dashboard'); // redirect to dashboard
      
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Login failed. Please check your credentials.');
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
                  Welcome  Back
                </CardTitle>
                <CardDescription>Sign in to continue tracking</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <AuthForm
                  mode="login"
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  error={error}
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                  <div className="flex justify-center text-sm items-center flex-col md:flex-row">
                    <p className="text-muted-foreground"> Don't have an account?</p>
                    <Button
                      variant="link"
                      onClick={() => router.push("/register")}
                      className="cursor-pointer"
                    >
                      Sign up
                    </Button>
                  </div>
              </CardFooter>
            </Card>
        </div>
      </div>
    </AuthRoute>
  );
}
