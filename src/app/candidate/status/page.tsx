"use client";

import * as React from "react";
import acceptRestaurantCandidate from "@/apis/acceptRestaurantCandidate";
import deleteRestaurantCandidate from "@/apis/deleteRestaurantCandidate";
import getRestaurantCandidates from "@/apis/getRestaurantCandidates";
import CandidateEditDialog from "@/components/Dialog/CandidateEditDialog";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Candidate, CandidateStatus } from "@/types";
import { useQuery } from "@tanstack/react-query";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import checkUserAuthLevel from "@/utils/checkUserAuthLevel";
import { formatCategory } from "@/utils/formatCategory";

export default function CandidateStatusPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [candidateStatus, setCandidateStatus] =
    React.useState<CandidateStatus>("WAITING");
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editingCandidate, setEditingCandidate] =
    React.useState<Candidate | null>(null);
  const { data: waitingData, refetch: refetchWaiting } = useQuery({
    queryKey: ["candidates", "WAITING"],
    queryFn: () => getRestaurantCandidates("WAITING", 0),
  });
  const { data: acceptedData, refetch: refetchAccepted } = useQuery({
    queryKey: ["candidates", "ACCEPTED"],
    queryFn: () => getRestaurantCandidates("ACCEPTED", 0),
  });

  const columns: ColumnDef<Candidate>[] = [
    {
      accessorKey: "name",
      header: "이름",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "category",
      header: "카테고리",
      cell: ({ row }) => <div>{formatCategory(row.getValue("category"))}</div>,
    },

    {
      accessorKey: "address",
      header: "주소",
      cell: ({ row }) => <div>{row.getValue("address")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "신청일",
      cell: ({ row }) => (
        <div>{format(row.getValue("createdAt"), "yyyy년 MM월 dd일")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const candidate = row.original;
        const level = checkUserAuthLevel();

        const handleDeleteCandidate = async () => {
          deleteRestaurantCandidate(candidate.id).then((res) => {
            if (res) {
              toast.success("해당 신청 건이 거절되었습니다!");
              refetchWaiting();
              refetchAccepted();
            }
          });
        };

        const handleAcceptCandidate = async () => {
          acceptRestaurantCandidate(candidate.id).then((res) => {
            if (res) {
              toast.success("해당 신청 건이 승인되었습니다!");
              refetchWaiting();
              refetchAccepted();
            }
          });
        };

        const handleEditCandidate = () => {
          setEditingCandidate(candidate);
          setEditDialogOpen(true);
        };

        return (
          <>
            {level === "ADMIN" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <span className="sr-only">메뉴</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    className={"cursor-pointer"}
                    onClick={() => handleAcceptCandidate()}
                  >
                    승인
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={"cursor-pointer"}
                    onClick={handleEditCandidate}
                  >
                    수정
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={"cursor-pointer"}
                    onClick={() => handleDeleteCandidate()}
                  >
                    거절
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    data:
      candidateStatus === "WAITING"
        ? waitingData?.data ?? []
        : acceptedData?.data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <>
      <NavBar />
      <div className={"h-dvh w-full p-4"}>
        <h1 className={"text-xl font-bold"}>맛집 신청 현황</h1>

        <div className="flex items-center py-4">
          <Input
            placeholder="이름 검색"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto"
              >
                표시할 항목 <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className={"justify-center"}
                onClick={() => setCandidateStatus("WAITING")}
              >
                신청 대기 목록
              </DropdownMenuItem>
              <DropdownMenuItem
                className={"justify-center"}
                onClick={() => setCandidateStatus("ACCEPTED")}
              >
                승인 목록
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              이전
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              다음
            </Button>
          </div>
        </div>
      </div>
      {editingCandidate && (
        <CandidateEditDialog
          candidate={editingCandidate}
          isOpened={editDialogOpen}
          setIsOpened={setEditDialogOpen}
          refetch={refetchWaiting}
        />
      )}
    </>
  );
}
