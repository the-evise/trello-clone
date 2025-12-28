// board.reducer.ts
import { BoardAction } from "./board.actions"
import {BoardState} from "@/features/Board/types/domain";

export function boardReducer(
    state: BoardState,
    action: BoardAction
): BoardState {
    switch (action.type) {
        case "BOARD_TITLE_UPDATED":
            return { ...state, title: action.title }

        case "LIST_ADDED":
            return {
                ...state,
                lists: [
                    ...state.lists,
                    {
                        id: crypto.randomUUID(),
                        title: "New List",
                        cards: [],
                    },
                ],
            }

        case "LIST_DELETED":
            return {
                ...state,
                lists: state.lists.filter(l => l.id !== action.listId),
            }

        case "LIST_CARDS_CLEARED":
            return {
                ...state,
                lists: state.lists.map(l =>
                    l.id === action.listId ? { ...l, cards: [] } : l
                ),
            }

        case "CARD_ADDED":
            return {
                ...state,
                lists: state.lists.map(l =>
                    l.id === action.listId
                        ? {
                            ...l,
                            cards: [
                                ...l.cards,
                                {
                                    id: crypto.randomUUID(),
                                    title: "New Card",
                                    comments: [],
                                },
                            ],
                        }
                        : l
                ),
            }

        default:
            return state
    }
}
