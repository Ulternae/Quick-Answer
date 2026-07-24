"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type ServerDataTablePagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

interface ServerDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyMessage?: string;
  pagination?: ServerDataTablePagination;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  stickyEndColumnId?: string;
}

const ServerDataTable = <TData, TValue>({
  columns,
  data,
  emptyMessage,
  pagination,
  isLoading = false,
  onPageChange,
  stickyEndColumnId = "actions",
}: ServerDataTableProps<TData, TValue>) => {
  const tTable = useTranslations("common.table");

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(pagination
      ? {
          manualPagination: true,
          pageCount: pagination.totalPages,
          state: {
            pagination: {
              pageIndex: pagination.page - 1,
              pageSize: pagination.pageSize,
            },
          },
        }
      : {}),
  });

  const getStickyEndColumnClassName = (columnId: string, isHeader = false) => {
    if (columnId !== stickyEndColumnId) {
      return undefined;
    }

    return cn(
      "sticky right-0 w-px bg-[var(--sticky-column-background,var(--background))] whitespace-nowrap before:absolute before:top-0 before:bottom-0 before:-left-px before:w-px before:bg-border before:content-['']",
      isHeader
        ? "z-20 [--sticky-column-background:var(--background)]"
        : "z-10",
    );
  };

  return (
    <div
      className="w-full min-w-0 max-w-full overflow-hidden transition-colors data-[loading=true]:opacity-65"
      data-loading={isLoading || undefined}
    >
      <Table style={{ minWidth: table.getTotalSize() }}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "px-1.5 text-muted-foreground uppercase",
                    getStickyEndColumnClassName(header.column.id, true),
                  )}
                  style={{
                    width: header.column.getSize(),
                    minWidth: header.column.columnDef.minSize,
                    maxWidth: header.column.columnDef.maxSize,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="[--sticky-column-background:var(--background)] hover:[--sticky-column-background:color-mix(in_srgb,var(--muted)_50%,transparent)] data-[state=selected]:[--sticky-column-background:var(--muted)]"
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "px-1.5 py-1.5",
                      getStickyEndColumnClassName(cell.column.id),
                    )}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.columnDef.minSize,
                      maxWidth: cell.column.columnDef.maxSize,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage ?? tTable("no_results")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pagination && onPageChange ? (
        <footer className="flex items-center justify-end gap-3 pt-4">
          <span className="text-xs text-muted-foreground">
            {tTable("page", {
              page: pagination.page,
              totalPages: pagination.totalPages,
            })}
          </span>
          <Button
            variant="outline"
            size="sm"
            aria-label={tTable("first_page")}
            disabled={isLoading || pagination.page <= 1}
            onClick={() => onPageChange(1)}
          >
            <ChevronsLeftIcon aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label={tTable("previous_page")}
            disabled={isLoading || pagination.page <= 1}
            onClick={() => onPageChange(pagination.page - 1)}
          >
            <ChevronLeftIcon aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label={tTable("next_page")}
            disabled={isLoading || pagination.page >= pagination.totalPages}
            onClick={() => onPageChange(pagination.page + 1)}
          >
            <ChevronRightIcon aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label={tTable("last_page")}
            disabled={isLoading || pagination.page >= pagination.totalPages}
            onClick={() => onPageChange(pagination.totalPages)}
          >
            <ChevronsRightIcon aria-hidden="true" />
          </Button>
        </footer>
      ) : null}
    </div>
  );
};

export { ServerDataTable };
export type { ServerDataTablePagination, ServerDataTableProps };
