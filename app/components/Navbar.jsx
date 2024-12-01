import { FaRegUserCircle } from "react-icons/fa";
function Navbar() {
    return (
        <div className="flex justify-between items-center p-[2rem] font-bold    ">
            <a href="/" className="text-3xl text-white underline underline-offset-8">MEMO MATE</a>
            <a href="/login">
                <FaRegUserCircle size={40} color="white" className="" />
            </a>
        </div>
    );
}

export default Navbar;