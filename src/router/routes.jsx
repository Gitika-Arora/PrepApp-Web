import Login from "@/views/auth/login";
import Subscription from "@/views/subscription";
import ThankYou from "@/views/thankYou";

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
    }
];

export default routes;
