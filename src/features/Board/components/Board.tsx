import React, { useState } from 'react';
import { List, ListProps } from './List'; // Assuming List is in the same directory
import styles from './Board.module.scss';
import Button from "@/components/Button";

interface BoardProps {
    id: string;
    title: string;
    lists: ListProps[];
}

const Board: React.FC<BoardProps> = ({ id, title, lists }) => {
    const [boardTitle, setBoardTitle] = useState(title);
    const [listData, setListData] = useState(lists);

    const handleAddList = () => {
        const newList = {
            id: `list-${Date.now()}`,
            title: 'New List',
            cards: [],
            onAddCard: handleAddCard,
            onDeleteList: handleDeleteList,
            onDeleteAllCards: handleDeleteAllCards,
        };
        setListData([...listData, newList]);
    };

    const handleAddCard = (listId: string, newCard: { id: string; title: string; commentsCount: number }) => {
        const updatedLists = listData.map((list) => {
            if (list.id === listId) {
                return {
                    ...list,
                    cards: [...list.cards, newCard], // Add the new card to the list
                };
            }
            return list;
        });
        setListData(updatedLists);  // Update state with the new list data
    };

    const handleDeleteList = (listId: string) => {
        setListData(listData.filter((list) => list.id !== listId));
    };

    const handleDeleteAllCards = (listId: string) => {
        const updatedLists = listData.map((list) => {
            if (list.id === listId) {
                return { ...list, cards: [] };
            }
            return list;
        });
        setListData(updatedLists);
    };

    return (
        <div className={styles.board}>
            <div className={styles.boardHeader}>
                <h2>{boardTitle}</h2>
            </div>

            <div className={styles.listsContainer}>
                {listData.map((list) => (
                    <List
                        key={list.id}
                        {...list}
                        onAddCard={handleAddCard}  // Pass the function to add a card
                    />
                ))}

                {/* The Add Another List Button */}
                <div className={styles.addButtonWrapper}>
                    <Button
                        action="addAnother"
                        size="outsideCard"
                        onClick={handleAddList}
                    >
                        + Add another list
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Board;
