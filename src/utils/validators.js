// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%  NAME & IDENTIFIER VALIDATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const isValidName = (name) => {
  const emptyNameRegexp = /^\s*$/ig;
  const validNameRegexp = /^[^\d.][\w\d_]*$/ig;
  return (emptyNameRegexp.test(name))? false: validNameRegexp.test(name);
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  UNIQUE NAME VALIDATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const isUniqueName = (name, nameCollection=[]) => {
  const regExp = new RegExp(name, "g");
  return (nameCollection.length === 0)? true: !nameCollection.some((item) => regExp.test(item));
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ASY PAIR VALIDATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const isValidAsyPair = (value) => {
  const regexp = /\s*\(\s*\S+\s*,\s*\S+\s*\)\s*/ig;
  return regexp.exec(value);
};

