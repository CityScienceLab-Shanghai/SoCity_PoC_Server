class CaptchaResponse {
  public data: Captcha;
  public msg: string;
  public status: number;
}

class CaptchaVerifyResponse {
  public msg: string;
  public status: number;
}

class Captcha {
  public captchaImage: string;
  public captchaToken: string;
}

export default CaptchaResponse;
export { Captcha, CaptchaVerifyResponse };
