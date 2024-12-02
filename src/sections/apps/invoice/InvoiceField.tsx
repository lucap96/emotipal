// material-ui
import TextField from '@mui/material/TextField';

// ==============================|| INVOICE - TEXT FIELD ||============================== //

export default function InvoiceField({ onEditItem, cellData }: any) {
  return (
    <TextField
      type={cellData.type}
      placeholder={cellData.placeholder}
      name={cellData.name}
      id={cellData.id}
      value={cellData.type === 'number' ? (cellData.value > 0 ? cellData.value : '') : cellData.value}
      onChange={onEditItem}
      label={cellData.label}
      error={Boolean(cellData.errors && cellData.touched)}
      inputProps={{
        ...(cellData.align === 'right' && { style: { textAlign: 'right' } }),
        ...(cellData.type === 'number' && { min: 0 })
      }}
    />
  );
}
