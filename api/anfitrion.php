<!DOCTYPE html>

<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
    
    <title>CASE</title>

    <link type="text/css" rel="stylesheet" href="./css/UDStyle.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"> 
   
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <link href="./css/modal.css" rel="stylesheet">
 

    <script type="text/javascript" src="./js/Core.js"></script>
    <script type="text/javascript" src="./js/Modules.js"></script>
    <script type="text/javascript" src="./js/Aplication.js"></script>


    <script src="https://cdn.ably.com/lib/ably.min-1.js"></script>

    <script type="text/javascript" src="./js/archivo.js"></script>
    <script type="text/javascript" src="./js/session.js"></script>
    
    <script type="text/javascript" src="./js/socket.js"></script> 

    <script type="text/javascript" src="./js/modal.js"></script> 


    <script type="text/javascript" src="./js/atributo.js"></script> 
    <script type="text/javascript" src="./js/clase.js"></script> 

    <script type="text/javascript" src="./js/relacion.js"></script> 
    <script type="text/javascript" src="./js/agregacion.js"></script> 
    <script type="text/javascript" src="./js/asociacion.js"></script> 
    <script type="text/javascript" src="./js/composicion.js"></script> 
    <script type="text/javascript" src="./js/generalizacion.js"></script> 

    <script type="text/javascript" src="./js/diagrama.js"></script> 


    <script type="text/javascript" src="./js/timeline.js"></script> 
    <script type="text/javascript" src="./js/fragments.js"></script> 
    <script type="text/javascript" src="./js/mensaje.js"></script> 
    <script type="text/javascript" src="./js/digramaSecuencia.js"></script> 


    
  </head>
  
  <body>

    
  	
	
    <div id="umldiagram">   
        <div>
          
          <button id="lnombre" type="button" class="btn btn-secondary">anonimous</button>
          
        </div>

      
        <div class="btn-group" role="group">

          
          
          
              <button id="iniciar" class="btn btn-info">Conectar</button>

              <button id="descargar" class="btn btn-success">Guardar Archivo</button>

              <button id="subir" class="btn btn-success ">Cargar Archivo</button>
              <input id="archivo" name="archivo" type="file" hidden accept="xml/*"><!-- receptor de archivos-->

              <!--<button id="bdatabase" class="btn btn-secondary ">Generar Base de datos</button>
              <button id="bvistas" class="btn btn-secondary ">Generar Vistas</button>--->

              <!--<button id="codigo" class="btn btn-light">Generar Codigo</button>-->
              <input type="file" id="folderInput" webkitdirectory multiple hidden>
              <button id="backend" class="btn btn-light "> Generar Backend</button>
              <button id="architect" class="btn btn-warning"> Generar XML</button>
              
              <button id="finalizar" class="btn btn-dark">Desconectar</button>
              <button id="borrar" class="btn btn-danger">Borrar Diagrama</button>
        
        </div>

          <!--cuadro modal-->
      <div id="myModal" class="modal">

        <div class="modal-content">

          <div class="header">
            <h1>Conectarse</h1>
          </div>

          <label for="uname">Nombre</label>    
          <input type="text" name="uname" id="mname">
          
          <label for="user">Usuario</label>    
          <input type="text" name="user" id="muser">

          <label for="password">Password</label>
          <input type="text" name="password" id="mpassword">

          <input type="hidden" value="anfitrion" id="mrol">

          <div class="footer">

            <button id="maceptar" class="btn btn-info">Aceptar</button>
            <button id="mcerrar" class="btn btn-dark">Cancelar</button>

          </div>

        </div>

      </div>
      <!--cuadro modal-->


      <!--generar base de datos-->
    <div id="database" class="modal">

      <div class="modal-content">

        <div class="header">
          <h1>Generar Base de Datos</h1>
        </div>
        
        <label for="nombre">Nombre</label>    
        <input type="text" name="nombre" id="mnombre">
      
        <label for="mtipo">Tipo </label>
        <select name="mtipo" id="mtipo">
          <option value="oracle" selected>Oracle</option> 
          <option value="postgressql">PostgreSQL</option>
        </select>

        <div class="footer">

          <button id="confirmar" class="btn btn-primary">Aceptar</button>
          <button id="cancelar" class="btn btn-danger">Cancelar</button>

        </div>

      </div>


    </div>
      <!--generar base de datos-->





      <!--generar backend-->
    <div id="dbpostgres" class="modal">

      <div class="modal-content">

        <div class="header">
          <h1>Generar Backend</h1>
        </div>
        
        <label for="dbnombre">Nombre de la Base de Datos</label>    
        <input type="text" name="dbnombre" id="dbnombre">

        <div class="footer">

          <button id="dbconfirmar" class="btn btn-primary">Aceptar</button>
          <button id="dbcancelar" class="btn btn-danger">Cancelar</button>

        </div>

      </div>


    </div>
      <!--generar backend-->





      <!--generar codigo-->
    <div id="lenguaje" class="modal">

        <div class="modal-content">

          <div class="header">
            <h1>Generar codigo</h1>
          </div>
        
          <label for="lentipo">Tipo </label>
          <select name="lentipo" id="lentipo">
            <option value="java" selected>JAVA</option> 
            <option value="javascript">JAVASCRIPT</option>
            <option value="php">PHP</option>
            <option value="python">PYTHON</option>
          </select>

          <div class="footer">

            <button id="lenconfirmar" class="btn btn-primary">Aceptar</button>
            <button id="lencancelar" class="btn btn-danger">Cancelar</button>

          </div>

        </div>


    </div>

  
      <!--generar codigo-->
</div>

<div id="miDiv" >
  <ul id="miLista" class="btn-group">
  </ul>
</div>
      
<script type="text/javascript" src="./js/script.js"></script>


</body>
</html>