export type CSSPropertiesType = { [key: string]: string | number };

export interface InlineStyleable {
	css?: CSSPropertiesType;
}