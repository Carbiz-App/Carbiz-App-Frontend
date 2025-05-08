import { LOGIN } from "@/api/auth";
import { useToast } from "@/hooks/Toast";
import { useAuthStore } from "@/store/auth.store";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

interface LoginResponseTypeMerchant {
  loginMerchant: {
    success: boolean;
    message: string;
    payload: {
      token: string;
      user: {
        businessName: string;
        email: string;
        onboadingActions: string;
        onboardingPercentage: GLfloat;
        onboardingStatus: string;
      };
    };
  };
}

interface loginType {
  email: string;
  password: string;
}

export const useLoginMerchant = () => {
  const navigate = useNavigate();
  const { handleError, handleInfo, handleSuccess } = useToast();
  const { setUser } = useAuthStore();

  const [loginMerchant, { loading }] = useMutation<
    LoginResponseTypeMerchant,
    { input: loginType }
  >(LOGIN, {
    onCompleted: (data) => {
      const result = data?.loginMerchant;
      if (!result) {
        handleError(new Error("Invalid"), "Error logging in");
        return;
      }
      if (!result.success) {
        handleInfo(result.message || "Login unsuccessful");
        return;
      }

      handleSuccess(result.message);
      navigate("/dashboard");
      localStorage.setItem("authToken", result.payload.token);
      setUser(result.payload.user);
    },
    onError: (error) => {
      handleError(error, "Login failed");
    },
  });

  return { loginMerchant, loading };
};
