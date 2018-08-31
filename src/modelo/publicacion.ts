
export class Publicacion {  
    constructor(
      public id:string,
      public id_evento:string,
      public id_comenta:string,
      public descripcion:string,
      public name:string,
      public name2:string,
      public lastname:string,
      public lastname2:string,
      public created_at:Date,
      public updated_at:Date
    ){
  
    }
  concatenar(cadena:string){
    return (cadena=="null" || cadena=="" || cadena==undefined)?"":cadena;
  }
  
  getNombreCompleto(){
  
     return this.name+" "+this.concatenar(this.name2)+" "+this.concatenar(this.lastname)+" "+this.concatenar(this.lastname2)
  }
}  

