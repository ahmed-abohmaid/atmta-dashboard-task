"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRoles } from "@/features/roles/hooks/useRoles";
import { UserWithRelations } from "@/features/users/@types/user";
import { useCreateUser } from "@/features/users/hooks/useCreateUser";
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser";
import { UserFormData, userFormSchema } from "@/features/users/schemas/userSchema";
import {
  computeEffectivePermissions,
  deriveGrantsAndRevokes,
} from "@/features/users/utils/userPermissions";

interface UseUserFormProps {
  user?: UserWithRelations | null;
  onOpenChange: (open: boolean) => void;
}

export function useUserForm({ user, onOpenChange }: UseUserFormProps) {
  const isEditing = Boolean(user);
  const { roles: availableRoles } = useRoles();
  const [step, setStep] = useState<1 | 2>(1);
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate: createUserMutate, isPending: isCreatePending } = useCreateUser();
  const { mutate: updateUserMutate, isPending: isUpdatePending } = useUpdateUser();
  const isPending = isCreatePending || isUpdatePending;

  const initialPerms = user
    ? computeEffectivePermissions(
        availableRoles,
        user.roles || [],
        user.extraGrants || [],
        user.extraRevokes || []
      )
    : [];

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema(isEditing)),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          password: "",
          phone: user.phone,
          photo: user.photo || "",
          status: user.status,
          roles: user.roles || [],
          effectivePermissions: initialPerms,
        }
      : {
          name: "",
          email: "",
          password: "",
          phone: "",
          photo: "",
          status: "active",
          roles: [],
          effectivePermissions: [],
        },
  });

  const { setValue, trigger } = form;

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setStep(1);
      setServerError(null);
    }
    onOpenChange(newOpen);
  };

  const handleRolesChange = (newRoles: string[]) => {
    const updatedPerms = computeEffectivePermissions(
      availableRoles,
      newRoles,
      user?.extraGrants || [],
      user?.extraRevokes || []
    );
    setValue("effectivePermissions", updatedPerms);
  };

  const handleNextStep = async () => {
    setServerError(null);
    const isValid = await trigger(["name", "email", "password", "phone", "status", "roles"]);
    if (!isValid) return;
    setStep(2);
  };

  const onSuccess = () => {
    setStep(1);
    onOpenChange(false);
  };

  const onError = (err: unknown, fallback: string) => {
    setServerError(getErrorMessage(err, fallback));
  };

  const onSubmit = (data: UserFormData) => {
    setServerError(null);
    const { extraGrants, extraRevokes } = deriveGrantsAndRevokes(
      availableRoles,
      data.roles,
      data.effectivePermissions
    );

    if (isEditing && user) {
      updateUserMutate(
        {
          id: user.id,
          name: data.name,
          email: data.email,
          password: data.password || undefined,
          phone: data.phone,
          photo: data.photo,
          status: data.status,
          roles: data.roles,
          extraGrants,
          extraRevokes,
        },
        { onSuccess, onError: (err) => onError(err, "فشل تحديث المستخدم") }
      );
    } else {
      createUserMutate(
        {
          name: data.name,
          email: data.email,
          password: data.password || "",
          phone: data.phone,
          photo: data.photo,
          status: data.status,
          roles: data.roles,
          extraGrants,
          extraRevokes,
        },
        { onSuccess, onError: (err) => onError(err, "فشل إنشاء المستخدم") }
      );
    }
  };

  const selectedRoles = useWatch({ control: form.control, name: "roles" }) || [];
  const isSuperAdminRole = selectedRoles.includes("role_super_admin");
  const selectedRoleNames = availableRoles
    .filter((r) => selectedRoles.includes(r.id))
    .map((r) => r.name);

  return {
    form,
    step,
    setStep,
    isEditing,
    isPending,
    serverError,
    availableRoles,
    isSuperAdminRole,
    selectedRoleNames,
    handleRolesChange,
    handleNextStep,
    handleOpenChange,
    onSubmit,
  };
}
