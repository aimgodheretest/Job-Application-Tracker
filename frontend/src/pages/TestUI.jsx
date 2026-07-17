import AuthLayout from "../layouts/AuthLayout";
import Card from "../components/ui/Card";
import AuthHeader from "../components/auth/AuthHeader";

export default function TestUI() {
  return (
    <AuthLayout>
      <Card>
        <AuthHeader />
      </Card>
    </AuthLayout>
  );
}
