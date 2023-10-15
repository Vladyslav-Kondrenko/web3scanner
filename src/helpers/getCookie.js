export function getCookie(name) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));
  
    if (cookieValue) {
      const jsonStr = cookieValue.split("=")[1];
      return JSON.parse(jsonStr);
    }
  
    return null;
  }
  