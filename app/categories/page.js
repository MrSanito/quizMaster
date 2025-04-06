import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

// 📝 Fetch categories from API
async function getCategories() {
  try {
    // ✅ Use relative path for internal API
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/categories`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch categories, status: ${res.status}`);
    }

    const categories = await res.json();
    console.log("✅ Fetched Categories:", categories);
    return categories;
  } catch (error) {
    console.error("❌ Error fetching categories:", error.message);
    return [];
  }
}

// 🎯 Main Categories Page
export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Play by Category</h1>

      {/* ✅ No categories available fallback */}
      {categories.length === 0 ? (
        <p className="text-white">No categories available.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/quizzes/${category._id}`}
              className="flex items-center justify-between w-full sm:w-[280px] bg-gray-800 p-4 rounded-lg shadow-lg text-white hover:bg-gray-700 hover:scale-105 transition-all"
            >
              <div className="flex items-center space-x-4">
                {/* 📚 Category Icon with fallback */}
                <span className="text-3xl">{category.icon || "📚"}</span>

                <div>
                  <p className="text-lg font-semibold">{category.name}</p>
                  <p className="text-sm text-gray-400">
                    {category.quizzes?.length || 0} quizzes
                  </p>
                </div>
              </div>
              <ArrowRightIcon className="w-6 h-6 text-white ml-4" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
