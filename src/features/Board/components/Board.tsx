import { List } from "./List"
import Button from "@/components/Button"
import {BoardState} from "@/features/Board/types/domain";
import {useBoard} from "@/features/Board/hooks/useBoard";
import styles from './Board.module.scss'


export default function Board({ initialState }: { initialState: BoardState }) {
    const { state, dispatch } = useBoard(initialState)

    return (
        <div className={styles.board}>
            <h2 className={styles.title}>{initialState.title}</h2>

            <div className={styles.container}>


                {state.lists.map(list => (
                    <List
                        key={list.id}
                        data={list}
                        onRequestAddCard={id =>
                            dispatch({type: "CARD_ADDED", listId: id})
                        }
                        onDeleteList={id =>
                            dispatch({type: "LIST_DELETED", listId: id})
                        }
                        onDeleteAllCards={id =>
                            dispatch({type: "LIST_CARDS_CLEARED", listId: id})
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
