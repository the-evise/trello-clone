// board.actions.ts
export type BoardAction =
    | { type: "BOARD_TITLE_UPDATED"; title: string }
    | { type: "LIST_ADDED" }
    | { type: "LIST_DELETED"; listId: string }
    | { type: "LIST_CARDS_CLEARED"; listId: string }
    | { type: "CARD_ADDED"; listId: string }
