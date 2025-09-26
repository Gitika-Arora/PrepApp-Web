import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import Logo from "@/assets/prep_logo.webp";
import { Button } from "@/components/ui/button";
import axios from "axios";


export default function WelcomePage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(20);

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const password = location.state?.password;
    const firstName = location.state?.firstName;

    const onSubmit = async (e) => {
        setLoading(true);
        setError("");
        try {
            //https://backend.prep-app.net/
            const res = await axios.post(import.meta.env.VITE_API_URL + "/api/auth/login/", {
                email,
                password,
            });

            if (res?.status === 200) {
                localStorage.setItem("authToken", res.data.access);
                localStorage.setItem("refreshToken", res.data.refresh);
                localStorage.setItem("userEmail", email);

                navigate("/subscription");
            }
            else
                setError("Something went wrong. Please try again later.");
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.detail || "Something went wrong. Please try again later.");

            setTimeout(() => {
                setError("");
            }, 5000);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            <div className="w-full max-w-md relative z-10">
                <div className="flex justify-center">
                    <div className="w-35 h-35">
                        <img
                            src={Logo}
                            alt="Prep Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                <div className="bg-[rgb(0,0,0)] backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-xl">
                    <div className="p-6 pb-2">
                        <h2 className="text-3xl text-center text-white font-semibold">
                            Welcome, {firstName}!
                        </h2>
                        <h5 className="text-lg text-center text-white mt-2 ">
                            Your student account has been created successfully
                        </h5>
                    </div>

                    <div className="p-6 pt-4">
                        <Button type="submit" disabled={loading} onClick={onSubmit} variant="outline">
                            {loading ? (
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "Login Now"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
