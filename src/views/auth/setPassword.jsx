import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Logo from "@/assets/prep_logo.webp";
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
import axiosInstance from "@/lib/axiosInstance";

const setPasswordSchema = z
    .object({
        code: z.string().min(1, "Enter the code"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export default function SetPassword() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const form = useForm({
        resolver: zodResolver(setPasswordSchema),
        defaultValues: {
            code: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (e) => {
        setLoading(true);
        setError("");
        let code = e.code;
        let password = e.confirmPassword;

        try {
            await axiosInstance.post("/api/auth/password-reset/code/verify/", {
                email: email,
                code: code,
                new_password: password
            });

            alert("Your password had been changed successfully");
            navigate("/");

        } catch (error) {
            console.error("Reset password error:", error);
            alert("Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
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
                            Set Password
                        </h2>
                    </div>

                    <div className="p-6 pt-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {error && <p className="text-red-500 mb-2">{error}</p>}

                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Code</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} {...field} />
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

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Confirm Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        disabled={loading}
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                                        onClick={() =>
                                                            setShowConfirmPassword(!showConfirmPassword)
                                                        }
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff size={18} />
                                                        ) : (
                                                            <Eye size={18} />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" disabled={loading} variant="outline">
                                    {loading ? (
                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
