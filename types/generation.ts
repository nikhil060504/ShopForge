export type PageType = "landing" | "product";

export interface GenerationRequest {
    description: string;
    pageType: PageType;
    referenceUrl?: string;
    previousCode?: string;
}

export interface GenerationResponse {
    code: string;
    error?: string;
}
