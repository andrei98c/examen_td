function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        vinyl: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/vinyls/'+this.id).then(
            (response) => {
                this.vinyl = response.data;
            }
        );
      },
      methods: {
        update: function(id){

            console.log(this.vinyl,id);

            return axios.post('http://localhost:3000/vinyls/'+id, this.vinyl).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );


        }
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  