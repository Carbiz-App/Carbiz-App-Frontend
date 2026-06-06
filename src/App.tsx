import Loader from "@/components/atoms/loader";
import { Suspense } from "react";
import { RouterProvider } from "react-router";
import router from "./routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <Loader size="size-12" />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
