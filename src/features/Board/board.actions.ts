export type BoardAction =
    | { type: "BOARD_TITLE_UPDATED"; title: string }

    | { type: "LIST_ADDED" }
    | { type: "LIST_DELETED"; listId: string }
    | { type: "LIST_MOVED"; fromIndex: number; toIndex: number }

    | { type: "LIST_CARDS_CLEARED"; listId: string }

    | { type: "CARD_ADDED"; listId: string; title: string }
    | {
    type: "CARD_MOVED";
    cardId: string;
    fromListId: string;
    toListId: string;
    toIndex: number;
}
    | {
    type: "CARD_COMMENT_ADDED";
    listId: string;
    cardId: string;
    text: string;
};
