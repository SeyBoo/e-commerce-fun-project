interface AuthState {
  access_token: string | null;
}

const initialState: AuthState = {
  access_token: null,
};

export default initialState;
