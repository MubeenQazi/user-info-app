export interface UserData {
  userName: string,
  fullName: string,
  lastLogin: String,
  enabled: boolean
  }
  export interface UserDataWrapper { // renamed from ITrueFalse
    userList: UserData[];
  }