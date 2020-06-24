function run() {
    new Vue({
      el: '#additem',
      data: {
        id: 'default',
        vinyl: {},
        pizza_pic: '',
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");


      },
      methods: {
          add:function(){
            if(this.vinyl.img !=undefined){
                console.log(this.vinyl)
            axios.put('http://localhost:3000/vinyls', this.vinyl).then(response => { console.log(response) })
            }  
        },

          onFileSelected(event) {
            const reader = new FileReader();
            this.selectedFile = event.target.files[0]
            reader.onloadend = () => {

            var strImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
            this.vinyl.img = strImage
            
            }
            reader.readAsDataURL(this.selectedFile);
        },

      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  