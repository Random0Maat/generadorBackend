class Fragments {
    constructor (nombre="fragment",id="", tipo="",rules=[]) {
      this._nombre = nombre;
      this._id=id;
      this._tipo=tipo;
      this._rules=rules;
      
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
 

    get tipo() {
        return this._tipo;
    }

    set tipo(obj) {
        return this._tipo=obj;
    }

    get rules() {
        return this._rules;
    }

    set rules(obj) {
        return this._rules=obj;
    }

    

}


function addRules(fragments,rule){//////pendiente
     
    fragments._rules.push(rule);
    
}

function cargarFragments(fragments,xml){

    fragments.id=xml["id"].split(":")[1];//class alias
    
    fragments.tipo=xml.childNodes[1]["attributes"]["value"]["nodeValue"];

    if(fragments.tipo=="LOOP"){

        fragments._rules.push(xml.childNodes[2]["attributes"]["value"]["nodeValue"]);

    }else if(fragments.tipo=="OPT"){

        fragments._rules.push(xml.childNodes[2]["attributes"]["value"]["nodeValue"]);

    }else if(fragments.tipo=="ALT"){

       let regiones= xml.getElementsByTagName("Region");

       for (let index = 0; index < regiones.length; index++) {
        const element = regiones[index];
        fragments._rules.push(element.childNodes[1]["attributes"]["value"]["nodeValue"]);
        
       }

    }
    //if(fragments.tipo=="BREAK"){}//no contiene reglas
    
     
    
}

