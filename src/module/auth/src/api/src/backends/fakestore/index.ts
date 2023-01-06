import { postFromApi } from "@common/api";
import { AuthApiRoutes } from "@module/auth";
import { SignInProps, PostUserPayloadResponse } from "@module/auth/src/types";
import { AuthBackend } from "..";

export default class FakeStoreBackend implements AuthBackend {
  async signIn(credentials: SignInProps): Promise<PostUserPayloadResponse> {
    const data: PostUserPayloadResponse = await postFromApi<SignInProps>(
      AuthApiRoutes.SIGN_IN,
      { ...credentials }
    );
    return data;
  }
}
