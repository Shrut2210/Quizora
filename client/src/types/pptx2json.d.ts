declare module 'pptx2json' {
    interface TextItem {
        text: string;
    }

    interface Slide {
        texts: TextItem[];
    }

    export function parse(filePath: string): Promise<Slide[]>;
}