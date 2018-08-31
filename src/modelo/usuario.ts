export class Usuario {
  token:string;     
  constructor(
    public id:string,
    public email:string,
    public name:string,
    public name2:string,
    public lastname:string,
    public lastname2:string,
    public nit:string,    
    public type:string,
    public telefonomovil:string,
    public telefonofijo:string,
    public id_mesa:string,    
    public id_candidato:string, 
    public id_referido:string, 
    public created_at:Date,
    public updated_at:Date
  ){

  }

  concatenar(cadena:string){
    return (cadena=="null" || cadena=="" || cadena==undefined)?"":cadena;
  } 

  getNombreCompleto(){  
     return this.name+" "+this.concatenar(this.name2)+" "+this.concatenar(this.lastname)+" "+this.concatenar(this.lastname2);
  }
}
