import Login from "@/views/auth/login";
import Subscription from "@/views/subscription";
import ThankYou from "@/views/thankYou";
import ForgotPassword from "@/views/auth/forgotPassword"
import SignUp from "@/views/auth/signUp"
import SetPassword from "@/views/auth/setPassword"
import VerifyAccount from "@/views/auth/verifyAccount"
import WelcomePage from "@/views/auth/welcomePage"

const routes = [
    {
        id: 1,
        path: "/",
        component: Login,
        isPublic: true,
    },
    {
        id: 2,
        path: "/login",
        component: Login,
        isPublic: true,
    },
    {
        id: 3,
        path: "/subscription",
        component: Subscription,
        isPublic: false,
    },
    {
        id: 4,
        path: "/thank-you",
        component: ThankYou,
        isPublic: false,
    },
    {
        id: 5,
        path: "/forgot-password",
        component: ForgotPassword,
        isPublic: true,
    },
    {
        id: 6,
        path: "/sign-up",
        component: SignUp,
        isPublic: true,
    },
    {
        id: 7,
        path: "/set-password",
        component: SetPassword,
        isPublic: true,
    },
    {
        id: 8,
        path: "/verify-account",
        component: VerifyAccount,
        isPublic: true,
    },
    {
        id: 9,
        path: "/welcome",
        component: WelcomePage,
        isPublic: true,
    }
];

export default routes;
