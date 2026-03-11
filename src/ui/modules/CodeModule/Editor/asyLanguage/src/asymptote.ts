import { parser } from "../asyParser/parser";
import { LRLanguage, LanguageSupport, delimitedIndent, continuedIndent, indentNodeProp, foldNodeProp, foldInside } from "@codemirror/language"
import { completeFromList, ifNotIn} from "@codemirror/autocomplete"
import { snippets } from "./snippets"
import { localCompletionSource, dontComplete} from "./complete"

// A language provider for ASYMPTOTE language extended with highlighting and
// indentation information.
export const asymptoteLanguage = LRLanguage.define({
  name: "asymptote",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        IfStatement: continuedIndent({except: /^\s*({|else\b)/}),
        BlockComment: () => null,
        CompoundStatement: delimitedIndent({closing: "}"}),
        Statement: continuedIndent({except: /^{/})
      }),
      foldNodeProp.add({
        "DeclarationList CompoundStatement FieldDeclarationList InitializerList": foldInside,
        BlockComment(tree) { return {from: tree.from + 2, to: tree.to - 2} }
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["(", "[", "{", "'", '"', "`"]},
    commentTokens: {line: "//", block: {open: "/*", close: "*/"}},
    indentOnInput: /^\s*(?:\{|\}|<\/)$/,
  }
})

let kwCompletion = (name: string) => ({label: name, type: "keyword"})

const keywordList = "operator public restricted private autounravel return break continue new null default True False int real bool bool3 pair triple string path guide pen transform frame picture";
const keywords = keywordList.split(" ").map(kwCompletion)
// ASYMPTOTE support. Includes [snippet](#lang-asymptote.snippets)
// and local variable completion.
export function asymptote() {
  let lang = asymptoteLanguage;
  let completions = snippets.concat(keywords);
  return new LanguageSupport(lang, [
    asymptoteLanguage.data.of({
      autocomplete: ifNotIn(dontComplete, completeFromList(completions))
    }),
    asymptoteLanguage.data.of({
      autocomplete: localCompletionSource
    }),
    [],
  ])
}

