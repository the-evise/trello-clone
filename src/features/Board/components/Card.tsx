'use client'

import {useEffect, useRef, useState} from "react"
import styles from "./Card.module.scss"
import Button from "@/components/Button"
import Modal from "@/components/Modal"
import {Comment} from "@/features/Board/types/domain";
import {draggable, dropTargetForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import clsx from "clsx";

interface CardProps {
    id: string,
    title: string,
    comments: Comment[],
    listId: string,
    position: number,
    onRequestAddComment: (cardId: string, text: string) => void,
}

export function Card({
                         id,
                         title,
                         comments,
                         listId,
                         position,
                         onRequestAddComment,
                     }: CardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    // Ref to the card element. Initialize as null and allow HTML element reference.
    const ref = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const c = ref.current;
        if (!c) return;

        return draggable({
            element: c,
            getInitialData: () => ({
                type: "CARD",
                cardId: id,
                fromListId: listId,
                index: position
            }),
            onDragStart: () => setIsDragging(true),
            onDrop: () => setIsDragging(false),
        })
    }, [id, listId, position]);

    useEffect(() => {
        const c = ref.current;
        if (!c) return;

        return dropTargetForElements({
            element: c,
            getData: () => ({
                type: "CARD",
                listId,
                index: position,
            }),
        })
    }, [listId, position]);

    return (
        <div
            className={clsx(styles.card, isDragging && styles.dragging)}
            ref={ref}
        >
            <header className={styles.header}>
                <h4 className={styles.title}>{title}</h4>
                <Button action={"default"} size="md">⋮</Button>
            </header>

            <footer className={styles.footer}>
                <Button
                    action={"default"}
                    variant="secondary"
                    size="md"
                    onClick={() => setIsModalOpen(true)}
                >
                    Comments ({comments.length})
                </Button>
            </footer>

            {isModalOpen && (
                <Modal
                    cardTitle={title}
                    comments={comments}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={text => onRequestAddComment(id, text)}
                />
            )}
        </div>
    )
}

interface CardComposerProps {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
    onCancel: () => void
}

export function CardComposer({
                                 value,
                                 onChange,
                                 onSubmit,
                                 onCancel,
                             }: CardComposerProps) {
    const inputRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <div className={clsx(styles.card, styles.composer)}>
            <textarea
                ref={inputRef}
                className={styles.composerInput}
                value={value}
                placeholder="Enter a title for this card"
                onChange={event => onChange(event.target.value)}
                rows={3}
            />
            <div className={styles.composerActions}>
                <Button action="default" variant={"primary"} size="md" onClick={onSubmit}>
                    Add card
                </Button>
                <Button
                    action="default"
                    size="md"
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}
