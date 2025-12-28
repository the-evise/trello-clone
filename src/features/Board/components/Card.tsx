'use client'

import React from "react";
import styles from "./Card.module.scss";
import Button from "@/components/Button";

export interface CardProps {
    id: string;
    title: string;
    commentsCount: number;
    onOpenComments: (cardId: string) => void;
    onOpenActions: (cardId: string) => void;
}

export const Card: React.FC<CardProps> = ({
                                              id,
                                              title,
                                              commentsCount,
                                              onOpenComments,
                                              onOpenActions,
                                          }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h4 className={styles.title}>{title}</h4>

                <Button action={"default"} variant={"default"} size={"md"}>⋮</Button>
            </div>

            <div className={styles.footer}>
                <Button action={"default"} variant={"secondary"} size={"md"}>Comments ({commentsCount})</Button>
            </div>
        </div>
    );
};
