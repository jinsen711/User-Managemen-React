import request from 'utils/request';
import { AxiosResponse } from 'axios';

// 用户账号和密码
interface AccountLogin {
  username: string;
  password: string;
}

// IResult 为响应模块
interface ReponseBase {
  code: number;
  data: any;
}

interface ReposeToken {
  token: string;
}

export interface IResult extends ReponseBase {
  data: ReposeToken;
}

// 登录
export const accountLogin = async (accountLogin: AccountLogin): Promise<IResult> => {
  const result: IResult = await request.post('/api/v1/admin/user/account/login', accountLogin);
  return result;
};
