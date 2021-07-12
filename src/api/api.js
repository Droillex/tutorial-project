import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  headers: { "API-KEY": "b79eb532-3a88-4f14-a7bb-0f00224794b2" },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const UsersAPI = {
  getUsers(currentPage = 1, usersPerPage = 8) {
    return instance.get(`users?page=${currentPage}&count=${usersPerPage}`);
  },

  followUser(userId) {
    return instance.post(`follow/${userId}`).then((response) => response.data);
  },

  unfollowUser(userId) {
    return instance
      .delete(`follow/${userId}`)
      .then((response) => response.data);
  },
};

export const ProfileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`);
    // return instance.get(`profile/${userId}`).then((response) => response.data);
  },

  getUserStatus(userId) {
    return instance
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },

  updateUserStatus(status) {
    return instance
      .put(`profile/status/`, { status })
      .then((response) => response.data);
  },
  updateProfilePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile);

    return instance
      .put(`profile/photo/`, formData)
      .then((response) => response.data.data);
  },
};

export const AuthAPI = {
  getAuth() {
    return instance.get(`auth/me`).then((response) => response.data);
  },

  postLogin(data) {
    return instance.post("auth/login", data);
  },

  logout() {
    return instance.delete("auth/login");
  },

  getCaptcha() {
    return instance.get(`/security/get-captcha-url`);
  },
};

export const MessagesAPI = {
  getMessages(userId) {
    return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
      fakeMessages()
    );
  },
};

const fakeMessages = () => ({
  data: {
    statusCode: 0,
    messages: [
      { text: "sample message", date: "02/02/2021", my: false },
      { text: "yes, indeed", date: "02/02/2021", my: true },
    ],
  },
});
