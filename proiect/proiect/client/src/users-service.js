function users() {
  get = function () {
    return axios.get('http://localhost:3000/vinyls');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/vinyls/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
