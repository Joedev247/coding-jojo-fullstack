"use client";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

export default function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithToken } = useAuth();
  const processedRef = useRef(false);

  useEffect(() => {
    const processCallback = async () => {
      if (processedRef.current) return;
      processedRef.current = true;

      const token = searchParams.get("token");
      const provider = searchParams.get("provider");
      const error = searchParams.get("error");

      if (error) {
        const errorMessage = provider
          ? `${provider.charAt(0).toUpperCase() + provider.slice(1)} authentication failed`
          : "OAuth authentication failed";
        router.push(
          `/login?error=oauth_failed&provider=${provider}&message=${encodeURIComponent(errorMessage)}`
        );
        return;
      }

      if (token) {
        try {
          const result = await loginWithToken(token);
          if (result.success) {
            const welcomeMessage = provider
              ? `Welcome! You've successfully signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}.`
              : "Welcome! You've successfully signed in.";
            router.push(`/authenticated?message=${encodeURIComponent(welcomeMessage)}`);
          } else {
            router.push("/login?error=oauth_failed");
          }
        } catch (err) {
          router.push("/login?error=oauth_failed");
        }
      } else {
        router.push("/login?error=missing_token");
      }
    };
    processCallback();
  }, [searchParams, loginWithToken, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}
