import {Button} from "flowbite-react";

export default function Question({index, scrollIntoView, scrollPosition, question, addToAnswers}) {

    return (
        <div
            onClick={() => scrollIntoView(index)}
            className="first:ml-4 h-[90%] p-5 flex-1 bg-white text-gray-800 rounded-2xl w-[85%] child">
            <div className="text-lg font-bold">{index + 1}.</div>

            <div className="mt-2 whitespace-normal  font-semibold">
                <span>
                     {question.description}
                </span>
            </div>

            <div className="mt-10 space-y-3">
                {question.answers.map((answer, index) =>
                    <Button
                        key={answer.id}
                        onClick={e => {
                            addToAnswers(answer.id, question.id);
                        }}
                        className={`justify-start w-full
                         dark:border-gray-300
                         border-gray-300
                         dark:enabled:hover:bg-blue-500
                         enabled:hover:bg-blue-500
                         dark:text-gray-800
                         text-gray-800
                         hover:text-white
                         focus:ring-0
                         hover:border-transparent
                         ${scrollPosition === index ?
                            'bg-blue-500 border-transparent text-white'
                            : ''}
                         `}
                        color="gray"
                        pill
                    >
                        <span className="font-bold w-full">
                            {String.fromCharCode(index + 65)}. {answer.description}
                        </span>
                    </Button>)}
            </div>

        </div>
    );
}