// domain.ts

export interface ListData {
    id: string
    title: string
    position: number
    cards: Card[]
}

export interface Comment {
    id: string
    text: string
}

export interface Card {
    id: string
    title: string
    comments: Comment[]
    position: number
}

export interface BoardState {
    title: string
    lists: ListData[]
}

export type DragPiece =
    | { type: "LIST"; listId: string; index: number }
    | { type: "CARD"; cardId: string; fromListId: string; index: number };

export type DropTarget =
    | { type: "BOARD" }
    | { type: "LIST"; listId: string; index: number }
    | { type: "CARD"; listId: string; index: number };
