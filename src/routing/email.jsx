import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { BootScreenSaver } from "../components/loading";

const NotFoundPage = lazy(() => import("../pages/not-found/not-found"));
const AccountConfirmPage = lazy(() =>
  import("../pages/account-confirm/account-confirm")
);
const AccountDeletePage = lazy(() => import("../pages/account-delete"));
const AccountChangeLoginPage = lazy(() =>
  import("../pages/account-change-login/account-change-login")
);
const AccountChangeEmailPage = lazy(() =>
  import("../pages/account-change-email/account-change-email")
);
const AccountChangePasswordPage = lazy(() =>
  import("../pages/account-change-password/account-change-password")
);

const Email = () => (
  <Routes>
    <Route
      path="confirm/account"
      element={
        <Suspense fallback={<BootScreenSaver />}>
          <AccountConfirmPage />
        </Suspense>
      }
    />
    <Route
      path="confirm/delete"
      element={
        <Suspense fallback={<BootScreenSaver />}>
          <AccountDeletePage />
        </Suspense>
      }
    />
    <Route
      path="confirm/update/login"
      element={
        <Suspense fallback={<BootScreenSaver />}>
          <AccountChangeLoginPage />
        </Suspense>
      }
    />
    <Route
      path="confirm/update/email"
      element={
        <Suspense fallback={<BootScreenSaver />}>
          <AccountChangeEmailPage />
        </Suspense>
      }
    />
    <Route
      path="confirm/update/password"
      element={
        <Suspense fallback={<BootScreenSaver />}>
          <AccountChangePasswordPage />
        </Suspense>
      }
    />
    <Route
      path="*"
      element={
        <Suspense fallback={<BootScreenSaver />}>
          <NotFoundPage />
        </Suspense>
      }
    />
  </Routes>
);

export default Email;
