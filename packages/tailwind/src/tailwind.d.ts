declare module "tailwindcss/plugin" {
  type PluginHandler = (utils: {
    addVariant: (name: string, definition: string | string[]) => void;
    addUtilities: (
      utilities: Record<string, Record<string, string>>,
      options?: string[]
    ) => void;
  }) => void;

  interface PluginOptions {
    theme?: Record<string, unknown>;
  }

  export default function plugin(
    handler: PluginHandler,
    options?: PluginOptions
  ): unknown;
}

declare module "tailwindcss/types/config" {
  export interface Config {
    content?: unknown;
    presets?: unknown[];
    plugins?: unknown[];
    theme?: Record<string, unknown>;
  }

  export type PluginCreator = (...args: any[]) => void;
}
