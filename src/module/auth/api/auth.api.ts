import { useMutation, UseMutationResult } from "react-query";
import { postFromApi } from "../../../common/api/config";
import { PostUserPayloadResponse, SignInProps } from "../types/auth.interface";
import { AuthApiRoutes } from "./auth.enum";
import { useAppDispatch } from "../../../common/hooks/store";

export const useSignIn = (): UseMutationResult<
  PostUserPayloadResponse,
  unknown,
  SignInProps,
  unknown
> => {
  const dispatch = useAppDispatch();

  const postUserPayload = async (body: SignInProps) => {
    const data: PostUserPayloadResponse = await postFromApi(
      AuthApiRoutes.SIGN_IN,
      { ...body }
    );
    return data;
  };

  return useMutation((body: SignInProps) => postUserPayload(body), {
    onError() {
      setSnackBar({ title: "Couldn't log you in.", type: "error" });
    },
  });
};
