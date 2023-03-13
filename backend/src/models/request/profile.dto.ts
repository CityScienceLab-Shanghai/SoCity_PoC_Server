export default class ProfileRequest {
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

export interface UserRequest {
  description: null | string;
  /**
   * unique
   */
  email: string;
  /**
   * invisible immutable unique identifier, unique
   */
  id: string;
  password: string;
  /**
   * unique
   */
  username: string;
  wallet: null | string;
}
