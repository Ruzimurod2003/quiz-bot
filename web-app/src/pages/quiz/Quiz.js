import Header from "./components/Header";
import Questions from "./components/Questions";
import {useEffect, useState} from "react";
import fetchQuestions from "./api/fetchQuestions";
import postAnswers from "./api/postAnswers";

export default function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    useEffect(
        () => {
            fetchQuestions().then(setQuestions);
        }, [])

    async function submitResult() {
        return await postAnswers(answers);
    }

    function addToAnswers(questionId, answerId) {
        answers[questionId] = {questionId: questionId, answerId: answerId};
        setAnswers(answers);
    }

    return (
        <div className="h-full text-white">
            <Header submitResult={submitResult}/>
            <div className="h-full overflow-hidden w-full">
                <Questions addToAnswers={addToAnswers} questions={questions}></Questions>
            </div>

        </div>
    );

}