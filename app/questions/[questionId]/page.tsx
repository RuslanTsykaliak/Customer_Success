'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const totalQuestions = 8; // Update this to the actual number of questions

export default function QuestionPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const router = useRouter();
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/questions/${questionId}`, { method: 'GET' });
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.statusText}`);
        }
        const data = await response.json();
        setQuestion(data.question);
        setAnswer(data.answer); // Processed HTML content
      } catch (error) {
        const err = error as Error;
        setError(err.message);
        console.error('Error:', err.message);
      }
    };

    fetchContent();
  }, [questionId]);

  const navigateToQuestion = (id: number) => {
    router.push(`/questions/${id}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!question || !answer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Question {questionId}</h1>
      <h2 className="text-xl font-semibold mb-4" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="prose prose-lg mb-8 px-8" dangerouslySetInnerHTML={{ __html: answer }} />
      <div className="mt-auto mb-8 flex justify-center space-x-2">
        {[...Array(totalQuestions)].map((_, index) => {
          const questionNum = index + 1;
          const isActive = questionId && questionNum === parseInt(questionId as string);
          return (
            <button
              key={questionNum}
              className={`p-2 rounded hover:bg-gray-700 transition ${isActive ? 'bg-blue-500' : 'bg-gray-800 text-white'}`}
              onClick={() => navigateToQuestion(questionNum)}
            >
              {questionNum}
            </button>
          );
        })}
      </div>
    </div>
  );
}
