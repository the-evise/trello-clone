// useBoard.ts
import { useReducer } from "react"
import {BoardState} from "@/features/Board/types/domain";
import {boardReducer} from "@/features/Board/board.reducer";

export function useBoard(initial: BoardState) {
    const [state, dispatch] = useReducer(boardReducer, initial)

    return {
        state,
        dispatch,
    }
}
