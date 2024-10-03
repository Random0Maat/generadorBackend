class Timeline {
    constructor (nombre="timeline",id="", timeInterval=[]) {
      this._nombre = nombre;
      this._id=id;
      this._timeInterval=timeInterval;
      this._x=0;
      this._y=0;
      this._width=0;
      this._height=0;
      
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
 

    get timeInterval() {
        return this._timeInterval;
    }

    set timeInterval(obj) {
        return this._timeInterval=obj;
    }

    get x() {
        return this._x;
     }
 
    set x(x) {
        return this._x=x;
    }

    get y() {
        return this._y;
     }
 
    set y(y) {
        return this._y=y;
    }

    get width() {
        return this._width;
     }
 
    set width(width) {
        return this._width=width;
    }

    get height() {
        return this._height;
     }
 
    set height(height) {
        return this._height=height;
    }

    

}

function addTimeInterval(timeLine,timeInterval){//////
     
    timeLine._timeInterval.push(timeInterval);
    
}

function cargarTimeLine(timeLine,xml){/////

    timeLine.nombre=xml.childNodes[1]["attributes"]["value"]["nodeValue"];//class name
    timeLine.id=xml["id"].split(":")[1];//class alias 

    timeLine.x=Number(xml["attributes"]["x"]["nodeValue"]);
    timeLine.y=Number(xml["attributes"]["y"]["nodeValue"]);
    timeLine.width=Number(xml["attributes"]["width"]["nodeValue"]);
    timeLine.height=Number(xml["attributes"]["height"]["nodeValue"]);
    
}




class TimerInterval {
    constructor (id="") {

      this._id=id;
      this._x=0;
      this._y=0;
      this._width=0;
      this._height=0;
      
    }

    // Getter
    
    get id() {
        return this._id;
     }
 
     set id(cad) {
         return this._id=cad;
     }

     get x() {
        return this._x;
     }
 
    set x(x) {
        return this._x=x;
    }

    get y() {
        return this._y;
     }
 
    set y(y) {
        return this._y=y;
    }

    get width() {
        return this._width;
     }
 
    set width(width) {
        return this._width=width;
    }

    get height() {
        return this._height;
     }
 
    set height(height) {
        return this._height=height;
    }

    

}


function cargarTimerInterval(timerInterval,xml){/////cargarTimerInterval
    
    timerInterval.id=xml["id"].split(":")[1];//class alias 

    timerInterval.x=Number(xml["attributes"]["x"]["nodeValue"]);
    timerInterval.y=Number(xml["attributes"]["y"]["nodeValue"]);
    timerInterval.width=Number(xml["attributes"]["width"]["nodeValue"]);
    timerInterval.height=Number(xml["attributes"]["height"]["nodeValue"]);
    
}

function inTimeLine(timeline, timerinterval) {

    // Verifica si el timerinterval está dentro del timeline
    if ((timerinterval.x >= timeline.x) && (timerinterval.x+timerinterval.width ) <= (timeline.x + timeline.width)) {
           
        return true;

    } else {
        
        return false;
    }
}

function inTimeLine2(timeline, x,y) {

    
    if(((x>=timeline.x) && x<= (timeline.x+timeline.width ))&& ((y>=timeline.y) && y<= (timeline.y+timeline.height ))){
        return true;
    }
    return false;
}

function inTimerInterval(timeline, x,y) {

    let resp=null;

    timeline.timeInterval.forEach(timerinterval => {

        if (inTimerInterval2(timerinterval, x,y)) {
            resp = timerinterval;
            
        }

    } );

    return resp;
}

function inTimerInterval2(timerinterval, x,y)  {  

   let valx=(x>=timerinterval.x) && x< (timerinterval.x+timerinterval.width );
   let valy=(y>=timerinterval.y) && y< (timerinterval.y + timerinterval.height) ;
   
    if(valx &&  valy ) {
      
        return true;
    }
    return false;
    
}

