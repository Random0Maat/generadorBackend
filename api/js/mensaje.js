class Mensaje {
    constructor (nombre="mensaje", id="", origen="", destino="", timeorigen="", timedestino="") {
      this._nombre = nombre;
      this._id=id;
      this._origen=origen;
      this._destino=destino;
      this._timeorigen=timeorigen;
      this._timedestino=timedestino;
      this._x0=0;
      this._y0=0;
      this._x1=0;
      this._y1=0;
      
    }

    // Getter
    get nombre() {
       return this._nombre;
    }

    set nombre(nom) {
        return this._nombre=nom;
    }

    get id() {
        return this._id;
    }
 
    set id(cad) {
        return this._id=cad;
    }
 

    get origen() {
        return this._origen;
    }

    set origen(obj) {
        return this._origen=obj;
    }

    get destino() {
        return this._destino;
    }

    set destino(obj) {
        return this._destino=obj;
    }

    get timeorigen() {
        return this._timeorigen;
    }

    set timeorigen(obj) {
        return this._timeorigen=obj;
    }

    get timedestino() {
        return this._timedestino;
    }

    set timedestino(obj) {
        return this._timedestino=obj;
    }

    get x0() {
        return this._x0;
    }
 
    set x0(x) {
        return this._x0=x;
    }

    get y0() {
        return this._y0;
    }
 
    set y0(y) {
        return this._y0=y;
    }

    get x1() {
        return this._x1;
    }
 
    set x1(x) {
        return this._x1=x;
    }

    get y1() {
        return this._y1;
    }
 
    set y1(y) {
        return this._y1=y;
    }

    

}


function cargarMessage(message,xml,listatimeline){

    

    message.id=xml["id"].split(":")[1];//class alias
    
    let nodo=xml.childNodes.length-1;

    message.nombre=xml.childNodes[nodo]["attributes"]["value"]["nodeValue"];///message

        
            message.x0=Number(xml.childNodes[0]["attributes"]["x"]["nodeValue"]);
            message.y0=Number(xml.childNodes[0]["attributes"]["y"]["nodeValue"]);
        
            message.x1=Number(xml.childNodes[1]["attributes"]["x"]["nodeValue"]);
            message.y1=Number(xml.childNodes[1]["attributes"]["y"]["nodeValue"]);
        

        
    

    //console.log(xml.childNodes.length);


    ///////UMLCreate no utiliza intervalo de tiempo =null la asigmacion es directa de origen a destino
    ///////UMLDestroy no utiliza intervalo de tiempo =null la asigmacion es directa de origen a destino   
    ///////UMLDeleteMessage utiliza un intervalo de tiempo ,solo de origen y en el destino no se requiere.
    ////en el caso de no tenerlo asignara un origen y destino principal, luego asignara un intervalo de tiempo de origen
    
    ////UMLReplyMessage requiere intervalo de tiempo, pero solo de destino,se asinara un origen y destino principal. 
    ///en el caso de existir intervalo de tiempo de origen y destino seran asignados como origen y destino principal

    //UMLSendMessage y UMLCallMessage utilizan origen y destino principal , tambien requieren intervalos de tiempo, de origen y destino

    //"UMLCreate_1"  UMLCreate  UMLDestroy   UMLDeleteMessage  UMLReplyMessage  UMLCallMessage  UMLSendMessage
    let tipo=message.id.split("_")[0];

    listatimeline.forEach(timeline => {

        if(tipo=="UMLCreate"){

            if(inTimeLine2(timeline, message.x0,message.y0)){//true or false
                message.origen=timeline.id; 
            }
            if(inTimeLine2(timeline, message.x1,message.y1)){//true or false
                message.destino=timeline.id; 
            }

        }else if(tipo=="UMLDestroy"){

            if(inTimeLine2(timeline, message.x0,message.y0)){//true or false
                message.origen=timeline.id; 
            }
            if(inTimeLine2(timeline, message.x1,message.y1)){//true or false
                message.destino=timeline.id; 
            }
    
        }else if(tipo=="UMLDeleteMessage"){

            if(inTimeLine2(timeline, message.x0,message.y0)){//true or false
                message.origen=timeline.id; 
            }
            if(inTimeLine2(timeline, message.x1,message.y1)){//true or false
                message.destino=timeline.id; 
            }

            let timeorigen=inTimerInterval(timeline, message.x0,message.y0);

            if(timeorigen!=null)
            message.timeorigen=timeorigen.id;//resp obj
    
        }else if(tipo=="UMLReplyMessage"){

            if(inTimeLine2(timeline, message.x0,message.y0)){//true or false
                message.origen=timeline.id; 
            }
            if(inTimeLine2(timeline, message.x1,message.y1)){//true or false
                message.destino=timeline.id; 
            }

            let timeorigen=inTimerInterval(timeline, message.x0,message.y0);
            let timedestino=inTimerInterval(timeline, message.x1,message.y1);

            if(timeorigen!=null)
            message.timeorigen=timeorigen.id;//resp obj
            if(timedestino!=null)
            message.timedestino=timedestino.id;//resp obj
    
        }else if(tipo=="UMLCallMessage" || tipo=="UMLSendMessage"){

            if(inTimeLine2(timeline, message.x0,message.y0)){//true or false
                message.origen=timeline.id; 
            }
            if(inTimeLine2(timeline, message.x1,message.y1)){//true or false
                message.destino=timeline.id; 
            }

            let timeorigen=inTimerInterval(timeline, message.x0,message.y0);
            let timedestino=inTimerInterval(timeline, message.x1,message.y1);

            if(timeorigen!=null)
            message.timeorigen=timeorigen.id;//resp obj
            if(timedestino!=null)
            message.timedestino=timedestino.id;//resp obj
    
        }
        
    });


    
}


