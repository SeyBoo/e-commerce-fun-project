import { useRouter } from "next/router";
import { useMutation, UseMutationResult } from "react-query";
import { postFromApi } from "@common/api";
import { useAppDispatch, useSnack } from "@common/hooks";
import { PostUserPayloadResponse, SignInProps, setToken } from "@module/auth";
import { AuthApiRoutes } from "./auth.enum";

export const useSignIn = (): UseMutationResult<
  PostUserPayloadResponse,
  unknown,
  SignInProps,
  unknown
> => {
  const setSnackBar = useSnack();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const postUserPayload = async (body: SignInProps) => {
    const data: PostUserPayloadResponse = await postFromApi<SignInProps>(
      AuthApiRoutes.SIGN_IN,
      { ...body }
    );
    return data;
  };

  return useMutation((body: SignInProps) => postUserPayload(body), {
    onSuccess(data: PostUserPayloadResponse) {
      dispatch(setToken({ access_token: data.token }));
      router.push("/cart");
    },
    onError() {
      setSnackBar({ title: "Couldn't log you in.", type: "error" });
    },
  });
};
