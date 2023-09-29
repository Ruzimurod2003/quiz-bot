import 'react-horizontal-scrolling-menu/dist/styles.css';
import {useEffect, useRef, useState} from "react";

import '../style/quiz.css';
import debounce from 'lodash.debounce';
import Question from "./Question";
import NavQuestions from "./NavQuestions";

export default function Questions({questions, addToAnswers, answers}) {
    const containerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);

    const scrollIntoView = (index) => {
        if (containerRef.current) {
            const child = containerRef.current.children[index];
            if (child) {
                const containerWidth = containerRef.current.clientWidth;
                const childWidth = child.clientWidth;
                const scrollLeft = child.offsetLeft - Math.floor((containerWidth - childWidth) / 2);
                containerRef.current.scrollTo({left: scrollLeft, behavior: 'smooth'});
                setScrollPosition(index);
            }
        }
    };

    const debouncedScrollIntoView = debounce(scrollIntoView, 200);


    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (touchStartX !== null) {
            const touchEndX = e.touches[0].clientX;
            const deltaX = touchStartX - touchEndX;

            if (deltaX > 0) {
                // Swipe right, scroll to the next item
                debouncedScrollIntoView(scrollPosition + 1);
            } else if (deltaX < 0) {
                // Swipe left, scroll to the previous item
                debouncedScrollIntoView(scrollPosition - 1);
            }

            setTouchStartX(null);
        }
    };


    return (
        <div style={{
            height: "calc(100% - 3.5rem)",
            touchAction: 'none'
        }}>
            <NavQuestions questions={questions} scrollIntoView={scrollIntoView}
                          scrollPosition={scrollPosition}></NavQuestions>

            <div style={{
                touchAction: 'none'
            }}
                 onTouchStart={e => {
                     handleTouchStart(e);
                 }}

                 onTouchMove={e => {
                     handleTouchMove(e);
                 }}
                 className="parent h-full w-full pb-8 space-x-4" ref={containerRef}>
                {questions.map((question, index) =>
                    <Question key={question.questionId} index={index}
                              question={question}
                              addToAnswers={addToAnswers}
                              answers={answers}
                              scrollPosition={scrollPosition}
                              scrollIntoView={scrollIntoView}></Question>
                )}
                <div className="child">

                </div>

            </div>
        </div>


    );
}