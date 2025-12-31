'use client'

import { useState } from 'react'
import styles from './Modal.module.scss'
import Button from '@/components/Button'
import {Comment} from "@/features/Board/types/domain";

interface ModalProps {
    cardTitle: string
    comments: Comment[]
    onClose: () => void
    onSubmit: (text: string) => void
}

export default function Modal({
                                  cardTitle,
                                  comments,
                                  onClose,
                                  onSubmit,
                              }: ModalProps) {
    const [text, setText] = useState('')

    const handleSubmit = () => {
        const value = text.trim()
        if (!value) return

        onSubmit(value)
        setText('')
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <header className={styles.modalHeader}>
                    <h2>Comments for “{cardTitle}”</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close comments"
                    >
                        ✕
                    </button>
                </header>

                <section className={styles.commentList}>
                    {comments.length === 0 ? (
                        <p>No comments yet.</p>
                    ) : (
                        comments.map(c => (
                            <div key={c.id} className={styles.comment}>
                                <p>{c.text}</p>
                            </div>
                        ))
                    )}
                </section>

                <footer className={styles.commentInput}>
          <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Write a comment…"
              rows={3}
          />
                    <Button action="default" size="md" variant={"primary"} onClick={handleSubmit}>
                        Add Comment
                    </Button>
                </footer>
            </div>
        </div>
    )
}