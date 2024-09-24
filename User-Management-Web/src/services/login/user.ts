import request from 'utils/request';

/**
 * @description 用户登录
 * @author jin
 * @date 24/09/2024
 * @param {User.AccountLogin} data {account: string, password: string}
 * @returns {Promise<User.ResLogin>}
 */
export const DoLogin = async (data: User.AccountLogin): Promise<User.ResLogin> =>
  request.post('api/v1/admin/user/account/login', data);

/**
 * @description 获取当前用户信息
 * @author jin
 * @date 24/09/2024
 * @returns {Promise<User.ResUserInfo>}
 */
export const GetUserInfo = async (): Promise<User.ResUserInfo> => request.get('api/v1/admin/user/info');
