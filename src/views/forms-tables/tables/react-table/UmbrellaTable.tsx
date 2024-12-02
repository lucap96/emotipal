'use client';

import { Fragment, MouseEvent, useEffect, useMemo, useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// third-party
// import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, TouchSensor, UniqueIdentifier } from '@dnd-kit/core';
// import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  useReactTable,
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  HeaderGroup,
  SortingState,
  GroupingState,
  Row,
  Table as TableProps,
  FilterFn,
  SortingFn,
  sortingFns
} from '@tanstack/react-table';
import { compareItems, rankItem, RankingInfo } from '@tanstack/match-sorter-utils';

// project-imports
import makeData from 'data/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import ExpandingUserDetail from 'sections/tables/react-table/ExpandingUserDetail';

import SyntaxHighlight from 'utils/SyntaxHighlight';

import {
  CSVExport,
  DebouncedInput,
  EmptyTable,
  Filter,
  HeaderSort,
  IndeterminateCheckbox,
  RowSelection,
  TablePagination,
  RowEditable,
  DraggableRow,
  DraggableColumnHeader,
  SelectColumnVisibility
} from 'components/third-party/react-table';

// types
import { TableDataProps } from 'types/table';
import { LabelKeyObject } from 'react-csv/lib/core';

// assets
import { ArrowDown2, ArrowRight2, CloseCircle, Command, Edit2, Send, TableDocument } from 'iconsax-react';

const avatarImage = '/assets/images/users';

export const fuzzyFilter: FilterFn<TableDataProps> = (row, columnId, value, addMeta) => {
  // rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // store the ranking info
  addMeta(itemRank);

  // return if the item should be filtered in/out
  return itemRank.passed;
};

export const fuzzySort: SortingFn<TableDataProps> = (rowA, rowB, columnId) => {
  let dir = 0;

  // only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(rowA.columnFiltersMeta[columnId]! as RankingInfo, rowB.columnFiltersMeta[columnId]! as RankingInfo);
  }

  // provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

// ==============================|| REACT TABLE - EDIT ACTION ||============================== //

function EditAction({ row, table }: { row: Row<TableDataProps>; table: TableProps<TableDataProps> }) {
  const meta = table?.options?.meta;
  const setSelectedRow = (e: MouseEvent<HTMLButtonElement> | undefined) => {
    meta?.setSelectedRow((old: TableDataProps[]) => ({
      ...old,
      [row.id]: !old[row.id as any]
    }));

    // @ts-ignore
    meta?.revertData(row.index, e?.currentTarget.name === 'cancel');
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {meta?.selectedRow[row.id] && (
        <Tooltip title="Cancel">
          <IconButton color="error" name="cancel" onClick={setSelectedRow}>
            <CloseCircle size="15" variant="Outline" />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={meta?.selectedRow[row.id] ? 'Save' : 'Edit'}>
        <IconButton color={meta?.selectedRow[row.id] ? 'success' : 'primary'} onClick={setSelectedRow}>
          {meta?.selectedRow[row.id] ? <Send size="15" variant="Bold" /> : <Edit2 variant="Outline" />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

interface ReactTableProps {
  defaultColumns: ColumnDef<TableDataProps>[];
  data: TableDataProps[];
  setData: any;
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ defaultColumns, data, setData }: ReactTableProps) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [rowSelection, setRowSelection] = useState<{ [key: number]: boolean }>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([]);

  const [originalData, setOriginalData] = useState(() => [...data]);
  const [selectedRow, setSelectedRow] = useState({});

  const [columns] = useState(() => [...defaultColumns]);

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => column.id as string) // must start out with populated columnOrder so we can splice
  );

  // const dataIds = useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id), [data]);

  const [statusFilter, setStatusFilter] = useState<string | number>('');

  const filteredData = useMemo(() => {
    if (statusFilter === '') return data;
    return data.filter((user) => user.status === statusFilter);
  }, [statusFilter, data]);

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0] as TableDataProps);
    setData([...data]);
  };

  // const reorderColumn = (draggedColumnId: string, targetColumnId: string, columnOrder: string[]): ColumnOrderState => {
  //   columnOrder.splice(columnOrder.indexOf(targetColumnId), 0, columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string);
  //   return [...columnOrder];
  // };

  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data: filteredData,
    columns,
    defaultColumn: { cell: RowEditable },
    state: {
      rowSelection,
      columnFilters,
      globalFilter,
      sorting,
      grouping,
      columnOrder,
      columnVisibility
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    globalFilterFn: fuzzyFilter,
    getRowId: (row) => row.id.toString(), // good to have guaranteed unique row ids/keys for rendering
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    meta: {
      selectedRow,
      setSelectedRow,
      revertData: (rowIndex: number, revert: unknown) => {
        if (revert) {
          setData((old: TableDataProps[]) => old.map((row, index) => (index === rowIndex ? originalData[rowIndex] : row)));
        } else {
          setOriginalData((old) => old.map((row, index) => (index === rowIndex ? data[rowIndex] : row)));
        }
      },
      updateData: (rowIndex, columnId, value) => {
        setData((old: TableDataProps[]) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value
              };
            }
            return row;
          })
        );
      }
    }
  });

  useEffect(() => setColumnVisibility({ id: false, role: false, contact: false, country: false, progress: false }), []);

  const backColor = alpha(theme.palette.primary.lighter, 0.1);

  let headers: LabelKeyObject[] = [];
  table.getVisibleLeafColumns().map(
    (columns) =>
      // @ts-ignore
      columns.columnDef.accessorKey &&
      headers.push({
        label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
        // @ts-ignore
        key: columns.columnDef.accessorKey
      })
  );

  // const sensors = useSensors(
  //   useSensor(PointerSensor, {
  //     activationConstraint: {
  //       distance: 10
  //     }
  //   }),
  //   useSensor(TouchSensor, {
  //     activationConstraint: {
  //       delay: 100,
  //       tolerance: 5
  //     }
  //   })
  // );

  // const handleDragEnd = (event: any) => {
  //   const { active, over } = event;
  //   if (active && over && active.id !== over.id) {
  //     const draggedColumnId = active.id;
  //     const targetColumnId = over.id;
  //     const newColumnOrder = reorderColumn(draggedColumnId, targetColumnId, columnOrder);
  //     setColumnOrder(newColumnOrder);
  //     // const draggedRowIndex = table.getRowModel().rows.findIndex((row) => `row-${row.id}` === active.id);
  //     // const targetRowIndex = table.getRowModel().rows.findIndex((row) => `row-${row.id}` === over.id);
  //     // reorderRow(draggedRowIndex, targetRowIndex);

  //     const oldIndex = data.findIndex((item) => item.id === active.id);
  //     const newIndex = data.findIndex((item) => item.id === over.id);
  //     const newData = arrayMove(data, oldIndex, newIndex);
  //     setData(newData);
  //   }
  // };

  // const handleDragEnd = (event: any) => {
  //   const { active, over } = event;
  //   if (active.data.current?.type === 'column') {
  //     if (active && over && active.id !== over.id) {
  //       const draggedRowIndex = table.getRowModel().rows.findIndex((row) => `row-${row.id}` === active.id);
  //       const targetRowIndex = table.getRowModel().rows.findIndex((row) => `row-${row.id}` === over.id);
  //       reorderRow(draggedRowIndex, targetRowIndex);
  //     } else {
  //       if (active && over && active.id !== over.id) {
  //         const draggedColumnId = active.id;
  //         const targetColumnId = over.id;
  //         const newColumnOrder = reorderColumn(draggedColumnId, targetColumnId, columnOrder);
  //         setColumnOrder(newColumnOrder);
  //       }
  //     }
  //   }
  // };

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        sx={{ padding: 2, ...(matchDownSM && { '& .MuiOutlinedInput-root, & .MuiFormControl-root': { width: '100%' } }) }}
      >
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} records...`}
        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            displayEmpty
            input={<OutlinedInput />}
            sx={{
              '& .MuiSelect-select': {
                py: 1.3
              }
            }}
            inputProps={{ 'aria-label': 'Status Filter' }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Relationship">Relationship</MenuItem>
            <MenuItem value="Complicated">Complicated</MenuItem>
          </Select>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <SelectColumnVisibility
              {...{
                getVisibleLeafColumns: table.getVisibleLeafColumns,
                getIsAllColumnsVisible: table.getIsAllColumnsVisible,
                getToggleAllColumnsVisibilityHandler: table.getToggleAllColumnsVisibilityHandler,
                getAllColumns: table.getAllColumns
              }}
            />
            <CSVExport
              {...{
                data:
                  table.getSelectedRowModel().flatRows.map((row) => row.original).length === 0
                    ? data
                    : table.getSelectedRowModel().flatRows.map((row) => row.original),
                headers,
                filename: 'umbrella.csv'
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      <ScrollX>
        <RowSelection selected={Object.keys(rowSelection).length} />
        {/* <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={dataIds} strategy={verticalListSortingStrategy}> */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                <TableRow key={headerGroup.id}>
                  <TableCell />
                  {headerGroup.headers.map((header) => {
                    if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                      Object.assign(header.column.columnDef.meta, {
                        className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                      });
                    }

                    return (
                      <DraggableColumnHeader key={header.id} header={header} table={table}>
                        <>
                          {header.isPlaceholder ? null : (
                            <Stack direction="row" spacing={1} alignItems="center">
                              {header.column.getCanGroup() && (
                                <IconButton
                                  color={header.column.getIsGrouped() ? 'error' : 'primary'}
                                  onClick={header.column.getToggleGroupingHandler()}
                                  size="small"
                                  sx={{ p: 0, width: 24, height: 24, fontSize: '1rem', mr: 0.75 }}
                                >
                                  {header.column.getIsGrouped() ? (
                                    <Command size="32" color="#FF8A65" variant="Bold" />
                                  ) : (
                                    <TableDocument size="32" variant="Outline" />
                                  )}
                                </IconButton>
                              )}
                              <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                              {header.column.getCanSort() && <HeaderSort column={header.column} sort />}
                            </Stack>
                          )}
                        </>
                      </DraggableColumnHeader>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                <TableRow key={headerGroup.id}>
                  <TableCell />
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.column.getCanFilter() && <Filter column={header.column} table={table} />}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <DraggableRow row={row} reorderRow={reorderRow}>
                      <>
                        {row.getVisibleCells().map((cell) => {
                          let bgcolor = 'background.paper';
                          if (cell.getIsGrouped()) bgcolor = 'primary.lighter';
                          if (cell.getIsAggregated()) bgcolor = 'warning.lighter';
                          if (cell.getIsPlaceholder()) bgcolor = 'error.lighter';

                          if (cell.column.columnDef.meta !== undefined && cell.column.getCanSort()) {
                            Object.assign(cell.column.columnDef.meta, {
                              style: { backgroundColor: bgcolor }
                            });
                          }

                          return (
                            <TableCell
                              key={cell.id}
                              {...cell.column.columnDef.meta}
                              sx={{ bgcolor }}
                              {...(cell.getIsGrouped() &&
                                cell.column.columnDef.meta === undefined && {
                                  style: { backgroundColor: bgcolor }
                                })}
                            >
                              {cell.getIsGrouped() ? (
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                  <IconButton
                                    color="secondary"
                                    onClick={row.getToggleExpandedHandler()}
                                    size="small"
                                    sx={{ p: 0, width: 24, height: 24 }}
                                  >
                                    {row.getIsExpanded() ? (
                                      <ArrowDown2 size="32" variant="Outline" />
                                    ) : (
                                      <ArrowRight2 size="32" variant="Outline" />
                                    )}
                                  </IconButton>
                                  <Box>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Box> <Box>({row.subRows.length})</Box>
                                </Stack>
                              ) : cell.getIsAggregated() ? (
                                flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())
                              ) : cell.getIsPlaceholder() ? null : (
                                flexRender(cell.column.columnDef.cell, cell.getContext())
                              )}
                            </TableCell>
                          );
                        })}
                      </>
                    </DraggableRow>
                    {row.getIsExpanded() && !row.getIsGrouped() && (
                      <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
                        <TableCell colSpan={row.getVisibleCells().length + 2}>
                          <ExpandingUserDetail data={row.original} />
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length}>
                    <EmptyTable msg="No Data" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              {table.getFooterGroups().map((footerGroup) => (
                <TableRow key={footerGroup.id}>
                  <TableCell />
                  {footerGroup.headers.map((footer) => (
                    <TableCell key={footer.id} {...footer.column.columnDef.meta}>
                      {footer.isPlaceholder ? null : flexRender(footer.column.columnDef.header, footer.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          </Table>
        </TableContainer>
        {/* </SortableContext>
        </DndContext> */}
        <Divider />
        <Box sx={{ p: 2 }}>
          <TablePagination
            {...{
              setPageSize: table.setPageSize,
              setPageIndex: table.setPageIndex,
              getState: table.getState,
              getPageCount: table.getPageCount
            }}
          />
        </Box>
        <SyntaxHighlight customStyle={{ margin: 0 }}>
          {JSON.stringify(
            {
              selectedRowIndices: rowSelection,
              'selectedFlatRows[].original': originalData.filter((e) => rowSelection[e.id])
            },
            null,
            2
          )}
        </SyntaxHighlight>
      </ScrollX>
    </>
  );
}

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

export default function UmbrellaTable() {
  const [data, setData] = useState<TableDataProps[]>(() => makeData(20));

  const columns = useMemo<ColumnDef<TableDataProps>[]>(
    () => [
      {
        id: 'expander',
        enableGrouping: false,
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <IconButton color={row.getIsExpanded() ? 'primary' : 'secondary'} onClick={row.getToggleExpandedHandler()} size="small">
              {row.getIsExpanded() ? <ArrowDown2 size="32" variant="Outline" /> : <ArrowRight2 size="32" variant="Outline" />}
            </IconButton>
          ) : (
            <IconButton color="secondary" size="small" disabled>
              <CloseCircle />
            </IconButton>
          );
        }
      },
      {
        id: 'select',
        enableGrouping: false,
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      {
        id: 'id',
        title: 'Id',
        header: '#',
        accessorKey: 'id',
        dataType: 'text',
        enableColumnFilter: false,
        enableGrouping: false,
        meta: { className: 'cell-center' }
      },
      {
        id: 'avatar',
        header: 'Avatar',
        accessorKey: 'avatar',
        enableColumnFilter: false,
        enableGrouping: false,
        cell: (cell) => <Avatar alt="Avatar 1" size="sm" src={`${avatarImage}/avatar-${!cell ? 1 : cell.getValue()}.png`} />,
        meta: { className: 'cell-center' }
      },
      {
        id: 'firstName',
        header: 'First Name',
        footer: 'First Name',
        accessorKey: 'firstName',
        dataType: 'text',
        enableGrouping: false
      },
      {
        id: 'lastName',
        header: 'Last Name',
        footer: 'Last Name',
        accessorKey: 'lastName',
        dataType: 'text',
        enableGrouping: false
      },
      {
        id: 'email',
        header: 'Email',
        footer: 'Email',
        accessorKey: 'email',
        dataType: 'text',
        enableGrouping: false
      },
      {
        id: 'age',
        header: 'Age',
        footer: 'Age',
        accessorKey: 'age',
        dataType: 'text',
        meta: { className: 'cell-right' }
      },
      {
        id: 'role',
        header: 'Role',
        footer: 'Role',
        accessorKey: 'role',
        dataType: 'text',
        enableGrouping: false,
        filterFn: fuzzyFilter,
        sortingFn: fuzzySort
      },
      {
        id: 'contact',
        header: 'Contact',
        footer: 'Contact',
        accessorKey: 'contact',
        dataType: 'text',
        enableGrouping: false
      },
      {
        id: 'country',
        header: 'Country',
        footer: 'Country',
        accessorKey: 'country',
        dataType: 'text',
        enableGrouping: false
      },
      {
        id: 'visits',
        header: 'Visits',
        footer: 'Visits',
        accessorKey: 'visits',
        dataType: 'text',
        enableGrouping: false,
        meta: { className: 'cell-right' }
      },
      {
        id: 'status',
        header: 'Status',
        footer: 'Status',
        accessorKey: 'status',
        dataType: 'select'
      },
      {
        id: 'progress',
        header: 'Profile Progress',
        footer: 'Profile Progress',
        accessorKey: 'progress',
        dataType: 'progress',
        enableGrouping: false
      },
      {
        id: 'edit',
        header: 'Actions',
        cell: EditAction,
        enableGrouping: false,
        meta: { className: 'cell-center' }
      }
    ],
    []
  );

  return (
    <MainCard
      title="Umbrella Table"
      subheader="This page consist combination of most possible features of react-table in to one table. Sorting, grouping, row selection, hidden row, filter, search, pagination, footer row available in below table."
      content={false}
    >
      <ReactTable {...{ data, defaultColumns: columns, setData }} />
    </MainCard>
  );
}
