'use client'

import { useState } from "react"
import styles from "./List.module.scss"
import Button from "@/components/Button"
import { Card as CardView } from "@/features/Board/components/Card"
import {ListData} from "@/features/Board/types/domain";

interface ListProps {
    data: ListData
    onRequestAddCard: (listId: string) => void
    onDeleteList: (listId: string) => void
    onDeleteAllCards: (listId: string) => void
}

export function List({
                         data,
                         onRequestAddCard,
                         onDeleteList,
                         onDeleteAllCards,
                     }: ListProps) {
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [showActions, setShowActions] = useState(false)

    return (
        <div className={styles.list}>
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
                        comments={card.comments} onRequestAddComment={function (cardId: string, text: string): void {
                        throw new Error("Function not implemented.")
                    }}                    />
                ))}
            </div>

            <Button
                action="addAnother"
                size="insideCard"
                onClick={() => onRequestAddCard(data.id)}
            >
                + Add another card
            </Button>
        </div>
    )
}
