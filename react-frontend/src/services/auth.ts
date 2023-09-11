import axios from "axios";

const USER_API_URL = "http://localhost:9000/user/";
// const USER_API_URL = "https://9429d5b9-a4ce-43d8-bf6b-637cc223febe.mock.pstmn.io/";

const register = (username: string, email: string, password: string) => {
  return axios.post(USER_API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username: string, password: string) => {
  return axios
    .post(USER_API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      // alert(JSON.stringify(response.data)); // for debugging purposes
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const forgotPassword = (username: string) => {
  return axios
    .post(USER_API_URL + "forgot", {
      username,
    })
    .then((response) => {
      // alert(JSON.stringify(response.data)); // for debugging purposes
      console.log(response.data);
      
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const updatePassword = (token: string, newPassword: string) => {
  return axios
    .post(USER_API_URL + "update-password", {
      token,
      newPassword
    })
    .then((response) => {
      console.log(response.data);
      
      // Depending on your logic, you may not receive a user object here.
      // If you do, then store it. Otherwise, maybe handle another action.
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
  return axios.post(USER_API_URL + "logout").then((response) => {
    return response.data;
  });
};


const getCurrentUser = (): any | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};



/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = true;
      setTimeout(callback, 100); // fake async
    },
    signout(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = false;
      setTimeout(callback, 100);
    },
  };


  const AuthService = {
    register,
    login,
    logout,
    forgotPassword,
    updatePassword,
    getCurrentUser,
    fakeAuthProvider,
  }
  
  export default AuthService;