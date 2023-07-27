const createJwtManager = () => {
  if (typeof window !== "undefined") {
    let jwtToken = localStorage.getItem("token");
    const get = () => jwtToken;
    const set = (token: string) => {
      jwtToken = token;
      localStorage.setItem("token", token);
      return true;
    };

    const clear = () => {
      jwtToken = null;
      localStorage.removeItem("token");
      return true;
    };

    return {
      set,
      get,
      clear,
    };
  }
  return;
};

export const jwtManager = createJwtManager();
