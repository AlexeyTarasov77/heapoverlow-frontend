import { Badge } from "../../../shared/ui";
import { useQuestionById } from "./use-question-by-id";

export function QuestionPage() {
    const { question, error, isLoading } = useQuestionById();
    return (
       <>
           {question && (
            <div className="p-3 flex flex-col">
                <div className="font-bold text-2xl">{question.title}</div>
                <div className="mt-5 flex gap-4 text-lg">
                    <div><span className="text-slate-400">Asked: </span>{question.createdAt.toLocaleString()}</div>
                    <div><span className="text-slate-400">Modified: </span>{question.updatedAt.toLocaleString()}</div>
                </div>
                <div className="border border-slate-400"></div>
                <div className="text-lg">{question.body}</div>
                <div className="mt-5 flex gap-3">
                    {question.tags.map((tag, index) => (
                        <Badge key={index}>{tag}</Badge>
                    ))}
                </div>
            </div>
           )}
           {error && <p className="text-red-500">{error}</p>}
           {isLoading && <h3 className="text-3xl text-center mt-10">Loading...</h3>}
       </>
    )
}