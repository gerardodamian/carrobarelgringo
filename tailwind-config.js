// Config de Tailwind compartida por index.html y menu.html.
// Se carga como <script src="tailwind-config.js"></script> DESPUÉS del script
// de Tailwind CDN, para que ambas páginas usen exactamente los mismos
// colores, tipografías y tamaños (antes estaba duplicado en cada archivo
// y podía desincronizarse).
tailwind.config = {
darkMode: "class",
theme: {
extend: {
colors: {
"on-error-container": "#ffdad6",
"surface-bright": "#3a3936",
"charcoal-black": "#121212",
"on-secondary-container": "#6a4800",
"surface-variant": "#363532",
"on-secondary-fixed-variant": "#604100",
"secondary-fixed-dim": "#ffba38",
"inverse-on-surface": "#31302d",
"on-background": "#e6e2dd",
"surface-container": "#20201d",
"tertiary-fixed": "#e4e2e1",
"on-surface": "#e6e2dd",
"primary-fixed-dim": "#ffb5a0",
"on-primary-fixed-variant": "#862200",
"error": "#ffb4ab",
"on-secondary-fixed": "#281900",
"tertiary": "#c8c6c5",
"surface-container-lowest": "#0f0e0c",
"on-error": "#690005",
"secondary-container": "#feb300",
"on-surface-variant": "#e4beb4",
"on-primary-container": "#541200",
"surface-tint": "#ffb5a0",
"secondary": "#ffd799",
"paper-white": "#FDFBF7",
"inverse-primary": "#b02f00",
"surface-container-high": "#2b2a27",
"primary-container": "#ff5722",
"on-tertiary-fixed-variant": "#474747",
"tertiary-fixed-dim": "#c8c6c5",
"on-secondary": "#432c00",
"surface": "#141311",
"on-primary-fixed": "#3b0900",
"grill-smoke": "#3D3D3D",
"secondary-fixed": "#ffdeac",
"primary": "#ffb5a0",
"surface-container-low": "#1c1c19",
"tertiary-container": "#929090",
"surface-dim": "#141311",
"primary-fixed": "#ffdbd1",
"outline-variant": "#5b4039",
"background": "#141311",
"error-container": "#93000a",
"inverse-surface": "#e6e2dd",
"on-tertiary": "#303030",
"surface-container-highest": "#363532",
"on-primary": "#5f1500",
"on-tertiary-fixed": "#1b1c1c",
"on-tertiary-container": "#2a2a2a",
"outline": "#ab8980",
"flame-red": "#D84315",
"whatsapp": "#25d366",
"whatsapp-dark": "#1da851"
},
borderRadius: {
DEFAULT: "0.125rem",
lg: "0.25rem",
xl: "0.5rem",
full: "0.75rem"
},
spacing: {
"margin-desktop": "64px",
"gutter": "24px",
"unit": "8px",
"container-max": "1200px",
"margin-mobile": "20px"
},
fontFamily: {
"body-lg": ["Hanken Grotesk"],
"label-mono": ["Space Mono"],
"body-md": ["Hanken Grotesk"],
"headline-lg-mobile": ["Anton"],
"item-title": ["Anton"],
"display-hero": ["Anton"],
"price-tag": ["Space Mono"],
"headline-lg": ["Anton"]
},
fontSize: {
"body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
"label-mono": ["12px", { lineHeight: "1.2", letterSpacing: "0.1em", fontWeight: "700" }],
"body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
"headline-lg-mobile": ["28px", { lineHeight: "1.2", fontWeight: "400" }],
"item-title": ["20px", { lineHeight: "1.4", fontWeight: "400" }],
"display-hero": ["56px", { lineHeight: "1.1", letterSpacing: "0.02em", fontWeight: "400" }],
"price-tag": ["18px", { lineHeight: "1.0", fontWeight: "700" }],
"headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "0.03em", fontWeight: "400" }]
}
}
}
};
