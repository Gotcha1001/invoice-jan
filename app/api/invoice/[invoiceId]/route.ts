// /* eslint-disable @typescript-eslint/no-explicit-any */
// import prisma from "@/db";
// import { NextResponse } from "next/server";
// import { jsPDF } from "jspdf";
// import { formatCurrency } from "@/utils/formatCurrency";

// export async function GET(
//   request: Request,
//   {
//     params,
//   }: {
//     params: Promise<{ invoiceId: string }>;
//   },
// ) {
//   const { invoiceId } = await params;

//   const data = await prisma.invoice.findUnique({
//     where: { id: invoiceId },
//     select: {
//       invoiceName: true,
//       invoiceNumber: true,
//       currency: true,
//       fromName: true,
//       fromEmail: true,
//       fromAddress: true,
//       clientName: true,
//       clientAddress: true,
//       clientEmail: true,
//       date: true,
//       dueDate: true,
//       invoiceItemDescription: true,
//       invoiceItemRate: true,
//       invoiceItemQuantity: true,
//       total: true,
//       note: true,
//     },
//   });

//   if (!data) {
//     return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//   }

//   const pdf = new jsPDF({
//     orientation: "portrait",
//     unit: "mm",
//     format: "a4",
//   });
//   pdf.setFont("helvetica");
//   pdf.setFontSize(24);
//   pdf.text(data.invoiceName, 20, 20);

//   // From Section
//   pdf.setFontSize(12);
//   pdf.text("From", 20, 40);
//   pdf.setFontSize(10);
//   pdf.text([data.fromName, data.fromEmail, data.fromAddress], 20, 45);

//   // Client section
//   pdf.setFontSize(12);
//   pdf.text("Bill to", 20, 70);
//   pdf.setFontSize(10);
//   pdf.text([data.clientName, data.clientEmail, data.clientAddress], 20, 75);

//   //Invoice details
//   pdf.setFontSize(12);
//   pdf.text(`Invoice Number: #${data.invoiceNumber}`, 120, 40);
//   pdf.text(
//     `Date: ${new Intl.DateTimeFormat("en-US", {
//       dateStyle: "long",
//     }).format(data.date)}`,
//     120,
//     45,
//   );

//   pdf.text(`Due Date: Net ${data.dueDate}`, 120, 50);

//   // Item table header
//   pdf.setFontSize(10);
//   pdf.setFont("helvetica", "bold");
//   pdf.text("Description", 20, 100);
//   pdf.text("Quantity", 100, 100);
//   pdf.text("Rate", 130, 100);
//   pdf.text("Total", 160, 100);

//   // draw header line
//   pdf.line(20, 102, 190, 102);

//   // Item Details
//   pdf.setFont("helvetica", "normal");
//   pdf.text(data.invoiceItemDescription, 20, 110);
//   pdf.text(data.invoiceItemQuantity.toString(), 100, 110);
//   pdf.text(
//     formatCurrency({
//       amount: data.invoiceItemRate,
//       currency: data.currency as any,
//     }),
//     130,
//     110,
//   );

//   pdf.text(
//     formatCurrency({ amount: data.total, currency: data.currency as any }),
//     160,
//     110,
//   );

//   // Total Section
//   pdf.line(20, 115, 190, 115);
//   pdf.setFont("helvetica", "bold");
//   pdf.text(`Total (${data.currency})`, 130, 130);
//   pdf.text(
//     formatCurrency({ amount: data.total, currency: data.currency as any }),
//     160,
//     130,
//   );

//   //Additional Note
//   if (data.note) {
//     pdf.setFont("helvetica", "normal");
//     pdf.setFontSize(10);
//     pdf.text("Note:", 20, 150);
//     pdf.text(data.note, 20, 155);
//   }

//   // generate pdf as buffer
//   const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

//   //return pdf as a downloadable file
//   return new NextResponse(pdfBuffer, {
//     headers: {
//       "Content-Type": "application/pdf",
//       "Content-Disposition": "inline",
//     },
//   });

//   return NextResponse.json(data);
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/db";
import { NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import { formatCurrency } from "@/utils/formatCurrency";

const PURPLE = [102, 51, 153] as const; // #663399
const BLACK = [0, 0, 0] as const;
const LIGHT_PURPLE = [230, 220, 245] as const;

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  },
) {
  const { invoiceId } = await params;

  const data = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    select: {
      invoiceName: true,
      invoiceNumber: true,
      currency: true,
      fromName: true,
      fromEmail: true,
      fromAddress: true,
      clientName: true,
      clientAddress: true,
      clientEmail: true,
      date: true,
      dueDate: true,
      invoiceItemDescription: true,
      invoiceItemRate: true,
      invoiceItemQuantity: true,
      total: true,
      note: true,
    },
  });

  if (!data) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // ── Page border ────────────────────────────────────────────────
  pdf.setDrawColor(...PURPLE);
  pdf.setLineWidth(1);
  pdf.rect(10, 10, 190, 277); // x, y, w, h

  pdf.setFont("helvetica");

  // ── Invoice title ──────────────────────────────────────────────
  pdf.setFontSize(24);
  pdf.setTextColor(...PURPLE);
  pdf.setFont("helvetica", "bold");
  pdf.text(data.invoiceName, 20, 25);

  // ── Divider under title ────────────────────────────────────────
  pdf.setDrawColor(...PURPLE);
  pdf.setLineWidth(0.5);
  pdf.line(20, 30, 190, 30);

  // ── From section ───────────────────────────────────────────────
  pdf.setFontSize(11);
  pdf.setTextColor(...PURPLE);
  pdf.setFont("helvetica", "bold");
  pdf.text("From", 20, 42);

  pdf.setFontSize(10);
  pdf.setTextColor(...BLACK);
  pdf.setFont("helvetica", "normal");
  pdf.text([data.fromName, data.fromEmail, data.fromAddress], 20, 48);

  // ── Bill To section ────────────────────────────────────────────
  pdf.setFontSize(11);
  pdf.setTextColor(...PURPLE);
  pdf.setFont("helvetica", "bold");
  pdf.text("Bill To", 20, 72);

  pdf.setFontSize(10);
  pdf.setTextColor(...BLACK);
  pdf.setFont("helvetica", "normal");
  pdf.text([data.clientName, data.clientEmail, data.clientAddress], 20, 78);

  // ── Invoice details (right column) ────────────────────────────
  pdf.setFontSize(10);

  pdf.setTextColor(...PURPLE);
  pdf.setFont("helvetica", "bold");
  pdf.text("Invoice Number:", 120, 42);
  pdf.setTextColor(...BLACK);
  pdf.setFont("helvetica", "normal");
  pdf.text(`#${data.invoiceNumber}`, 158, 42);

  pdf.setTextColor(...PURPLE);
  pdf.setFont("helvetica", "bold");
  pdf.text("Date:", 120, 49);
  pdf.setTextColor(...BLACK);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(data.date),
    135,
    49,
  );

  pdf.setTextColor(...PURPLE);
  pdf.setFont("helvetica", "bold");
  pdf.text("Due Date:", 120, 56);
  pdf.setTextColor(...BLACK);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Net ${data.dueDate}`, 143, 56);

  // ── Item table header (filled background) ──────────────────────
  pdf.setFillColor(...LIGHT_PURPLE);
  pdf.rect(20, 95, 170, 8, "F");

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...PURPLE);
  pdf.text("Description", 23, 101);
  pdf.text("Quantity", 103, 101);
  pdf.text("Rate", 133, 101);
  pdf.text("Total", 163, 101);

  // ── Item row ───────────────────────────────────────────────────
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...BLACK);
  pdf.text(data.invoiceItemDescription, 23, 112);
  pdf.text(data.invoiceItemQuantity.toString(), 103, 112);
  pdf.text(
    formatCurrency({
      amount: data.invoiceItemRate,
      currency: data.currency as any,
    }),
    133,
    112,
  );
  pdf.text(
    formatCurrency({ amount: data.total, currency: data.currency as any }),
    163,
    112,
  );

  // ── Subtotal divider ───────────────────────────────────────────
  pdf.setDrawColor(...PURPLE);
  pdf.setLineWidth(0.4);
  pdf.line(20, 117, 190, 117);

  // ── Total row ─────────────────────────────────────────────────
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...PURPLE);
  pdf.text(`Total (${data.currency})`, 133, 126);
  pdf.setTextColor(...BLACK);
  pdf.text(
    formatCurrency({ amount: data.total, currency: data.currency as any }),
    163,
    126,
  );

  // ── Note ───────────────────────────────────────────────────────
  if (data.note) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(...PURPLE);
    pdf.text("Note:", 20, 145);

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(...BLACK);
    pdf.text(data.note, 20, 151);
  }

  // ── Output ─────────────────────────────────────────────────────
  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
