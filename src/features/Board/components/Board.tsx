import { List } from "./List"
import Button from "@/components/Button"
import {BoardState, DragPiece, DropTarget} from "@/features/Board/types/domain";
import {useBoard} from "@/features/Board/hooks/useBoard";
import styles from './Board.module.scss'
import {useEffect, useRef, useState} from "react";
import {dropTargetForElements, monitorForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

export default function Board({ initialState }: { initialState: BoardState }) {
    const { state, dispatch } = useBoard(initialState)
    const stateRef = useRef<BoardState>(state);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState(initialState.title);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const ref = useRef<HTMLDivElement | null>(null);

    const commitTitle = () => {
        const next = titleDraft.trim();
        if (!next.length) {
            setTitleDraft(state.title);
            setIsEditingTitle(false);
            return;
        }

        if (next !== state.title) {
            dispatch({ type: "BOARD_TITLE_UPDATED", title: next });
        }
        setIsEditingTitle(false);
    };

    const cancelEditing = () => {
        setTitleDraft(state.title);
        setIsEditingTitle(false);
    };

    const startEditing = () => {
        setTitleDraft(state.title);
        setIsEditingTitle(true);
    };

    useEffect(() => {
        return monitorForElements({
            onDrop({ source, location }) {
                const dropTargets = location.current.dropTargets;
                if (!dropTargets.length) return;

                const sourceData = source.data as DragPiece;

                const findTarget = (type: DropTarget["type"]) =>
                    dropTargets.find(target => {
                        const data = target.data as DropTarget;
                        return data.type === type;
                    });

                if (sourceData.type === "LIST") {
                    const target =
                        findTarget("LIST") ??
                        findTarget("BOARD");

                    if (!target) return;

                    const targetData = target.data as DropTarget;

                    if (
                        targetData.type === "LIST" &&
                        sourceData.index !== targetData.index
                    ) {
                        dispatch({
                            type: "LIST_MOVED",
                            fromIndex: sourceData.index,
                            toIndex: targetData.index!,
                        });
                        return;
                    }

                    if (targetData.type === "BOARD") {
                        const lastIndex = stateRef.current.lists.length - 1;

                        if (sourceData.index !== lastIndex) {
                            dispatch({
                                type: "LIST_MOVED",
                                fromIndex: sourceData.index,
                                toIndex: lastIndex,
                            });
                        }
                    }

                    return;
                }

                if (sourceData.type === "CARD") {
                    const cardTarget = findTarget("CARD");

                    if (cardTarget) {
                        const targetData = cardTarget.data as {
                            type: "CARD";
                            listId: string;
                            index: number;
                        };

                        dispatch({
                            type: "CARD_MOVED",
                            cardId: sourceData.cardId,
                            fromListId: sourceData.fromListId,
                            toListId: targetData.listId,
                            toIndex: targetData.index,
                        });
                        return;
                    }

                    const listTarget = findTarget("LIST");
                    if (listTarget) {
                        const targetData = listTarget.data as {
                            type: "LIST";
                            listId: string;
                        };

                        const toList =
                            stateRef.current.lists.find(
                                list => list.id === targetData.listId
                            );

                        dispatch({
                            type: "CARD_MOVED",
                            cardId: sourceData.cardId,
                            fromListId: sourceData.fromListId,
                            toListId: targetData.listId,
                            toIndex: toList ? toList.cards.length : 0,
                        });
                    }
                }
            },
        });
    }, [dispatch]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        return dropTargetForElements({
            element,
            getData: () => ({ type: "BOARD" })
        })
    }, [])

    return (
        <div className={styles.board}>
            <header className={styles.boardHeader}>
                {isEditingTitle ? (
                    <input
                        className={styles.titleInput}
                        value={titleDraft}
                        onChange={event => setTitleDraft(event.target.value)}
                        onKeyDown={event => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                commitTitle();
                            }
                            if (event.key === "Escape") {
                                event.preventDefault();
                                cancelEditing();
                            }
                        }}
                        aria-label="Board title"
                    />
                ) : (
                    <h2
                        className={styles.title}
                        onClick={startEditing}
                    >
                        {state.title}
                    </h2>
                )}

                {isEditingTitle ? (
                    <div className={styles.titleActions}>
                        <Button
                            action="default"
                            size="md"
                            variant="primary"
                            onClick={commitTitle}
                        >
                            Save
                        </Button>
                        <Button
                            action="default"
                            size="md"
                            variant="secondary"
                            onClick={cancelEditing}
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <Button
                        action="default"
                        size="md"
                        variant="secondary"
                        onClick={startEditing}
                    >
                        Edit title
                    </Button>
                )}
            </header>

            <div className={styles.container} ref={ref}>
                {state.lists.map(list => (
                    <List
                        key={list.id}
                        data={list}
                        onRequestAddCard={(id, title) =>
                            dispatch({type: "CARD_ADDED", listId: id, title})
                        }
                        onDeleteList={id =>
                            dispatch({type: "LIST_DELETED", listId: id})
                        }
                        onDeleteAllCards={id =>
                            dispatch({type: "LIST_CARDS_CLEARED", listId: id})
                        }
                        onAddComment={(listId, cardId, text) =>
                            dispatch({
                                type: "CARD_COMMENT_ADDED",
                                listId,
                                cardId,
                                text,
                            })
                        }
                    />
                ))}

                <Button action={"addAnother"} size={"outsideCard"} onClick={() => dispatch({type: "LIST_ADDED"})}>
                    + Add another list
                </Button>
            </div>
        </div>
    )
}
