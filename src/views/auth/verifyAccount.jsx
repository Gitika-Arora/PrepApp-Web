import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
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

const verifyAccountSchema = z
  .object({
    code: z.string().min(1, "Enter the code"),
  })

export default function SetPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const password = location.state?.password;
  const firstName = location.state?.firstName;

  const form = useForm({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const onSubmit = async (e) => {
    setLoading(true);
    setError("");
    try {

      console.log(e.code, email)
      await axiosInstance.post("/api/auth/verify/email/", {
        email: email,
        code: e.code
      });

      navigate("/welcome", { state: { email, password, firstName } })

    } catch (error) {
      console.error("Verify account error:", error);
      alert("Failed to verify account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async (e) => {
    setLoading(true);

    try {
      await axiosInstance.post("/api/auth/verify-email/code/send/", {
        email: email,
      });

      setTimer(60);
    } catch (error) {
      console.error("Resend code error:", error);
      alert("Failed to resend code. Please try again.");
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
              Verify your Account
            </h2>
            <h5 className="text-lg text-center text-white mt-2 ">
              Verification code sent! Check your email.
            </h5>
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

                <div className="flex items-center justify-between">
                  {timer > 0 ? (
                    <p className="text-sm text-gray-300">
                      Didn’t get the code? Resend in <span className="font-medium">{timer}s</span>
                    </p>
                  ) : (
                    <span
                      onClick={resendCode}
                      className="text-sm underline-offset-4 hover:underline text-gray-300 cursor-pointer"
                    >
                      Resend Code
                    </span>
                  )}
                </div>

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