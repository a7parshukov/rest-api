async function request(url, method = "GET", body, headers = {}) {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json;charset=utf-8";
    }
    const response = await fetch(url, { method, headers, body })
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error.message)
  }
}

export default request;