declare namespace User {
  // 用户账号和密码
  type AccountLogin = {
    account?: string;
    password?: string;
  };

  type Token = {
    token: string;
  };

  type UserInfo = {
    username: string;
    age: Number;
    user_type: boolean; // true:管理员 false:普通用户
    nickname: string;
    user_phone: string;
    user_email: string;
    full_name: string;
    scopes: string[];
    user_status: boolean;
    header_img: string;
    sex: string;
  };

  type InitState = {
    token: string;
    userInfo?: UserInfo | undefined | {};
  };

  export interface ResLogin extends ApiBase.Base {
    date: Token;
  }

  export interface ResUserInfo extends ApiBase.Base {
    data: UserInfo;
  }
}
