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

export function InvoiceActions() {
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
            <Link href={""}>
              <PencilIcon className="size-4 mr-2" />
              Edit
            </Link>
          }
        />
        <DropdownMenuItem
          render={
            <Link href={""}>
              <DownloadCloudIcon className="size-4 mr-2" />
              Download
            </Link>
          }
        />
        <DropdownMenuItem
          render={
            <Link href={""}>
              <Mail className="size-4 mr-2" />
              Reminder Email
            </Link>
          }
        />
        <DropdownMenuItem
          render={
            <Link href={""}>
              <Trash className="size-4 mr-2" />
              Delete
            </Link>
          }
        />
        <DropdownMenuItem
          render={
            <Link href={""}>
              <CheckCircle className="size-4 mr-2" />
              Mark As Paid
            </Link>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
