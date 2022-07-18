export type ResponseApi<T = {}> = {
    response: T;
    isLoading?: boolean;
}

export type RequestApi<T = {}> = {
    payload: PayloadType;
    type: string;
}

export type PayloadType = {
    params: any;
    onCompleted?: (result?: any) => void
    onError?: (error?: any) => void
}

export type Action = {
    type: string;
}

export type Collection = {
    id: number;
    collectionName: string;
    createDate: Date;
    folderName: string;
    coverImage: string;
    images: string[];
}