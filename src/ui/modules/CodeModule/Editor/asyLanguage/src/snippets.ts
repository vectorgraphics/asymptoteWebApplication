import {Completion, snippetCompletion as snip} from "@codemirror/autocomplete"

/// A collection of JavaScript-related
/// [snippets](#autocomplete.snippet).
export const snippets: readonly Completion[] = [
  snip("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n\t${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  snip("do {\n\t${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  snip("while (${}) {\n\t${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  snip("if (${}) {\n\t${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  snip("if (${}) {\n\t${}\n} else {\n\t${}\n}", {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  snip("struct ${name} {\n\t${}\n}", {
    label: "struct",
    detail: "definition",
    type: "keyword"
  }),
  snip("import ${module} as ${name};\n${}", {
    label: "import",
    detail: "as named",
    type: "keyword"
  }),
  snip("import ${module};\n${}", {
    label: "import",
    detail: "module",
    type: "keyword"
  }),
  snip("access ${module} as ${name};\n${}", {
    label: "access",
    detail: "as named",
    type: "keyword"
  }),
  snip("access ${module};\n${}", {
    label: "access",
    detail: "module",
    type: "keyword"
  }),
  snip("unravel ${module};\n${}", {
    label: "unravel",
    detail: "module",
    type: "keyword"
  }),
  snip("include ${module};\n${}", {
    label: "include",
    detail: "module",
    type: "keyword"
  }),
    snip("from ${module} access ${name} as ${alias};\n${}", {
    label: "from",
    detail: "as alias",
    type: "keyword"
  }),
    snip("from ${module} access ${name};\n${}", {
    label: "from",
    detail: "named",
    type: "keyword"
  }),
    snip("write(${});\n${}", {
    label: "write",
    detail: "output",
    type: "function"
  }),
    snip("using ${alias} = ${type};\n${}", {
    label: "using",
    detail: "type",
    type: "keyword"
  }),
    snip("typedef ${type} ${alias};\n${}", {
    label: "typedef",
    detail: "type",
    type: "keyword"
  }),  
]
