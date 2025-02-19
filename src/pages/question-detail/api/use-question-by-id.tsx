import { IQuestion } from "../../../shared/api/questions/types";
import { IReqState, useReq } from "../../../shared/api/helpers";


export function useQuestionById(id: number): IReqState<IQuestion> {
    // const [question, setQuestion] = useState<IQuestion | undefined>(undefined)
    // const [error, setError] = useState<string | undefined>(undefined)
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    // useEffect(() => {
    //     sendReq(`queestions/${id}`).then(question => {
    //         setIsLoading(false);
    //         setQuestion(question);
    //     })
    //         .catch(err => setError(err.message))
    // }, [id])
    // return { question, error, isLoading }
    return useReq<IQuestion>(`/questions/${id}`)
}
