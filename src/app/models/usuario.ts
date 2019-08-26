export interface Usuario {
  userName: string;
  password: string;
  names?: string;
  surnames?: string;
  position?: string;
  place?: string;
  positionLat?: number;
  positionLng?: number;
}

export interface UsuarioChangePass {
  userName: string;
  currentpass: string;  
  newpass: string;
  newpassconfirm: string;
}
