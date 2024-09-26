import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DoLogin, GetUserInfo } from 'services/login/user';
import { TOKEN_NAME } from 'utils/request';

const namespace = 'user';

const initialState = {
  token: localStorage.getItem(TOKEN_NAME) || 'main_token', // 默认token不走权限
  userInfo: {},
};

// login
export const login = createAsyncThunk(`${namespace}/login`, async (userInfo: Record<string, unknown>) => {
  const mockLogin = async (userInfo: Record<string, unknown>) => {
    // 登录
    const result = await DoLogin(userInfo);
    return result;
  };

  const res = await mockLogin(userInfo);
  // 如果登录成功，返回token
  if (res.code === 0) {
    return res.data.token;
  }
  // 触发 reject
  throw res;
});

// getUserInfo
export const getUserInfo = createAsyncThunk(`${namespace}/getUserInfo`, async () => {
  const mockRemoteUserInfo = async () => {
    const result = await GetUserInfo();
    return result;
  };

  const res = await mockRemoteUserInfo();
  // 如果获取用户信息成功，返回用户信息
  if (res.code === 0) {
    return res.data;
  }
  // 触发 reject
  throw res;
});

const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(TOKEN_NAME);
      state.token = '';
      state.userInfo = {};
    },
    remove: (state) => {
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem(TOKEN_NAME, action.payload);

        state.token = action.payload;
      })
      .addCase(login.rejected, (state, { error }) => {
        state.token = '';

        // MessagePlugin.error(error.message || '登录失败, 未知错误');
        throw error;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, { error }) => {
        state.userInfo = {};

        // MessagePlugin.error(error.message || '获取用户信息失败, 未知错误');
        throw error;
      });
  },
});

export const selectListBase = (state: RootState) => state.listBase;

export const { logout, remove } = userSlice.actions;

export default userSlice.reducer;
