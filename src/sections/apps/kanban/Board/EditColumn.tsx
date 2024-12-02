import { ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

// project-imports
import { editColumn } from 'api/kanban';
import { ThemeMode } from 'config';

// types
import { KanbanColumn } from 'types/kanban';

interface Props {
  column: KanbanColumn;
}

// ==============================|| KANBAN BOARD - COLUMN EDIT ||============================== //

export default function EditColumn({ column }: Props) {
  const theme = useTheme();

  const handleColumnRename = (event: ChangeEvent<HTMLInputElement>) => {
    editColumn({ id: column.id, title: event.target.value, itemIds: column.itemIds });
  };

  return (
    <OutlinedInput
      fullWidth
      value={column.title}
      onChange={handleColumnRename}
      sx={{
        mb: 1.5,
        fontWeight: 500,
        '& input:focus': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[100] : theme.palette.secondary.lighter
        },
        '& input:hover': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[100] : theme.palette.secondary.lighter
        },
        '& input:hover + fieldset': {
          display: 'block'
        },
        '&, & input': { bgcolor: 'transparent', borderRadius: 1 },
        '& fieldset': { display: 'none' },
        '& input:focus + fieldset': { display: 'block' }
      }}
    />
  );
}
