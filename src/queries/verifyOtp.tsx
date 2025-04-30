import { RESEND_OTP, VERIFY_OTP, VERIFY_RESET_OTP } from "@/api/auth";
import { useToast } from "@/hooks/Toast";
import { VerifyOtpSchemaType } from "@/schema/verifyotp.schema";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

interface otpResponse {
  verifyOtpMerchant: {
    businessName: string;
    email: string;
    isVerified: boolean;
    success?: boolean;
    message?: string;
  };
}

interface verifyResetOtpResponse {
  verifyResetOtpResponse: {
    success?: boolean;
    message?: string;
    payload?: string;
  };
}

interface resendOtpResponse {
  resendOtpMerchant: {
    success?: boolean;
    message?: string;
  };
}

export const useVerifyOtpMerchant = () => {
  const navigate = useNavigate();
  const { handleError, handleInfo, handleSuccess } = useToast();

  /* ------------------------VERIFY OTP HOOK----------------------------*/
  const [verifyOtpMerchant, { loading }] = useMutation<
    otpResponse,
    { input: VerifyOtpSchemaType }
  >(VERIFY_OTP, {
    onCompleted: (data) => {
      const result = data?.verifyOtpMerchant;
      if (!result) {
        handleError(
          new Error("No response received"),
          "Error in verifying OTP"
        );
        return;
      }
      if (!result.success) {
        handleInfo(
          "Invalid OTP",
          result.message || "OTP verification unsuccessful"
        );
        return;
      }

      // If success
      handleSuccess("OTP successfully verified", result.message);
      navigate("/congratulations");
    },
    onError: (error) => {
      // Handles GraphQL errors or network issues
      handleError(error, "OTP verification failed");
    },
  });

  /* ------------------------VERIFY RESET OTP HOOK----------------------------*/
  const [verifyResetPasswordOtpMerchant, { loading: verifyResetOtpLoading }] =
    useMutation<verifyResetOtpResponse, { input: VerifyOtpSchemaType }>(
      VERIFY_RESET_OTP,
      {
        onCompleted: (data) => {
          const result = data?.verifyResetOtpResponse;
          if (!result) {
            handleError(
              new Error("No response received"),
              "Error in verifying OTP"
            );
            return;
          }
          if (!result.success) {
            handleInfo(
              "Invalid OTP",
              result.message || "OTP verification unsuccessful"
            );
            return;
          }

          // If success
          handleSuccess("OTP successfully verified", result.message);
          navigate("/congratulations_");
        },
        onError: (error) => {
          // Handles GraphQL errors or network issues
          handleError(error, "OTP verification failed");
        },
      }
    );

  /* ------------------------RESEND OTP HOOK----------------------------*/
  const [resendOtpMerchant] = useMutation<
    resendOtpResponse,
    { input: { email: string } }
  >(RESEND_OTP, {
    onCompleted: (data) => {
      const result = data?.resendOtpMerchant;
      if (!result) {
        handleError(new Error("No response received"), "Error sending OTP");
        return;
      }
      if (!result.success) {
        handleInfo(result.message || "OTP verification unsuccessful");
        return;
      }
      // If success
      handleSuccess(result?.message?.toLocaleUpperCase() || "");
    },
    onError: (error) => {
      // Handles GraphQL errors or network issues
      handleError(error, "OTP request failed");
      console.log("Mutation Error:", error);
    },
  });

  return {
    verifyOtpMerchant,
    resendOtpMerchant,
    loading,
    verifyResetPasswordOtpMerchant,
    verifyResetOtpLoading,
  };
};
