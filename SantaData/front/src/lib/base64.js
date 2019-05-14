function Base64() {}

Base64.encode = function(data) {
  return(
    btoa(JSON.stringify(data))
  );
};

export default Base64;