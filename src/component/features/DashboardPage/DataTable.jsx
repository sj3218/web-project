import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

// function Table({ columns, data }) {
// 	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

// 	return (
// 		<div className="bg-white p-10 rounded-[40px] shadow-lg w-full max-w-5xl">
// 			{/* 타이틀 영역 */}
// 			<div className="flex justify-between items-center mb-8">
// 				<h2 className="text-2xl font-extrabold text-orange-600 flex items-center gap-2">🕒 실시간 접수내역 (픽업지연) TOP 5</h2>
// 				<span className="text-gray-400 text-sm">Update: 오전 11:31:13</span>
// 			</div>

// 			<table {...getTableProps()} className="w-full text-left">
// 				<thead>
// 					{headerGroups.map((headerGroup) => (
// 						<tr {...headerGroup.getHeaderGroupProps()} className="text-gray-400 border-none">
// 							{headerGroup.headers.map((column) => (
// 								<th {...column.getHeaderProps()} className="pb-6 font-medium text-lg">
// 									{column.render("Header")}
// 								</th>
// 							))}
// 						</tr>
// 					))}
// 				</thead>
// 				<tbody {...getTableBodyProps()}>
// 					{rows.map((row) => {
// 						prepareRow(row);
// 						return (
// 							<tr {...row.getRowProps()} className="border-none group">
// 								{row.cells.map((cell) => (
// 									<td {...cell.getCellProps()} className="py-5 text-gray-700 text-lg">
// 										{cell.render("Cell")}
// 									</td>
// 								))}
// 							</tr>
// 						);
// 					})}
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// }

const columns = [
	{
		accessorKey: "id",
		header: "ID",
		// cell: (props) => <p>{props.getValue()}</p>,
		size: 50,
	},
	{
		accessorKey: "title",
		header: "TASK",
		// cell: (props) => <p>{props.getValue()}</p>,
		size: 450,
	},
	{
		accessorKey: "completed",
		header: "STATUS",
		//cell: (props) => <p>{props.getValue()}</p>,
		cel: (info) => (info.getValue() ? "✅ 완료" : "❌ 미완료"),
		size: 250,
	},
];

function DataTable({ table_data, isLoading }) {
	const table = useReactTable({
		data: table_data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	if (isLoading) {
		return <div className="p-10 text-center text-blue-500 font-bold">데이터를 열심히 가져오고 있어요... 🚀</div>;
	}

	// 2. 로딩은 끝났는데 데이터가 진짜로 없을 때 (데이터 0건)
	if (!table_data || table_data.length === 0) {
		return <div className="p-10 text-center text-gray-400">표시할 데이터가 일도 없구나! 🧐</div>;
	}

	return (
		// table의 width를 getTotalSize()로 조정해준다.
		<table style={{ width: `${table.getTotalSize()}px` }}>
			<thead>
				{/* Table 헤더 */}
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th
								key={header.id}
								style={{
									// header의 column의 size를 가져와서 width를 조정해준다.
									width: `${header.getSize()}px`,
								}}
							>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<td
								key={cell.id}
								style={{
									// cell의 column의 size를 가져와서 width를 조정해준다.
									width: `${cell.column.getSize()}px`,
									textAlign: "center",
								}}
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
export default DataTable;
