import { LisanLiteral } from '../../typings';

const renderES6 = (
  lisanLiteral: LisanLiteral,
  variables: string[],
  functions: string[],
): string => {
  const templateLiteral = `\`${lisanLiteral}\``;
  const lisanFunctions = functions.length
    ? `, { ${functions.join(', ')} }`
    : '';
  const variablesStr = variables.length ? ` ${variables.join(', ')} ` : '';
  const fnPrefix = `({${variablesStr}}${lisanFunctions})`;
  return `${fnPrefix} => ${templateLiteral}`;
};

const render = (
  lisanLiteral: LisanLiteral,
  variables: string[],
  functions: string[],
): string => {
  if (!variables.length && !functions.length) {
    return lisanLiteral.replace(new RegExp('"', 'g'), '\\"');
  }
  return renderES6(lisanLiteral, variables, functions);
};

export default render;
