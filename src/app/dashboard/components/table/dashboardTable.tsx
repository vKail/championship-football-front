'use client';
import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { ILeaderboardResponse } from "../../leaderboard/interface/leaderboard.interface";

interface DashboardTableProps {
    leaderboards: ILeaderboardResponse[];
}

const columns = [
    { key: "teamName", name: "Team" },
    { key: "seasonName", name: "Season" },
    { key: "categoryName", name: "Category" },
    { key: "points", name: "Points" },
    { key: "matchesWon", name: "Won" },
    { key: "matchesLost", name: "Lost" },
    { key: "matchesDrawn", name: "Drawn" },
    { key: "goalsScored", name: "Goals Scored" }
];

export default function DashboardTable({ leaderboards }: DashboardTableProps) {
    const renderCell = (leaderboard: ILeaderboardResponse, columnKey: string) => {
        return leaderboard[columnKey as keyof ILeaderboardResponse];
    };

    return (
        <div className="leaderboard-table">
            <Table aria-label="Tabla de posiciones de equipos">
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.key}>{column.name}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    { (
                        leaderboards.map((leaderboard) => (
                            <TableRow key={leaderboard.leaderboardId}>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {renderCell(leaderboard, column.key)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
