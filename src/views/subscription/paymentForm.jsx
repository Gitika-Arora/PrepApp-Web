import React from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

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
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button >Pay</button>
            <div className="pt-5 justify-center flex">
            <Button
                disabled={!stripe}
                variant="outline"
                className="w-72 py-3"
                >Pay</Button>
            </div>
        </form>
    );
}

export default PaymentForm;
