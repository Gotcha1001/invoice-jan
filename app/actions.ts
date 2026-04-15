/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/db";
import { requireUser } from "@/hooks/hooks";
import { invoiceSchema, onBoardingSchema } from "@/utils/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { sendInvoiceEmail } from "@/utils/sendInvoiceEmail";
import { fetchInvoicePdf } from "@/utils/fetchInvoicePdf";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, { schema: onBoardingSchema });

  if (submission.status !== "success") return submission.reply();

  await prisma.user.update({
    where: { id: session.user?.id },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
}

export async function createInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, { schema: invoiceSchema });

  if (submission.status !== "success") return submission.reply();

  const data = await prisma.invoice.create({
    data: {
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      clientName: submission.value.clientName,
      clientEmail: submission.value.clientEmail,
      clientAddress: submission.value.clientAddress,
      currency: submission.value.currency,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId: session.user?.id,
    },
  });

  const pdfBase64 = await fetchInvoicePdf(data.id);

  try {
    await sendInvoiceEmail({
      to: data.clientEmail,
      clientName: data.clientName,
      fromName: data.fromName,
      fromEmail: data.fromEmail,
      invoiceNumber: data.invoiceNumber,
      invoiceItemDescription: data.invoiceItemDescription,
      total: data.total,
      dueDate: data.dueDate,
      currency: data.currency,
      note: data.note,
      pdfBase64,
    });
  } catch (emailError: any) {
    console.error(
      "Failed to send invoice email:",
      emailError?.response?.body ?? emailError,
    );
  }

  return redirect("/dashboard/invoices");
}

export async function editInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, { schema: invoiceSchema });

  if (submission.status !== "success") return submission.reply();

  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      clientName: submission.value.clientName,
      clientEmail: submission.value.clientEmail,
      clientAddress: submission.value.clientAddress,
      currency: submission.value.currency,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
    },
  });

  const pdfBase64 = await fetchInvoicePdf(data.id);

  try {
    await sendInvoiceEmail({
      to: data.clientEmail,
      clientName: data.clientName,
      fromName: data.fromName,
      fromEmail: data.fromEmail,
      invoiceNumber: data.invoiceNumber,
      invoiceItemDescription: data.invoiceItemDescription,
      total: data.total,
      dueDate: data.dueDate,
      currency: data.currency,
      note: data.note,
      pdfBase64,
    });
  } catch (emailError: any) {
    console.error(
      "Failed to send updated invoice email:",
      emailError?.response?.body ?? emailError,
    );
  }

  return redirect("/dashboard/invoices");
}

export async function sendReminderEmail(invoiceId: string) {
  const session = await requireUser();
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId, userId: session.user?.id },
  });
  if (!invoice) throw new Error("Invoice not found");

  const pdfBase64 = await fetchInvoicePdf(invoiceId);

  try {
    await sendInvoiceEmail({
      to: invoice.clientEmail,
      clientName: invoice.clientName,
      fromName: invoice.fromName,
      fromEmail: invoice.fromEmail,
      invoiceNumber: invoice.invoiceNumber, // make sure this is a number
      invoiceItemDescription: invoice.invoiceItemDescription,
      total: invoice.total,
      dueDate: invoice.dueDate,
      currency: invoice.currency,
      note: invoice.note,
      pdfBase64,
    });
  } catch (error: any) {
    console.error("Reminder email failed:", error?.response?.body ?? error);
    throw error; // re-throw so the UI toast.error fires
  }
}

export async function DeleteInvoice(invoiceId: string) {
  const session = await requireUser();
  const data = await prisma.invoice.delete({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
  });

  return redirect("/dashboard/invoices");
}

export async function MarkAsPaidAction(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.update({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
    data: {
      status: "PAID",
    },
  });
  return redirect("/dashboard/invoices");
}
