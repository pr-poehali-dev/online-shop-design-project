import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { User } from "@/types";

const Profile = () => {
  const { user, updateUser, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    defaultValues: user || undefined,
  });

  const onSubmit = (data: User) => {
    updateUser(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset(user || undefined);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Войдите в аккаунт
            </h1>
            <p className="text-gray-600">Чтобы посмотреть профиль</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Личный кабинет
          </h1>
          <p className="text-gray-600">Управляйте вашим профилем</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Профиль
              <div className="space-x-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    Редактировать
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleCancel} variant="outline">
                      Отмена
                    </Button>
                    <Button type="submit" form="profile-form">
                      Сохранить
                    </Button>
                  </>
                )}
                <Button onClick={logout} variant="destructive">
                  Выйти
                </Button>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              id="profile-form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="fullName">ФИО</Label>
                <Input
                  id="fullName"
                  {...register("fullName", { required: "ФИО обязательно" })}
                  disabled={!isEditing}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="birthDate">Дата рождения</Label>
                <Input
                  id="birthDate"
                  type="date"
                  {...register("birthDate", {
                    required: "Дата рождения обязательна",
                  })}
                  disabled={!isEditing}
                />
                {errors.birthDate && (
                  <p className="text-sm text-destructive">
                    {errors.birthDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email обязателен" })}
                  disabled={!isEditing}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: "Пароль обязателен" })}
                  disabled={!isEditing}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
