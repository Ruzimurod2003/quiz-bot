import BackButton from "../../../components/buttons/BackButton";
import CountdownTimer from "./CountdownTimer";
import {Button, Modal} from "flowbite-react";
import {useState} from "react";
import * as PropTypes from "prop-types";
import {Link} from "react-router-dom";

function HiOutlineExclamationCircle(props) {
    return null;
}

HiOutlineExclamationCircle.propTypes = {className: PropTypes.string};
export default function Header({submitResult}) {
    const [openModal, setOpenModal] = useState();
    const props = {openModal, setOpenModal};
    const [completed, setCompleted] = useState({});

    async function showPopUp() {
        setCompleted(await submitResult());
        props.setOpenModal('pop-up');
    }

    return (
        <div className="h-14 p-4 pt-6 flex flex-row   justify-between items-center">
            <div>
                <BackButton></BackButton>
            </div>
            <div className="">
                <CountdownTimer endOfTime={showPopUp} initialTime={180}></CountdownTimer>
            </div>
            <div>
                <Button
                    className="
                    dark:border-white
                    border-white
                    dark:enabled:hover:bg-blue-500
                    enabled:hover:bg-blue-500
                    focus:ring-0
                    hover:border-transparent
                    "
                    color="gray"
                    size="xs"
                    onClick={showPopUp}
                    pill
                >
                    <p className="text-md text-white">
                        Submit
                    </p>
                </Button>
                <Modal show={props.openModal === 'pop-up'} size="md" popup
                       onClose={() => props.setOpenModal(undefined)}>
                    <Modal.Header className="dark:bg-white rounded-t-3xl"/>
                    <Modal.Body className="dark:bg-white rounded-b-3xl">
                        <div className="text-center">

                            <h3 className="mb-5 text-lg font-normal text-gray-800 dark:text-gray-800">
                                Your test result is {completed.all} out of {completed.passed}
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Link style={{all: 'none'}} to={"/"}>
                                    <Button
                                        className="bg-transparent shadow-md w-full
                    background-animation-button focus:ring-none"
                                        pill>
                                        Back to main menu
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}