'use client'

import { useRouter } from 'next/navigation';

const questions = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 }
];

export default function HomePage() {
  const router = useRouter();
  if (!router) {
    return <div className="container mx-auto">Router not mounted</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Questions</h1>
      <ul className="list-disc pl-5">
        {questions.map((question) => (
          <li key={question.id} className="mb-2">
            <a href={`/questions/${question.id}`} className="text-blue-500 hover:underline">
              Question {question.id} -{'>'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
