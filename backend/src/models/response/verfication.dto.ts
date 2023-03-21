class VerificationResponse {
  public data: Verification;
  public msg: string;
  public status: number;
}

class Verification {
  public codeToken: string;
}

class VerificationVerifyResponse {
  public msg: string;
  public status: number;
}

export default VerificationResponse;
export { Verification, VerificationVerifyResponse };
