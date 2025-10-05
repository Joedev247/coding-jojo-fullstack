import { Suspense } from "react";
import AuthenticatedContent from "./AuthenticatedContent";

export default function AuthenticatedHomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthenticatedContent />
    </Suspense>
  );
}
