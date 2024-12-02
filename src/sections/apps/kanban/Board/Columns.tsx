import { CSSProperties, useState } from 'react';

// material-ui
import { useTheme, Theme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

// third-party
import { Droppable, Draggable, DraggingStyle, NotDraggingStyle } from '@hello-pangea/dnd';

// project-imports
import EditColumn from './EditColumn';
import Items from './Items';
import AddItem from './AddItem';
import AlertColumnDelete from './AlertColumnDelete';
import { openSnackbar } from 'api/snackbar';
import { deleteColumn, useGetBacklogs } from 'api/kanban';
import IconButton from 'components/@extended/IconButton';
import { ThemeMode } from 'config';

// assets
import { Trash } from 'iconsax-react';

// types
import { SnackbarProps } from 'types/snackbar';
import { KanbanColumn, KanbanItem } from 'types/kanban';

interface Props {
  column: KanbanColumn;
  index: number;
}

// column drag wrapper
function getDragWrapper(
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
  theme: Theme,
  radius: string
): CSSProperties | undefined {
  return {
    minWidth: 250,
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: radius,
    userSelect: 'none',
    margin: `0 ${16}px 0 0`,
    height: '100%',
    ...draggableStyle
  };
}

// column drop wrapper
function getDropWrapper(isDraggingOver: boolean, theme: Theme, radius: string) {
  const bgcolor = theme.palette.mode === ThemeMode.DARK ? theme.palette.background.default : theme.palette.secondary[200];
  const bgcolorDrop = theme.palette.mode === ThemeMode.DARK ? theme.palette.text.disabled : theme.palette.secondary.light + 65;

  return {
    background: isDraggingOver ? bgcolorDrop : bgcolor,
    padding: '8px 16px 14px',
    width: 'auto',
    borderRadius: radius
  };
}

// ==============================|| KANBAN BOARD - COLUMN ||============================== //

export default function Columns({ column, index }: Props) {
  const theme = useTheme();

  const { backlogs: lists } = useGetBacklogs();

  const columnItems: KanbanItem[] = column.itemIds.map(
    (itemId: string) => lists?.items.filter((item: KanbanItem) => item.id === itemId)[0]
  );

  const handleColumnDelete = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState(false);
  const handleClose = (status: boolean) => {
    setOpen(false);
    if (status) {
      deleteColumn(column.id);
      openSnackbar({
        open: true,
        message: 'Column deleted successfully',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
    }
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getDragWrapper(snapshot.isDragging, provided.draggableProps.style, theme, `12px`)}
        >
          <Droppable droppableId={column.id} type="item">
            {(providedDrop, snapshotDrop) => (
              <div
                ref={providedDrop.innerRef}
                {...providedDrop.droppableProps}
                style={getDropWrapper(snapshotDrop.isDraggingOver, theme, `12px`)}
              >
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs zeroMinWidth>
                    <EditColumn column={column} />
                  </Grid>
                  <Grid item sx={{ mb: 1.5 }}>
                    <Tooltip title="Delete Column">
                      <IconButton
                        onClick={handleColumnDelete}
                        aria-controls="menu-simple-card"
                        aria-haspopup="true"
                        sx={{
                          ':hover': {
                            color: theme.palette.mode === ThemeMode.DARK ? theme.palette.common.white : theme.palette.error[100]
                          }
                        }}
                        color="error"
                        size="small"
                      >
                        <Trash variant="Bold" />
                      </IconButton>
                    </Tooltip>
                    <AlertColumnDelete title={column.title} open={open} handleClose={handleClose} />
                  </Grid>
                </Grid>
                {columnItems.map((item, i) => (
                  <Items key={i} item={item} index={i} />
                ))}
                {providedDrop.placeholder}
                <AddItem columnId={column.id} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
