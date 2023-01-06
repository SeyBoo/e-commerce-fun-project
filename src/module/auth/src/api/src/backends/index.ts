import { PostUserPayloadResponse, SignInProps } from "@module/auth";

export interface AuthBackend {
  signIn: (credentials: SignInProps) => Promise<PostUserPayloadResponse>;
}

let authBackend: AuthBackend | undefined = undefined;

export async function getAuthBackend(): Promise<AuthBackend> {
  if (authBackend === undefined) {
    const mod = await import(`./${process.env.NEXT_PUBLIC_AUTH_BACKEND}`);
    return new mod.default() as AuthBackend;
  }

  return authBackend;
}
