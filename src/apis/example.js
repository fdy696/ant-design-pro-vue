import request from "./request";

const URL = {
  CODE: "send_code",
  LOGIN: "login",
  INITIALPASSWOED: "accounts/change_pwd"
};

export default {
  code(usercode) {
    return request(URL.CODE, "POST", usercode);
  },
  login(userinfo) {
    return request(URL.LOGIN, "POST", userinfo);
  },
  initialPassword(data) {
    return request(URL.INITIALPASSWOED, "POST", data);
  }
};
