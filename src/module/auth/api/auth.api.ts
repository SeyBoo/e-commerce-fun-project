import { useRouter } from "next/router";
import { useMutation, UseMutationResult } from "react-query";
import { postFromApi } from "../../../common/api/config";
import { useSnack } from "../../../common/hooks/useSnackBar";
import { setToken } from "../store/slice";
import { PostUserPayloadResponse, SignInProps } from "../types/auth.interface";
import { AuthApiRoutes } from "./auth.enum";
import { useAppDispatch } from "../../../common/hooks/store";

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
    const data: PostUserPayloadResponse = await postFromApi(
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
