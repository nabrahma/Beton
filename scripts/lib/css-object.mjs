// Minimal converter between the token stylesheet and the nested object shape
// used by the shadcn registry `css` field. It handles what theme.css uses:
// comments, nested at-rules and selectors, and declarations.

export function cssToObject(source) {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, "");
  let i = 0;

  function parseBlock() {
    const out = {};
    let buffer = "";
    while (i < css.length) {
      const ch = css[i++];
      if (ch === "{") {
        const key = buffer.trim().replace(/\s+/g, " ");
        buffer = "";
        const child = parseBlock();
        out[key] = key in out ? { ...out[key], ...child } : child;
      } else if (ch === "}") {
        flush(out, buffer);
        return out;
      } else if (ch === ";") {
        flush(out, buffer);
        buffer = "";
      } else {
        buffer += ch;
      }
    }
    flush(out, buffer);
    return out;
  }

  function flush(out, text) {
    const decl = text.trim();
    if (!decl) return;
    const colon = decl.indexOf(":");
    if (colon === -1) return;
    const prop = decl.slice(0, colon).trim();
    const value = decl
      .slice(colon + 1)
      .trim()
      .replace(/\s+/g, " ");
    out[prop] = value;
  }

  return parseBlock();
}

export function objectToCss(object, indent = "") {
  const lines = [];
  for (const [key, value] of Object.entries(object)) {
    if (value && typeof value === "object") {
      lines.push(`${indent}${key} {`);
      lines.push(objectToCss(value, `${indent}  `));
      lines.push(`${indent}}`);
    } else {
      lines.push(`${indent}${key}: ${value};`);
    }
  }
  return lines.join("\n");
}
