export const get = key => {
  if (!key) return false;
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (e) {
    throw new Error(e);
  }
};

export const set = (key, value) => {
  if (!key || !value) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    throw new Error(e);
  }
};
