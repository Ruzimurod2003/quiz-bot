import BackButton from "../../components/buttons/BackButton";
import Header from "./components/Header";
import ListQuestions from "./components/Questions";

export default function Quiz() {
    return (
        <div className="h-full p-4">
            {Header()}
            <div className="h-full overflow-hidden w-full">
                {ListQuestions()}
            </div>

        </div>
    );

}