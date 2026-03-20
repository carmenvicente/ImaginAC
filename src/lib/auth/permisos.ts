export function verificarRolPermitido(
  rol: string | null,
  rolesPermitidos: string[]
): boolean {
  if (!rol) return false;
  return rolesPermitidos.includes(rol);
}

export function esProfesorPT(rol: string | null): boolean {
  return verificarRolPermitido(rol, ["PROFESOR_PT"]);
}

export function esAlumno(rol: string | null): boolean {
  return verificarRolPermitido(rol, ["ALUMNO"]);
}

export function obtenerRutaPorRol(rol: string | null): string {
  switch (rol) {
    case "PROFESOR_PT":
      return "/profesor";
    case "ALUMNO":
      return "/alumno";
    default:
      return "/login";
  }
}
