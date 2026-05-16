"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

export default function DashboardChart({ data }: { data: any[] }) {
  return (
    <div className="h-[320px] w-full">
      {data.length === 0 ? (
        <div className="h-full flex items-center justify-center text-slate-400">
          Belum ada data produk
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={3}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}