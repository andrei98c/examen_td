function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      vinyls: [],
      usersService: null,
      message: ''
    },
    created: function () {
      this.usersService = users();
      this.usersService.get().then(response => {(this.vinyls = response.data),console.log(response.data)});
    },
    methods: {
      deletevinyl: function(id) {
        console.log('HTTP DELETE spre backend, vinyl: '+id);
        this.usersService.remove(id).then(response => {console.log(response.data)
          this.usersService.get().then(response => (this.vinyls = response.data));
        });
       // 
      },
      addvinyl:function(){
        window.open("additem.html","_self")
      }

    }
  });

 // indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
