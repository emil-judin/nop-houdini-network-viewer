/**
 * Parts of a Houdini operator type name such as `labs::thicken::1.0` or `copytopoints::2.0`.
 */
export interface OperatorTypeParts {
  /** Namespace (e.g. `labs`), or an empty string for built-in operators. */
  namespace: string;
  /** Operator name without namespace and version (e.g. `thicken`, `copytopoints`), lowercased. */
  baseType: string;
}

/**
 * Splits a Houdini operator type name into namespace and base name, dropping the version.
 *
 * Examples: `labs::thicken::1.0` gives `labs` + `thicken`; `copytopoints::2.0` gives `""` + `copytopoints`;
 * `emjud::circuit_board_fan::1.0` gives `emjud` + `circuit_board_fan`.
 */
export function parseOperatorType(type: string): OperatorTypeParts {
  const parts = type.toLowerCase().split('::');
  const isNamespaced = parts.length >= 2 && !/^\d/.test(parts[1]);
  return {
    namespace: isNamespaced ? parts[0] : '',
    baseType: isNamespaced ? parts[1] : parts[0],
  };
}
