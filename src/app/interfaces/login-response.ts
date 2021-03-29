export interface LoginResponse {
    resultado: Resultado;
}

export interface Resultado {
    exito:    boolean;
    id_rol:   number;
    desc_rol: string;
    id:       number;
}

export enum RolesUsuario {
    distribuidor = "DISTRIBUIDOR",
    validador = "VALIDADOR",
    sucursal = "SUCURSAL"
}
