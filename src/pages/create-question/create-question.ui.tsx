import { Form } from "react-router-dom";
import { Input } from "../../shared/ui/input";
import { useState } from "react";

function CreateQuestionForm() {
    const [validationErrs, setValidationErrs] = useState(null)
    const fields = [
        {
            name: "title",
            required: true
        },
        {
            name: "body",
            required: true
        }
    ]
}

export function CreateQuestion() {
    return (
        <div>
            <h1>Create your question here!</h1>
            <Form method="post">
                
            </Form>
        </div>
    )
}