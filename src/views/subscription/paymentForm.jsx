import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + "/thank-you",
            },
        });

        if (error) {
            console.error(error.message);
            alert(error.message);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button >Pay</button>
            <div className="pt-5 justify-center flex">
                <Button
                    disabled={!stripe || loading}
                    variant="outline"
                    className="w-72 py-3"
                >
                    {loading ? "Processing..." : "Pay"}
                </Button>
            </div>
        </form>
    );
}

export default PaymentForm;
