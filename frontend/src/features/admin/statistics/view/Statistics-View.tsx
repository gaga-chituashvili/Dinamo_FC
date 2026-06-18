// StatisticsView.tsx
import { Wrapper } from "@/src/components/shared/wrapper";
import { data } from "@/src/features/admin/api/blogs";

export function StatisticsView() {
  return (
    <Wrapper className="py-6">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Statistics</h1>
        <p className="text-sm text-gray-500">Overview of platform metrics</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {data.map((s) => (
          <div key={s.label} className="rounded-lg bg-gray-100 p-4">
            <p className="mb-1 text-xs text-gray-500">{s.label}</p>
            <p className="text-2xl font-medium text-gray-900">{s.value}</p>
            <p
              className={`mt-1 text-xs ${s.up ? "text-green-600" : "text-red-500"}`}
            >
              {s.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="mb-4 text-sm font-medium text-gray-800">
          Monthly visitors
        </p>
        <div className="flex h-32 items-end gap-2">
          {[55, 68, 72, 58, 80, 74, 90, 100].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-sm ${i === 7 ? "bg-gray-800" : "bg-gray-200"}`}
                style={{ height: `${h}%` }}
              />
              <span className="text-[10px] text-gray-400">
                {["N", "D", "J", "F", "M", "A", "M", "J"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
