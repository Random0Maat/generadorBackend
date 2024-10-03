
var ws;
var conexion=false;
var cuenta;


function iniciarWebSocket(session,sala,ap){
	
	cuenta=session;

	let ably1 = new Ably.Realtime('B5A6Bw.JnUAHg:1SjcEJyBCMV38QAguE1E5QNNrxkwP-YfCTqfji4s9ZE');

	let channel1 = ably1.channels.get(session.usuario);

	  ws = {
		ably: ably1,
		channel: channel1
	  };

	  ws.ably.connection.on('connected', () => {
		//console.log('Connected to Ably!');
		onOpen(ws,session);
	});


	ws.channel.subscribe('ruta', (message) => {
		// Comprobar si el mensaje fue enviado por este cliente

		  onMessage(ws,session,sala,ap,message);
		
	});

    

	ws.ably.connection.on('disconnected', () => {
		onClose();
	});
}

function clear(){

	if(conexion){
			
		ws.channel.publish('ruta',JSON.stringify({"borrar":true}));	
		
	}

}


function cerrarWebSocket(session){

	if(conexion){
		
		ws.channel.publish('ruta',JSON.stringify({"cerrar":session.registro}));/////invitado?	
		ws.ably.close();
	}

}


function enviarMensaje(ap){
    
    if(conexion){
		
		if(ap){
			
			ws.channel.publish('ruta',JSON.stringify({"Registro":cuenta.registro,"Contenido":ap.getCurrentXMLString()}));/////invitado	
		}

      
    }
    
}

function onOpen(ws,session){

	conexion=true;
	alert("conectado");//ok

	if(session.registro<0){

		ws.channel.publish('ruta', JSON.stringify({"ID":session.registro,"passwd":session.password}));/////invitado	
		
		

	}

}

function onMessage(ws,session,sala,ap,evt){

	var objeto= JSON.parse(evt.data);

		if(conexion)
		{
			if(objeto.Contenido){//ambos

				if(session.registro>=0){

					if(ap){
						

						if(session.registro!=objeto.Registro){
							ap._delDiagram();
							ap.setXMLString(objeto.Contenido);	
						}
					
					}
					

				}  

            }else if(objeto.ID){
				
				
				if(objeto.ID<0){
					
					if (session.isAnfitrion()){//anfitrion
						

						if(objeto.passwd===session.password){
							
							let reg=sala.length;
							addUsuario2(sala,reg);
							
						  ws.channel.publish('ruta',JSON.stringify({"reg":reg}));//confirmacion

					    }else{

							ws.channel.publish('ruta',JSON.stringify({"exit":true}));/////no confirmado

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
				ws.ably.close();
			}else if(objeto.borrar){
				ap._delDiagram();
			}

			
		}

}

function onClose(){

	conexion=false;
	alert("conexion cerrada");

        
}

