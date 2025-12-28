'use client'

import Board from "@/features/Board/components/Board";

const initialLists = [
    {
        id: 'list-1',
        title: 'Todo',
        cards: [
            { id: 'card-1', title: 'Create interview Kanban', commentsCount: 0 },
            { id: 'card-2', title: 'Review Drag & Drop', commentsCount: 1 },
        ],
        onAddCard: () => {},
        onDeleteList: () => {},
        onDeleteAllCards: () => {},
    },
    {
        id: 'list-2',
        title: 'In Progress',
        cards: [
            { id: 'card-3', title: 'Set up Next.js project', commentsCount: 0 },
        ],
        onAddCard: () => {},
        onDeleteList: () => {},
        onDeleteAllCards: () => {},
    },
];

export default function Home() {
    return (
        <Board id={"1"} title={"Board"} lists={initialLists} />
    );
}
