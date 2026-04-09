import { InvoiceList } from "@/app/components/InvoiceList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function InvoicesRoute() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="">
            <CardTitle className="gradient-title text-3xl">Invoices</CardTitle>
            <CardDescription>Manage your invoices here...</CardDescription>
          </div>
          <Link
            href={"/dashboard/invoices/create"}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            <Plus className="h-4 w-4" /> Create Invoice
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <InvoiceList />
      </CardContent>
    </Card>
  );
}
