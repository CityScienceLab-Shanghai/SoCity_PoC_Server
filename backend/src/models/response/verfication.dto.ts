class VerificationResponse {
  public data: Verification;
  public msg: string;
  public status: string;
}

class Verification {
  public codeToken: string;
}

class VerificationVerifyResponse {
  public msg: string;
  public status: string;
}

export default VerificationResponse;
export { Verification, VerificationVerifyResponse };
