export default class ProfileResponse {
  public description: null | string;
  /**
   * unique
   */
  public email: string;
  /**
   * invisible immutable unique identifier, unique
   */
  public id: string;
  /**
   * unique
   */
  public username: string;
  public wallet: null | string;
}

export interface UserResponse {
  msg: string;
  status: string;
}
