import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Almacenistas',
    icon: 'people-outline',
    link: '/pages/almacenista/listar',
    home: true,
  },
  {
    title: 'Producto',
    icon: 'shopping-bag-outline',
    link: '/pages/producto/listar',
  },
  {
    title: 'Proveedor',
    icon: 'car-outline',
    link: '/pages/proveedor/listar',
  },
  {
    title: 'Inventario',
    icon: 'file-add-outline',
    link: '/pages/inventario/listar',
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    link: 'pages/seguridad/login',
 
    
  },
];
