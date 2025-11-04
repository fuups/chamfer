export interface DemoSource {
  label: string;
  language: string;
  code: string;
}

export interface DemoConfig {
  label: string;
  sources: DemoSource[];
}

export interface DemoDefinition {
  label: string;
  sources: DemoSource[];
}

export const createDemo = ({ label, sources }: DemoConfig): DemoDefinition => ({
  label,
  sources
});
