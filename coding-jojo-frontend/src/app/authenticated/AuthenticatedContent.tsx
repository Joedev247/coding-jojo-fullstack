"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import AuthenticatedHomepage from "../../components/sections/AuthenticatedHomepage";

export default function AuthenticatedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  return <AuthenticatedHomepage searchParams={searchParams} router={router} />;
}
