import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
                {session?.user ? (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Admin Page
                        </h2>
                        <p className="text-gray-600">
                            Welcome back, {session.user.username || session.user.name}!
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Access Denied
                        </h2>
                        <p className="text-gray-600">
                            Please login to see this admin page.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Page;
