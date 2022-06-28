/* eslint-disable */

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {};

const sidebarConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'sytstem user',
  //       path: PATH_DASHBOARD.management.root,
  //       children: [
  //         { title: 'users', path: PATH_DASHBOARD.management.users },
  //         { title: 'roles', path: PATH_DASHBOARD.management.roles }
  //       ]
  //     }
  //   ]
  // }
];

export default sidebarConfig;
