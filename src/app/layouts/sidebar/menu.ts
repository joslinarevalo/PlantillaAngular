import { MenuItem } from "./menu.model";
let admin = 'ROLE_ADMIN';
let estudiante = "ROLE_USER"
export const MENU: MenuItem[] = [
  {
    id: 2,
    label: "Inicio",
    icon: "bx-home-circle",
    link: "/dashboard",
    roles: [admin]
  },

  {
    id: 5,
    label: "Plantas",
    icon: "bx bx-images",
    link: "/planta/listar",
    roles: [admin]
  },
  {
    id: 6,
    label: "Enfermedades",
    icon: "bx bx-test-tube",
    link: "/enfermedades/enfermedades",
    roles: [admin]
  },
  {
    id: 7,
    label: "Tratamiento",
    icon: "bx bxs-vial",
    link: "/tratamiento/tratamiento",
    roles: [admin]
  },
  {
    id: 9,
    label: "Causa Enfermedad",
    icon: "fbx bx-layer",
    link: "/causaEnfermedad/mostrar",
    roles: [admin]
  },
  {
    id: 10,
    label: "Detalle Tratamiento",
    icon: "bx bx-clipboard",
    link: "detalleTratamiento/detalleTratamiento",
    roles: [admin]
  },
  {
    id: 11,
    label: "Detalle Causa",
    icon: "bx bx-border-all",
    link: "/detallecausa/mostrar",
    roles: [admin]
  },
  {
    id: 13,
    label: "Consultas",
    icon: "bx bx-file",
    link: "/reportes/reporte",
    roles: [admin]
  },
  {
    id: 14,
    label: "Registro Usuario",
    icon: "bx bx-file",
    link: "usuario-c/usuario",
    roles: [admin]
  },
  {
    id: 15,
    label: "Tipo Planta",
    icon: "bx bx-file",
    link: "/tipoplanta/listar",
    roles: [admin]
  },
  {
    id: 16,
    label: "Familia",
    icon: "bx bx-file",
    link: "/familia/listar",
    roles: [admin]
  },
  {
    id: 17,
    label: "Principal",
    icon: "bx bx-file",
    link: "paginas-principal/principal",
    roles: [admin, estudiante]
  },
  {
    id: 18,
    label: "Lista Enfermedades",
    icon: "bx bx-file",
    link: "consultaEnfermedades/listaEnfermedades",
    roles: [admin, estudiante]
  },
  {
    id: 19,
    label: "Lista Patogenos",
    icon: "bx bx-file",
    link: "patogenos/listpatogenos",
    roles: [admin, estudiante]
  },
  {
    id: 20,
    label: "Lista Plantas",
    icon: "bx bx-file",
    link: "consultaPlantas/listaPlantas",
    roles: [admin, estudiante]
  },
  {
    id: 21,
    label: "Lista Tratamiento",
    icon: "bx bx-file",
    link: "consultaTratamiento/listaTratamiento",
    roles: [admin, estudiante]
  }
];
