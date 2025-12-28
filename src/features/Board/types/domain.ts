// domain.ts

export interface ListData {
    id: string
    title: string
    cards: Card[]
}

export interface Comment {
    id: string
    text: string
}

export interface Card {
    id: string
    title: string
    comments: Comment[]
}

export interface ListData {
    id: string
    title: string
    cards: Card[]
}

export interface BoardState {
    title: string
    lists: ListData[]
}
