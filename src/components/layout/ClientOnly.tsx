"use client";

import { useIsMounted } from "@/hooks/useMounted";

interface ClientOnlyProps {
  children: React.ReactNode;
}

/**
 * ClientOnly wrapper guarantees that children are rendered ONLY on client side after hydration.
 * This completely eliminates hydration errors caused by browser extensions (like Bitdefender).
 */
export default function ClientOnly({ children }: ClientOnlyProps) {
  const mounted = useIsMounted();

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
