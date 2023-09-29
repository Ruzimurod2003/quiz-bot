import Question from "./Question";

export default function NavQuestions({questions, scrollIntoView, scrollPosition}) {
    return (
        <div className="mr-6 my-4 ">
            <div className="h-[10%]  flex flex-wrap justify-center  space-x-4">
                {questions.map((e, index) => (

                    <button
                        key={e.id}
                        onClick={() => scrollIntoView(index)}
                        className=
                            {`w-6 h-6 rounded-full border border-white flex items-center 
                                justify-center hover:bg-blue-500 
                                hover:border-blue-500 hover:text-white transition duration-300  
                                ${(scrollPosition === index ? 'border-blue-500 bg-blue-500' : "")}`}
                    >
                        {/* Add your figure (icon) inside the button */}
                        <div className="text-xs">{e.id}</div>
                    </button>
                ))}
            </div>

        </div>
    );
}