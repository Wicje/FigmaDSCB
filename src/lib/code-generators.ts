import { DesignToken } from '@/types/tokens';
import yaml from 'js-yaml';

export function generateCssVariablesCode(tokens: DesignToken[]): string {
  const lines = tokens.map((token) => `  ${token.cssVariable}: ${token.value};`);
  return `:root {\n${lines.join('\n')}\n}`;
}

export function generateTailwindConfigCode(tokens: DesignToken[]): string {
  const colors: Record<string, string> = {};
  tokens
    .filter((t) => t.category === 'colors' && !t.value.startsWith('linear-gradient'))
    .forEach((t) => {
      const key = t.id.replace('color-', '');
      colors[key] = `var(${t.cssVariable}, '${t.value}')`;
    });

  const config = {
    theme: {
      extend: {
        colors: {
          anichisom: colors,
        },
        boxShadow: {
          'cyber-cyan': '0 0 20px rgba(0, 240, 255, 0.4)',
          'violet-pulse': '0 0 25px rgba(112, 0, 255, 0.35)',
        },
        fontFamily: {
          display: ["'Space Grotesk'", 'sans-serif'],
          body: ["'Inter'", 'sans-serif'],
          mono: ["'JetBrains Mono'", 'monospace'],
        },
      },
    },
  };

  return `// tailwind.config.js / tailwind.config.ts\nmodule.exports = ${JSON.stringify(config, null, 2)};`;
}

export function generateReactComponentSnippet(token: DesignToken): string {
  if (token.snippets?.react) return token.snippets.react;

  switch (token.category) {
    case 'colors':
      return `// React Color Usage Example\nexport function ${toPascalCase(token.id)}Demo() {\n  return (\n    <div style={{ backgroundColor: '${token.value}' }} className="w-16 h-16 rounded-xl border border-white/10 shadow-lg flex items-center justify-center text-xs font-mono">\n      ${token.value}\n    </div>\n  );\n}`;
    case 'buttons':
      return `// ANICHISOM ${token.name} React Component\nimport React from 'react';\n\nexport const ${toPascalCase(token.id)}: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {\n  return (\n    <button \n      onClick={onClick}\n      className="px-6 py-3 bg-[#00F0FF] text-[#090A0F] font-bold rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:bg-[#33F3FF] transition-all transform hover:scale-[1.02] active:scale-[0.98]"\n    >\n      {children}\n    </button>\n  );\n};`;
    case 'cards':
      return `// ANICHISOM Card Panel\nexport function ${toPascalCase(token.id)}({ title, description }: { title: string; description: string }) {\n  return (\n    <div className="p-6 bg-[#0A1128]/90 border border-[#222838] rounded-xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-[#00F0FF]/50 transition-all">\n      <h3 className="text-xl font-bold font-display text-[#F4F6FC]">{title}</h3>\n      <p className="mt-2 text-sm text-[#64748B]">{description}</p>\n    </div>\n  );\n}`;
    default:
      return `// ANICHISOM Token Component Example\nexport const ${toPascalCase(token.id)} = () => (\n  <div className="p-4 rounded bg-[#141722] text-[#00F0FF] font-mono">\n    Token: {${JSON.stringify(token.name)}}\n  </div>\n);`;
  }
}

export function generateJsonTokenSpec(token: DesignToken): string {
  return JSON.stringify(token, null, 2);
}

export function generateYamlTokenSpec(token: DesignToken): string {
  return yaml.dump(token);
}

function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}
