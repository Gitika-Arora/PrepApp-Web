import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


function LandingLayout({ children }) {
    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="ext-color-2">
            <div className="h-full min-h-screen bg-[rgb(22,22,22)] flex flex-col relative">

                <div className="w-full flex justify-end items-center px-6 py-4 absolute top-0 left-0 z-50">
                    <Button
                        variant="outline"
                        className="w-50"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>

                <div className="flex flex-1 items-center justify-center relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LandingLayout;

