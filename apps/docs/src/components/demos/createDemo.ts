export interface DemoConfig {
  label: string;
  code: string;
  language?: string;
}

export interface DemoDefinition {
  label: string;
  code: string;
  language: string;
}

export const createDemo = ({ label, code, language = "html" }: DemoConfig): DemoDefinition => ({
  label,
  code,
  language
});
