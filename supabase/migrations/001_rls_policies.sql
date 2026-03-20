-- Habilitar Row Level Security en todas las tablas
ALTER TABLE idiomas ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE actividades ENABLE ROW LEVEL SECURITY;
ALTER TABLE pictogramas ENABLE ROW LEVEL SECURITY;
ALTER TABLE contenido_idioma ENABLE ROW LEVEL SECURITY;
ALTER TABLE actividad_pictograma ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumno_actividad ENABLE ROW LEVEL SECURITY;

-- Políticas para tabla idiomas (pública para lectura)
CREATE POLICY "Cualquier usuario puede ver idiomas"
  ON idiomas FOR SELECT
  USING (true);

CREATE POLICY "Solo admins pueden insertar idiomas"
  ON idiomas FOR INSERT
  WITH CHECK (true);

-- Políticas para tabla usuarios
CREATE POLICY "Usuarios pueden ver su propio perfil"
  ON usuarios FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Profesores pueden ver a sus alumnos"
  ON usuarios FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM usuarios AS profesor
      WHERE profesor.id = auth.uid()
      AND profesor.rol = 'PROFESOR_PT'
      AND usuarios.profesor_id = profesor.id
    )
  );

CREATE POLICY "Usuarios pueden insertar su propio perfil al registrarse"
  ON usuarios FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuarios pueden actualizar su propio perfil"
  ON usuarios FOR UPDATE
  USING (auth.uid() = id);

-- Políticas para tabla actividades
CREATE POLICY "Profesores pueden ver sus propias actividades"
  ON actividades FOR SELECT
  USING (
    (SELECT rol FROM usuarios WHERE id = auth.uid()) = 'PROFESOR_PT'
    AND profesor_id = auth.uid()
  );

CREATE POLICY "Profesores pueden crear actividades"
  ON actividades FOR INSERT
  WITH CHECK (
    (SELECT rol FROM usuarios WHERE id = auth.uid()) = 'PROFESOR_PT'
    AND profesor_id = auth.uid()
  );

CREATE POLICY "Profesores pueden actualizar sus actividades"
  ON actividades FOR UPDATE
  USING (
    (SELECT rol FROM usuarios WHERE id = auth.uid()) = 'PROFESOR_PT'
    AND profesor_id = auth.uid()
  );

CREATE POLICY "Profesores pueden eliminar sus actividades"
  ON actividades FOR DELETE
  USING (
    (SELECT rol FROM usuarios WHERE id = auth.uid()) = 'PROFESOR_PT'
    AND profesor_id = auth.uid()
  );

-- Políticas para tabla pictogramas
CREATE POLICY "Profesores pueden gestionar pictogramas de sus actividades"
  ON pictogramas FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM actividades
      WHERE actividades.id = pictogramas.actividad_id
      AND actividades.profesor_id = auth.uid()
    )
  );

-- Políticas para tabla contenido_idioma
CREATE POLICY "Profesores pueden gestionar contenido de sus actividades"
  ON contenido_idioma FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM actividades
      WHERE actividades.id = contenido_idioma.actividad_id
      AND actividades.profesor_id = auth.uid()
    )
  );

-- Políticas para tabla alumno_actividad
CREATE POLICY "Alumnos pueden ver sus propias actividades"
  ON alumno_actividad FOR SELECT
  USING (
    (SELECT rol FROM usuarios WHERE id = auth.uid()) = 'ALUMNO'
    AND alumno_id = auth.uid()
  );

CREATE POLICY "Profesores pueden ver progreso de sus alumnos"
  ON alumno_actividad FOR SELECT
  USING (
    (SELECT rol FROM usuarios WHERE id = auth.uid()) = 'PROFESOR_PT'
    AND EXISTS (
      SELECT 1 FROM actividades
      WHERE actividades.id = alumno_actividad.actividad_id
      AND actividades.profesor_id = auth.uid()
    )
  );

CREATE POLICY "Alumnos pueden actualizar su progreso"
  ON alumno_actividad FOR UPDATE
  USING (alumno_id = auth.uid());

CREATE POLICY "Profesores pueden asignar actividades a alumnos"
  ON alumno_actividad FOR INSERT
  WITH CHECK (
    (SELECT rol FROM usuarios WHERE id = auth.uid()) = 'PROFESOR_PT'
    OR alumno_id = auth.uid()
  );

-- Políticas para tabla actividad_pictograma
CREATE POLICY "Profesores pueden gestionar actividad_pictograma"
  ON actividad_pictograma FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM actividades
      WHERE actividades.id = actividad_pictograma.actividad_id
      AND actividades.profesor_id = auth.uid()
    )
  );
