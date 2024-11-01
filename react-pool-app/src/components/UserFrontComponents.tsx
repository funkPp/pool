import Userfront, {
  SignupForm,
  LoginForm,
  PasswordResetForm
} from "@userfront/react";

export function Signup() {
  return (
    <div>
      <h2>Регистрация</h2>
      <SignupForm />
    </div>
  );
}

export function Login() {
  return (
    <div>
      <h2>Введите логин</h2>
      <LoginForm compact={true} />
    </div>
  );
}

export function PasswordReset() {
  return (
    <div>
      <h2>Сбросить пароль</h2>
      <PasswordResetForm />
    </div>
  );
}
