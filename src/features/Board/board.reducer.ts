import { BoardAction } from "./board.actions";
import { BoardState, Card, ListData } from "@/features/Board/types/domain";

function reorder<T>(items: T[], from: number, to: number): T[] {
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next;
}

const clampIndex = (value: number, length: number) =>
    Math.max(0, Math.min(value, length));

function withCardPositions(cards: Card[]) {
    return cards.map((card, index) => ({ ...card, position: index }));
}

function withListIndex(list: ListData, index: number): ListData {
    return {
        ...list,
        position: index,
    };
}

export function boardReducer(
    state: BoardState,
    action: BoardAction
): BoardState {
    switch (action.type) {
        case "BOARD_TITLE_UPDATED":
            return { ...state, title: action.title };

        case "LIST_ADDED":
            return {
                ...state,
                lists: [
                    ...state.lists,
                    {
                        id: crypto.randomUUID(),
                        title: "New List",
                        cards: [],
                        position: state.lists.length,
                    },
                ],
            };

        case "LIST_DELETED": {
            const remaining = state.lists
                .filter(l => l.id !== action.listId)
                .map((list, index) => withListIndex(list, index));

            return { ...state, lists: remaining };
        }

        case "LIST_MOVED": {
            const reordered = reorder(
                state.lists,
                action.fromIndex,
                action.toIndex
            ).map((l, index) => withListIndex(l, index));

            return { ...state, lists: reordered };
        }

        case "LIST_CARDS_CLEARED":
            return {
                ...state,
                lists: state.lists.map(l =>
                    l.id === action.listId ? { ...l, cards: [] } : l
                ),
            };

        case "CARD_ADDED":
            return {
                ...state,
                lists: state.lists.map(l =>
                    l.id === action.listId
                        ? {
                            ...l,
                            cards: withCardPositions([
                                ...l.cards,
                                {
                                    id: crypto.randomUUID(),
                                    title: action.title || "New Card",
                                    comments: [],
                                    position: l.cards.length,
                                },
                            ]),
                        }
                        : l
                ),
            };

        case "CARD_MOVED": {
            const { cardId, fromListId, toListId, toIndex } = action;

            let movedCard: Card | null = null;

            const listsAfterRemoval = state.lists.map(list => {
                if (list.id !== fromListId) return list;

                const remaining = list.cards.filter(card => {
                    if (card.id === cardId) {
                        movedCard = card;
                        return false;
                    }
                    return true;
                });

                return {
                    ...list,
                    cards: withCardPositions(remaining),
                };
            });

            if (!movedCard) return state;

            const listsAfterInsert = listsAfterRemoval.map(list => {
                if (list.id !== toListId) return list;

                const nextCards = [...list.cards];
                const clampedIndex = clampIndex(toIndex, nextCards.length);
                nextCards.splice(clampedIndex, 0, movedCard!);

                return {
                    ...list,
                    cards: withCardPositions(nextCards),
                };
            });

            return {
                ...state,
                lists: listsAfterInsert.map((list, index) =>
                    withListIndex(list, index)
                ),
            };
        }

        case "CARD_COMMENT_ADDED":
            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list.id !== action.listId) return list;

                    return {
                        ...list,
                        cards: list.cards.map(card => {
                            if (card.id !== action.cardId) return card;

                            return {
                                ...card,
                                comments: [
                                    ...card.comments,
                                    {
                                        id: crypto.randomUUID(),
                                        text: action.text,
                                    },
                                ],
                            };
                        }),
                    };
                }),
            };

        default:
            return state;
    }
}
