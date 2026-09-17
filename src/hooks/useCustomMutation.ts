import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { sileo } from "sileo";

export type CustomMutationOptions<
  TData,
  TVariables,
  TContext = unknown
> = Omit<
  UseMutationOptions<TData, Error, TVariables, TContext>,
  "mutationFn"
> & {
  mutationFn: (variables: TVariables) => Promise<TData>;
  /**
   * When true, disables the automatic default Sileo error toast inside this hook.
   * Callers can still provide their own custom `onError` callback in options,
   * which will always be called regardless of this flag.
   * @default false
   */
  disableDefaultErrorToast?: boolean;
};

export function useCustomMutation<
  TData = unknown,
  TVariables = unknown,
  TContext = unknown
>({
  mutationFn,
  disableDefaultErrorToast = false,
  onError,
  ...mutationOptions
}: CustomMutationOptions<TData, TVariables, TContext>): UseMutationResult<
  TData,
  Error,
  TVariables,
  TContext
> {
  const mutationResult = useMutation<TData, Error, TVariables, TContext>({
    ...mutationOptions,
    mutationFn,
    onError: (error, variables, onMutateResult, context) => {
      if (!disableDefaultErrorToast) {
        const message =
          error instanceof Error ? error.message : "حدث خطأ غير متوقع";
        sileo.error({
          title: "خطأ في العملية",
          description: message,
        });
      }

      // External onError callback always runs
      onError?.(error, variables, onMutateResult, context);
    },
  });

  return mutationResult;
}
