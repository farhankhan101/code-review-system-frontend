import { ref, computed } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import JwtService from "@/core/services/JwtService";
// Removed unused import: import { type BaseAccount } from "./accounts";
import { jwtDecode } from "jwt-decode";
import axios, { AxiosError } from "axios";
import { processErrors } from "@/core/helpers/processing";
import router from "@/router";
import { useRouter } from 'vue-router';

export interface User {
  id: number;
  username: string;
  email: string;
  access_token?: string;  // Added missing property
  refresh_token?: string; // Added missing property
  // mobile_number?: string;
}

export interface Credentials {
  account: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const router = useRouter();

  const isAuthenticated = computed(() => {
    return (Object.keys(user.value).length>0 && JwtService.getAccessToken() !== '' && JwtService.getRefreshToken() !== '');
  });
  
  const authModule = ref<"login" | "signup" | "resetPassword" | "warning">("login");

  const switchAuthModule = (module: "login" | "signup" | "resetPassword" | "warning") => {
    authModule.value = module;
  }

  const setUser = (_user: User) => {
    user.value = _user;
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  function setAuth(authUser: User, modifyTokens: boolean = true) {
    setUser(authUser);
    errors.value = {};
    
    if (modifyTokens) {
      JwtService.saveAccessToken(authUser.access_token || '');
      JwtService.saveRefreshToken(authUser.refresh_token || '');
    }
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    user.value = {} as User;
    errors.value = [];
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    JwtService.destroyTokens();
    localStorage.removeItem('user');
    router.push({path: "/auth", hash: "#login"});
  }

  async function signup(signupData: SignupData) {
    try {
      const response = await ApiService.post("/api/v2/user/create_user/", {
        username: signupData.username,
        email: signupData.email,
        password1: signupData.password,
        password2: signupData.password_confirmation
      });
      
      try {
        await login({account: signupData.username, password: signupData.password});
      } catch (error) {
        setError({ title: "Signup Successful but failed to login!", message: "Please reload the page and try again or contact FlexUp support." });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        let errors = processErrors(error.response.data);
        setError({ title: "Server returned an error!", message: errors });
      } else {
        if(error.message && error.message == 'Network Error'){
          setError({ title: "Error!", message: error.message });
        }else{
          setError({ title: "An unknown error has occured!", message: "Please reload the page and try again or contact FlexUp support." });
        }
      }
    }
  }

  async function login(credentials: Credentials) {
    try {
      const response = await ApiService.post("/api/v2/user/auth/obtain_token/", {
        account: credentials.account,
        password: credentials.password,
      })
      
      const authUser: User = {
        ...response.data.user,
        access_token: response.data.access,
        refresh_token: response.data.refresh,
      };

      setAuth(authUser);
    } catch (error: AxiosError|any) {
      if (error.message == "Network Error"){
        setError({ title: "Error!", message: error.message });
      } else {
        if (error?.response.status === 401) {
          setError({ title: "Sorry, can't sign you in...", message: 'The username and/or password you provided are in correct.' });
        } else {
          setError({ title: "An unknown error has occured!", message: "Please reload the page and try again or contact FlexUp support." });
        }
      }
    }
  }

  function logout() {
    purgeAuth();
  }

  function forgotPassword() {
    // Forgot password logic removed
  }

  interface JwtPayload {
    exp: number;
  }

  const getUser = () => {
    return user.value;
  }
  
  function verifyAuth() {
    const token = JwtService.getAccessToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;
  
        if (decodedToken.exp > currentTime) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }

  async function fetchUserData() {
    try {
      const response = await ApiService.get(`/api/v2/user/user/${user.value.id}`);
      const authUser = response.data as User;
      setAuth(authUser, false);
    } catch (error) {
      purgeAuth();
    }
  }

  function loadUserFromLocalStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const authUser = JSON.parse(storedUser) as User;
        setAuth(authUser, false);
      } catch (error) {
        purgeAuth();
      }
    } else {
      purgeAuth();
    }
  }

  // Load user from local storage when the store is initialized
  loadUserFromLocalStorage();

  return {
    errors,
    user, getUser, setUser,
    isAuthenticated,
    signup,
    login,
    logout,
    forgotPassword,
    verifyAuth,
    authModule, switchAuthModule,
    fetchUserData,
  };
});