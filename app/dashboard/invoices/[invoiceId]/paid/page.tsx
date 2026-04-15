import { MarkAsPaidAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button, buttonVariants } from "@/components/ui/button";
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
      userId: userId,
      id: invoiceId,
    },
  });
  if (!data) {
    return redirect("/dashboard/invoices");
  }
}

type Params = Promise<{ invoiceId: string }>;

export default async function MarkAsPaid({ params }: { params: Params }) {
  const { invoiceId } = await params;
  const session = await requireUser();
  await Authorize(invoiceId, session.user?.id as string);
  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Mark As Paid</CardTitle>
          <CardDescription>
            Are You Sure You Want To Mark This Invoice As PAid?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={"/paid.webp"}
            alt="Paid"
            height={300}
            width={300}
            className="rounded-lg"
          />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button variant={"outline"}>
            <Link prefetch href={"/dashboard/invoices"}>
              Cancel
            </Link>
          </Button>
          <form
            action={async () => {
              "use server";
              await MarkAsPaidAction(invoiceId);
            }}
          >
            <SubmitButton text="Mark As Paid" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
