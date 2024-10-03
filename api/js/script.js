
window.onload = function() {//bvistas

    var width =window.innerWidth*0.85; 
    var height = window.innerHeight*0.85;

    var app = new Application( { id: 'umldiagram', width: width, height: height } );  
    
    var session=null;
    var sala=[];//sala
    //bdatabase
    
    var descargar = document.getElementById("descargar");
    var archivo = document.getElementById("archivo");
    var subir = document.getElementById("subir"); 
    var lnombre = document.getElementById("lnombre"); 
    var codigo = document.getElementById("codigo"); 
    var backend = document.getElementById("backend");
    var architect = document.getElementById("architect");

    var pgnombre="";
    

    var enlaces = document.getElementById("miLista");
      

	if(archivo!=null){
    archivo.addEventListener("change", function(){myarchivo(app);});
	}
  
	if(subir!=null){
    subir.addEventListener("click", load);

	}
	
	if(descargar!=null){
    descargar.addEventListener("click",function(){downloadXML(app);} );
	}

    if(codigo!=null){
        codigo.addEventListener("click",function(){generarCodigo(app);} );
    }

    if(architect!=null){
        architect.addEventListener("click",function(){console.log(app)} );
    }

    if(backend!=null){
        backend.addEventListener("click", function(){
    
            if(app._selected!=null){
            displayBackend();
            }
    
        });
    
        }
    
        function displayBackend(){
    
            dbpostgres.style.display = "block";
            dbnombre.value = "";
                
        }

    
    
       

    var modal = document.getElementById("myModal");
    var iniciar = document.getElementById("iniciar");
    var baceptar = document.getElementById("maceptar");
    var bcerrar = document.getElementById("mcerrar");
    var iuser = document.getElementById("muser");
    var ipassword = document.getElementById("mpassword");
    var irol= document.getElementById("mrol");
    var iname= document.getElementById("mname");


    var finalizar = document.getElementById("finalizar");

    
    bcerrar.addEventListener("click", cerrarModal);


    iniciar.onclick = display;
    
    baceptar.addEventListener("click",function(){iniciarSession(finalizar,sala,session,app)} );

    

    var canvas=document.getElementsByTagName("canvas")[1];
    canvas.addEventListener("mousemove",function(){onChange(app,session)});
    canvas.addEventListener("click",function(){onChange(app,session)});

////////modal
    var database = document.getElementById("database");
    var bconfirmar = document.getElementById("confirmar");
    var bcancelar = document.getElementById("cancelar");
    var inombre = document.getElementById("mnombre");
    var itipo = document.getElementById("mtipo");

    if(bcancelar!=null){
        bcancelar.addEventListener("click", cerrar);
    }

    if(bconfirmar!=null){
        bconfirmar.addEventListener("click", confirmar);
    }
    
    
   
    function cerrar(){
        database.style.display = "none";
        inombre.value = "";
        itipo.value = "";
    }

    function confirmar(){

        database.style.display = "none";
        let nombre = inombre.value;
        let tipo = itipo.value;

        
        if(app._selected!=null){

            let s= app.getCurrentXMLString();

            let diagrama=new Diagrama();
            cargarDiagrama(diagrama,s);//////////////////////////////////////////////////////////////////////////////
            
           let contenido= generarDataBase(diagrama,nombre,tipo); 

           if(contenido!="")
           downloadSQL(contenido);

        }
        

    }

    /////////modal






    ///////////////modal postgres//////////
    
    var dbpostgres = document.getElementById("dbpostgres");
    var dbconfirmar = document.getElementById("dbconfirmar");
    var dbcancelar = document.getElementById("dbcancelar");
    var dbnombre = document.getElementById("dbnombre");

    if(dbcancelar!=null){
        dbcancelar.addEventListener("click", cerrar);
    }

    if(dbconfirmar!=null){
        dbconfirmar.addEventListener("click", confirmar);
    }
    
    
   
    function cerrar(){
        dbpostgres.style.display = "none";
        dbnombre.value = "";
       
    }

    function confirmar(){

        dbpostgres.style.display = "none";
        pgnombre = dbnombre.value;

        document.getElementById('folderInput').click();
        
        

        
        /*if(app._selected!=null){

            let s= app.getCurrentXMLString();

            let diagrama=new Diagrama();
            cargarDiagrama(diagrama,s);//////////////////////////////////////////////////////////////////////////////
            
           /*let contenido= generarDataBase(diagrama,nombre,tipo); 

           if(contenido!="")
           downloadSQL(contenido);*/

        //}*/
        

    }
    ///////////////modal postgres//////////





    ////////modal general codigo
    var lenguaje = document.getElementById("lenguaje");//////////////////////////////////////////
    var lenconfirmar = document.getElementById("lenconfirmar");
    var lencancelar = document.getElementById("lencancelar");
    
    var lentipo = document.getElementById("lentipo");

    if(lencancelar!=null){
        lencancelar.addEventListener("click", lcerrar);
    }

    if(lenconfirmar!=null){
        lenconfirmar.addEventListener("click", lconfirmar);
    }
    
    
   
    function lcerrar(){
        lenguaje.style.display = "none";
        lentipo.value = "";
    }

    function lconfirmar(){

        lenguaje.style.display = "none";
        let tipo = lentipo.value;

        
        if(app._selected!=null){
           
            let s= app.getCurrentXMLString();

            let diagramasecuencia=new DiagramaSecuencia();
            cargarDiagramaSecuencia(diagramasecuencia,s);

            enlaces.innerHTML = '';
            
           exportarCodigo(diagramasecuencia,tipo,enlaces);
           

        }
        

    }

    /////////modal general codigo


    var bdatabase = document.getElementById("bdatabase");
    var bvistas = document.getElementById("bvistas");

    if(bvistas!=null){
        bvistas.addEventListener("click", function(){
    
            vistas();
    
        });
    
        }

        function vistas(){   
            
            if(app._selected!=null){
    
                let s= app.getCurrentXMLString();
    
                let diagrama=new Diagrama();
                cargarDiagrama(diagrama,s);
                
                generarVistas(diagrama); 
    
               
    
            }
            
    
        }
	
	if(bdatabase!=null){
    bdatabase.addEventListener("click", function(){

        displayDataDase();

    });

	}

    function displayDataDase(){

        database.style.display = "block";
        inombre.value = "";
        itipo.value = "";

    }

    function display(){

        modal.style.display = "block";
        iuser.value = "";
        ipassword.value = "";

    }


    function iniciarSession(finalizar,sala,session,ap){

        modal.style.display = "none";
        let usuario = iuser.value;
        let password = ipassword.value;
        let rol = irol.value;
        let name= iname.value;  

        lnombre.innerHTML = iname.value;

        session=new Session(usuario, password, rol, name);

        cargarDatos(session, sala, ap);

        finalizar.addEventListener("click", function(){cerrarWebSocket(session);} );


    }


    function cerrarModal(){

    modal.style.display = "none";
    iuser.value = "";
    ipassword.value = "";

    }


    window.onclick = function(event) {

    if (event.target == modal) {
        modal.style.display = "none";
    }
    
    } 

    
   
    function onChange(ap) {

        if(change){

            if(ap._selected){
              enviarMensaje(ap);
            }
            
        }
        
        change=false;
        
    }

    var borrar = document.getElementById("borrar");///////////////

    if(borrar!=null){

        borrar.addEventListener("click",function(){borrarDiagrama(app)} );

        function borrarDiagrama(ap){

            ap._delDiagram();
            clear();
            change=false;
            enlaces.innerHTML = '';

        }


    }

    function encontrarRuta(rutas) {
        return rutas.find(cadena => cadena.includes("src/main/java/"));
    }

    function encontrarConfiguracion(rutas) {
        return rutas.find(cadena => cadena.includes("src/main/java/resources/"));
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    document.getElementById('folderInput').addEventListener('change', function(event) {
        const files = event.target.files;
        var paquete="*";
        var directorio="*";
        //console.log('Archivos seleccionados:', files);
        // Aquí puedes manejar los archivos seleccionados


        var formData = new FormData();
        var filePaths = {};

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            filePaths[file.name] = file.webkitRelativePath;
            //console.log(file.name);
            
            formData.append('archivos[]', file);
        }

        formData.append('database', pgnombre);

        // Convertir filePaths a un array de sus valores
        const filePathsArray = Object.values(filePaths);
        var encuentra = encontrarRuta(filePathsArray);
        //console.log(encuentra);
        
        var partes = encuentra.split("/");
        var partes2=encuentra.split("/");

        // Quitamos la primera y la última palabra
        partes.shift(); // Elimina la primera palabra
        
        partes.pop();   // Elimina la última palabra<input type="file" id="folderInput" webkitdirectory multiple>
        partes2.pop();
        // Unificamos todos los elementos del arreglo en una cadena
        directorio = partes2.join("/");

        // Obtenemos los tres últimos elementos del arreglo
        paquete = partes.slice(-3).join(".");


        let s= app.getCurrentXMLString();

        let diagrama=new Diagrama();
        cargarDiagrama(diagrama,s);//////////////////////////////////////////////////////////////////////////////
        //console.log(pgnombre);
        //console.log(diagrama);

        formData=generarBackend(diagrama,paquete,directorio,filePaths,formData);//--return formData------------------------
        

        fetch('upload.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(resp => {
            //console.log(resp);
        })
        .catch(error => {
            console.error('Error:', error);
        });
          

    });

    


    function generarCodigo(ap){

    ////////////////////////demo///////////////////////////////////

        if(ap._selected!=null){

            displaylenguajes();
          
        }

    ///////////////////////////////demo////////////////////////////////

    }

   
} 

function displaylenguajes(){

    lenguaje.style.display = "block";
    
    lentipo.value = "";

}