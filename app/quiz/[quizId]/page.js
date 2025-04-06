import connectToDatabase from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import ClientQuizPlayer from "./ClientQuizPlayer";

export default async function QuizPage({ params }) {
  await connectToDatabase();
  const { quizId } = params;

  console.log("📌 Fetching quiz for quiz ID:", quizId);

  try {
    const quiz = await Quiz.findById(quizId).lean();

    if (!quiz) {
      console.warn("⚠️ No quiz found with ID:", quizId);
      return <p className="text-white">⚠️ Quiz not found.</p>;
    }

    console.log("✅ Fetched Quiz:", quiz);

    return <ClientQuizPlayer quiz={quiz} />;
  } catch (error) {
    console.error("❌ Error fetching quiz:", error);
    return <p className="text-red-500">Something went wrong 😓</p>;
  }
}
