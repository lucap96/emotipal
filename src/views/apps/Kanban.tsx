'use client';

import { useEffect, SyntheticEvent } from 'react';

// next
import { usePathname, useRouter } from 'next/navigation';

// material-ui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// project-imports
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import Board from 'sections/apps/kanban/Board';
import Backlogs from 'sections/apps/kanban/Backlogs';

import { APP_DEFAULT_PATH } from 'config';
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

type Props = {
  tab: string;
};

// ==============================|| APPLICATION - KANBAN ||============================== //

export default function Kanban({ tab }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { menuMaster } = useGetMenuMaster();

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    router.push(`/apps/kanban/${newValue}`);
  };

  let breadcrumbTitle = '';
  let breadcrumbHeading = '';

  switch (tab) {
    case 'backlogs':
      breadcrumbTitle = 'Backlogs';
      breadcrumbHeading = 'Backlogs';
      break;
    case 'board':
    default:
      breadcrumbTitle = 'Board';
      breadcrumbHeading = 'Taskboard';
  }

  let breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Kanban', to: '/apps/kanban/board' },
    { title: breadcrumbTitle }
  ];
  if (tab === 'board') {
    breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Kanban' }];
  }

  useEffect(() => {
    if (menuMaster.openedItem !== 'kanban') handlerActiveItem('kanban');
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <Breadcrumbs custom heading={breadcrumbHeading} links={breadcrumbLinks} />
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Tabs value={tab} variant="scrollable" onChange={handleChange}>
              <Tab value="board" label={tab === 'board' ? 'Board' : 'View as Board'} {...a11yProps('board')} />
              <Tab value="backlogs" label={tab === 'backlogs' ? 'Backlogs' : 'View as Backlog'} {...a11yProps('backlogs')} />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            {tab === 'board' && <Board />}
            {tab === 'backlogs' && <Backlogs />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
