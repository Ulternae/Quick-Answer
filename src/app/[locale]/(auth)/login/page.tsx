import { LoginForm } from "@/features/auth/components/login-form";
interface LoginPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return <LoginForm error={error} />;
}
