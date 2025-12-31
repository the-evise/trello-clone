'use client'

import {useEffect, useRef, useState} from "react"
import styles from "./List.module.scss"
import Button from "@/components/Button"
import { Card as CardView, CardComposer } from "@/features/Board/components/Card"
import {ListData} from "@/features/Board/types/domain";
import {draggable, dropTargetForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import clsx from "clsx";

interface ListProps {
    data: ListData
    onRequestAddCard: (listId: string, title: string) => void
    onDeleteList: (listId: string) => void
    onDeleteAllCards: (listId: string) => void
    onAddComment: (listId: string, cardId: string, text: string) => void
}

export function List({
                         data,
                         onRequestAddCard,
                         onDeleteList,
                         onDeleteAllCards,
                         onAddComment,
                     }: ListProps) {
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [showActions, setShowActions] = useState(false)
    const [isComposingCard, setIsComposingCard] = useState(false)
    const [newCardTitle, setNewCardTitle] = useState("")

    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState(false);
    const cardDropZoneRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const l = ref.current;
        if (!l) return;

        return draggable({
            element: l,
            getInitialData: () => ({
                type: "LIST",
                listId: data.id,
                index: data.position
            }),
            onDragStart: () => setIsDragging(true),
            onDrop: () => setIsDragging(false),
        })
    }, [data.id, data.position]);

    useEffect(() => {
        const l = ref.current;
        if (!l) return;

        return dropTargetForElements({
            element: l,
            getData: () => ({
                type: "LIST",
                listId: data.id,
                index: data.position
            }),
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: () => setIsDraggedOver(false),
        })
    }, [data.id, data.position]);

    useEffect(() => {
        const z = cardDropZoneRef.current;
        if (!z) return;

        return dropTargetForElements({
            element: z,
            getData: () => ({
                type: "CARD",
                listId: data.id,
                index: data.cards.length,
            }),
        })
    }, [data.id, data.cards.length]);

    return (
        <div
            className={clsx(
                styles.list,
                isDraggedOver && styles.listDraggedOver,
                isDragging && styles.listDragging
            )}
            ref={ref}
        >
            <header className={styles.header}>
                {isEditingTitle ? (
                    <input
                        className={styles.titleInput}
                        defaultValue={data.title}
                        onBlur={() => setIsEditingTitle(false)}
                        autoFocus
                    />
                ) : (
                    <h3
                        className={styles.title}
                        onClick={() => setIsEditingTitle(true)}
                    >
                        {data.title}
                    </h3>
                )}

                <Button action={"default"} size="md" onClick={() => setShowActions(v => !v)}>
                    ⋮
                </Button>

                {showActions && (
                    <div className={styles.actionsMenu}>
                        <Button action={"default"} variant="error" size={"md"} onClick={() => onDeleteList(data.id)}>
                            Delete List
                        </Button>
                        <Button
                            action={"default"}
                            size="md"
                            variant="error"
                            onClick={() => onDeleteAllCards(data.id)}
                        >
                            Delete All Cards
                        </Button>
                    </div>
                )}
            </header>

            <div className={styles.cards}>
                {data.cards.map(card => (
                    <CardView
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        comments={card.comments}
                        listId={data.id}
                        position={card.position}
                        onRequestAddComment={(cardId, text) =>
                            onAddComment(data.id, cardId, text)
                        }
                    />
                ))}
            </div>
            <div className={styles.cardDropZone} ref={cardDropZoneRef} />

            {isComposingCard ? (
                <CardComposer
                    value={newCardTitle}
                    onChange={setNewCardTitle}
                    onCancel={() => {
                        setIsComposingCard(false)
                        setNewCardTitle("")
                    }}
                    onSubmit={() => {
                        const title = newCardTitle.trim()
                        if (!title) return

                        onRequestAddCard(data.id, title)
                        setNewCardTitle("")
                        setIsComposingCard(false)
                    }}
                />
            ) : (
                <Button
                    action="addAnother"
                    size="insideCard"
                    onClick={() => setIsComposingCard(true)}
                >
                    + Add another card
                </Button>
            )}
        </div>
    )
}
