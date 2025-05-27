import { QuestionPage } from "../../../src/pages/question-detail";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  return <QuestionPage questionID={id} />
}
