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
    public sex:string,
    public created_at:Date,
    public updated_at:Date
  ){

  }
  nombreCompleto:string;



}
