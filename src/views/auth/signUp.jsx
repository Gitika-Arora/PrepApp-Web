import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import { negative, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";

const signUpSchema = z
    .object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export default function SignUp() {
    const [error,] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (e) => {
        setLoading(true);

        let firstName = e.firstName;
        let lastName = e.lastName;
        let email = e.email;
        let password = e.confirmPassword;

        try {
            const response = await axiosInstance.post("/api/users/signup/", {
                first_name: firstName,
                last_name: lastName,
                email: email,
                role: "student",
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                password: password
            });
            const verifyEmail = await axiosInstance.post("/api/auth/verify-email/code/send/", {
                email: email,
            });
            console.log(response, "response")
            console.log(verifyEmail, "verifyEmail")

            navigate("/verify-account", { state: { email, password, firstName } });

        } catch (error) {
            console.error("SignUp error:", error);
            alert("Failed to Signup. Please try again.");
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
                            Sign Up
                        </h2>
                    </div>

                    <div className="p-6 pt-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {error && <p className="text-red-500 mb-2">{error}</p>}

                                <div className="flex gap-4">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="text-gray-300">First Name</FormLabel>
                                                <FormControl>
                                                    <Input disabled={loading} {...field} />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="text-gray-300">Last Name</FormLabel>
                                                <FormControl>
                                                    <Input disabled={loading} {...field} />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" disabled={loading} {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex gap-4">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
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
                                            <FormItem className="flex-1">
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
                                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button type="submit" disabled={loading} variant="outline">
                                    {loading ? (
                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        "Sign Up"
                                    )}
                                </Button>

                                {/* Footer */}
                                <div className="mt-4 text-center text-sm text-gray-300">
                                    Already have an account?{" "}
                                    <a href="/" className="underline underline-offset-4">
                                        Login
                                    </a>
                                </div>
                            </form>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
