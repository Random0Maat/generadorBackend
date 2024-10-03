<!DOCTYPE html>

<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
    
    <title>CASE</title>

    <link type="text/css" rel="stylesheet" href="./css/UDStyle.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,">  

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
    
    
    
  </head>
  
  <body>
  	
	
    <div id="umldiagram">  
      
      <div>
          
        <button id="lnombre" type="button" class="btn btn-secondary">anonimous</button>
        
      </div> 

      <div class="btn-group">

        

        <button id="iniciar" class="btn btn-info">Conectar</button>

        <button id="finalizar" class="btn btn-dark">Desconectar</button>
      
      </div>


      <div id="myModal" class="modal">

        

<!--cuadro modal-->
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

          <input type="hidden" value="invitado" id="mrol">

          <div class="footer">

            <button id="maceptar" class="btn btn-info">Aceptar</button>
            <button id="mcerrar" class="btn btn-dark">Cancelar</button>

          </div>

        </div>

        

      </div>
<!--cuadro modal-->

      
<script type="text/javascript" src="./js/script.js"></script>
      
     
      
   
</body>
</html>