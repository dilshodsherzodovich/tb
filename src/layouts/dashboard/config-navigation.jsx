import { Icon } from '@iconify/react';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Instruksiya',
    path: '/',
    icon: <Icon width={25} icon="mingcute:classify-2-fill" />,
  },
  {
    title: 'Assistent',
    path: '/chat',
    icon: <Icon width={25} icon="hugeicons:ai-chat-02" />,
  },
  {
    title: 'Sozlamalar',
    icon: <Icon width={25} icon="hugeicons:ai-chat-02" />,
    collapse: [
      {
        title: `Lokomotiv rusumlari`,
        path: '/train-types',
      },
      {
        title: `Texnik ko'rik turi`,
        path: '/corrective_type',
      },
      {
        title: `Qo'llanmalar`,
        path: '/instructions',
      },
      {
        title: 'Jihoz turlari',
        path: '/equipment_type',
      },
      {
        title: 'Ehtiyot qismlar',
        path: '/spares',
      },
    ],
  },
];

export default navConfig;
