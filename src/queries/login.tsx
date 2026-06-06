import { LOGIN } from "@/api/auth";
import { useToast } from "@/hooks/Toast";
import { apolloClient } from "@/lib/apollo-client";
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
        businessLicense: string;
        CAC: string;
        taxID: string;
        validIDcard: string;
        businessPics: string;
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
    onCompleted: async (data) => {
      const result = data?.loginMerchant;
      if (!result) {
        handleError(new Error("Invalid"), "Error logging in");
        return;
      }
      if (!result.success) {
        handleInfo(result.message || "Login unsuccessful");
        return;
      }

      await apolloClient.clearStore();
      sessionStorage.setItem("authToken", result.payload.token);
      setUser(result?.payload?.user);
      handleSuccess(result.message);
      navigate("/dashboard");
    },
    onError: (error) => {
      handleError(error, "Login failed");
    },
  });

  return { loginMerchant, loading };
};
