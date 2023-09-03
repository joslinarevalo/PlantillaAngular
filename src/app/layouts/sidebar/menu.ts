import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [

    {
        id: 2,
        label: 'Inicio',
        icon: 'bx-home-circle',
        link: '/dashboard',

    },

    {
        id: 5,
        label: 'Plantas',
        icon: 'bx-share-alt',
        link: ''
    },
    {
        id: 6,
        label: "Enfermedades",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 7,
                label: "Lista",
                link: "",
                parentId: 6,
            },
            {
                id: 8,
                label: "",
                link: "",
                parentId: 6,
            },
            {
                id: 9,
                label: "",
                link: "",
                parentId: 6,
            },
        ],
    },
    {
        id: 10,
        label: "Tratamiento",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 11,
                label: "Lista",
                link: "/tratamiento/tratamiento",
                parentId: 6,
            },

        ],
    },
    {
        id: 12,
        label: "Sintomas",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 9,
                label: "Sintomas",
                link: "/sintomas/sintomas",
                parentId: 6,
            },

        ],
    },
    {
        id: 9,
        label: "Causa Enfermedad",
        icon: "fbx bx-layer",
        subItems: [
            {
                id: 15,
                label: "Lista",
                link: "/causaEnfermedad/mostrar",
                parentId: 6,
            },

        ],
    },
    {
        id: 10,
        label: "Detalle Tratamiento",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 17,
                label: "Lista",
                link: "detalleTratamiento/detalleTratamiento",
                parentId: 6,
            },

        ],
    },
    {
        id: 18,
        label: "Detalle Causa",
        icon: "bx bx-border-all",
        subItems: [
            {
                id: 19,
                label: "Lista",
                link: "/detallecausa/mostrar",
                parentId: 6,
            },

        ],
    },
    {
        id: 20,
        label: "Consultas",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 21,
                label: "Lista",
                link: "",
                parentId: 20,
            },

        ],
    },
    {
        id: 22,
        label: "Informes",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 23,
                label: "Lista",
                link: "",
                parentId: 22,
            },

        ],
    },
    {
        id: 24,
        label: "Seguridad",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 25,
                label: "Lista",
                link: "",
                parentId: 24,
            },

        ],
    },
    {
      id: 26,
      label: "Tipo Planta",
      icon: "bx-user-circle",
      subItems: [
          {
              id: 27,
              label: "Lista",
              link: "/tipoplanta/mostrar",
              parentId: 26,
          },

      ],
  },
];

