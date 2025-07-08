// src/app/login/page.jsx

import React from 'react';
import { AuthForm } from '../components/AuthForm'; // Adjust path if needed

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <AuthForm type="login" />
    </div>
  );
}
