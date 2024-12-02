import { useEffect, useState, useMemo, Dispatch, MouseEvent, SetStateAction } from 'react';

// next
import { usePathname, useRouter } from 'next/navigation';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Collapse from '@mui/material/Collapse';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import NavItem from './NavItem';
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import Transitions from 'components/@extended/Transitions';

import useConfig from 'hooks/useConfig';
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';
import { MenuOrientation, ThemeMode } from 'config';

// assets
import { ArrowDown2, ArrowUp2, ArrowRight2, Copy } from 'iconsax-react';

// types
import { NavItemType } from 'types/menu';

type ListItemClick =
  | React.MouseEvent<HTMLButtonElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | undefined;

type VirtualElement = {
  getBoundingClientRect: () => DOMRect;
  contextElement?: Element;
};

// mini-menu - wrapper
const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: 'visible',
  zIndex: 1202,
  minWidth: 180,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 38,
    left: -5,
    width: 10,
    height: 10,
    backgroundColor: theme.palette.background.paper,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));

// ==============================|| NAVIGATION - COLLAPSE ||============================== //

interface Props {
  menu: NavItemType;
  level: number;
  parentId: string;
  setSelectedItems: Dispatch<SetStateAction<string | undefined>>;
  selectedItems: string | undefined;
  setSelectedLevel: Dispatch<SetStateAction<number>>;
  selectedLevel: number;
}

export default function NavCollapse({ menu, level, parentId, setSelectedItems, selectedItems, setSelectedLevel, selectedLevel }: Props) {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null | undefined>(null);
  const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);

  const [anchorElCollapse, setAnchorElCollapse] = useState<null | HTMLElement>(null);

  const openCollapse = Boolean(anchorElCollapse);
  const handleClickCollapse = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorElCollapse(event.currentTarget);
  };
  const handleCloseCollapse = () => {
    setAnchorElCollapse(null);
  };

  const handleClick = (event: ListItemClick, isRedirect: boolean) => {
    setAnchorEl(null);
    setSelectedLevel(level);
    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
      setSelectedItems(!selected ? menu.id : '');
      if (menu.url && isRedirect) router.push(`${menu.url}`);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handlerIconLink = () => {
    if (!drawerOpen) {
      if (menu.url) router.push(`${menu.url}`);
      if (menuOrientation === MenuOrientation.VERTICAL) setSelected(menu.id);
    }
  };

  const handleHover = (event: MouseEvent<HTMLElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const miniMenuOpened = Boolean(anchorEl);

  const handleClose = () => {
    setOpen(false);
    if (!miniMenuOpened && !menu.url) {
      setSelected(null);
    }
    setAnchorEl(null);
  };

  useMemo(() => {
    if (selected === selectedItems) {
      if (level === 1) {
        setOpen(true);
      }
    } else {
      if (level === selectedLevel) {
        setOpen(false);
        if ((!miniMenuOpened && !drawerOpen && !selected) || drawerOpen) {
          setSelected(null);
        }
      }
    }
  }, [selectedItems, level, selected, miniMenuOpened, drawerOpen, selectedLevel]);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === menu.url) {
      setSelected(menu.id);
    }
    // eslint-disable-next-line
  }, [pathname]);

  const checkOpenForParent = (child: NavItemType[], id: string) => {
    child.forEach((item: NavItemType) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  // menu collapse for sub-levels
  useEffect(() => {
    setOpen(false);
    if (!miniMenuOpened) {
      setSelected(null);
    }
    if (miniMenuOpened) setAnchorEl(null);
    if (menu.children) {
      menu.children.forEach((item: NavItemType) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id!);
        }
        if (pathname && pathname.includes('product-details')) {
          if (item.url && item.url.includes('product-details')) {
            setSelected(menu.id);
            setOpen(true);
          }
        }

        if (pathname && pathname.includes('invoice')) {
          if (item.url && item.url.includes('invoice')) {
            setSelected(menu.id);
            setOpen(true);
          }
        }

        if (pathname && pathname.includes('profiles')) {
          if (item.url && item.url.includes('profiles')) {
            setSelected(menu.id);
            setOpen(true);
          }
        }

        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menu.children]);

  useEffect(() => {
    if (menu.url === pathname) {
      handlerActiveItem(menu.id!);
      setSelected(menu.id);
      setAnchorEl(null);
      setOpen(true);
    }
  }, [pathname, menu]);

  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            menu={item}
            level={level + 1}
            parentId={parentId}
          />
        );
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Collapse or Item
          </Typography>
        );
    }
  });

  const isSelected = selected === menu.id;
  const borderIcon = level === 1 ? <Copy variant="Bulk" size={drawerOpen ? 22 : 24} /> : false;
  const Icon = menu.icon!;
  const menuIcon = menu.icon ? <Icon variant="Bulk" size={drawerOpen ? 22 : 24} /> : borderIcon;
  const textColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[400] : theme.palette.secondary.main;
  const iconSelectedColor = theme.palette.mode === ThemeMode.DARK && drawerOpen ? theme.palette.text.primary : theme.palette.primary.main;
  const popperId = miniMenuOpened ? `collapse-pop-${menu.id}` : undefined;
  const FlexBox = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' };

  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        <>
          <ListItemButton
            id={`${menu.id}-button`}
            selected={isSelected}
            {...(!drawerOpen && { onMouseEnter: (e) => handleClick(e, true), onMouseLeave: handleClose })}
            onClick={(e) => handleClick(e, true)}
            sx={{
              pl: level === 2 ? 3.25 : drawerOpen ? (level <= 3 ? (level * 20) / 8 : (level * 20 + (level - 3) * 10) / 8) : 1.5,
              py: !drawerOpen && level === 1 ? 1.25 : 1,
              ...(drawerOpen &&
                level === 1 && {
                  mx: 1.25,
                  my: 0.5,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'secondary.200'
                  },
                  '&.Mui-selected': {
                    color: iconSelectedColor
                  }
                }),
              ...(!drawerOpen && {
                px: 2.75,
                '&:hover': {
                  bgcolor: 'transparent'
                },
                '&.Mui-selected': {
                  '&:hover': {
                    bgcolor: 'transparent'
                  },
                  bgcolor: 'transparent'
                }
              })
            }}
            {...((drawerOpen &&
              menu.isDropdown && {
                'aria-controls': openCollapse ? `${menu.id}-menu` : undefined,
                'aria-haspopup': true,
                'aria-expanded': openCollapse ? 'true' : undefined,
                onClick: handleClickCollapse
              }) as any)}
          >
            {menuIcon && (
              <ListItemIcon
                onClick={handlerIconLink}
                sx={{
                  minWidth: 38,
                  color: isSelected ? 'primary.main' : textColor,
                  ...(!drawerOpen && {
                    borderRadius: 1,
                    width: 46,
                    height: 46,
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.200'
                    }
                  }),
                  ...(!drawerOpen &&
                    isSelected && {
                      bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.100' : 'primary.lighter',
                      '&:hover': {
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.200' : 'primary.lighter'
                      }
                    })
                }}
              >
                {menuIcon}
              </ListItemIcon>
            )}

            {!menuIcon && drawerOpen && (
              <ListItemIcon sx={{ minWidth: 30 }}>
                <Dot size={isSelected ? 6 : 5} color={isSelected ? 'primary' : 'secondary'} />
              </ListItemIcon>
            )}

            {(drawerOpen || (!drawerOpen && level !== 1)) && (
              <ListItemText
                primary={
                  <Typography variant="h6" color={isSelected ? 'primary' : textColor} sx={{ fontWeight: isSelected ? 500 : 400 }}>
                    {menu.title}
                  </Typography>
                }
                secondary={
                  menu.caption && (
                    <Typography variant="caption" color="secondary">
                      {menu.caption}
                    </Typography>
                  )
                }
              />
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) &&
              (menu?.url ? (
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClick(event, false);
                  }}
                  color="secondary"
                  variant="outlined"
                  sx={{
                    width: 20,
                    height: 20,
                    mr: '-5px !important',
                    p: 0.25,
                    color: 'secondary.dark',
                    borderColor: open ? 'primary.light' : 'secondary.light',
                    '&:hover': { borderColor: open ? 'primary.main' : 'secondary.main' }
                  }}
                >
                  {miniMenuOpened || open ? (
                    <>
                      {miniMenuOpened ? (
                        <ArrowRight2 size={12} color={textColor} style={{ marginLeft: 1 }} />
                      ) : (
                        <ArrowUp2 size={12} color={textColor} style={{ marginLeft: 1 }} />
                      )}
                    </>
                  ) : (
                    <ArrowDown2 size={12} color={textColor} style={{ marginLeft: 1 }} />
                  )}
                </IconButton>
              ) : (
                <>
                  {miniMenuOpened || open ? (
                    <>
                      {miniMenuOpened ? (
                        <ArrowRight2 size={12} color={textColor} style={{ marginLeft: 1 }} />
                      ) : (
                        <ArrowUp2 size={12} color={textColor} style={{ marginLeft: 1 }} />
                      )}
                    </>
                  ) : (
                    <ArrowDown2 size={12} color={textColor} style={{ marginLeft: 1 }} />
                  )}
                </>
              ))}

            {!drawerOpen && (
              <PopperStyled
                open={miniMenuOpened}
                anchorEl={anchorEl}
                placement="right-start"
                sx={{ zIndex: 2001 }}
                popperOptions={{
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [-12, 1]
                      }
                    }
                  ]
                }}
              >
                {({ TransitionProps }) => (
                  <Transitions in={miniMenuOpened} {...TransitionProps}>
                    <Paper
                      sx={{
                        overflow: 'hidden',
                        mt: 1.5,
                        boxShadow: theme.customShadows.z1,
                        backgroundImage: 'none',
                        border: `1px solid ${theme.palette.divider}`
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <SimpleBar sx={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: 'calc(100vh - 170px)' }}>
                          {navCollapse}
                        </SimpleBar>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </PopperStyled>
            )}
          </ListItemButton>
          {drawerOpen && !menu?.isDropdown && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List sx={{ py: 0, px: level <= 1 ? 1.5 : 0 }}>{navCollapse}</List>
            </Collapse>
          )}
          {drawerOpen && menu?.isDropdown && (
            <Menu
              id={`${menu.id}-menu`}
              aria-labelledby={`${menu.id}-button`}
              anchorEl={anchorElCollapse}
              open={openCollapse}
              onClose={handleCloseCollapse}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{ '& .MuiPaper-root': { boxShadow: theme.shadows[2] } }}
            >
              {navCollapse}
            </Menu>
          )}
        </>
      ) : (
        <ListItemButton
          id={`boundary-${popperId}`}
          selected={isSelected}
          onMouseEnter={handleHover}
          onMouseLeave={handleClose}
          onClick={handleHover}
          aria-describedby={popperId}
          disableTouchRipple
          sx={{
            zIndex: 121,
            borderRadius: level >= 1 ? 0 : 1,
            '&.Mui-selected': {
              '&:hover': {
                bgcolor: 'transparent'
              },
              bgcolor: 'transparent'
            }
          }}
        >
          <Box onClick={handlerIconLink} sx={FlexBox}>
            {menuIcon && (
              <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36, color: theme.palette.secondary.dark }}>
                {menuIcon}
              </ListItemIcon>
            )}
            <ListItemText
              primary={
                <Typography variant="h6" color={textColor} sx={{ fontWeight: isSelected ? 500 : 400 }}>
                  {menu.title}
                </Typography>
              }
            />
            {miniMenuOpened ? <ArrowRight2 size={12} color={textColor} /> : <ArrowDown2 size={12} color={textColor} />}
          </Box>

          {anchorEl && (
            <PopperStyled
              id={popperId}
              open={miniMenuOpened}
              anchorEl={anchorEl}
              placement="right-start"
              sx={{ zIndex: 2001 }}
              modifiers={[
                {
                  name: 'offset',
                  options: {
                    offset: [-15, 0]
                  }
                }
              ]}
            >
              {({ TransitionProps }) => (
                <Transitions in={miniMenuOpened} {...TransitionProps}>
                  <Paper
                    sx={{
                      overflow: 'hidden',
                      mt: 1.5,
                      py: 0.5,
                      boxShadow: theme.customShadows.z1,
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundImage: 'none'
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      <SimpleBar sx={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: 'calc(100vh - 170px)' }}>{navCollapse}</SimpleBar>
                    </ClickAwayListener>
                  </Paper>
                </Transitions>
              )}
            </PopperStyled>
          )}
        </ListItemButton>
      )}
    </>
  );
}
