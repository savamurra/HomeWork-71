export interface DishesForm {
    title: string;
    price: number;
    image: string;
}

export interface DishesMutation {
    id: string
    title: string;
    price: number;
    image: string;
}

export interface DishesList {
    [id: string]: DishesMutation;
}

export interface DishOrder {
    order: DishesMutation
    count: number;
}

export interface OrderType {
    [id: string]: number;
}

