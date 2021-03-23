export interface UpdateUserInterface {
  id: number;
  userName?: string;
  password?: string;
  nickName?: string;
  createDate?: string;
  headImage?: string;
}

export interface LoginUser {
  userName: string,
  password: string
}