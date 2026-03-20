import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const rolEnum = pgEnum("rol", ["PROFESOR_PT", "ALUMNO"]);

export const tipoActividadEnum = pgEnum("tipo_actividad", [
  "CUENTO",
  "ORDENAR_PICTOGRAMAS",
  "RELACIONAR",
  "COMPLETAR_GAPS",
  "VOCABULARIO",
]);

export const categoriaPictogramaEnum = pgEnum("categoria_pictograma", [
  "VERBO",
  "PERSONA",
  "ADJETIVO",
  "OBJETO",
  "OTRO",
]);

export const progresoActividadEnum = pgEnum("progreso_actividad", [
  "NO_INICIADO",
  "EN_PROGRESO",
  "COMPLETADO",
]);

export const regionIdiomaEnum = pgEnum("region_idioma", [
  "ESPANA",
  "EUROPA",
  "MUNDO",
]);

export const idiomas = pgTable("idiomas", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  codigo: varchar("codigo", { length: 10 }).notNull().unique(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  region: regionIdiomaEnum("region").notNull(),
  dialectoDeId: integer("dialecto_de_id"),
  createdAt: timestamp("creado_en").defaultNow().notNull(),
  updatedAt: timestamp("actualizado_en").defaultNow().notNull(),
});

export const usuarios = pgTable("usuarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  rol: rolEnum("rol").notNull(),
  idiomaPreferido: varchar("idioma_preferido", { length: 10 })
    .notNull()
    .default("ES"),
  profesorId: uuid("profesor_id"),
  creadoEn: timestamp("creado_en").defaultNow().notNull(),
  actualizadoEn: timestamp("actualizado_en").defaultNow().notNull(),
});

export const actividades = pgTable(
  "actividades",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profesorId: uuid("profesor_id").notNull(),
    titulo: varchar("titulo", { length: 500 }).notNull(),
    tipo: tipoActividadEnum("tipo").notNull(),
    tematica: varchar("tematica", { length: 255 }),
    finalidadPedagogica: text("finalidad_pedagogica"),
    contenidoJson: jsonb("contenido_json"),
    esActivo: boolean("es_activo").notNull().default(true),
    habilitadoPara: uuid("habilitado_para").array(),
    creadoEn: timestamp("creado_en").defaultNow().notNull(),
    actualizadoEn: timestamp("actualizado_en").defaultNow().notNull(),
  },
  (tabla) => [
    index("actividad_profesor_idx").on(tabla.profesorId),
    index("actividad_tipo_idx").on(tabla.tipo),
    index("actividad_activo_idx").on(tabla.esActivo),
  ]
);

export const pictogramas = pgTable(
  "pictogramas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actividadId: uuid("actividad_id").notNull(),
    textoOriginal: text("texto_original").notNull(),
    codigoSpc: varchar("codigo_spc", { length: 100 }).notNull(),
    categoria: categoriaPictogramaEnum("categoria").notNull(),
    ordenEnCuento: integer("orden_en_cuento"),
    creadoEn: timestamp("creado_en").defaultNow().notNull(),
  },
  (tabla) => [
    index("picto_actividad_idx").on(tabla.actividadId),
    index("picto_orden_idx").on(tabla.ordenEnCuento),
  ]
);

export const contenidoIdioma = pgTable(
  "contenido_idioma",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actividadId: uuid("actividad_id").notNull(),
    idiomaId: integer("idioma_id").notNull(),
    textoTraducido: text("texto_traducido").notNull(),
    transcripcionPictos: jsonb("transcripcion_pictos"),
    creadoEn: timestamp("creado_en").defaultNow().notNull(),
  },
  (tabla) => [
    uniqueIndex("contenido_unico_idx").on(tabla.actividadId, tabla.idiomaId),
    index("contenido_actividad_idx").on(tabla.actividadId),
    index("contenido_idioma_idx").on(tabla.idiomaId),
  ]
);

export const actividadPictograma = pgTable(
  "actividad_pictograma",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actividadId: uuid("actividad_id").notNull(),
    pictogramaId: uuid("pictograma_id").notNull(),
    posicionX: integer("posicion_x"),
    posicionY: integer("posicion_y"),
  },
  (tabla) => [
    index("act_picto_actividad_idx").on(tabla.actividadId),
    index("act_picto_pictograma_idx").on(tabla.pictogramaId),
  ]
);

export const alumnoActividad = pgTable(
  "alumno_actividad",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    alumnoId: uuid("alumno_id").notNull(),
    actividadId: uuid("actividad_id").notNull(),
    progreso: progresoActividadEnum("progreso")
      .notNull()
      .default("NO_INICIADO"),
    respuestasJson: jsonb("respuestas_json"),
    completadoEn: timestamp("completado_en"),
  },
  (tabla) => [
    uniqueIndex("alumno_actividad_unico_idx").on(
      tabla.alumnoId,
      tabla.actividadId
    ),
    index("alumno_act_alumno_idx").on(tabla.alumnoId),
    index("alumno_act_actividad_idx").on(tabla.actividadId),
    index("alumno_act_progreso_idx").on(tabla.progreso),
  ]
);

export const relaciones = relations(actividades, ({ one, many }) => ({
  profesor: one(usuarios, {
    fields: [actividades.profesorId],
    references: [usuarios.id],
  }),
  contenidosIdioma: many(contenidoIdioma),
  pictogramas: many(pictogramas),
  actividadesPictogramas: many(actividadPictograma),
  progresoAlumnos: many(alumnoActividad),
}));

export const relacionesUsuario = relations(usuarios, ({ one, many }) => ({
  profesor: one(usuarios, {
    fields: [usuarios.profesorId],
    references: [usuarios.id],
    relationName: "ProfesorAlumnos",
  }),
  alumnos: many(usuarios, { relationName: "ProfesorAlumnos" }),
  actividadesCreadas: many(actividades),
  progreso: many(alumnoActividad),
}));

export const relacionesContenidoIdioma = relations(
  contenidoIdioma,
  ({ one }) => ({
    actividad: one(actividades, {
      fields: [contenidoIdioma.actividadId],
      references: [actividades.id],
    }),
    idioma: one(idiomas, {
      fields: [contenidoIdioma.idiomaId],
      references: [idiomas.id],
    }),
  })
);

export const relacionesPictograma = relations(pictogramas, ({ one, many }) => ({
  actividad: one(actividades, {
    fields: [pictogramas.actividadId],
    references: [actividades.id],
  }),
  actividadesRelacionadas: many(actividadPictograma),
}));

export const relacionesActividadPictograma = relations(
  actividadPictograma,
  ({ one }) => ({
    actividad: one(actividades, {
      fields: [actividadPictograma.actividadId],
      references: [actividades.id],
    }),
    pictograma: one(pictogramas, {
      fields: [actividadPictograma.pictogramaId],
      references: [pictogramas.id],
    }),
  })
);

export const relacionesAlumnoActividad = relations(
  alumnoActividad,
  ({ one }) => ({
    alumno: one(usuarios, {
      fields: [alumnoActividad.alumnoId],
      references: [usuarios.id],
    }),
    actividad: one(actividades, {
      fields: [alumnoActividad.actividadId],
      references: [actividades.id],
    }),
  })
);
