import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IQuestion } from "../../../shared/api/questions";
import { fetchQuestion } from "../api/main";


export function useQuestionById(): { question?: IQuestion, error?: string, isLoading: boolean } {
    const [question, setQuestion] = useState<IQuestion | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { id } = useParams()
    useEffect(() => {
        fetchQuestion(Number(id)).then(question => {
            setIsLoading(false);
            setQuestion(question);
        })
        .catch(err => setError(err.message)) 
    }, [id])
    return { question, error, isLoading }
}