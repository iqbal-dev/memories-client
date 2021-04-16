import { AUTH, LOGOUT } from "../constants/actionType";
import * as api from "../api";
export const logout = (history) => (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
    history.push("/");
  } catch (error) {}
};

export const googleSignIn = (result, token, history) => (dispatch) => {
  try {
    dispatch({ type: AUTH, data: { result, token } });
    history.push("/");
  } catch (error) {}
};

export const signin = (formData, router) => async (dispatch) => {
  try {
    debugger;
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log("data", data);
    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
