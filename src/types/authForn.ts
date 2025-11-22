import { LoginUserData, RegisterUserWithConfirmData } from "@/lib/auth.schema";

type AuthFormData = 
  | { mode: 'login'; onSubmit: (data: LoginUserData) => void }
  | { mode: 'register'; onSubmit: (data: RegisterUserWithConfirmData) => void };

export type AuthFormProps = AuthFormData & {
  isSubmitting?: boolean;
  error?: string | null;
};

// User type
export interface User {
  email: string;
  firstName: string;
  lastName: string;
}