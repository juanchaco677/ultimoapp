
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
  diaHora:string;
  nombreCompleto:string;

}  

