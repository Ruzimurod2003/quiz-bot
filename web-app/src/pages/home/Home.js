export default function Home() {
    return (
        <div className="bg-purple-700 rounded-3xl h-screen">

            <div className="h-[50vh] flex flex-column items-end p-5">

                <h1 className="text-white text-6xl">Title</h1>

            </div>
            <div className="bg-white rounded-t-3xl h-[50vh] p-5">
                <h6>text of the quiz</h6>

                <h3>Quiz name for something</h3>

                <h6>new Quiz will be started from </h6>

                <div>
                    component for new quiz
                </div>

                <button>Button for start</button>
            </div>
        </div>
    );
}