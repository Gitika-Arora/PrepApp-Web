import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, LoaderCircle, ArrowRight } from 'lucide-react';
import Logo from "@/assets/prep_logo.webp"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Please enter your password"),
});

export default function LoginPage() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (e) => {
        setLoading(true);
        setError("");

        let email = e.email;
        let password = e.password;
        
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
        <div className="min-h-screen  flex items-center justify-center p-4 relative">

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
                        <h2 className="text-3xl text-center text-white font-semibold">Login</h2>
                    </div>

                    <div className="p-6 pt-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {error && <p className="text-red-500 mb-2">{error}</p>}

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    disabled={loading}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        disabled={loading}
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    variant="outline"
                                >
                                    {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />:  "Login"  }
                                </Button>
                            </form>
                        </Form>

                    </div>
                </div>
            </div>
            
        </div>

    );
}