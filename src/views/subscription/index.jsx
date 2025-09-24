import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/prep_logo.webp";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./paymentForm";
import axiosInstance from "@/lib/axiosInstance";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);
//const stripePromise = loadStripe("pk_test_pzgFhL6v6K1rlmE2lUMubXpG");

function Subscription() {
    const navigate = useNavigate();

    const [isYearly, setIsYearly] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    const token = localStorage.getItem("authToken");
    const rToken = localStorage.getItem("refreshToken");

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        //const response = await axios.get(import.meta.env.VITE_API_URL + "/api/subscriptions/products", {
        //    headers: {
        //        "Content-Type": "application/json",
        //        Authorization: `Bearer ${token}`
        //    },
        //});

        //console.log("log:", response);
        
        getUserProfile();

    }, [navigate, rToken, token]);

    async function getUserProfile() {
        try {
            const response = await axiosInstance.get("/api/users/profile/");
            //const response = await axios.get(import.meta.env.VITE_API_URL + "/api/users/profile/", {
            //    headers: {
            //        "Content-Type": "application/json",
            //        Authorization: `Bearer ${token}`
            //    },
            //});

            setUserProfile(response.data);
            //console.log("log:", response);
        }
        catch (err) {
            console.error("Initial error:", err);
            navigate("/");
        }
    }

    const handleSubscribeNow = async () => {
        setLoading(true);

        try {
            const response = await axiosInstance.post("/api/subscriptions/create-subscription/", {
                price_id: isYearly ? import.meta.env.VITE_STRIPE_YEAR_PRICE_ID : import.meta.env.VITE_STRIPE_MONTH_PRICE_ID,
            });

            //const response = await axios.post(import.meta.env.VITE_API_URL + "/api/subscriptions/create-subscription/", {
            //    price_id: isYearly ? import.meta.env.VITE_STRIPE_YEAR_PRICE_ID : import.meta.env.VITE_STRIPE_MONTH_PRICE_ID,
            //}, {
            //    headers: {
            //        "Content-Type": "application/json",
            //        Authorization: `Bearer ${token}`,
            //        "X-CSRFTOKEN": token,
            //    },
            //});

            setClientSecret(response.data.client_secret);
            setShowPaymentForm(true);
        } catch (error) {
            console.error("Subscription error:", error);
            alert("Failed to initiate subscription. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelNow = async () => {
        setLoading(true);

        try {
            const response = await axiosInstance.post("/api/subscriptions/cancel-subscription/", {
                subscription_id: userProfile.subscription.id
            });

            //const response = await axios.post(import.meta.env.VITE_API_URL + "/api/subscriptions/cancel-subscription/", {
            //    subscription_id: userProfile.subscription.id
            //}, {
            //    headers: {
            //        "Content-Type": "application/json",
            //        Authorization: `Bearer ${token}`,
            //        "X-CSRFTOKEN": token,
            //    },
            //});

            console.log("response: ", response);

            alert(response?.data?.message);
            //getUserProfile();
            setUserProfile({ ...userProfile, is_subscriber: false, subscription: null });
        } catch (error) {
            console.error("Subscription cancellation error:", error);
            alert("Failed to cancel subscription. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const options = {
        clientSecret,
        appearance: { theme: "night" },
    };

    return (
        <div className="w-full max-w-lg relative z-10 leading-6">
            <div className="flex justify-center">
                <img
                    src={Logo}
                    alt="Prep Logo"
                    className="w-40 h-40 object-contain"
                />
            </div>

            <div className="bg-black/90 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl p-10">
                <h2 className="text-3xl text-center text-[#68ba7e] font-semibold mb-8 font-['Playfair Display', Georgia, serif]">
                    Founder Tier Subscription
                </h2>

                {userProfile?.is_subscriber && userProfile?.subscription && (
                    <>
                        <p className="text-center text-white mb-15">
                            Hello {userProfile.full_name}<br /><br />
                            {userProfile.subscription.canceled_at && (
                                <div className="mb-2 text-red-700">
                                    You have canceled your <strong>{userProfile.subscription.interval}ly subscription</strong> on{" "}
                                    {new Date(userProfile.subscription.canceled_at).toLocaleDateString('en-GB')}.
                                </div>
                            )}
                            Your services under the {userProfile.subscription.interval}ly subscription will remain active until{" "}
                            <strong>{new Date(userProfile.subscription.current_period_end).toLocaleDateString('en-GB')}</strong>.
                        </p>
                    </>
                )}

                {!showPaymentForm ? (
                    <>
                        {!userProfile?.is_subscriber ? (
                            <>
                                <div className="flex items-center justify-center gap-4 mb-8">
                                    <span
                                        className={`text-sm ${!isYearly
                                            ? "text-[#68ba7e] font-semibold"
                                            : "text-white"
                                            }`}
                                    >
                                        Monthly
                                    </span>
                                    <Switch
                                        checked={isYearly}
                                        onCheckedChange={setIsYearly}
                                    />
                                    <span
                                        className={`text-sm ${isYearly
                                            ? "text-[#68ba7e] font-semibold"
                                            : "text-white"
                                            }`}
                                    >
                                        Yearly
                                    </span>
                                </div>

                                <div className="text-center mb-8">
                                    <p className="text-5xl font-bold text-[#68ba7e]">
                                        {isYearly ? "£29" : "£2.99"}
                                    </p>
                                </div>

                                <p className="text-center text-gray-300 text-sm mb-8 px-8">
                                    Be one of the first{" "}
                                    <span className="text-[#68ba7e] font-semibold">
                                        1,000
                                    </span>{" "}
                                    to unlock Prep Elevate - prices double once
                                    founder spots are gone.
                                </p>

                                <div className="flex justify-center">
                                    <Button
                                        variant="outline"
                                        className="w-72 py-3"
                                        onClick={handleSubscribeNow}
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Subscribe Now"}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center">
                                <Button
                                    variant="destructive"
                                    className="w-72 py-3 bg-red-600 hover:bg-red-700"
                                    onClick={handleCancelNow}
                                    disabled={!!userProfile.subscription.canceled_at}
                                >
                                    Cancel Now
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {clientSecret ? (
                            <Elements stripe={stripePromise} options={options}>
                                <PaymentForm />
                            </Elements>
                        ) : (
                            <p>Loading subscription...</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Subscription;