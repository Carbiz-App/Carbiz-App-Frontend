import { RESET_PASSWORD } from "@/api/auth";
import { useToast } from "@/hooks/Toast";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

interface resetPasswordInput {
  email: string;
  password: string;
  confirmPassword: string;
}

interface resetPasswordMerchant {
  resetPasswordMerchant: {
    payload: boolean;
    message: string;
    success: boolean;
  };
}

export const useResetPassword = () => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const navigate = useNavigate();
  const [resetPasswordMerchant, { loading }] = useMutation<
    resetPasswordMerchant,
    { input: resetPasswordInput }
  >(RESET_PASSWORD, {
    onCompleted: (data) => {
      const result = data?.resetPasswordMerchant;

      if (!result) {
        handleError(new Error("No response received"), "Reset password failed");
        return;
      }

      if (!result.success) {
        handleInfo("Reset Password", result.message || "Reset unsuccessful");
        return;
      }

      // If success
      handleSuccess("Reset Password successful", result.message);
      navigate("/reset-otp");
    },

    onError: (error) => {
      // Handles GraphQL errors or network issues
      handleError(error, "Reset Password failed");
      console.log("Mutation Error:", error);
    },
  });

  return { resetPasswordMerchant, loading };
};
