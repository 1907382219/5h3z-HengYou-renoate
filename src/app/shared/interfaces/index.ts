export interface ResponseOpt<T = unknown> {
    status: 1 | -1;
    info: string;
    data: T;
}


