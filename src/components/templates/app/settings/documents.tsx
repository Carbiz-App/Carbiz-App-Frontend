import { PROFILE_MERCHANT } from "@/api/dashboard";
import DocumentForm from "@/components/organisms/form/document.form";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@apollo/client";

const Documents = () => {
  const { user } = useAuthStore();
  const { data } = useQuery(PROFILE_MERCHANT, {
    fetchPolicy: "cache-and-network",
  });

  const profile = data?.profileMerchant?.payload;

  // isVerified = email/OTP verified (true after login).
  // isApproved = KYC/document review complete — only then lock uploads.
  const isDocumentsLocked = profile
    ? profile.isApproved === true
    : user?.isApproved === true;

  return <DocumentForm documentsLocked={!!isDocumentsLocked} />;
};

export default Documents;
