import Header from "./components/Header";
import Questions from "./components/Questions";
import {useEffect, useState} from "react";
import fetchQuestions from "./api/fetchQuestions";
import postAnswers from "./api/postAnswers";
import {useTelegram} from "../../hooks/useTelegram";

export default function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const {userId} = useTelegram();
    const [remainingTime, setRemainingTime] = useState(180);

    useEffect(
        () => {
            fetchQuestions().then(e => setQuestions(e));
        }, [])

    async function submitResult() {
        return await postAnswers({
            userId: userId,
            answerAndQuestions: Object.values(answers),
            spentTime: 180 - remainingTime
        });
    }

    function addToAnswers(questionId, answerId) {
        answers[questionId] = {questionId: questionId, answerId: answerId};
        setAnswers(answers);
    }


    return (
        <div className="h-full text-white">
            <Header remainingTime={remainingTime} setRemainingTime={setRemainingTime} submitResult={submitResult}/>
            <div className="h-full overflow-hidden w-full">
                <Questions answers={answers} addToAnswers={addToAnswers} questions={questions}></Questions>
            </div>

        </div>
    );

}