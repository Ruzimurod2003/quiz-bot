import {Button} from "flowbite-react";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div className="rounded-3xl h-screen">

            <div className="h-[50vh] flex flex-column items-end p-5">

                <h1 className="text-white text-4xl font-bold">Quizy mania</h1>

            </div>
            <div className="bg-white shadow-md rounded-t-3xl h-[50vh] p-5 flex flex-col justify-evenly">
                <div>
                    <h6>Today's quiz on </h6>
                    <h3 className="text-3xl text-blue-700 font-bold">General Knowledge</h3>
                </div>

                <Link style={{all: 'none'}} to={"/quiz"}>
                    <Button
                        className="bg-transparent shadow-md w-full
                    background-animation-button focus:ring-none"
                        pill>
                        Start quiz now
                    </Button>
                </Link>
            </div>
        </div>
    );
}