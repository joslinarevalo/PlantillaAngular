import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 2,
    label: "Inicio",
    icon: "bx-home-circle",
    link: "/dashboard",
  },

  {
    id: 5,
    label: "Plantas",
    icon: "bx bx-images",
    link: "",
  },
  {
    id: 6,
    label: "Enfermedades",
    icon: "bx bx-test-tube",
    link: "/enfermedades/enfermedades",
  },
  {
    id: 7,
    label: "Tratamiento",
    icon: "bx bxs-vial",
    link: "/tratamiento/tratamiento",
  },
  {
    id: 9,
    label: "Causa Enfermedad",
    icon: "fbx bx-layer",
    link: "/causaEnfermedad/mostrar",
  },
  {
    id: 10,
    label: "Detalle Tratamiento",
    icon: "bx bx-clipboard",
    link: "detalleTratamiento/detalleTratamiento",
  },
  {
    id: 11,
    label: "Detalle Causa",
    icon: "bx bx-border-all",
    link: "/detallecausa/mostrar",
  },
  {
    id: 13,
    label: "Consultas",
    icon: "bx bx-file",
    link: "",
  },
];
