import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Quiz from "./pages/quiz/Quiz";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
        console.log(tg);
        console.log(window.Telegram.WebApp);
    }, [])

    return (<div
        className="App background-animation  text-gray-500 h-screen overflow-hidden">
        <Routes>
            <Route index element={<Home/>}></Route>
            <Route element={<Quiz/>} path={'quiz'}></Route>
        </Routes>
    </div>);
}

export default App;
