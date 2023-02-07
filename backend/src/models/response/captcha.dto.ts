class CaptchaResponse {
  public data: Captcha;
  public msg: string;
  public status: string;
}

class CaptchaVerifyResponse {
  public msg: string;
  public status: string;
}

class Captcha {
  public captchaImage: string;
  public captchaToken: string;
}

export default CaptchaResponse;
export { Captcha, CaptchaVerifyResponse };
