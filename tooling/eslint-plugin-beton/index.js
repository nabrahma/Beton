/**
 * eslint-plugin-beton
 *
 * no-inline-classes: component files may not contain class strings. Every
 * class comes from a recipe in @beton-ui/recipes, which keeps the React layer
 * portable and the design rules in one place.
 */

const CLASS_ATTRIBUTES = new Set(["className", "class"]);
const CLASS_FUNCTIONS = new Set(["cn", "cx", "clsx", "classNames", "twMerge", "tv"]);

function hasText(node) {
  if (!node) return false;
  if (node.type === "Literal") return typeof node.value === "string" && node.value.trim() !== "";
  if (node.type === "TemplateLiteral") return node.quasis.some((q) => q.value.cooked.trim() !== "");
  if (node.type === "ConditionalExpression")
    return hasText(node.consequent) || hasText(node.alternate);
  if (node.type === "LogicalExpression") return hasText(node.left) || hasText(node.right);
  if (node.type === "ArrayExpression") return node.elements.some(hasText);
  return false;
}

function preview(node, source) {
  const text = source.getText(node);
  return text.length > 40 ? `${text.slice(0, 37)}...` : text;
}

const noInlineClasses = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow Tailwind class strings in component files; use a recipe instead.",
    },
    messages: {
      inline:
        "Class strings are not allowed in components ({{value}}). Move them into a recipe in @beton-ui/recipes. See CONTRACTS.md §1.",
    },
    schema: [],
  },
  create(context) {
    const source = context.sourceCode;
    const report = (node) =>
      context.report({ node, messageId: "inline", data: { value: preview(node, source) } });

    return {
      JSXAttribute(node) {
        if (!CLASS_ATTRIBUTES.has(node.name.name) || !node.value) return;
        const value =
          node.value.type === "JSXExpressionContainer" ? node.value.expression : node.value;
        if (hasText(value)) report(value);
      },
      CallExpression(node) {
        if (node.callee.type !== "Identifier" || !CLASS_FUNCTIONS.has(node.callee.name)) return;
        for (const arg of node.arguments) if (hasText(arg)) report(arg);
      },
      Property(node) {
        const key = node.key.type === "Identifier" ? node.key.name : node.key.value;
        if (CLASS_ATTRIBUTES.has(key) && hasText(node.value)) report(node.value);
      },
      // `class:` passed to a recipe call is still a hardcoded class string.
    };
  },
};

export default {
  meta: { name: "eslint-plugin-beton", version: "0.1.0" },
  rules: { "no-inline-classes": noInlineClasses },
};
