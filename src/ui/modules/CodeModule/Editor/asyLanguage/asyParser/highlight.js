import {styleTags, tags} from "@lezer/highlight";

export const standardTypeName = tags.standard(tags.typeName);
export const standardAtom = tags.standard(tags.typeName);
export const functionExpr = tags.function(tags.propertyName);
export const functionCall = tags.function(tags.variableName);
export const functionDef = tags.function(tags.definition(tags.variableName));

export const asyHighlighting = styleTags({
  "typedef struct operator using": tags.definitionKeyword,
  "public restricted private": tags.modifier,
  "import access unravel include from as": tags.definitionKeyword,
  "if else for while do return break continue": tags.controlKeyword,
  "new": tags.operatorKeyword,
  "PrimitiveType": tags.standard(tags.typeName),
  "BuiltinType": tags.atom,
  "null default": tags.null,
  "True False": tags.bool,
  this: tags.self,
  TypeIdentifier: tags.typeName,
  FieldIdentifier: tags.propertyName,
  "CallExpression/FieldExpression/FieldIdentifier": tags.function(tags.propertyName),
  "ModuleName/Identifier": tags.namespace,
  "Identifier": tags.variableName,
  "CallExpression/Identifier": tags.function(tags.variableName),
  "FunctionDeclarator/Identifier": tags.function(tags.definition(tags.variableName)),
  OperatorName: tags.operator,
  ArithOp: tags.arithmeticOperator,
  LogicOp: tags.logicOperator,
  BitOp: tags.bitwiseOperator,
  CompareOp: tags.compareOperator,
  AssignOp: tags.definitionOperator,
  UpdateOp: tags.updateOperator,
  LineComment: tags.lineComment,
  Number: tags.number,
  String: tags.string,
  EscapeSequence: tags.escape,
  "UserDefinedLiteral/Identifier": tags.literal,
  "( )": tags.paren,
  "[ ]": tags.squareBracket,
  "{ }": tags.brace,
  "< >": tags.angleBracket,
  ".": tags.derefOperator,
  ", ;": tags.separator
})
