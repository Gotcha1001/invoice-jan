// import sgMail from "@sendgrid/mail";

// export async function sendInvoiceEmail({
//   to,
//   clientName,
//   fromName,
//   fromEmail,
//   invoiceNumber,
//   invoiceItemDescription,
//   total,
//   dueDate,
//   currency,
//   note,
//   pdfBase64,
// }: {
//   to: string;
//   clientName: string;
//   fromName: string;
//   fromEmail: string;
//   invoiceNumber: number;
//   invoiceItemDescription: string;
//   total: number;
//   dueDate: number;
//   currency: string;
//   note?: string | null;
//   pdfBase64?: string | null;
// }) {
//   await sgMail.send({
//     to,
//     from: process.env.SENDGRID_FROM_EMAIL!,
//     subject: `Invoice #${invoiceNumber} from ${fromName}`,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2>Hi ${clientName},</h2>
//         <p>You have received an invoice from <strong>${fromName}</strong>.</p>

//         <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
//           <tr style="background-color: #f4f4f4;">
//             <td style="padding: 10px; border: 1px solid #ddd;"><strong>Invoice #</strong></td>
//             <td style="padding: 10px; border: 1px solid #ddd;">${invoiceNumber}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #ddd;"><strong>Description</strong></td>
//             <td style="padding: 10px; border: 1px solid #ddd;">${invoiceItemDescription}</td>
//           </tr>
//           <tr style="background-color: #f4f4f4;">
//             <td style="padding: 10px; border: 1px solid #ddd;"><strong>Amount Due</strong></td>
//             <td style="padding: 10px; border: 1px solid #ddd;">${new Intl.NumberFormat("en-US", { style: "currency", currency }).format(total)}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #ddd;"><strong>Due In</strong></td>
//             <td style="padding: 10px; border: 1px solid #ddd;">Net ${dueDate}</td>
//           </tr>
//         </table>

//         ${note ? `<p><strong>Note:</strong> ${note}</p>` : ""}

//         <p style="color: #888; font-size: 12px; margin-top: 30px;">
//           This invoice was sent by ${fromName} (${fromEmail})
//         </p>
//       </div>
//     `,
//     ...(pdfBase64 && {
//       attachments: [
//         {
//           content: pdfBase64,
//           filename: `Invoice-${invoiceNumber}.pdf`,
//           type: "application/pdf",
//           disposition: "attachment",
//         },
//       ],
//     }),
//   });
// }

import sgMail from "@sendgrid/mail";

// Set API key here so this utility works regardless of where it's called from
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendInvoiceEmail({
  to,
  clientName,
  fromName,
  fromEmail,
  invoiceNumber,
  invoiceItemDescription,
  total,
  dueDate,
  currency,
  note,
  pdfBase64,
}: {
  to: string;
  clientName: string;
  fromName: string;
  fromEmail: string;
  invoiceNumber: number;
  invoiceItemDescription: string;
  total: number;
  dueDate: number;
  currency: string;
  note?: string | null;
  pdfBase64?: string | null;
}) {
  await sgMail.send({
    to,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: `Invoice #${invoiceNumber} from ${fromName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${clientName},</h2>
        <p>You have received an invoice from <strong>${fromName}</strong>.</p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f4f4f4;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Invoice #</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${invoiceNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Description</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${invoiceItemDescription}</td>
          </tr>
          <tr style="background-color: #f4f4f4;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Amount Due</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${new Intl.NumberFormat("en-US", { style: "currency", currency }).format(total)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Due In</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Net ${dueDate}</td>
          </tr>
        </table>

        ${note ? `<p><strong>Note:</strong> ${note}</p>` : ""}

        <p style="color: #888; font-size: 12px; margin-top: 30px;">
          This invoice was sent by ${fromName} (${fromEmail})
        </p>
      </div>
    `,
    ...(pdfBase64 && {
      attachments: [
        {
          content: pdfBase64,
          filename: `Invoice-${invoiceNumber}.pdf`,
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    }),
  });
}
