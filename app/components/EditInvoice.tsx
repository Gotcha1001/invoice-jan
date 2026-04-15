/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { SubmitButton } from "./SubmitButtons";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/formatCurrency";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useActionState, useState } from "react";
import { createInvoice, editInvoice } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "@/utils/zodSchemas";
import { Prisma } from "@/lib/generated/prisma";
import { Calendar } from "@/components/ui/calendar";

interface iAppProps {
  data: Prisma.InvoiceGetPayload<{}>;
}

export function EditInvoice({ data }: iAppProps) {
  const [lastResult, action] = useActionState(editInvoice, undefined);
  const [rate, setRate] = useState(data.invoiceItemRate.toString());
  const [quantity, setQuantity] = useState(data.invoiceItemQuantity.toString());
  const [currency, setCurrency] = useState(data.currency);
  const [selectedState, setSelectedState] = useState(data.date);

  const calculateTotal = (Number(quantity) || 0) * (Number(rate) || 0);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Card className="w-full max-w-4xl mx-auto gradient-background2">
      <CardContent className="p-8">
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={fields.date.name}
            value={selectedState.toISOString()}
          />
          <input type="hidden" name="id" value={data.id} />
          <input
            type="hidden"
            name={fields.total.name}
            value={calculateTotal}
          />

          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
              <Badge variant={"secondary"}>Draft</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={data.invoiceName}
                className="text-white"
                placeholder="Test 123"
              />
            </div>
            <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <Label className="text-white">Invoice No.</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={data.invoiceNumber}
                  className="rounded-l-none text-white"
                  placeholder="5"
                />
              </div>
              <p className="text-sm text-red-500">
                {fields.invoiceNumber.errors}
              </p>
            </div>
            <div className="">
              <Label className="text-white">Currency</Label>
              <Select
                defaultValue={"USD"}
                name={fields.currency.name}
                key={fields.currency.key}
                onValueChange={(value) => setCurrency(value!)}
              >
                <SelectTrigger className="text-white">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent className="w-[330px]">
                  <SelectItem value="USD">
                    United States Dollar -- USD
                  </SelectItem>
                  <SelectItem value="EUR">Euro -- EUR</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.currency.errors}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <Label className="text-white">From</Label>
              <div className="space-y-2">
                <Input
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  className="text-white"
                  placeholder="Your Name"
                  defaultValue={data.fromName}
                />
                <p className="text-sm text-red-500">{fields.fromName.errors}</p>
                <Input
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  className="text-white"
                  placeholder="Your Email"
                  defaultValue={data.fromEmail}
                />
                <p className="text-sm text-red-500">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  className="text-white"
                  placeholder="Your Address"
                  defaultValue={data.fromAddress}
                />
                <p className="text-sm text-red-500">
                  {fields.fromAddress.errors}
                </p>
              </div>
            </div>
            <div>
              <Label className="text-white">To</Label>
              <div className="space-y-2">
                <Input
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={data.clientName}
                  className="text-white"
                  placeholder="Client Name"
                />
                <p className="text-sm text-red-500">
                  {fields.clientName.errors}
                </p>
                <Input
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={data.clientEmail}
                  className="text-white"
                  placeholder="Client Email"
                />
                <p className="text-sm text-red-500">
                  {fields.clientEmail.errors}
                </p>
                <Input
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={data.clientAddress}
                  className="text-white"
                  placeholder="Client Address"
                />
                <p className="text-sm text-red-500">
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <div>
                <Label className="text-white">Date</Label>
              </div>

              <Popover>
                <PopoverTrigger
                  render={
                    <Button variant={"outline"}>
                      <CalendarIcon className="size-4" />
                      {selectedState ? (
                        new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }).format(selectedState)
                      ) : (
                        <span>Pick A Date</span>
                      )}
                    </Button>
                  }
                ></PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedState}
                    mode="single"
                    onSelect={(date) => setSelectedState(date || new Date())}
                    hidden={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-red-500">{fields.date.errors}</p>
            </div>
            <div>
              <Label className="text-white">Invoice Due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={data.dueDate.toString()}
              >
                <SelectTrigger>
                  <SelectValue
                    className="text-white"
                    placeholder="Select Due Date"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Receipt</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium mt-4">
              <p className="col-span-6 text-white">Description</p>
              <p className="col-span-2 text-white">Quantity</p>
              <p className="text-white col-span-2">Rate</p>
              <p className="text-white col-span-2">Amount</p>
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea
                  name={fields.invoiceItemDescription.name}
                  key={fields.invoiceItemDescription.key}
                  defaultValue={data.invoiceItemDescription}
                  className="text-white"
                  placeholder="Item name & Description"
                />
                <p className="text-sm text-red-500">
                  {fields.invoiceItemDescription.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  name={fields.invoiceItemQuantity.name}
                  key={fields.invoiceItemQuantity.key}
                  className="text-white"
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <p className="text-sm text-red-500">
                  {fields.invoiceItemQuantity.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  name={fields.invoiceItemRate.name}
                  key={fields.invoiceItemRate.key}
                  className="text-white"
                  type="number"
                  placeholder="0"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <p className="text-sm text-red-500">
                  {fields.invoiceItemRate.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  className="text-white"
                  placeholder="0"
                  disabled
                  value={formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any,
                  })}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span className="text-white">Subtotal</span>
                <span className="text-white">
                  {formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any,
                  })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span className="text-white">Total ({currency})</span>
                <span className="text-white font-medium underline gradient-title underline-offset-4">
                  {formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any,
                  })}
                </span>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-white">Notes</Label>
            <Textarea
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={data.note ?? undefined}
              className="text-white"
              placeholder="Add Your Notes Right Here..."
            />
            <p className="text-sm text-red-500">{fields.note.errors}</p>
          </div>

          <div className="flex items-center justify-end mt-6">
            <div>
              <SubmitButton text="Update Invoice" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
