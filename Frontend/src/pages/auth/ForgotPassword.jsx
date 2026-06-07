import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import AuthBanner from "../../components/auth/AuthBanner";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid lg:grid-cols-2 min-h-screen">
        <ForgotPasswordForm />
        <AuthBanner />
      </div>
    </div>
  );
};

export default ForgotPassword;