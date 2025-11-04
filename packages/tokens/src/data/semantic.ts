import type { SemanticTokens, SimpleToken, SimpleTokenBlock } from "../types.js";

interface PrimaryActionState {
  bgHex: string;
  bgHsl: string;
  fg: string;
  hover: string;
  active: string;
}

interface SolidIntentState {
  bg: string;
  fg: string;
  hover: string;
  active: string;
}

interface SolidIntentConfig {
  name: string;
  light: SolidIntentState;
  dark: SolidIntentState;
}

const primaryAction = {
  light: {
    bgHex: "#111111",
    bgHsl: "hsl(0 0% 7% / 1)",
    fg: "#FFFFFF",
    hover: "#1B1B1B",
    active: "#0B0B0B"
  },
  dark: {
    bgHex: "#F2F2F2",
    bgHsl: "hsl(0 0% 95% / 1)",
    fg: "#000000",
    hover: "#E8E8E8",
    active: "#DDDDDD"
  }
} satisfies Record<"light" | "dark", PrimaryActionState>;

function buildPrimaryActionTokens(): { root: SimpleToken[]; dark: SimpleToken[] } {
  const root: SimpleToken[] = [
    { name: "ch-action-primary-bg-hex", value: primaryAction.light.bgHex },
    { name: "ch-action-primary-bg-hsl", value: primaryAction.light.bgHsl },
    {
      name: "ch-action-primary-bg",
      value: "var(--ch-action-primary-bg-hex)",
      supports: [
        {
          condition: "@supports (color: hsl(0 0% 0% / 1))",
          value: "var(--ch-action-primary-bg-hsl)"
        }
      ]
    },
    { name: "ch-action-primary-fg", value: primaryAction.light.fg },
    { name: "ch-action-primary-bg-hover", value: primaryAction.light.hover },
    { name: "ch-action-primary-bg-active", value: primaryAction.light.active }
  ];

  const dark: SimpleToken[] = [
    { name: "ch-action-primary-bg-hex", value: primaryAction.dark.bgHex },
    { name: "ch-action-primary-bg-hsl", value: primaryAction.dark.bgHsl },
    {
      name: "ch-action-primary-bg",
      value: "var(--ch-action-primary-bg-hex)",
      supports: [
        {
          condition: "@supports (color: hsl(0 0% 0% / 1))",
          value: "var(--ch-action-primary-bg-hsl)"
        }
      ]
    },
    { name: "ch-action-primary-fg", value: primaryAction.dark.fg },
    { name: "ch-action-primary-bg-hover", value: primaryAction.dark.hover },
    { name: "ch-action-primary-bg-active", value: primaryAction.dark.active }
  ];

  return { root, dark };
}

const solidActionIntents: SolidIntentConfig[] = [
  {
    name: "secondary",
    light: {
      bg: "#0C727C",
      fg: "#FFFFFF",
      hover: "#0A646D",
      active: "#095B63"
    },
    dark: {
      bg: "#86E1E8",
      fg: "#102A2C",
      hover: "#78CCD2",
      active: "#6AB7BD"
    }
  },
  {
    name: "success",
    light: {
      bg: "#358546",
      fg: "#FFFFFF",
      hover: "#2E7640",
      active: "#296A3A"
    },
    dark: {
      bg: "#44A859",
      fg: "#000000",
      hover: "#3C9750",
      active: "#358646"
    }
  },
  {
    name: "warning",
    light: {
      bg: "#D9A100",
      fg: "#5A3A00",
      hover: "#C49000",
      active: "#B08100"
    },
    dark: {
      bg: "#FFC61A",
      fg: "#000000",
      hover: "#F2B800",
      active: "#E6AC00"
    }
  },
  {
    name: "danger",
    light: {
      bg: "#E21E1E",
      fg: "#FFFFFF",
      hover: "#C91A1A",
      active: "#B21717"
    },
    dark: {
      bg: "#C42020",
      fg: "#FFFFFF",
      hover: "#B01C1C",
      active: "#9C1919"
    }
  }
];

function buildSolidIntentTokens(): { root: SimpleToken[]; dark: SimpleToken[] } {
  const root: SimpleToken[] = [];
  const dark: SimpleToken[] = [];

  for (const intent of solidActionIntents) {
    const prefix = `ch-action-${intent.name}`;

    root.push(
      { name: `${prefix}-bg`, value: intent.light.bg },
      { name: `${prefix}-fg`, value: intent.light.fg },
      { name: `${prefix}-bg-hover`, value: intent.light.hover },
      { name: `${prefix}-bg-active`, value: intent.light.active }
    );

    dark.push(
      { name: `${prefix}-bg`, value: intent.dark.bg },
      { name: `${prefix}-fg`, value: intent.dark.fg },
      { name: `${prefix}-bg-hover`, value: intent.dark.hover },
      { name: `${prefix}-bg-active`, value: intent.dark.active }
    );
  }

  return { root, dark };
}

const primaryActionTokens = buildPrimaryActionTokens();
const solidActionTokens = buildSolidIntentTokens();

const textBlocks: SimpleTokenBlock[] = [
  {
    type: "scalar",
    label: "Text hierarchy",
    selector: ":root",
    tokens: [
      { name: "ch-text-primary", value: "var(--ch-color-default)" },
      { name: "ch-text-secondary", value: "var(--ch-color-secondary)" },
      {
        name: "ch-text-tertiary",
        value: "rgba(90,97,105,0.88)",
        supports: [
          {
            condition: "@supports (color: color-mix(in oklch, black 10%, white))",
            value:
              "color-mix(in oklch, var(--ch-color-secondary) 70%, var(--ch-color-background) 30%)"
          }
        ]
      },
      {
        name: "ch-text-disabled",
        value: "rgba(33,37,41,0.50)",
        supports: [
          {
            condition: "@supports (color: color-mix(in oklch, black 10%, white))",
            value:
              "color-mix(in oklch, var(--ch-color-default) 40%, var(--ch-color-background) 60%)"
          }
        ]
      }
    ]
  },
  {
    type: "scalar",
    label: "Text hierarchy (dark overrides)",
    selector: '.dark,\n[data-theme="dark"]',
    tokens: [
      { name: "ch-text-tertiary", value: "rgba(255,255,255,0.65)" },
      { name: "ch-text-disabled", value: "rgba(255,255,255,0.40)" }
    ]
  }
];

const surfaceBlocks: SimpleTokenBlock[] = [
  {
    type: "scalar",
    label: "Surfaces & elevation",
    selector: ":root",
    tokens: [
      { name: "ch-surface-base", value: "var(--ch-color-background)" },
      { name: "ch-surface-raised", value: "var(--ch-color-surface)" },
      { name: "ch-surface-inverse", value: "#111111" },
      { name: "ch-on-inverse-fg", value: "#FFFFFF" },
      { name: "ch-surface-inverse-border", value: "#606060" },
      { name: "ch-shadow-sm", value: "0 1px 2px rgba(33,37,41,0.08)" },
      {
        name: "ch-shadow-md",
        value: "0 2px 4px rgba(33,37,41,0.10), 0 4px 6px rgba(33,37,41,0.06)"
      },
      {
        name: "ch-shadow-lg",
        value: "0 4px 6px rgba(33,37,41,0.08), 0 10px 15px rgba(33,37,41,0.12)"
      },
      { name: "ch-elevation-border", value: "rgba(0,0,0,0.12)" }
    ]
  },
  {
    type: "scalar",
    label: "Surfaces & elevation (dark)",
    selector: '.dark,\n[data-theme="dark"]',
    tokens: [
      { name: "ch-surface-inverse", value: "#F2F2F2" },
      { name: "ch-on-inverse-fg", value: "#000000" },
      { name: "ch-surface-inverse-border", value: "#8C8C8C" },
      {
        name: "ch-shadow-sm",
        value: "0 1px 2px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06) inset"
      },
      {
        name: "ch-shadow-md",
        value:
          "0 2px 4px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,255,255,0.08) inset"
      },
      {
        name: "ch-shadow-lg",
        value:
          "0 4px 6px rgba(0,0,0,0.14), 0 10px 15px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.10) inset"
      }
    ]
  }
];

const focusBlock: SimpleTokenBlock = {
  type: "scalar",
  label: "Focus system",
  selector: ":root",
  tokens: [
    { name: "ch-focus-accent", value: "var(--ch-action-primary-bg)" },
    { name: "ch-focus-outer", value: "#000000" },
    { name: "ch-focus-outline-width", value: "2px" },
    { name: "ch-ring-inner-width", value: "2px" },
    { name: "ch-ring-outer-width", value: "4px" },
    { name: "ch-focus-outline-offset", value: "2px" },
    { name: "ch-outline-border-default", value: "var(--ch-border-ui-default)" }
  ]
};

const focusBlockDark: SimpleTokenBlock = {
  type: "scalar",
  label: "Focus system (dark overrides)",
  selector: '.dark,\n[data-theme="dark"]',
  tokens: [{ name: "ch-focus-outer", value: "#FFFFFF" }]
};

const ghostOverlayBlock: SimpleTokenBlock = {
  type: "scalar",
  label: "Ghost overlay helpers",
  selector: ":root",
  tokens: [
    { name: "ch-ghost-hover-base", value: "var(--ch-hover-on-base)" },
    { name: "ch-ghost-active-base", value: "var(--ch-active-on-base)" },
      ]
};

const buttonComponentBlock: SimpleTokenBlock = {
  type: "scalar",
  label: "Button component tokens",
  selector: ":root",
  tokens: [
    {
      name: "ch-button-padding-inline-sm",
      value: "calc(var(--ch-space-md) * var(--ch-density-scale))"
    },
    {
      name: "ch-button-padding-inline-md",
      value: "calc(var(--ch-space-lg) * var(--ch-density-scale))"
    },
    {
      name: "ch-button-padding-inline-lg",
      value: "calc(var(--ch-space-xl) * var(--ch-density-scale))"
    },
    {
      name: "ch-button-padding-block",
      value: "calc(var(--ch-space-sm) * var(--ch-density-scale))"
    },
    { name: "ch-button-gap-inline", value: "var(--ch-space-sm)" },
    { name: "ch-button-radius", value: "var(--ch-radius-sm)" },
    { name: "ch-button-radius-lg", value: "var(--ch-radius-md)" },
    { name: "ch-button-icon-size-sm", value: "var(--ch-icon-size-sm)" },
    { name: "ch-button-icon-size-md", value: "var(--ch-icon-size-md)" },
    { name: "ch-button-icon-size-lg", value: "var(--ch-icon-size-lg)" },
    { name: "ch-button-font-weight", value: "var(--ch-weight-medium)" }
  ]
};

const buttonForcedColorsBlock: SimpleTokenBlock = {
  type: "scalar",
  label: "Button forced-color tokens",
  selector: ":root",
  atRule: "@media (forced-colors: active)",
  tokens: [
    { name: "ch-button-hcm-bg", value: "ButtonFace" },
    { name: "ch-button-hcm-fg", value: "ButtonText" },
    { name: "ch-button-hcm-border", value: "ButtonText" },
    { name: "ch-button-hcm-focus", value: "Highlight" }
  ]
};

const softIntentsLight = [
  {
    name: "primary",
    bg: "rgba(0,0,0,0.06)",
    fg: "#373737",
    border: "rgba(0,0,0,0.24)"
  },
  {
    name: "secondary",
    bg: "rgba(15,163,177,0.14)",
    fg: "#0C727C",
    border: "rgba(15,163,177,0.38)"
  },
  {
    name: "success",
    bg: "rgba(53,133,70,0.12)",
    fg: "#1F6134",
    border: "rgba(53,133,70,0.35)"
  },
  {
    name: "warning",
    bg: "rgba(217,161,0,0.14)",
    fg: "#7F6000",
    border: "rgba(217,161,0,0.38)"
  },
  {
    name: "danger",
    bg: "rgba(226,30,30,0.12)",
    fg: "#7E1212",
    border: "rgba(226,30,30,0.35)"
  }
] as const;

const softIntentsDark = [
  {
    name: "primary",
    bg: "rgba(255,255,255,0.12)",
    fg: "#E8E8E8",
    border: "rgba(255,255,255,0.35)"
  },
  {
    name: "secondary",
    bg: "rgba(134,225,232,0.24)",
    fg: "#B8E8ED",
    border: "rgba(134,225,232,0.42)"
  },
  {
    name: "success",
    bg: "rgba(68,168,89,0.20)",
    fg: "#E8FFE8",
    border: "rgba(68,168,89,0.42)"
  },
  {
    name: "warning",
    bg: "rgba(255,198,26,0.22)",
    fg: "#FFEAA3",
    border: "rgba(255,198,26,0.45)"
  },
  {
    name: "danger",
    bg: "rgba(245,51,51,0.18)",
    fg: "#FFE5E5",
    border: "rgba(245,51,51,0.40)"
  }
] as const;

const softTokensLight = softIntentsLight.flatMap(({ name, bg, fg, border }) => [
  { name: `ch-action-${name}-soft-bg`, value: bg },
  { name: `ch-action-${name}-soft-fg`, value: fg },
  { name: `ch-action-${name}-soft-border`, value: border }
]);

const softTokensDark = softIntentsDark.flatMap(({ name, bg, fg, border }) => [
  { name: `ch-action-${name}-soft-bg`, value: bg },
  { name: `ch-action-${name}-soft-fg`, value: fg },
  { name: `ch-action-${name}-soft-border`, value: border }
]);

const softHelpersLight: SimpleToken[] = [
  {
    name: "ch-action-outline-primary-fg",
    value: "var(--ch-action-primary-soft-fg)"
  },
  {
    name: "ch-action-outline-primary-border",
    value: "var(--ch-action-primary-soft-border)"
  },
  {
    name: "ch-action-outline-secondary-fg",
    value: "var(--ch-action-secondary-soft-fg)"
  },
  {
    name: "ch-action-outline-secondary-border",
    value: "var(--ch-action-secondary-soft-border)"
  },
  {
    name: "ch-action-outline-success-fg",
    value: "var(--ch-action-success-soft-fg)"
  },
  {
    name: "ch-action-outline-success-border",
    value: "var(--ch-action-success-soft-border)"
  },
  {
    name: "ch-action-outline-warning-fg",
    value: "var(--ch-action-warning-soft-fg)"
  },
  {
    name: "ch-action-outline-warning-border",
    value: "var(--ch-action-warning-soft-border)"
  },
  {
    name: "ch-action-outline-danger-fg",
    value: "var(--ch-action-danger-soft-fg)"
  },
  {
    name: "ch-action-outline-danger-border",
    value: "var(--ch-action-danger-soft-border)"
  },
  { name: "ch-ghost-hover", value: "var(--ch-hover-on-base)" },
  { name: "ch-ghost-active", value: "var(--ch-active-on-base)" }
];

const softHelpersDark: SimpleToken[] = [
  { name: "ch-ghost-hover", value: "rgba(255,255,255,0.08)" },
  { name: "ch-ghost-active", value: "rgba(255,255,255,0.12)" }
];

const messagingBlocks: SimpleTokenBlock[] = [
  {
    type: "scalar",
    label: "Messaging tones (soft)",
    selector: ":root",
    tokens: [
      { name: "ch-tone-info-soft-bg", value: "rgba(25,112,178,0.14)" },
      { name: "ch-tone-info-soft-fg", value: "#145F99" },
      { name: "ch-tone-info-soft-border", value: "rgba(25,112,178,0.38)" },
      {
        name: "ch-tone-success-soft-bg",
        value: "var(--ch-action-success-soft-bg)"
      },
      {
        name: "ch-tone-success-soft-fg",
        value: "var(--ch-action-success-soft-fg)"
      },
      {
        name: "ch-tone-success-soft-border",
        value: "var(--ch-action-success-soft-border)"
      },
      {
        name: "ch-tone-warning-soft-bg",
        value: "var(--ch-action-warning-soft-bg)"
      },
      {
        name: "ch-tone-warning-soft-fg",
        value: "var(--ch-action-warning-soft-fg)"
      },
      {
        name: "ch-tone-warning-soft-border",
        value: "var(--ch-action-warning-soft-border)"
      },
      {
        name: "ch-tone-danger-soft-bg",
        value: "var(--ch-action-danger-soft-bg)"
      },
      {
        name: "ch-tone-danger-soft-fg",
        value: "var(--ch-action-danger-soft-fg)"
      },
      {
        name: "ch-tone-danger-soft-border",
        value: "var(--ch-action-danger-soft-border)"
      }
    ]
  },
  {
    type: "scalar",
    label: "Messaging tones (soft dark overrides)",
    selector: '.dark,\n[data-theme="dark"]',
    tokens: [
      { name: "ch-tone-info-soft-bg", value: "rgba(106,183,240,0.22)" },
      { name: "ch-tone-info-soft-fg", value: "#D5ECFB" },
      { name: "ch-tone-info-soft-border", value: "rgba(106,183,240,0.44)" }
    ]
  },
  {
    type: "scalar",
    label: "Messaging tones (solid)",
    selector: ":root",
    tokens: [
      { name: "ch-tone-info-bg", value: "#1970B2" },
      { name: "ch-tone-info-fg", value: "#FFFFFF" }
    ]
  },
  {
    type: "scalar",
    label: "Messaging tones (solid dark)",
    selector: '.dark,\n[data-theme="dark"]',
    tokens: [
      { name: "ch-tone-info-bg", value: "#6AB7F0" },
      { name: "ch-tone-info-fg", value: "#000000" }
    ]
  }
];

const linkBlocks: SimpleTokenBlock[] = [
  {
    type: "scalar",
    label: "Link tokens",
    selector: ":root",
    tokens: [
      { name: "ch-link-fg", value: "#2457E6" },
      { name: "ch-link-fg-hover", value: "#1F4CD0" },
      { name: "ch-link-fg-active", value: "#1B43B9" },
      { name: "ch-link-fg-visited", value: "#2146C4" },
      { name: "ch-link-underline-color", value: "currentColor" },
      { name: "ch-link-underline-thickness", value: "1px" },
      { name: "ch-link-underline-offset", value: "2px" }
    ]
  },
  {
    type: "scalar",
    label: "Link tokens (dark overrides)",
    selector: '.dark,\n[data-theme="dark"]',
    tokens: [
      { name: "ch-link-fg", value: "#AFC2FF" },
      { name: "ch-link-fg-hover", value: "#99B2FF" },
      { name: "ch-link-fg-active", value: "#8AA7FF" },
      { name: "ch-link-fg-visited", value: "#9FB4FF" },
      { name: "ch-link-underline-color", value: "currentColor" }
    ]
  }
];

const selectionAndDisplayBlocks: SimpleTokenBlock[] = [
  {
    type: "scalar",
    label: "Selection, code, iconography",
    selector: ":root",
    tokens: [
      { name: "ch-selection-bg", value: "rgba(36,87,230,0.22)" },
      { name: "ch-selection-fg", value: "var(--ch-text-primary)" },
      { name: "ch-code-bg", value: "rgba(33,37,41,0.05)" },
      { name: "ch-code-fg", value: "var(--ch-text-primary)" },
      { name: "ch-kbd-bg", value: "rgba(33,37,41,0.06)" },
      { name: "ch-kbd-fg", value: "var(--ch-text-primary)" },
      { name: "ch-kbd-border", value: "var(--ch-border-ui-default)" },
      {
        name: "ch-divider-color",
        value: "color-mix(in oklab, var(--ch-text-primary) 18%, transparent)"
      },
      { name: "ch-icon-primary", value: "var(--ch-text-primary)" },
      { name: "ch-icon-secondary", value: "var(--ch-text-secondary)" },
      { name: "ch-icon-tertiary", value: "var(--ch-text-tertiary)" },
      { name: "ch-icon-success", value: "var(--ch-action-success-bg)" },
      { name: "ch-icon-warning", value: "var(--ch-action-warning-bg)" },
      { name: "ch-icon-danger", value: "var(--ch-action-danger-bg)" },
      { name: "ch-icon-info", value: "var(--ch-tone-info-bg, #1970B2)" }
    ]
  },
  {
    type: "scalar",
    label: "Selection, code, iconography (dark)",
    selector: '.dark,\n[data-theme="dark"]',
    tokens: [
      { name: "ch-code-bg", value: "rgba(255,255,255,0.06)" },
      { name: "ch-kbd-bg", value: "rgba(255,255,255,0.08)" },
      {
        name: "ch-divider-color",
        value: "color-mix(in oklab, var(--ch-text-primary) 22%, transparent)"
      }
    ]
  }
];

const tableAndStateBlocks: SimpleTokenBlock[] = [
  {
    type: "scalar",
    label: "Tables, skeletons, states",
    selector: ":root",
    tokens: [
      { name: "ch-table-header-bg", value: "var(--ch-surface-recessed)" },
      { name: "ch-table-header-fg", value: "var(--ch-text-secondary)" },
      { name: "ch-table-gridline", value: "var(--ch-divider-color)" },
      { name: "ch-table-row-hover", value: "var(--ch-hover-on-base)" },
      { name: "ch-table-row-selected", value: "var(--ch-action-primary-soft-bg)" },
      { name: "ch-skeleton-base", value: "rgba(33,37,41,0.06)" },
      {
        name: "ch-skeleton-shimmer",
        value: "linear-gradient(90deg, transparent, rgba(33,37,41,0.10), transparent)"
      },
      { name: "ch-input-readonly-bg", value: "var(--ch-surface-recessed)" },
      { name: "ch-input-readonly-fg", value: "var(--ch-text-secondary)" },
      {
        name: "ch-input-readonly-border",
        value: "var(--ch-border-ui-default)"
      },
      { name: "ch-input-invalid-border", value: "var(--ch-action-danger-bg)" },
      { name: "ch-input-invalid-bg", value: "var(--ch-action-danger-soft-bg)" },
      { name: "ch-input-invalid-fg", value: "var(--ch-text-primary)" },
      {
        name: "ch-dropzone-dragover-bg",
        value: "var(--ch-action-primary-soft-bg)"
      },
      {
        name: "ch-dropzone-dragover-border",
        value: "var(--ch-action-primary-soft-border)"
      }
    ]
  },
  {
    type: "scalar",
    label: "Tables, skeletons, states (dark)",
    selector: '.dark,\n[data-theme="dark"]',
    tokens: [
      { name: "ch-skeleton-base", value: "rgba(255,255,255,0.10)" },
      {
        name: "ch-skeleton-shimmer",
        value: "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)"
      }
    ]
  }
];

const progressBlock: SimpleTokenBlock = {
  type: "scalar",
  label: "Progress & decoration",
  selector: ":root",
  tokens: [
    {
      name: "ch-progress-track",
      value: "color-mix(in oklab, var(--ch-text-primary) 10%, transparent)"
    },
    { name: "ch-progress-bar", value: "var(--ch-action-primary-bg)" },
    { name: "ch-spinner-stroke", value: "var(--ch-action-primary-bg)" },
    { name: "ch-decoration-underline-color", value: "currentColor" },
    { name: "ch-decoration-underline-thickness", value: "1px" },
    { name: "ch-decoration-underline-offset", value: "2px" }
  ]
};

const blocks: SimpleTokenBlock[] = [
  ...textBlocks,
  ...surfaceBlocks,
  focusBlock,
  focusBlockDark,
  ghostOverlayBlock,
  buttonComponentBlock,
  buttonForcedColorsBlock,
  {
    type: "scalar",
    label: "Action intents – primary",
    selector: ":root",
    tokens: primaryActionTokens.root
  },
  {
    type: "scalar",
    label: "Action intents – primary (dark)",
    selector: '.dark,\n[data-theme="dark"]',
    tokens: primaryActionTokens.dark
  },
  {
    type: "scalar",
    label: "Action intents – solids",
    selector: ":root",
    tokens: solidActionTokens.root
  },
  {
    type: "scalar",
    label: "Action intents – solids (dark)",
    selector: '.dark,\n[data-theme="dark"]',
    tokens: solidActionTokens.dark
  },
  {
    type: "scalar",
    label: "Action intents – soft & outline",
    selector: ":root",
    tokens: [...softTokensLight, ...softHelpersLight]
  },
  {
    type: "scalar",
    label: "Action intents – soft & outline (dark)",
    selector: '.dark,\n[data-theme="dark"]',
    tokens: [...softTokensDark, ...softHelpersDark]
  },
  ...messagingBlocks,
  ...linkBlocks,
  ...selectionAndDisplayBlocks,
  ...tableAndStateBlocks,
  progressBlock
];

export const semantic: SemanticTokens = {
  blocks
};
