'use client';

import { useMemo, useState } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// third-party
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import { ColumnDef, ColumnOrderState, flexRender, getCoreRowModel, HeaderGroup, useReactTable } from '@tanstack/react-table';

// project-imports
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, DraggableColumnHeader } from 'components/third-party/react-table';

import makeData from 'data/react-table';

// types
import { TableDataProps } from 'types/table';
import { LabelKeyObject } from 'react-csv/lib/core';

const reorderColumn = (draggedColumnId: string, targetColumnId: string, columnOrder: string[]): ColumnOrderState => {
  columnOrder.splice(columnOrder.indexOf(targetColumnId), 0, columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string);
  return [...columnOrder];
};

interface ReactTableProps {
  defaultColumns: ColumnDef<TableDataProps>[];
  data: TableDataProps[];
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ defaultColumns, data }: ReactTableProps) {
  const [columns] = useState(() => [...defaultColumns]);

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => column.id as string) // must start out with populated columnOrder so we can splice
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  });

  let headers: LabelKeyObject[] = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5
      }
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const draggedColumnId = active.id;
      const targetColumnId = over.id;
      const newColumnOrder = reorderColumn(draggedColumnId, targetColumnId, columnOrder);
      setColumnOrder(newColumnOrder);
    }
  };

  return (
    <MainCard
      title="Column Drag & Drop (Ordering)"
      content={false}
      secondary={<CSVExport {...{ data, headers, filename: 'column-dragable.csv' }} />}
    >
      <ScrollX>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <DraggableColumnHeader key={header.id} header={header} table={table}>
                        <>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</>
                      </DraggableColumnHeader>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DndContext>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| COLUMN - DRAG & DROP ||============================== //

export default function ColumnDragDrop() {
  const data = useMemo(() => makeData(9), []);

  const defaultColumns: ColumnDef<TableDataProps>[] = [
    {
      id: 'firstName',
      header: 'First Name',
      footer: 'First Name',
      accessorKey: 'firstName'
    },
    {
      id: 'lastName',
      header: 'Last Name',
      footer: 'Last Name',
      accessorKey: 'lastName'
    },
    {
      id: 'email',
      header: 'Email',
      footer: 'Email',
      accessorKey: 'email'
    },
    {
      id: 'age',
      header: 'Age',
      footer: 'Age',
      accessorKey: 'age',
      meta: {
        className: 'cell-right'
      }
    },
    {
      id: 'visits',
      header: 'Visits',
      footer: 'Visits',
      accessorKey: 'visits',
      meta: {
        className: 'cell-right'
      }
    },
    {
      id: 'status',
      header: 'Status',
      footer: 'Status',
      accessorKey: 'status',
      cell: (props) => {
        switch (props.getValue()) {
          case 'Complicated':
            return <Chip color="error" label="Complicated" size="small" variant="light" />;
          case 'Relationship':
            return <Chip color="success" label="Relationship" size="small" variant="light" />;
          case 'Single':
          default:
            return <Chip color="info" label="Single" size="small" variant="light" />;
        }
      }
    },
    {
      id: 'progress',
      header: 'Profile Progress',
      footer: 'Profile Progress',
      accessorKey: 'progress',
      cell: (props) => <LinearWithLabel value={props.getValue() as number} sx={{ minWidth: 75 }} />
    }
  ];

  return <ReactTable {...{ defaultColumns, data }} />;
}
