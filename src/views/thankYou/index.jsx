import { useState } from "react";
import Logo from "@/assets/prep_logo.webp";
import welcomeImg from "@/assets/welcome.webp";
import QuoteImg from "@/assets/quote.png";
import { Button } from "@/components/ui/button";

export default function ThankYou() {
    const [status, setStatus] = useState("success");

    return (

        <div className="w-full min-h-screen flex flex-col">

            <div className="flex justify-center">
                <img
                    src={Logo}
                    alt="Prep Logo"
                    className="w-40 h-40 object-contain"
                />
            </div>
            <main className="relative">
                <div
                    className="relative h-[600px] bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${welcomeImg})`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/30"></div>

                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="relative mb-4">
                                <img
                                    src={QuoteImg}
                                    alt="quote"
                                    className="w-15 h-15 opacity-50 mx-auto"
                                />
                            </div>
                            {status === "success" ? (
                                <>
                                    <h1 className="text-4xl md:text-3xl lg:text-5xl font-light text-white leading-tight font-[🇬🇪]">
                                        Congratulations!
                                    </h1>
                                    <p className="font-[🇬🇪] text-2xl md:text-3xl lg:text-5xl font-light text-white mb-7 leading-relaxed">
                                        You have successfully signed up to Prep Dance
                                    </p>
                                    <p className="font-[🇬🇪] text-2xl md:text-3xl lg:text-5xl font-light text-white mb-12 leading-[1.5]">
                                        Navigate back to the app and let the lesson <br />begin!
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-4xl md:text-3xl lg:text-5xl font-light text-white leading-tight font-[🇬🇪]">
                                        Oops! Something went wrong
                                    </h1>
                                    <p className="font-[🇬🇪] text-2xl md:text-3xl lg:text-5xl font-light text-white mb-7 leading-relaxed">
                                        We couldn’t complete your signup.
                                    </p>
                                    <p className="font-[🇬🇪] text-2xl md:text-3xl lg:text-5xl font-light text-white mb-12 leading-[1.5]">
                                        Please try again later or contact support.
                                    </p>
                                </>
                            )}

                            <hr className="border-t w-14 mx-auto my-4" />
                            <div className="inline-block">
                                <span className="text-2xl text-white font-medium">Prep Dance</span>
                            </div>
                            <br /><br />
                            <div className="inline-block">
                                <Button
                                    variant="outline"
                                    className="w-72 py-3"
                                    onClick={() => {
                                        window.location.href = "prepapp://";
                                    }}
                                >
                                    Go back to App
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-[#68ba7e] text-gray-800 py-12 ">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <p className="font-medium text-md">COPYRIGHT © 2025 PREP-APP - ALL RIGHTS RESERVED.</p>
                    </div>

                    <div className="text-center space-y-4 text-lg">
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 ">
                            <span>Madis Abel</span>
                            <span>Dale Bennett</span>
                            <span>Darren Bennett</span>
                            <span>Marat Gimaev</span>
                            <span>Neil Jones</span>
                            <span>Marek Kosaty</span>
                            <span>Argo Oblikas</span>
                            <span>Greg Smith</span>
                            <span>Evgeniya Shaw</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                            <span>Craig Shaw</span>
                            <span>Marlon Wallen</span>
                            <span>Michelle Tsiakkas</span>
                            <span>MarionWelsh</span>
                            <span>Kenny Welsh</span>
                            <span>Liis End</span>
                            <span>Slawek Sochaki</span>
                            <span>Michael Danilczuk</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg">
                            <span>Gunnar Gunnarsson</span>
                            <span>Elevate</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    );
}
