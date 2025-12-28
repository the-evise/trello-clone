'use client'

import {useState} from "react"
import styles from "./Card.module.scss"
import Button from "@/components/Button"
import Modal from "@/components/Modal"
import {Comment} from "@/features/Board/types/domain";

interface CardProps {
    id: string,
    title: string,
    comments: Comment[],
    onRequestAddComment: (cardId: string, text: string) => void,
}

export function Card({
                         id,
                         title,
                         comments,
                         onRequestAddComment,
                     }: CardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)



    return (
        <div className={styles.card}>
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
