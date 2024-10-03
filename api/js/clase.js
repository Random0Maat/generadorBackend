class Clase {
    constructor (nombre="tabla",alias="", atributos=[]) {
      this._nombre = nombre;
      this._alias=alias;
      this._atributos=atributos;
      
    }

    // Getter
    get nombre() {
       return this._nombre;
    }

    set nombre(nom) {
        return this._nombre=nom;
    }

    get alias() {
        return this._alias;
     }
 
     set alias(cad) {
         return this._alias=cad;
     }
 

    get atributos() {
        return this._atributos;
    }

    set atributos(obj) {
        return this._atributos=obj;
    }

       

}


function addAtributos(clase,atributo){
     
    clase._atributos.push(atributo);
    
}

function cargarClase(clase,xml){

    clase.nombre=xml.childNodes[1]["attributes"]["value"]["nodeValue"];//class name
    clase.alias=xml["id"].split(":")[1];//class alias

    var listaAtributos=xml.childNodes[2].childNodes//lista de atributos
    
    listaAtributos.forEach(element => { 

        let resp= element["attributes"]["value"]["nodeValue"].split(":");

        let atributo=new Atributo(resp[0],resp[1]);
        addAtributos(clase,atributo);
        
    });
      
    
}

function getPrimary(clase){
    result="id";

    clase.atributos.forEach(atributo => {

        if(atributo.nombre==="id" || atributo.nombre==="codigo"){
        result=atributo.nombre;
        }
        
    });
     
    return result;
    
}

function atributosToString(clase){
    result=[];

    clase.atributos.forEach(atributo => {
        result.push(""+atributo.nombre+":"+atributo.tipo);
        
    });
     
    return result;
    
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generarAtributos(atributos) {
    let resultado = '';
    atributos.forEach(atributo => {
        const [nombre, tipo] = atributo.split(':');
        if (nombre === 'id' || nombre === 'codigo') {
            resultado += `@Id\n@GeneratedValue(strategy = GenerationType.IDENTITY)\nprivate ${tipo} ${nombre};\n\n`;
        } else if (nombre.startsWith('id') && nombre !== 'id') {
            const tablaForanea = nombre.slice(2).toLowerCase();
            resultado += `@ManyToOne\n@JoinColumn(name = "${nombre}", nullable = false)\nprivate ${capitalizeFirstLetter(tablaForanea)} ${tablaForanea};\n\n`;
        } else if (nombre.startsWith('codigo') && nombre !== 'codigo') {
            const tablaForanea = nombre.slice(6).toLowerCase();
            resultado += `@ManyToOne\n@JoinColumn(name = "${nombre}", nullable = false)\nprivate ${capitalizeFirstLetter(tablaForanea)} ${tablaForanea};\n\n`;
        } else {
            resultado += `private ${tipo} ${nombre};\n\n`;
        }
    });
    return resultado;
}

function generarGettersSetters(atributos) {
    let resultado = '// Getters y Setters\n';
    atributos.forEach(atributo => {
        const [nombre, tipo] = atributo.split(':');
        let capitalizedNombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        let getterSetterNombre = nombre;
        let tipDato=tipo;

        if (nombre.startsWith('id') && nombre !== 'id') {
            getterSetterNombre = nombre.slice(2).charAt(0).toUpperCase() + nombre.slice(3);
            tipDato= capitalizeFirstLetter(getterSetterNombre);
        } else if (nombre.startsWith('codigo') && nombre !== 'codigo') {
            getterSetterNombre = nombre.slice(6).charAt(0).toUpperCase() + nombre.slice(7);
            tipDato= capitalizeFirstLetter(getterSetterNombre);
        }

        resultado += `
public ${tipDato} get${capitalizeFirstLetter(getterSetterNombre)}() {
    return this.${getterSetterNombre.toLowerCase()};
}

public void set${capitalizeFirstLetter(getterSetterNombre)}(${tipDato} ${getterSetterNombre.toLowerCase()}) {
    this.${getterSetterNombre.toLowerCase()} = ${getterSetterNombre.toLowerCase()};
}
`;

    });
    return resultado;
}

function generateModel(name,atributos,paquete) {
    // Convertir el primer carácter a mayúscula
    const className = capitalizeFirstLetter(name);

const atrib = generarAtributos(atributos);
const metodos = generarGettersSetters(atributos);

const nombreCapitalizado = capitalizeFirstLetter(name);	

return `// ${nombreCapitalizado}Model.java
package ${paquete}.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "${name}")
public class ${className} {

// Atributos\n
	${atrib} ${metodos}  
		
}`;
 

}

function generateRepository(nombre,paquete) {
    const nombreCapitalizado = capitalizeFirstLetter(nombre);
    return `// ${nombreCapitalizado}Repository.java
package ${paquete}.repository;

import ${paquete}.model.${nombreCapitalizado};
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ${nombreCapitalizado}Repository extends JpaRepository<${nombreCapitalizado}, Integer> {
}`;
}

function generateService(nombre, id,paquete) {
    return `// ${capitalizeFirstLetter(nombre)}Service.java
package ${paquete}.service;

import ${paquete}.model.${capitalizeFirstLetter(nombre)};
import ${paquete}.repository.${capitalizeFirstLetter(nombre)}Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ${capitalizeFirstLetter(nombre)}Service {
    @Autowired
    private ${capitalizeFirstLetter(nombre)}Repository ${nombre.toLowerCase()}Repository;

    public List<${capitalizeFirstLetter(nombre)}> findAll() {
        return ${nombre.toLowerCase()}Repository.findAll();
    }

    public ${capitalizeFirstLetter(nombre)} findBy${capitalizeFirstLetter(id)}(int ${id}) {
        return ${nombre.toLowerCase()}Repository.findById(${id}).orElse(null);
    }

    public ${capitalizeFirstLetter(nombre)} save(${capitalizeFirstLetter(nombre)} ${nombre.toLowerCase()}) {
        return ${nombre.toLowerCase()}Repository.save(${nombre.toLowerCase()});
    }

    public void deleteBy${capitalizeFirstLetter(id)}(int ${id}) {
        ${nombre.toLowerCase()}Repository.deleteById(${id});
    }
}`;
}

function generateController(nombre, id,paquete) {
    return `// ${capitalizeFirstLetter(nombre)}Controller.java
package ${paquete}.controller;

import ${paquete}.model.${capitalizeFirstLetter(nombre)};
import ${paquete}.service.${capitalizeFirstLetter(nombre)}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/${nombre.toLowerCase()}s")
public class ${capitalizeFirstLetter(nombre)}Controller {
    @Autowired
    private ${capitalizeFirstLetter(nombre)}Service ${nombre.toLowerCase()}Service;

    @GetMapping
    public List<${capitalizeFirstLetter(nombre)}> getAll${capitalizeFirstLetter(nombre)}s() {
        return ${nombre.toLowerCase()}Service.findAll();
    }

    @GetMapping("/{${id}}")
    public ResponseEntity<${capitalizeFirstLetter(nombre)}> get${capitalizeFirstLetter(nombre)}By${capitalizeFirstLetter(id)}(@PathVariable int ${id}) {
        ${capitalizeFirstLetter(nombre)} ${nombre.toLowerCase()} = ${nombre.toLowerCase()}Service.findBy${capitalizeFirstLetter(id)}(${id});
        if (${nombre.toLowerCase()} != null) {
            return ResponseEntity.ok(${nombre.toLowerCase()});
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ${capitalizeFirstLetter(nombre)} create${capitalizeFirstLetter(nombre)}(@RequestBody ${capitalizeFirstLetter(nombre)} ${nombre.toLowerCase()}) {
        return ${nombre.toLowerCase()}Service.save(${nombre.toLowerCase()});
    }

    @DeleteMapping("/{${id}}")
    public ResponseEntity<Void> delete${capitalizeFirstLetter(nombre)}(@PathVariable int ${id}) {
        ${nombre.toLowerCase()}Service.deleteBy${capitalizeFirstLetter(id)}(${id});
        return ResponseEntity.noContent().build();
    }
}`;
}

function generarDataTableOracle(clase,relaciones,listaclases){

    var texto="create table "+clase.nombre+"(\n";

    var herencia=false;

    var primaria="";
    var foranea="";

    var listaAtributos="";
    var atributoprimarios="";
    var atributosecundarios="";

    ////lista de atributos
    for (let index = 0; index < clase.atributos.length; index++) {

        const element = clase.atributos[index];
        if(element.tipo==="int"){
            listaAtributos+="  "+element.nombre+" number,\n";         
        }else{
            listaAtributos+="  "+element.nombre+" "+element.tipo+",\n";
        }

        
        
    }
    ///lista de atributos


    if(relaciones.length>0){

        relaciones.forEach(relacion => { 

            let listaobjeto=listaclases.filter((e) => e.nombre===relacion.origen);
            let origen=listaobjeto[0];   
            
            if((relacion.tipo==="Generalizacion")||(relacion.tipo==="Composicion")){//generalizacion || Composicion
                
                if(relacion.tipo==="Generalizacion")herencia=true;

                if(origen.atributos.length>0){  
                    if(origen.atributos[0].tipo==="int"){
                        atributoprimarios+="  "+origen.atributos[0].nombre+origen.nombre+" number,\n"; //atributos insertados antes de los demas
                    }else{
                        atributoprimarios+="  "+origen.atributos[0].nombre+origen.nombre+" "+origen.atributos[0].tipo+",\n"; //atributos insertados antes de los demas
                    }
                    

                    primaria+=origen.atributos[0].nombre+origen.nombre+","; 
                   
                    foranea+="  constraint fk_"+clase.nombre+"_"+origen.nombre+" foreign key ("+origen.atributos[0].nombre+origen.nombre+") references "+origen.nombre+"("+origen.atributos[0].nombre+")\n";
                }else{
                    atributoprimarios+="  id"+origen.nombre+" number,\n";

                    primaria+="id"+origen.nombre+",";  
                    
                    foranea+="  constraint fk_"+clase.nombre+"_"+origen.nombre+" foreign key (id"+origen.nombre+") references "+origen.nombre+"(id"+origen.nombre+")\n";
                }

                
            }else{//agreagacion || asociacion

                if(origen.atributos.length>0){ 
                    if(origen.atributos[0].tipo==="int"){
                        atributosecundarios+="  "+origen.atributos[0].nombre+origen.nombre+" number,\n"; //atributos insertados despues de los demas
                    }else{
                        atributosecundarios+="  "+origen.atributos[0].nombre+origen.nombre+",\n"; //atributos insertados despues de los demas
                    }
                    
                   
                    foranea+="  constraint fk_"+clase.nombre+"_"+origen.nombre+" foreign key ("+origen.atributos[0].nombre+origen.nombre+") references "+origen.nombre+"("+origen.atributos[0].nombre+")\n";
                }else{
                    atributosecundarios+="  id"+origen.nombre+" number,\n";
                    
                    foranea+="  constraint fk_"+clase.nombre+"_"+origen.nombre+" foreign key (id"+origen.nombre+") references "+origen.nombre+"(id"+origen.nombre+")\n";
                }

            }//asocicion y agregacion////////////////////////
              
    
        });

        if(!herencia){

            if(clase.atributos.length>0){
                primaria+=clase.atributos[0].nombre+",";   
            }else{
                primaria+="id,"; 
            }

        }
 

    }else{
        

        if(clase.atributos.length>0){ //null 
            primaria+=clase.atributos[0].nombre+","; 
        }else{
            primaria+="id,"; 
        }

    }


    let primarias=primaria.slice(0,primaria.length-1);

    texto+=""+atributoprimarios+listaAtributos+atributosecundarios+"  primary key("+primarias+"),\n"+foranea;

    
    texto+=");\n\n";

    return texto; 

}


function generarDataTablePostgreSQL(clase,relaciones,listaclases){

    var texto="create table "+clase.nombre+"(\n";

    var herencia=false;

    var primaria="";
    var foranea="";

    var listaAtributos="";
    var atributoprimarios="";
    var atributosecundarios="";

    ////lista de atributos
    for (let index = 0; index < clase.atributos.length; index++) {

        const element = clase.atributos[index];
        if(element.tipo==="int"){
            listaAtributos+="  "+element.nombre+"  int4,\n";
        }else{
            listaAtributos+="  "+element.nombre+" "+element.tipo+",\n";
        }

        
        
    }
    ///lista de atributos


    if(relaciones.length>0){

        relaciones.forEach(relacion => { 

            let listaobjeto=listaclases.filter((e) => e.nombre===relacion.origen);
            let origen=listaobjeto[0];   
            
            if((relacion.tipo==="Generalizacion")||(relacion.tipo==="Composicion")){//generalizacion || Composicion
                
                if(relacion.tipo==="Generalizacion")herencia=true;

                if(origen.atributos.length>0){  

                    if(origen.atributos[0].tipo==="int"){
                        atributoprimarios+="  "+origen.atributos[0].nombre+origen.nombre+" int4,\n"; //atributos insertados antes de los demas
                    }else{
                      atributoprimarios+="  "+origen.atributos[0].nombre+origen.nombre+" "+origen.atributos[0].tipo+",\n"; //atributos insertados antes de los demas
                    }
                    

                    primaria+=origen.atributos[0].nombre+origen.nombre+","; 
                   
                    foranea+="  constraint fk_"+clase.nombre+"_"+origen.nombre+" foreign key ("+origen.atributos[0].nombre+origen.nombre+") references "+origen.nombre+"("+origen.atributos[0].nombre+")\n";
                }else{
                    atributoprimarios+="  id"+origen.nombre+" int4,\n";

                    primaria+="id"+origen.nombre+",";  
                    
                    foranea+="  constraint fk_"+clase.nombre+"_"+origen.nombre+" foreign key (id"+origen.nombre+") references "+origen.nombre+"(id"+origen.nombre+")\n";
                }

                
            }else{//agreagacion || asociacion

                if(origen.atributos.length>0){ 
                    if(origen.atributos[0].tipo==="int"){
                        atributosecundarios+="  "+origen.atributos[0].nombre+origen.nombre+" int4,\n"; //atributos insertados despues de los demas
                    }else{
                        atributosecundarios+="  "+origen.atributos[0].nombre+origen.nombre+" "+origen.atributos[0].tipo+",\n"; //atributos insertados despues de los demas
                    }
                   
                    foranea+="  constraint fk_"+clase.nombre+"_"+origen.nombre+" foreign key ("+origen.atributos[0].nombre+origen.nombre+") references "+origen.nombre+"("+origen.atributos[0].nombre+")\n";
                }else{
                    atributosecundarios+="  id"+origen.nombre+" int4,\n";
                    
                    foranea+="  constraint fk_"+clase.nombre+"_"+origen.nombre+" foreign key (id"+origen.nombre+") references "+origen.nombre+"(id"+origen.nombre+")\n";
                }

            }//asocicion y agregacion////////////////////////
              
    
        });

        if(!herencia){

            if(clase.atributos.length>0){
                primaria+=clase.atributos[0].nombre+",";   
            }else{
                primaria+="id,"; 
            }

        }
 

    }else{
        

        if(clase.atributos.length>0){ //null 
            primaria+=clase.atributos[0].nombre+","; 
        }else{
            primaria+="id,"; 
        }

    }


    let primarias=primaria.slice(0,primaria.length-1);

    texto+=""+atributoprimarios+listaAtributos+atributosecundarios+"  primary key("+primarias+"),\n"+foranea;

    
    texto+=");\n\n";

    return texto; 

}


function obtenerTablaClase(clase,relaciones,listaclases){

    var resultado=[];
    var listaAtributos=[];
    var atributoprimarios=[];
    var atributosecundarios=[];

    ////lista de atributos
    for (let index = 0; index < clase.atributos.length; index++) {

        const element = clase.atributos[index];
        listaAtributos.push(element.nombre);     
        
    }
    ///lista de atributos


    if(relaciones.length>0){

        relaciones.forEach(relacion => { 

            let listaobjeto=listaclases.filter((e) => e.nombre===relacion.origen);
            let origen=listaobjeto[0];   
            
            if((relacion.tipo==="Generalizacion")||(relacion.tipo==="Composicion")){//generalizacion || Composicion
                
                if(relacion.tipo==="Generalizacion")herencia=true;

                if(origen.atributos.length>0){  

                    atributoprimarios.push(origen.atributos[0].nombre+origen.nombre);
 
                }else{

                    atributoprimarios.push("id"+origen.nombre);
                }
  
            }else{//agreagacion || asociacion

                if(origen.atributos.length>0){ 

                    atributosecundarios.push(origen.atributos[0].nombre+origen.nombre);
                    
                }else{

                    atributosecundarios.push("id"+origen.nombre);
  
                }

            }//asocicion y agregacion////////////////////////
              
    
        });

    }


    let aux=atributoprimarios.concat(listaAtributos);

    resultado=aux.concat(atributosecundarios);

    return resultado; 

}



