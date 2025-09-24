import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import Layout from "../components/layout";
import LandingLayout from "@/components/landinglayout";

function Routing() {
  return (
    <Routes>
      {routes.map((route) => {
        const RouteVal = route.component;

        if (route.isPublic) {
          return (
            <Route
              key={route.id}
              path={route.path}
              element={
                <Layout>
                  <RouteVal />
                </Layout>
              }
            />
          );
        } else {
          return (
            <Route
              key={route.id}
              path={route.path}
              element={
                <LandingLayout>
                  <RouteVal />
                </LandingLayout>
              }
            />
          );
        }
      })}
    </Routes>
  );
}

export default Routing;
