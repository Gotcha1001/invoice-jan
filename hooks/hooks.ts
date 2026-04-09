// import { auth } from "@/auth";
// import { redirect } from "next/navigation";

// export async function requireUser() {
//   const session = await auth();

//   if (!session?.user) {
//     redirect("/login");
//   }

//   return session;
// }

// hooks/hooks.ts  (or wherever this file is)

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/db";

export async function requireUser() {
  const session = await auth();

  // No session at all → go to login
  if (!session?.user?.id) {
    redirect("/login");
  }

  // IMPORTANT: Check if the user still exists in the database
  const userExists = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true, // We only need to know if it exists
    },
  });

  // User was deleted → force proper sign out
  if (!userExists) {
    redirect("/api/auth/signout"); // This clears the session cookie properly
  }

  return session;
}

// export function formatCurrency(amount: number) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(amount);
// }
