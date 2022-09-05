// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
import CodeMirror from 'codemirror/src/codemirror';
import {
  asyAtoms, asyTypes, asyKeywords, asyBlockKeywords,
  asyDefKeywords, asyBuiltins, asyBuiltinValues
} from './asyDialects'

(function(mod) {mod(CodeMirror);})(function(CodeMirror) {

  // %%%%%%%%%%%%%%%%%%%%%%%%          Asymptote Mode Definition
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  CodeMirror.defineMode("asymptote", function modeRunner(config, parserConfig) {
  // console.log(parserConfig);
  let indentUnit = config.indentUnit;
  let statementIndentUnit = parserConfig.statementIndentUnit || indentUnit;
  let dontAlignCalls = parserConfig.dontAlignCalls;
  let keywords = parserConfig.keywords || {};
  let types = parserConfig.types || {};
  let builtin = parserConfig.builtin || {};
  let blockKeywords = parserConfig.blockKeywords || {};
  let defKeywords = parserConfig.defKeywords || {};
  let atoms = parserConfig.atoms || {};
  let hooks = parserConfig.hooks || {};
  let multiLineStrings = parserConfig.multiLineStrings;
  let indentStatements = parserConfig.indentStatements !== false;
  let indentSwitch = parserConfig.indentSwitch !== false;
  let namespaceSeparator = parserConfig.namespaceSeparator;
  let isPunctuationChar = parserConfig.isPunctuationChar || /[[\]{}(),;:.]/;
  let numberStart = parserConfig.numberStart || /[\d.]/;
  let number = parserConfig.number || /^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i;
  let isOperatorChar = parserConfig.isOperatorChar || /[+\-*^&%=<>!.:@|/]/;
  let isIdentifierChar = parserConfig.isIdentifierChar || /[\w$_\xa1-\uffff]/;
  // An optional function that takes a {string} token and returns true if it should be treated as a builtin.
  let isReservedIdentifier = parserConfig.isReservedIdentifier || false;
  let curPunc;
  let isDefKeyword;


  function tokenBase(stream, state) {
    const char = stream.next();
    if (hooks[char]) {
      const result = hooks[char](stream, state);
      if (result !== false) return result;
    }
    if ((char === '"') || (char === "'")) {
      state.tokenize = tokenString(char);
      return state.tokenize(stream, state);
    }
    if (numberStart.test(char)) {
      stream.backUp(1);
      if (stream.match(number)) {
        return "number";
      }
      stream.next();
    }
    if (isPunctuationChar.test(char)) {
      curPunc = char;
      return null;
    }
    if (char === "/") {
      if (stream.eat("*")) {
        state.tokenize = tokenComment;
        return tokenComment(stream, state);
      }
      if (stream.eat("/")) {
        stream.skipToEnd();
        return "comment";
      }
    }
    if (isOperatorChar.test(char)) {
      while (!stream.match(/^\/[/*]/, false) && stream.eat(isOperatorChar)) {}
      return "operator";
    }
    stream.eatWhile(isIdentifierChar);
    if (namespaceSeparator) {
      while (stream.match(namespaceSeparator)) {
        stream.eatWhile(isIdentifierChar);
      }
    }

    let cur = stream.current();
    if (contains(keywords, cur)) {
      if (contains(blockKeywords, cur)) {
        curPunc = "newstatement";
      }
      if (contains(defKeywords, cur)) {
        isDefKeyword = true;
      }
      return "keyword";
    }
    if (contains(types, cur)) {
      return "type";
    }
    if (contains({...builtin.func, ...builtin.value}, cur) || (isReservedIdentifier && isReservedIdentifier(cur))) {
      if (contains(blockKeywords, cur)) {
        curPunc = "newstatement";
      }
      if (contains(builtin.value, cur)) {
        return  "variable-2";
      }
      return "builtin";
    }
    if (contains(atoms, cur)) {
      return "atom";
    }
    return "variable";
  }

  function tokenString(quote) {
    return function(stream, state) {
      let escaped = false, next, end = false;
      while ((next = stream.next()) != null) {
        if (next === quote && !escaped) {
          end = true;
          break;
        }
        escaped = !escaped && next === "\\";
      }
      if (end || !(escaped || multiLineStrings))
        state.tokenize = null;
      return "string";
    };
  }
  function tokenComment(stream, state) {
    let maybeEnd = false;
    let char;
    while ((char = stream.next())) {
      if (char === "/" && maybeEnd) {
        state.tokenize = null;
        break;
      }
      maybeEnd = (char === "*");
    }
    return "comment";
  }
  function maybeEOL(stream, state) {
    if (parserConfig.typeFirstDefinitions && stream.eol() && isTopScope(state.context))
      state.typeAtEndOfLine = typeBefore(stream, state, stream.pos)
  }

  // Interface
  return {
    startState: function(basecolumn) {
      return {
        context: new Context((basecolumn || 0) - indentUnit, 0, "top", null, false),
        tokenize: null,
        indented: 0,
        startOfLine: true,
        prevToken: null
      };
    },

    token: function(stream, state) {
      let ctx = state.context
      if (stream.sol()) {
        if (ctx.align === null) {
          ctx.align = false;
        }
        state.indented = stream.indentation();
        state.startOfLine = true;
      }
      if (stream.eatSpace()) {
        maybeEOL(stream, state);
        return null;
      }

      curPunc = null;
      isDefKeyword = null;
      let style = (state.tokenize || tokenBase)(stream, state);
      if ((style === "comment") || (style === "meta")) {
        return style;
      }
      if (ctx.align === null) {
        ctx.align = true;
      }
      if (curPunc === ";" || curPunc === ":" || (curPunc === "," && stream.match(/^\s*(?:\/\/.*)?$/, false))) {
        while (state.context.type === "statement") {
          popContext(state);
        }
      } else if (curPunc === "{") {
        pushContext(state, stream.column(), "}");
      } else if (curPunc === "[") {
        pushContext(state, stream.column(), "]");
      } else if (curPunc === "(") {
        pushContext(state, stream.column(), ")");
      } else if (curPunc === "}") {
        while (ctx.type === "statement") {
          ctx = popContext(state);
        }
        if (ctx.type === "}") {
          ctx = popContext(state);
        }
        while (ctx.type === "statement") {
          ctx = popContext(state);
        }
      } else if (curPunc === ctx.type) {
        popContext(state);
      } else if (indentStatements && (((ctx.type === "}" || ctx.type === "top") && curPunc !== ";") ||
                (ctx.type === "statement" && curPunc === "newstatement"))) {
        pushContext(state, stream.column(), "statement", stream.current());
      }
      if (style === "variable" && (state.prevToken === "def" ||
            (parserConfig.typeFirstDefinitions && typeBefore(stream, state, stream.start) && isTopScope(state.context)
              && stream.match(/^\s*\(/, false)))) {
        style = "def";
      }

      if (hooks.token) {
        const result = hooks.token(stream, state, style);
        if (result !== undefined) style = result;
      }
      if (style === "def" && parserConfig.styleDefs === false) {
        style = "variable";
      }

      state.startOfLine = false;
      state.prevToken = (isDefKeyword)? "def": (style || curPunc);
      maybeEOL(stream, state);
      return style;
    },

    indent: function(state, textAfter) {
      if ((state.tokenize !== tokenBase && state.tokenize !== null) || state.typeAtEndOfLine) {
        return CodeMirror.Pass;
      }
      let ctx = state.context;
      const firstChar = (textAfter && textAfter.charAt(0));
      const closing = (firstChar === ctx.type);
      if (ctx.type === "statement" && firstChar === "}") {
        ctx = ctx.prev;
      }
      if (parserConfig.dontIndentStatements) {
        while (ctx.type === "statement" && parserConfig.dontIndentStatements.test(ctx.info)) {
          ctx = ctx.prev;
        }
      }
      if (hooks.indent) {
        const hook = hooks.indent(state, ctx, textAfter, indentUnit);
        if (typeof hook === "number") {
          return hook;
        }
      }
      var switchBlock = (ctx.prev && ctx.prev.info === "switch");
      if (parserConfig.allmanIndentation && /[{(]/.test(firstChar)) {
        while (ctx.type !== "top" && ctx.type !== "}") {
          ctx = ctx.prev;
        }
        return ctx.indented;
      }
      if (ctx.type === "statement") {
        return ctx.indented + (firstChar === "{" ? 0 : statementIndentUnit);
      }
      if (ctx.align && (!dontAlignCalls || ctx.type !== ")")) {
        return ctx.column + (closing ? 0 : 1);
      }
      if (ctx.type === ")" && !closing) {
        return ctx.indented + statementIndentUnit;
      }

      return ctx.indented + (closing ? 0 : indentUnit) +
        (!closing && switchBlock && !/^(?:case|default)\b/.test(textAfter) ? indentUnit : 0);
    },

    electricInput: indentSwitch ? /^\s*(?:case .*?:|default:|\{\}?|\})$/ : /^\s*[{}]$/,
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    blockCommentContinue: " * ",
    lineComment: "//",
    fold: "brace"
  };
});

  const modeObject = {
    name: "asymptote",
    helperType: "asymptote",
    atoms: extractStringData(asyAtoms),
    types: extractStringData(asyTypes),
    keywords: extractStringData(asyKeywords + asyBlockKeywords),
    blockKeywords: extractStringData(asyBlockKeywords),
    defKeywords: extractStringData(asyDefKeywords),
    builtin: {
      func: extractStringData(asyBuiltins),
      value: extractStringData(asyBuiltinValues)
    },
    typeFirstDefinitions: true,
    dontIndentStatements: /^template$/,
    isIdentifierChar: /[\w$_~\xa1-\uffff]/,
    isReservedIdentifier: null,
    namespaceSeparator: "::",
    modeProps: {
      fold: ["brace", "include"]
    }
  }
  CodeMirror.registerHelper("hintWords", modeObject.name, Object.keys({
    ...modeObject.atoms,
    ...modeObject.types,
    ...modeObject.keywords,
    ...modeObject.blockKeywords,
    ...modeObject.defKeywords,
  }));
  CodeMirror.defineMIME("asymptote", modeObject);

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Utility Functions
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  function Context(indented, column, type, info, align, prev) {
    this.indented = indented;
    this.column = column;
    this.type = type;
    this.info = info;
    this.align = align;
    this.prev = prev;
  }

  function pushContext(state, col, type, info) {
    let indent = state.indented;
    if (state.context && state.context.type === "statement" && type !== "statement") {
      indent = state.context.indented;
    }
    return state.context = new Context(indent, col, type, info, null, state.context);
  }

  function popContext(state) {
    const ctxType = state.context.type;
    if (ctxType === ")" || ctxType === "]" || ctxType === "}") {
      state.indented = state.context.indented;
    }
    return state.context = state.context.prev;
  }

  function typeBefore(stream, state, pos) {
    if (state.prevToken === "variable" || state.prevToken === "type") {
      return true;
    }
    if (/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(stream.string.slice(0, pos))) {
      return true;
    }
    if (state.typeAtEndOfLine && stream.column() === stream.indentation()) {
      return true;
    }
  }

  function isTopScope(context) {
    while (true) {
      if (!context || context.type === "top") {
        return true;
      }
      if (context.type === "}" && context.prev.info !== "namespace") {
        return false;
      }
      context = context.prev;
    }
  }

  function extractStringData(str) {
    const obj = {};
    const words = str.split(" ");
    for (let i = 0; i < words.length; ++i) {
      obj[words[i]] = true;
    }
    return obj;
  }

  function contains(listOfwords, searchedWord) {
    return Object.keys(listOfwords).includes(searchedWord);
  }

});






