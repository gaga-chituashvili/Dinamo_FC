"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { INITIAL_BLOGS } from "@/src/features/admin/api/blogs";

const STATUS_STYLES: Record<string, string> = {
  published: "bg-green-50 text-green-700",
  draft: "bg-gray-100 text-gray-500",
  review: "bg-yellow-50 text-yellow-700",
};

export function BlogsView() {
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [search, setSearch] = useState("");

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()),
  );

  const remove = (id: number) =>
    setBlogs((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Blogs</h1>
          <p className="text-sm text-gray-500">Manage and publish content</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700">
          <Plus size={15} /> New post
        </button>
      </div>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
      />

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-[11px] font-medium uppercase tracking-wide text-gray-400">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr
                key={b.id}
                className="border-b border-gray-100 last:border-none hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-800">
                  {b.title}
                </td>
                <td className="px-4 py-3 text-gray-500">{b.author}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    {b.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[b.status]}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => remove(b.id)}
                      className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-gray-400"
                >
                  No posts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
