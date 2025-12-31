'use client'

import Board from "@/features/Board/components/Board"
import {BoardState} from "@/features/Board/types/domain";

const initialState: BoardState = {
    title: "Board",
    lists: [
        {
            id: 'list-1',
            title: 'To Do',
            position: 0,
            cards: [
                {
                    id: 'card-1',
                    title: 'Set up Next.js project',
                    position: 0,
                    comments: [
                        {id: 'comment-1', text: 'This looks great!'},
                        {id: 'comment-2', text: 'Can you add more details?'},
                    ],
                },
                {
                    id: 'card-2',
                    title: 'Fix issue with API integration',
                    position: 1,
                    comments: [
                        {id: 'comment-3', text: 'API issue is resolved.'},
                        {id: 'comment-4', text: 'Next, test with live data.'},
                    ],
                },
            ],
        },
        {
            id: 'list-2',
            title: 'In Progress',
            position: 1,
            cards: [
                {
                    id: 'card-3',
                    title: 'Design homepage UI',
                    position: 0,
                    comments: [
                        {id: 'comment-5', text: 'Homepage layout is approved.'},
                    ],
                },
            ],
        },
        {
            id: 'list-3',
            title: 'Completed',
            position: 2,
            cards: [
                {
                    id: 'card-4',
                    title: 'Set up database schema',
                    position: 0,
                    comments: [],
                },
            ],
        },
    ],
}

export default function Home() {
    return <Board initialState={initialState} />
}
