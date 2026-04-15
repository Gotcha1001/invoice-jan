import { DeleteInvoice } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/db";
import { requireUser } from "@/hooks/hooks";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return redirect("/dashboard/invoices");
  }
}

type Params = Promise<{ invoiceId: string }>;

export default async function DeleteInvoiceRoute({
  params,
}: {
  params: Params;
}) {
  const session = await requireUser();

  const { invoiceId } = await params;
  await Authorize(invoiceId, session.user?.id as string);
  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure that you want to delete this invoice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={"/warning.webp"}
            alt="Warning"
            height={250}
            width={250}
            className="rounded-lg"
          />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            className="rounded-lg p-3 bg-radial from-purple-500 to-indigo-900"
            href={"/dashboard/invoices"}
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await DeleteInvoice(invoiceId);
            }}
          >
            <SubmitButton text="Delete Invoice" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
