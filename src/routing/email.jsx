import React from "react";
import { Route, Routes } from "react-router-dom";
import { Email as Layout } from "../layouts";
import { NotFound as NotFoundPage } from "../pages/not-found";
import { AccountConfirm as AccountConfirmPage } from "../pages/account-confirm";
import { AccountDelete as AccountDeletePage } from "../pages/account-delete";
import { AccountChangeLogin as AccountChangeLoginPage } from "../pages/account-change-login";
import { AccountChangeEmail as AccountChangeEmailPage } from "../pages/account-change-email";
import { AccountChangePassword as AccountChangePasswordPage } from "../pages/account-change-password";

const Email = () => (
  <Routes>
    <Route
      path="confirm/account"
      element={
        <Layout>
          <AccountConfirmPage />
        </Layout>
      }
    />
    <Route
      path="confirm/delete"
      element={
        <Layout>
          <AccountDeletePage />
        </Layout>
      }
    />
    <Route
      path="confirm/update/login"
      element={
        <Layout>
          <AccountChangeLoginPage />
        </Layout>
      }
    />
    <Route
      path="confirm/update/email"
      element={
        <Layout>
          <AccountChangeEmailPage />
        </Layout>
      }
    />
    <Route
      path="confirm/update/password"
      element={
        <Layout>
          <AccountChangePasswordPage />
        </Layout>
      }
    />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default Email;
