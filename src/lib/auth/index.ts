export { useSesion, useProfesor, useAlumno } from "./ganchos";
export { supabase, type SesionUsuario, type RespuestaAuth, type TipoRol } from "./cliente";
export { esProfesorPT, esAlumno, obtenerRutaPorRol, verificarRolPermitido } from "./permisos";
