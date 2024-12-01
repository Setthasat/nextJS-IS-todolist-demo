import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="bg-gradient-to-b from-[#FFB114] to-[#FF4FCA] w-screen h-screen">
            <h1>Login Page</h1>
            <Link href="/">
                <a>Go to Home</a>
            </Link>
        </div>
    );
}
