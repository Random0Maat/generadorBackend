
const guardarArchivoDeTexto = (contenido, nombre) => {

    const a = document.createElement("a");
  
    const archivo = new Blob([contenido], { type: 'text/xml' });

    const url = URL.createObjectURL(archivo);
    a.href = url;
    
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url);
  
}

const guardarArchivoDeSQL = (contenido, nombre) => {

  const a = document.createElement("a");

  const archivo = new Blob([contenido], { type: 'text/sql' });

  const url = URL.createObjectURL(archivo);
  a.href = url;
  
  a.download = nombre;
  a.click();
  URL.revokeObjectURL(url);

}

const guardarArchivoDeHTML = (contenido, nombre) => {

  const a = document.createElement("a");

  const archivo = new Blob([contenido], { type: 'text/html' });

  const url = URL.createObjectURL(archivo);
  a.href = url;
  
  a.download = nombre;
  a.click();
  URL.revokeObjectURL(url);

}

const guardarArchivoJava = (contenido,enlace, nombre) => {

  const a = document.createElement("a");

  const archivo = new Blob([contenido], { type: 'text/plain' });

  const url = URL.createObjectURL(archivo);
  a.href = url;
  
  a.download = nombre;
  a.textContent = nombre; 
  //a.click();
  //URL.revokeObjectURL(url);

  var nuevoElemento = document.createElement("li");
  nuevoElemento.className = "list-group-item";
  nuevoElemento.appendChild(a); // Agrega el enlace al elemento li

  enlace.appendChild(nuevoElemento);

}

const guardarArchivoJavascript = (contenido,enlace, nombre) => {

  const a = document.createElement("a");

  const archivo = new Blob([contenido], { type: 'text/plain' });

  const url = URL.createObjectURL(archivo);
  a.href = url;
  
  a.download = nombre;
  a.textContent = nombre; 
  //a.click();
  //URL.revokeObjectURL(url);

  var nuevoElemento = document.createElement("li");
  nuevoElemento.className = "list-group-item";
  nuevoElemento.appendChild(a); // Agrega el enlace al elemento li

  enlace.appendChild(nuevoElemento);

}

const guardarArchivoPhp = (contenido,enlace, nombre) => {

  const a = document.createElement("a");

  const archivo = new Blob([contenido], { type: 'text/plain' });

  const url = URL.createObjectURL(archivo);
  a.href = url;
  
  a.download = nombre;
  a.textContent = nombre; 
  //a.click();
  //URL.revokeObjectURL(url);

  var nuevoElemento = document.createElement("li");
  nuevoElemento.className = "list-group-item";
  nuevoElemento.appendChild(a); // Agrega el enlace al elemento li

  enlace.appendChild(nuevoElemento);

}

const guardarArchivoPython = (contenido,enlace, nombre) => {

  const a = document.createElement("a");

  const archivo = new Blob([contenido], { type: 'text/plain' });

  const url = URL.createObjectURL(archivo);
  a.href = url;
  
  a.download = nombre;
  a.textContent = nombre; 
  //a.click();
  //URL.revokeObjectURL(url);

  var nuevoElemento = document.createElement("li");
  nuevoElemento.className = "list-group-item";
  nuevoElemento.appendChild(a); // Agrega el enlace al elemento li

  enlace.appendChild(nuevoElemento);

}

function myarchivo(ap){
          
    var file    = document.querySelector('input[type=file]').files[0];
    
    var reader  = new FileReader();
  
    reader.onloadend = function () {
  
      ap.setXMLString(reader.result);


    }
  
    if (file) {
  
        reader.readAsText(file); 
    
    } 
  
}

function load(){
          
    archivo.click(); //funcion cual objetivo es activar el input file
          
} 

function downloadXML(ap){

    if(ap._selected!=null){
      
      guardarArchivoDeTexto(ap.getCurrentXMLString(), "archivo.xml");
    
    } 

}

function downloadSQL(contenido){

  if(contenido!=""){
    
    guardarArchivoDeSQL(contenido, "archivo.sql");
  
  } 

}

function downloadHTML(contenido,nombre){

  if((contenido!=null)&&(nombre!=null)){
    
    guardarArchivoDeHTML(contenido, nombre+".html");
  
  } 

}

function downloadJava(contenido,enlace,nombre){

  if(contenido!=""){
    
    guardarArchivoJava(contenido,enlace, nombre+".java");
  
  } 

}

function downloadJavascript(contenido,enlace,nombre){

  if(contenido!=""){
    
    guardarArchivoJavascript(contenido,enlace, nombre+".js");
  
  } 

}

function downloadPhp(contenido,enlace,nombre){

  if(contenido!=""){
    
    guardarArchivoPhp(contenido,enlace, nombre+".php");
  
  } 

}

function downloadPython(contenido,enlace,nombre){

  if(contenido!=""){
    
    guardarArchivoPython(contenido,enlace, nombre+".py");
  
  } 

}

