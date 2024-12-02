import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { getIn } from 'formik';

// project-imports
import InvoiceField from './InvoiceField';
import AlertProductDelete from './AlertProductDelete';

import { useGetInvoiceMaster } from 'api/invoice';
import { openSnackbar } from 'api/snackbar';
import { ThemeMode } from 'config';

// assets
import { Trash } from 'iconsax-react';

// types
import { SnackbarProps } from 'types/snackbar';

// ==============================|| INVOICE - ITEMS ||============================== //

export default function InvoiceItem({
  id,
  name,
  description,
  qty,
  price,
  onDeleteItem,
  onEditItem,
  index,
  Blur,
  errors,
  touched,
  country
}: any) {
  const { invoiceMaster } = useGetInvoiceMaster();
  const theme = useTheme();
  const mode = theme.palette.mode;

  const [open, setOpen] = useState(false);
  const handleModalClose = (status: boolean) => {
    setOpen(false);
    if (status) {
      onDeleteItem(index);
      openSnackbar({
        open: true,
        message: 'Product Deleted successfully',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
    }
  };

  const Name = `invoice_detail[${index}].name`;
  const touchedName = getIn(touched, Name);
  const errorName = getIn(errors, Name);

  const textFieldItem = [
    {
      placeholder: 'Item name',
      label: 'Item Name',
      name: `invoice_detail.${index}.name`,
      type: 'text',
      id: id + '_name',
      value: name,
      errors: errorName,
      touched: touchedName,
      align: 'left'
    },
    {
      placeholder: 'Description',
      label: 'Description',
      name: `invoice_detail.${index}.description`,
      type: 'text',
      id: id + '_description',
      value: description,
      align: 'left'
    },
    { placeholder: '', label: 'Qty', type: 'number', name: `invoice_detail.${index}.qty`, id: id + '_qty', value: qty, align: 'right' },
    {
      placeholder: '',
      label: 'price',
      type: 'number',
      name: `invoice_detail.${index}.price`,
      id: id + '_price',
      value: price,
      align: 'right'
    }
  ];

  return (
    <>
      {textFieldItem.map((item: any, index: number) => {
        return (
          <TableCell key={index} align={item.align} sx={{ '& .MuiFormHelperText-root': { position: 'absolute', bottom: -24, ml: 0 } }}>
            <InvoiceField
              onEditItem={(event: any) => onEditItem(event)}
              onBlur={(event: any) => Blur(event)}
              cellData={{
                placeholder: item.placeholder,
                name: item.name,
                type: item.type,
                id: item.id,
                value: item.value,
                errors: item.errors,
                touched: item.touched,
                align: item.align
              }}
              key={item.label}
            />
          </TableCell>
        );
      })}
      <TableCell align="right">
        <Box>
          {invoiceMaster === undefined ? (
            <Skeleton width={520} height={16} />
          ) : (
            <Typography>
              {country
                ? `${country.prefix ?? ''} ${(price * qty).toFixed(2)}`
                : `${invoiceMaster.country?.prefix ?? ''} ${(price * qty).toFixed(2)}`}
            </Typography>
          )}
        </Box>
      </TableCell>
      <TableCell align="center">
        <Tooltip
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                opacity: 0.9
              }
            }
          }}
          title="Remove Item"
        >
          <Button color="error" onClick={() => setOpen(true)}>
            <Trash />
          </Button>
        </Tooltip>
      </TableCell>
      <AlertProductDelete title={name} open={open} handleClose={handleModalClose} />
    </>
  );
}
