"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";

interface iAppProps {
  data: {
    date: string;
    amount: number;
  }[];
}

export function Graph({ data }: iAppProps) {
  return (
    <>
      <ChartContainer
        config={{
          amount: {
            label: "Amount",
            color: "#000000",
          },
        }}
        className="min-h-[300px] w-full"
      >
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 600]} />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#000000"
            strokeWidth={2}
            dot={{ r: 4, fill: "#000000" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
}
