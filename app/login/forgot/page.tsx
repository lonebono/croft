// app/login/forgot/page.tsx
import { ForgotForm } from "./forgot-form";

type ForgotPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const ForgotPage = async ({ searchParams }: ForgotPageProps) => {
  const { error } = await searchParams;
  return <ForgotForm linkExpired={error === "expired"} />;
};

export default ForgotPage;
