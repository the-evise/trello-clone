import styles from "./List.module.scss";
import {useState} from "react";
import Button from "@/components/Button";
import {Card} from "@/features/Board/components/Card";


export interface ListProps {
    id: string;
    title: string;
    cards: Array<{
        id: string;
        title: string;
        commentsCount: number;
    }>;
    onAddCard: (listId: string) => void;
    onDeleteList: (listId: string) => void;
    onDeleteAllCards: (listId: string) => void;
}

export const List: React.FC<ListProps> = ({
                                              id,
                                              title,
                                              cards,
                                              onAddCard,
                                              onDeleteList,
                                              onDeleteAllCards,
                                          }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [listTitle, setListTitle] = useState(title);
    const [showActions, setShowActions] = useState(false);

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
        // persist title change later
    };

    return (
        <div className={styles.list}>
            <div className={styles.header}>
                {isEditingTitle ? (
                    <input
                        className={styles.titleInput}
                        value={listTitle}
                        onChange={(e) => setListTitle(e.target.value)}
                        onBlur={handleTitleBlur}
                        autoFocus
                    />
                ) : (
                    <h3
                        className={styles.title}
                        onClick={() => setIsEditingTitle(true)}
                    >
                        {listTitle}
                    </h3>
                )}

                <Button
                    action="default"
                    size="md"
                    onClick={() => setShowActions((v) => !v)}
                >
                    ⋮
                </Button>

                {showActions && (
                    <div className={styles.actionsMenu}>
                        <Button
                            action="default"
                            variant="error"
                            size="md"
                            onClick={() => onDeleteList(id)}
                        >
                            Delete List
                        </Button>

                        <Button
                            action="default"
                            variant="error"
                            size="md"
                            onClick={() => onDeleteAllCards(id)}
                        >
                            Delete All Cards
                        </Button>
                    </div>
                )}
            </div>

            <div className={styles.cards}>
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        commentsCount={card.commentsCount}
                        onOpenComments={() => {}}
                        onOpenActions={() => {}}
                    />
                ))}
            </div>

            <Button
                action="addAnother"
                size="outsideCard"
                onClick={() => onAddCard(id)}
            >
                + Add another card
            </Button>
        </div>
    );
};
