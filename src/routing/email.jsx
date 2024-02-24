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
        <Layout title="InCase - Подтверждение аккаунта">
          <AccountConfirmPage />
        </Layout>
      }
    />
    <Route
      path="confirm/delete"
      element={
        <Layout title="InCase - Удаление аккаунта">
          <AccountDeletePage />
        </Layout>
      }
    />
    <Route
      path="confirm/update/login"
      element={
        <Layout title="InCase - Смена логина">
          <AccountChangeLoginPage />
        </Layout>
      }
    />
    <Route
      path="confirm/update/email"
      element={
        <Layout title="InCase - Смена почты">
          <AccountChangeEmailPage />
        </Layout>
      }
    />
    <Route
      path="confirm/update/password"
      element={
        <Layout title="InCase - Смена пароля">
          <AccountChangePasswordPage />
        </Layout>
      }
    />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default Email;
