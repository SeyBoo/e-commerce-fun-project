import { useRouter } from "next/router";
import { useMutation, UseMutationResult } from "react-query";
import { useAppDispatch, useSnack } from "@common/hooks";
import { PostUserPayloadResponse, SignInProps, setToken } from "@module/auth";
import { getAuthBackend } from "./backends";

export const useSignIn = (): UseMutationResult<
  PostUserPayloadResponse,
  Error,
  SignInProps,
  unknown
> => {
  const setSnackBar = useSnack();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const signInUser = async (
    crendentials: SignInProps
  ): Promise<PostUserPayloadResponse> => {
    const authBackend = await getAuthBackend();
    return authBackend.signIn(crendentials);
  };

  return useMutation((crendentials: SignInProps) => signInUser(crendentials), {
    onSuccess(data: PostUserPayloadResponse) {
      dispatch(setToken({ access_token: data.token }));
      router.push("/cart");
    },
    onError() {
      setSnackBar({ title: "Couldn't log you in.", type: "error" });
    },
  });
};
