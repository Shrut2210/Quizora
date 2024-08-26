declare module 'mammoth' {
    interface Result {
        value: string; // The raw text output
        messages: any[]; // Array of messages or warnings
    }

    interface Options {
        path?: string; // Path to the Word document
        buffer?: Buffer; // Buffer containing the Word document
    }

    export function extractRawText(options: Options): Promise<Result>;
}