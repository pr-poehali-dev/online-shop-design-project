import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import { AuthFormData, User } from "@/types";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<AuthFormData>();

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    reset: resetSignup,
  } = useForm<AuthFormData>();

  const onLogin = (data: AuthFormData) => {
    const userData: User = {
      id: Date.now().toString(),
      fullName: data.fullName,
      birthDate: "",
      email: "",
      password: data.password,
    };
    login(userData);
    resetLogin();
    onClose();
    navigate("/catalog");
  };

  const onSignup = (data: AuthFormData) => {
    const userData: User = {
      id: Date.now().toString(),
      fullName: data.fullName,
      birthDate: data.birthDate || "",
      email: data.email || "",
      password: data.password,
    };
    login(userData);
    resetSignup();
    onClose();
    navigate("/catalog");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Добро пожаловать
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Авторизация</TabsTrigger>
            <TabsTrigger value="signup">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
              <div>
                <Label htmlFor="login-fullName">ФИО</Label>
                <Input
                  id="login-fullName"
                  {...registerLogin("fullName", {
                    required: "ФИО обязательно",
                  })}
                  placeholder="Введите ваше ФИО"
                />
                {loginErrors.fullName && (
                  <p className="text-sm text-destructive">
                    {loginErrors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                  id="login-password"
                  type="password"
                  {...registerLogin("password", {
                    required: "Пароль обязателен",
                  })}
                  placeholder="Введите пароль"
                />
                {loginErrors.password && (
                  <p className="text-sm text-destructive">
                    {loginErrors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-4">
              <div>
                <Label htmlFor="signup-fullName">ФИО</Label>
                <Input
                  id="signup-fullName"
                  {...registerSignup("fullName", {
                    required: "ФИО обязательно",
                  })}
                  placeholder="Введите ваше ФИО"
                />
                {signupErrors.fullName && (
                  <p className="text-sm text-destructive">
                    {signupErrors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="signup-birthDate">Дата рождения</Label>
                <Input
                  id="signup-birthDate"
                  type="date"
                  {...registerSignup("birthDate", {
                    required: "Дата рождения обязательна",
                  })}
                />
                {signupErrors.birthDate && (
                  <p className="text-sm text-destructive">
                    {signupErrors.birthDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  {...registerSignup("email", { required: "Email обязателен" })}
                  placeholder="Введите ваш email"
                />
                {signupErrors.email && (
                  <p className="text-sm text-destructive">
                    {signupErrors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="signup-password">Пароль</Label>
                <Input
                  id="signup-password"
                  type="password"
                  {...registerSignup("password", {
                    required: "Пароль обязателен",
                  })}
                  placeholder="Введите пароль"
                />
                {signupErrors.password && (
                  <p className="text-sm text-destructive">
                    {signupErrors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Зарегистрироваться
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
