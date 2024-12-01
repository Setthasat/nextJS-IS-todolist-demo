import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

function Navbar() {
    return (
        <div className="flex sticky justify-between items-center p-[2rem] font-bold">
            <Link href="/" className="text-3xl text-white underline underline-offset-8">
                MEMO MATE
            </Link>
            <Link href="/login">
                <FaRegUserCircle size={40} color="white" />
            </Link>
        </div>
    );
}

export default Navbar;
