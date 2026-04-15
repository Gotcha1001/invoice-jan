// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   CheckCircle,
//   DownloadCloudIcon,
//   Mail,
//   MoreHorizontal,
//   PencilIcon,
//   Trash,
// } from "lucide-react";
// import Link from "next/link";

// interface iAppProps {
//   id: string;
// }

// export function InvoiceActions({ id }: iAppProps) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         render={
//           <Button size={"icon"} variant={"secondary"}>
//             <MoreHorizontal className="size-4" />
//           </Button>
//         }
//       />
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem
//           render={
//             <Link href={`/dashboard/invoices/${id}`}>
//               <PencilIcon className="size-4 mr-2" />
//               Edit
//             </Link>
//           }
//         />
//         <DropdownMenuItem
//           render={
//             <Link href={`/api/invoice/${id}`} target="_blank">
//               <DownloadCloudIcon className="size-4 mr-2" />
//               Download
//             </Link>
//           }
//         />
//         <DropdownMenuItem
//           render={
//             <Link href={""}>
//               <Mail className="size-4 mr-2" />
//               Reminder Email
//             </Link>
//           }
//         />
//         <DropdownMenuItem
//           render={
//             <Link href={""}>
//               <Trash className="size-4 mr-2" />
//               Delete
//             </Link>
//           }
//         />
//         <DropdownMenuItem
//           render={
//             <Link href={""}>
//               <CheckCircle className="size-4 mr-2" />
//               Mark As Paid
//             </Link>
//           }
//         />
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  DownloadCloudIcon,
  Mail,
  MoreHorizontal,
  PencilIcon,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { sendReminderEmail } from "../actions";

interface iAppProps {
  id: string;
  status: string;
}

export function InvoiceActions({ id, status }: iAppProps) {
  const [isPending, startTransition] = useTransition();

  function handleReminder() {
    console.log("[InvoiceActions] Reminder clicked for invoice:", id);

    startTransition(async () => {
      console.log(
        "[InvoiceActions] startTransition fired, calling sendReminderEmail...",
      );
      try {
        await sendReminderEmail(id);
        console.log("[InvoiceActions] sendReminderEmail resolved successfully");
        toast.success("Reminder email sent!");
      } catch (error) {
        console.error("[InvoiceActions] sendReminderEmail threw:", error);
        toast.error("Failed to send reminder.");
      }
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button size={"icon"} variant={"secondary"}>
            <MoreHorizontal className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          render={
            <Link href={`/dashboard/invoices/${id}`}>
              <PencilIcon className="size-4 mr-2" />
              Edit
            </Link>
          }
        />
        <DropdownMenuItem
          render={
            <Link href={`/api/invoice/${id}`} target="_blank">
              <DownloadCloudIcon className="size-4 mr-2" />
              Download
            </Link>
          }
        />

        <DropdownMenuItem onClick={handleReminder} disabled={isPending}>
          <Mail className="size-4 mr-2" />
          {isPending ? "Sending..." : "Reminder Email"}
        </DropdownMenuItem>

        <DropdownMenuItem
          render={
            <Link href={`/dashboard/invoices/${id}/delete`}>
              <Trash className="size-4 mr-2" />
              Delete
            </Link>
          }
        />
        {status !== "PAID" && (
          <DropdownMenuItem
            render={
              <Link href={`/dashboard/invoices/${id}/paid`}>
                <CheckCircle className="size-4 mr-2" />
                Mark As Paid
              </Link>
            }
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
