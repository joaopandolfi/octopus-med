import axios from 'axios';
import Config from './../config.json';
import Base64 from './base64';

Post.urlData = [];
Post.data = {};

Post.command = (data) => {
  console.log("POST - DEFAULT COMMAND",data);
  return(data);
}

export function Post(route, urlData, data) {

  if(route === undefined) {
    console.log("Route missing");
    return null;
  }

  if(Post.urlData === [] && urlData !== undefined && Array.isArray(urlData)) {
    Post.urlData = urlData;
  }

  if(Post.data === {} && data !== undefined) {
    Post.data = data;
  }

  let urlComplement = "";

  for(let i = 0; i < Post.urlData.lenght ; i++) {
    urlComplement = urlComplement+Post.urlData[i]+"/";
  }

  let URL = Config.rest.routes[route]+urlComplement;

  axios.defaults.baseURL = Config.rest.baseURL;
  axios.post(
    URL,
    "data="+Base64.encode(Post.data)
  )
  .then(
    function(response) {
      if(response.request.status == 200) {
        console.log("LIB AXIOS - THEN OK:",response);
        Post.command(response.data.data);
      } else {
        console.log("LIB AXIOS - THEN FAIL:",response);
        return(null);
      }
    }
  )
  .catch(
    function(error) {
      console.log("LIB AXIOS - CATCH:",error);
      return(error);
    }
  );
}

export default Post;
