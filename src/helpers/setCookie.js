export function setCookie(name, array) {
    const jsonStr = JSON.stringify(array);
    document.cookie = `${name}=${jsonStr}; path=/`;
  }