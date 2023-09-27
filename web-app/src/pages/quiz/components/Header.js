import BackButton from "../../../components/buttons/BackButton";

export default function Header() {
    return (
        <div className="h-14 pt-2 flex flex-row  justify-between items-center">
            <div>
                <BackButton></BackButton>
            </div>
            <div className="">
                    <span>
                        time
                    </span>

            </div>
            <div>
                    <span>
                        submit
                    </span>

            </div>
        </div>
    );
}