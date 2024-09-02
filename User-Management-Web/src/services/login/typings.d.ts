declare namespace LOGIN {
  // 用户账号和密码
  type AccountLogin = {
    username: string;
    password: string;
  };

  // IResult 为响应模块
  type ReponseBase = {
    code: number;
    msg: string;
    data: any;
  };

  type ReposeToken = {
    token: string;
  };

  interface IResult extends ReponseBase {
    data: ReposeToken;
  }
}
