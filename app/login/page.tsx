// app/login/page.tsx
import { LoginForm } from "./login-form";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { error } = await searchParams;
  return <LoginForm githubFailed={error === "github"} />;
};

export default LoginPage;
