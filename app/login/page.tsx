// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { auth, signIn } from "@/auth";
// import { SubmitButton } from "../components/SubmitButtons";
// import { redirect } from "next/navigation";
// import { isRedirectError } from "next/dist/client/components/redirect-error";

// export default async function Login({
//   searchParams,
// }: {
//   searchParams: Promise<{ sent?: string }>;
// }) {
//   const session = await auth();
//   if (session?.user) redirect("/dashboard");

//   const { sent } = await searchParams;

//   return (
//     <div className="flex h-screen w-full items-center justify-center px-4">
//       <Card className="w-[350px]">
//         <CardHeader>
//           <CardTitle className="text-2xl">Login</CardTitle>
//           <CardDescription>
//             Enter Your Email Below To Login Into Your Account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {sent ? (
//             <div className="rounded-md bg-green-50 border border-green-200 p-4 text-sm text-green-800 text-center">
//               ✅ Check your email for a magic link to sign in.
//             </div>
//           ) : (
//             <form
//               action={async (formData) => {
//                 "use server";
//                 try {
//                   await signIn("nodemailer", {
//                     email: formData.get("email"),
//                     redirectTo: "/dashboard",
//                   });
//                 } catch (error) {
//                   if (isRedirectError(error)) throw error;
//                   console.error("Sign in error:", error);
//                 }
//                 redirect("/login?sent=true");
//               }}
//               className="flex flex-col gap-y-4"
//             >
//               <div className="flex flex-col gap-y-2">
//                 <Label>Email</Label>
//                 <Input
//                   name="email"
//                   type="email"
//                   required
//                   placeholder="Welcome@Again.com"
//                 />
//               </div>
//               <SubmitButton text="Login" />
//             </form>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "@/auth";
import { SubmitButton } from "../components/SubmitButtons";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default async function Login() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter Your Email Below To Login Into Your Account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData) => {
                "use server";
                try {
                  await signIn("credentials", {
                    email: formData.get("email"),
                    redirectTo: "/dashboard",
                  });
                } catch (error) {
                  if (isRedirectError(error)) throw error;
                  console.error("Sign in error:", error);
                }
              }}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Welcome@Again.com"
                />
              </div>
              <SubmitButton text="Login" />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
