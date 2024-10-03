class DiagramaSecuencia {
    constructor (nombre="diagrama de secuencia", timeline =[],messages=[],fragments=[]) {
      
      this._nombre = nombre;
      this._timeline = timeline;
      this._messages=messages;
      this._fragments=fragments;
      
    }

    // Getter
    get nombre() {
       return this._nombre;
    }

    set nombre(nom) {
        return this._nombre=nom;
    }

    get timeline() {
        return this._timeline;
    }

    set timeline(obj) {
        return this._timeline=obj;
    }

    get messages() {
        return this._messages;
    }

    set messages(obj) {
        return this._messages=obj;
    }

    get fragments() {
        return this._fragments;
    }

    set fragments(obj) {
        return this._fragments=obj;
    }
    

}


function addtimeline(diagrama,obj){
     
    diagrama.timeline.push(obj);
    
}

function addMessages(diagrama,obj){
     
    diagrama.messages.push(obj);
    
}

function addFragments(diagrama,obj){
     
    diagrama.fragments.push(obj);
    
}



function cargarDiagramaSecuencia(diagrama,xml){

    
    

    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    

    // Get the element with the tag name "UMLSequenceDiagram"
    //const diagram = doc.getElementsByTagName("umldiagrams")[0];
    let sequenceDiagramElement = doc.getElementsByTagName("UMLSequenceDiagram")[0];
    diagrama.nombre= sequenceDiagramElement["attributes"]["name"]["nodeValue"];//diagram name


    let Option = doc.getElementsByTagName("UMLOption"); 
    let Loop = doc.getElementsByTagName("UMLLoop");
    let Break = doc.getElementsByTagName("UMLBreak");
    let Alternative = doc.getElementsByTagName("UMLAlternative");

    let timeline = doc.getElementsByTagName("UMLLifeline");
    let Create = doc.getElementsByTagName("UMLCreate");
    let Destroy = doc.getElementsByTagName("UMLDestroy");

    let timeinterval = doc.getElementsByTagName("TimeInterval");

    let SendMessage = doc.getElementsByTagName("UMLSendMessage");
    let CallMessage = doc.getElementsByTagName("UMLCallMessage"); 
    let ReplyMessage = doc.getElementsByTagName("UMLReplyMessage");
    let DeleteMessage = doc.getElementsByTagName("UMLDeleteMessage");

    
    cargarListaTimeLine(diagrama,timeline);

    cargarListaTimeInterval(diagrama,timeinterval);

    cargarListaMessage(diagrama,Create);
    cargarListaMessage(diagrama,Destroy);
    cargarListaMessage(diagrama,SendMessage);
    cargarListaMessage(diagrama,CallMessage);
    cargarListaMessage(diagrama,ReplyMessage);
    cargarListaMessage(diagrama,DeleteMessage);

    cargarListaFragments(diagrama,Option);
    cargarListaFragments(diagrama,Loop);
    cargarListaFragments(diagrama,Break);
    cargarListaFragments(diagrama,Alternative);

    

}

function addTimeline(diagrama,obj){
     
    diagrama.timeline.push(obj);
    
}

function addMessage(diagrama,obj){
     
    diagrama.messages.push(obj);
    
}

function addFragments(diagrama,obj){
     
    diagrama.fragments.push(obj);
    
}

function cargarListaTimeLine(diagrama, lista){

    for (let index = 0; index < lista.length; index++) {
        const element = lista[index];

         let timeline=new Timeline();
        cargarTimeLine(timeline,element);
        addTimeline(diagrama,timeline);
        
    }

}

function cargarListaMessage(diagrama, lista) {

    let listatimeline=diagrama.timeline;

    for (let index = 0; index < lista.length; index++) {
        const element = lista[index];

         let message=new Mensaje();
        cargarMessage(message,element,listatimeline);
        addMessage(diagrama,message);
        
    }

}

function cargarListaFragments(diagrama, lista){

    for (let index = 0; index < lista.length; index++) {
        const element = lista[index];

         let fragments=new Fragments();
        cargarFragments(fragments,element);
        addFragments(diagrama,fragments);
        
    }

}


function cargarListaTimeInterval(diagrama,lista){

    let timelines=diagrama.timeline;

    for (let index = 0; index < lista.length; index++) {

        let element = lista[index];

        
        timerinterval=new TimerInterval();
        cargarTimerInterval(timerinterval,element);
        
        
        for (let index = 0; index < timelines.length; index++) {

            let timeline = timelines[index];
            
            
            if(inTimeLine(timeline, timerinterval)){
               

                addTimeInterval(timeline,timerinterval);

            }
          
            
        }

         
        
       
        
    }


}


function exportarCodigo(diagrama,tipo,enlaces){

        if(tipo==="java"){
            exportarJava(diagrama,enlaces);
        }else if(tipo==="javascript"){
            exportarJavascript(diagrama,enlaces);
        }else if(tipo==="php"){
            exportarPhp(diagrama,enlaces);
        }else if(tipo==="python"){
            exportarPython(diagrama,enlaces);
        }


}

function exportarJava(diagrama,enlaces){

   let timelines=diagrama.timeline;

   for (let index = 0; index < timelines.length; index++) {
    let timeline = timelines[index];

    let contenido=exportarClaseJava(timeline);

        downloadJava(contenido,enlaces,timeline.nombre);

   }


}

function exportarJavascript(diagrama,enlaces){

   let timelines=diagrama.timeline;

   for (let index = 0; index < timelines.length; index++) {
    let timeline = timelines[index];

    let contenido=exportarClaseJavascript(timeline);

        downloadJavascript(contenido,enlaces,timeline.nombre);

   }


}

function exportarPhp(diagrama,enlaces){

   let timelines=diagrama.timeline;

   for (let index = 0; index < timelines.length; index++) {
    let timeline = timelines[index];

    let contenido=exportarClasePhp(timeline);

        downloadPhp(contenido,enlaces,timeline.nombre);

   }


}

function exportarPython(diagrama,enlaces){

   let timelines=diagrama.timeline;

   for (let index = 0; index < timelines.length; index++) {
    let timeline = timelines[index];

    let contenido=exportarClasePython(timeline);

        downloadPython(contenido,enlaces,timeline.nombre);

   }


}

function exportarClaseJava(timeline){

    return `public class ${timeline.nombre} {
        // Aquí puedes agregar las propiedades de tu clase

        public ${timeline.nombre}() {
            // Aquí puedes agregar el código para el constructor de tu clase
        }

        // Aquí puedes agregar los métodos de tu clase
    }\n \n`;

}

function exportarClaseJavascript(timeline){

    return `class ${timeline.nombre} {
        constructor() {
            // Aquí puedes agregar las propiedades de tu clase
        }

        // Aquí puedes agregar los métodos de tu clase
    }\n \n`;

}

function exportarClasePhp(timeline){

    return `class ${timeline.nombre} {
        // Aquí puedes agregar las propiedades de tu clase

        public function __construct() {
            // Aquí puedes agregar el código para el constructor de tu clase
        }

        // Aquí puedes agregar los métodos de tu clase
    }\n \n`;

}

function exportarClasePython(timeline){

    return `class ${timeline.nombre}:
    # Aquí puedes agregar las propiedades de tu clase

    def __init__(self):
        # Aquí puedes agregar el código para el constructor de tu clase

    # Aquí puedes agregar los métodos de tu clase
    \n \n`;

}











