
var ably;
var conexion=false;
var channel;



function iniciarWebSocket(session,sala,ap){
	
	

	 ably = new Ably.Realtime('B5A6Bw.JnUAHg:1SjcEJyBCMV38QAguE1E5QNNrxkwP-YfCTqfji4s9ZE');

	  channel = ably.channels.get(session.usuario);

	

	ably.connection.on('connected', () => {
		//console.log('Connected to Ably!');
		onOpen(channel,session);
	});

	

	channel.subscribe('ruta', (message) => {
		// Comprobar si el mensaje fue enviado por este cliente

		  onMessage(ably,channel,session,sala,ap,message)
		
	  });

	
	ably.connection.on('disconnected', () => {
		onClose();
	});
}

function clear(){

	if(conexion){
			
		channel.publish('ruta', JSON.stringify({"borrar":true}) );
		
	}

}


function cerrarWebSocket(session){

	if(conexion){
		channel.publish('ruta',JSON.stringify({"cerrar":session.registro}));/////invitado?
		//ws.close();
	}

}


function enviarMensaje(ap,sala,actualizar){
    
    if(conexion){/////////////////////
				
		channel.publish('ruta', JSON.stringify({"usuario":sala.length,"Contenido":ap.getCurrentXMLString()}) );
		actualizar=false;
      
    }
    
}

function onOpen(channel,session){

	conexion=true;
	alert("conectado");//ok

	if(session.registro<0){////////////////////////////////////////////

		channel.publish('ruta', JSON.stringify({"ID":session.registro,"passwd":session.password}));/////invitado	
		

	}

}

function onMessage(ws,channel,session,sala,ap,evt){

	var objeto= JSON.parse(evt.data);

		if(conexion)
		{
			if(objeto.Contenido){//ambos
				console.log(objeto.Contenido)

				if(session.registro>=0){
					//"usuario":session.registro
					if(actualizar){
						

						if(ap){

						ap._delDiagram();
						ap.setXMLString(objeto.Contenido);
					
						}

					}
					actualizar=true;
					
					

				}  

            }else if(objeto.ID){
				
				
				if(objeto.ID<0){
					
					if (session.isAnfitrion()){//anfitrion
						

						if(objeto.passwd===session.password){
							
							let reg=sala.length;
							addUsuario2(sala,reg);
							
							channel.publish('ruta',JSON.stringify({"reg":reg}));//confirmacion     

					    }else{

							channel.publish('ruta',JSON.stringify({"exit":true}));/////no confirmado      

						}

					} 

					

				}
                
            }else if(objeto.reg){//invitado

				if(session.registro<0){

					session.registro=objeto.reg;

				}

				
			
			}else if(objeto.cerrar){

				const index = sala.indexOf(objeto.cerrar);
				if (index > -1) { 
					
					sala.splice(index, 1); 

				}

			}else if(objeto.exit){
				ws.close();
			}else if(objeto.borrar){
				ap._delDiagram();
			}

			
		}

}

function onClose(){

	conexion=false;
	alert("conexion cerrada");

        
}

