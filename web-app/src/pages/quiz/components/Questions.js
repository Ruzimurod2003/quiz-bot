import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import {useEffect, useRef, useState} from "react";
import '../style/quiz.css';
import debounce from 'lodash.debounce';

export default function ListQuestions() {
    const containerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);

    useEffect(() => {
        const container = containerRef.current;
        document.querySelector('.parent').addEventListener('wheel', preventScroll, {passive: false});

        function preventScroll(e) {
            e.preventDefault();
            e.stopPropagation();

            return false;
        }

        const handleScroll = (e) => {
            e.preventDefault(); // Prevent the default scroll behavior

        };

        container.addEventListener('wheel', handleScroll);


        return () => {
            // Remove the event listener when the component is no longer active
            container.removeEventListener('wheel', handleScroll);
        };

    }, []);

    const scrollIntoView = (index) => {
        if (containerRef.current) {
            const child = containerRef.current.children[index];
            if (child) {
                const containerWidth = containerRef.current.clientWidth;
                const childWidth = child.clientWidth;
                const scrollLeft = child.offsetLeft - Math.floor((containerWidth - childWidth) / 2);
                console.log(containerWidth, child.offsetLeft);
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
        }}
             onTouchStart={e => {
                 handleTouchStart(e);
             }}

             onTouchMove={e => {
                 handleTouchMove(e);
             }}
             className="parent w-full space-x-4" ref={containerRef}>

            {Array.from({length: 10}, (_, index) => (
                <div key={index}
                     onClick={() => scrollIntoView(index)}
                     className={`${scrollPosition === index ? 'active' : ''}
                      h-full pt-4 flex-1 bg-white rounded-2xl w-[90%] child`}>
                    <div>s {index}</div>
                </div>
            ))}
        </div>

    );
}