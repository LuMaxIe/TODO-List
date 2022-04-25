// General client for making API requests
const sendRequest = async (method, headers, endpoint=null, body=null, baseURL="http://localhost:3000") => {
  try {
    //Request set-up
    const init = {
      method,
      headers,
    }
    if(body) { Object.assign(init, {body: JSON.stringify(body)}) }
    if(endpoint) { baseURL += endpoint }
    if(!headers) { 
      delete init.headers;
    }

    //Request execution / Data handling
    const resp = await fetch(baseURL, init);
    if(method !== 'DELETE' || 'PUT') {
      const data = await resp.json();
      return data;
    }
  } catch (err) {
    console.error(err);
  }
} 

export default sendRequest
