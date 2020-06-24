var api = require('./src/api.js').app;
const fs = require('fs');
const vinylsFilepath = './src/vinyls.json';
var vinyls1 = require('./src/vinyls.json');

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/vinyls', function (request, response) {
  response.json(getvinyls());
});

api.get('/vinyls/:id', function (request, response) {
  let vinyl = getvinylById(request.params.id);
  if (vinyl) response.json(vinyl);
  response.json('not found');
});

api.put('/vinyls', function (request, response) {
  console.log(request.body)
  savevinyl(request.body);
  response.json('User was saved succesfully');
});

api.post('/vinyls/:id', function (request, response) {
  // in request o sa-mi vina un obiect de tip car care o sa aiba un anumit id
  
  console.log(request.body,request.params.id);//un obiect de tipul car actualizat pe client
  console.log(updatevinylById(request.body,request.params.id))
  // citim cars din fisier pe baza id-ului primit de la client
  // cautam daca exista indexul de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  // salvam in fisier produsele actualizate
  response.json('Vinyl was saved succesfully');
});

api.delete('/vinyls/:index', function (request, response) {
  // delete din fisier pe baza unui id
  console.log(request.params.index)
  vinyls1.splice(request.params.index,1)
  const jsonString = JSON.stringify(vinyls1,null,4)
  response.json(jsonString)
  
  fs.writeFileSync(vinylsFilepath, jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file ')
    }
                                                }
	             )
  
  
//const jsonString = JSON.stringify(cars,null,4)
  

  //response.json('Car with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getvinyls() {
  let vinyls = [];
  try {
    vinyls = JSON.parse(fs.readFileSync(vinylsFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return vinyls;
}

function savevinyl(vinyl) {
  let vinyls = getvinyls();// citire json din fisier
  let maxId = getMaxId(vinyls);  // get maximum id form cars array
  vinyl.id = maxId+1;// generare id unic
  vinyls.push(vinyl);// adaugare masina noua in array
  try {
    fs.writeFileSync(vinylsFilepath, JSON.stringify(vinyls,null,4));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}


function getMaxId(vinyls) {
  let max = 0;
  for (var i=0; i<vinyls.length;i++) {
    if(max < vinyls[i].id) {
      max = vinyls[i].id;
    }
  }
  return max;
}

function getvinylById(id){
  let vinyls = getvinyls();// citire json din fisier
  let selectedvinyl = null;
  for(var i=0; i<vinyls.length; i++) {
    if(id == vinyls[i].id) selectedvinyl = vinyls[i];
  }
  return selectedvinyl;
}

function updatevinylById(data,id){
  let vinyls = getvinyls();// citire json din fisier
  console.log(data,id)
  for(var i=0; i<vinyls.length; i++) {
    if(id == vinyls[i].id)
     vinyls[i]=data;
  }
  try {
    fs.writeFileSync(vinylsFilepath, JSON.stringify(vinyls,null,4));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
  
  
}
