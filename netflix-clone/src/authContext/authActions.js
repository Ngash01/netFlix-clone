
export const LoginStart = ()=>({
  type: "LOGIN_START"
});

export const LoginSuccess = (user)=>({
  type: "LOGIN_SUCCESS",
  payload: user
})

export const LoginFail = ()=>({
  type: "LOGIN_FAIL"
})

// logout

export const logoutStart = ()=>({
  type: "LOG_OUT"
});

