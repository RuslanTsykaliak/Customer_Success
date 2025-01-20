import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const getMarkdownContent = async (filename: string) => {
  const filePath = path.join(process.cwd(), 'app', 'data', filename);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const processedContent = await remark().use(html).process(fileContents);
  return processedContent.toString();
};

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const questionId = url.pathname.split('/').pop();

  if (!questionId) {
    console.error('Invalid question ID:', questionId);
    return NextResponse.json({ error: 'Invalid question ID' }, { status: 400 });
  }

  try {
    const questionContent = await getMarkdownContent(`question${questionId}.md`);
    const answerContent = await getMarkdownContent(`answer${questionId}.md`);

    return NextResponse.json({ question: questionContent, answer: answerContent }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error('Error reading file:', err.message);
    return NextResponse.json({ error: 'Failed to read the file' }, { status: 500 });
  }
}
