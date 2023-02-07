class LoginResponse {
  public data: LoginToken;
  public msg: string;
  public status: string;
}

class LoginToken {
  public access_token: string;
  public expire_time: number;
}

export default LoginResponse;
export { LoginToken };
