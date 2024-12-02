// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Home, Profile2User, Chart21, BookSaved, Add } from 'iconsax-react';

// types
import { NavItemType } from 'types/menu';

// project-imports
import { NavActionType } from 'config';
import { handlerPatientDialog } from 'api/patient';

// icons
const icons = {
  home: Home,
  insights: Chart21,
  patients: Profile2User,
  library: BookSaved
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const emotipalMenu: NavItemType = {
  id: 'emotipal-menu',
  // title: <FormattedMessage id="widgets" />,
  // icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'home',
      title: <FormattedMessage id="Home" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.home
    },
    {
      id: 'insights',
      title: <FormattedMessage id="Insights" />,
      type: 'item',
      url: '/insights',
      icon: icons.insights
    },
    {
      id: 'patients',
      title: <FormattedMessage id="Patients" />,
      type: 'item',
      url: '/patients',
      icon: icons.patients,
      actions: [
        {
          type: NavActionType.FUNCTION,
          label: 'Add Patient',
          function: () => handlerPatientDialog(true),
          icon: Add
        }
      ]
    },
    {
      id: 'library',
      title: <FormattedMessage id="Library" />,
      type: 'item',
      url: '/library',
      icon: icons.library
    }
  ]
};

export default emotipalMenu;
