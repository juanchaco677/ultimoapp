export class Evento {  
    constructor(
      public id:string,
      public titulo:string,
      public type:string,
      public descripcion:string,
      public id_creador:string,
      public id_imagen:string,
      public foto:string, 
      public created_at:Date,
      public updated_at:Date
    ){
  
    }
  
  }
  
