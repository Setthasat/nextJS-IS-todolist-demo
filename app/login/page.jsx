import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="bg-gradient-to-b from-[#FFB114] to-[#FF4FCA] w-screen h-screen flex justify-center items-center">
            <div className="h-full w-full  flex flex-col justify-center items-center">
                <h1 className="text-white text-3xl">Comming soon ...</h1>
                <Link href="/" className="text-blue-500 text-2xl underline underline-offset-8">
                    Go to Home
                </Link>
            </div>
        </div>
    );
}
