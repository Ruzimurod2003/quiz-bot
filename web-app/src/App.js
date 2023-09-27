import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Quiz from "./pages/quiz/Quiz";

function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App bg-purple-700 rounded-3xl h-screen overflow-hidden">
            <Quiz></Quiz>
        </div>
    );
}

export default App;
