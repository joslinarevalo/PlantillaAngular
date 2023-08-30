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
        id: 7,
        label: "Tratamiento",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 8,
                label: "Lista",
                link: "/tratamiento/tratamiento",
                parentId: 6,
            },
         
        ],
    },
    {
        id: 8,
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
        label: "Causa",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 9,
                label: "Lista",
                link: "",
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
                id: 9,
                label: "Lista",
                link: "detalleTratamiento/detalleTratamiento",
                parentId: 6,
            },
         
        ],
    },
    {
        id: 11,
        label: "Detalle Causa",
        icon: "bx bx-border-all",
        subItems: [
            {
                id: 9,
                label: "Lista",
                link: "/detallecausa/mostrar",
                parentId: 6,
            },
         
        ],
    },
    {
        id: 13,
        label: "Consultas",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 9,
                label: "Lista",
                link: "",
                parentId: 6,
            },
         
        ],
    },
    {
        id: 10,
        label: "Informes",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 9,
                label: "Lista",
                link: "",
                parentId: 6,
            },
         
        ],
    },
    {
        id: 10,
        label: "Seguridad",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 9,
                label: "Lista",
                link: "",
                parentId: 6,
            },
         
        ],
    },
];

