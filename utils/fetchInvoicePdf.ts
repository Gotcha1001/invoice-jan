export async function fetchInvoicePdf(
  invoiceId: string,
): Promise<string | null> {
  try {
    const pdfResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/invoice/${invoiceId}`,
    );
    if (pdfResponse.ok) {
      const pdfBuffer = await pdfResponse.arrayBuffer();
      return Buffer.from(pdfBuffer).toString("base64");
    }
  } catch (error) {
    console.error("Failed to fetch PDF:", error);
  }
  return null;
}
