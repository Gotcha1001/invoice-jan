import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/db";
import { requireUser } from "@/hooks/hooks";
import { formatCurrency } from "@/utils/formatCurrency";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import MotionWrapperDelay from "./FramerMotion/MotionWrapperDelay";

async function getData(userId: string) {
  const [data, openInvoices, paidinvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
      },
      select: {
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PENDING",
      },
      select: {
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PAID",
      },
      select: {
        id: true,
      },
    }),
  ]);
  return {
    data,
    openInvoices,
    paidinvoices,
  };
}

export async function DashboardBlocks() {
  const session = await requireUser();
  const { data, openInvoices, paidinvoices } = await getData(
    session.user?.id as string,
  );
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
        <MotionWrapperDelay
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={{
            hidden: { opacity: 0, y: -100 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold">
                {formatCurrency({
                  amount: data.reduce((acc, invoice) => acc + invoice.total, 0),
                  currency: "USD",
                })}
              </h2>
              <p className="text-xs text-muted-foreground">
                Based on total volume
              </p>
            </CardContent>
          </Card>
        </MotionWrapperDelay>

        <MotionWrapperDelay
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          {" "}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Invoices Issued
              </CardTitle>
              <Users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold">+{data.length}</h2>
              <p className="text-xs text-muted-foreground">
                Total Invoices Issued!
              </p>
            </CardContent>
          </Card>
        </MotionWrapperDelay>

        <MotionWrapperDelay
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={{
            hidden: { opacity: 0, y: -100 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {" "}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Paid Invoices
              </CardTitle>
              <CreditCard className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold">+{paidinvoices.length}</h2>
              <p className="text-xs text-muted-foreground">
                Total Invoices Which Have Been Paid
              </p>
            </CardContent>
          </Card>
        </MotionWrapperDelay>

        <MotionWrapperDelay
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          {" "}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Invoices
              </CardTitle>
              <Activity className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold">+{openInvoices.length}</h2>
              <p className="text-xs text-muted-foreground">
                Invoices Which are currently pending!
              </p>
            </CardContent>
          </Card>
        </MotionWrapperDelay>
      </div>
    </>
  );
}
