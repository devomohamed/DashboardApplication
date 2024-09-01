export interface IError {
    headers:    Headers;
    status:     number;
    statusText: string;
    url:        string;
    ok:         boolean;
    name:       string;
    message:    string;
    error:      ErrorClass;
}

export interface ErrorClass {
    code:    number;
    status:  number;
    errors:  any[];
    message: string;
    data:    null;
}

export interface Headers {
    normalizedNames: NormalizedNames;
    lazyUpdate:      null;
}

export interface NormalizedNames {
}