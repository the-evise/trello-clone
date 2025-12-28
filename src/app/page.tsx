'use client'

import Board from "@/features/Board/components/Board"
import {BoardState} from "@/features/Board/types/domain";

const initialState: BoardState = {
    title: "Board",
    lists: [
        {
            id: 'list-1',
            title: 'To Do',
            cards: [
                {
                    id: 'card-1',
                    title: 'Set up Next.js project',
                    comments: [
                        {id: 'comment-1', text: 'This looks great!'},
                        {id: 'comment-2', text: 'Can you add more details?'},
                    ],
                },
                {
                    id: 'card-2',
                    title: 'Fix issue with API integration',
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
            cards: [
                {
                    id: 'card-3',
                    title: 'Design homepage UI',
                    comments: [
                        {id: 'comment-5', text: 'Homepage layout is approved.'},
                    ],
                },
            ],
        },
        {
            id: 'list-3',
            title: 'Completed',
            cards: [
                {
                    id: 'card-4',
                    title: 'Set up database schema',
                    comments: [],
                },
            ],
        },
    ],
}

export default function Home() {
    return <Board initialState={initialState} />
}
