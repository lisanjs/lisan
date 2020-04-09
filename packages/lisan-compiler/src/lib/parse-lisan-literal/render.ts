const renderFnHead = (variables: string[], functions: string[]): string => {
  const lisanFunctions = functions.length
    ? `, { ${functions.join(', ')} }`
    : '';
  const variablesStr = variables.length ? ` ${variables.join(', ')} ` : '';
  return `({${variablesStr}}${lisanFunctions})`;
};

const renderFnBody = (input: string, returnArray: boolean): string => {
  if (!returnArray) {
    return `\`${input}\``;
  }

  return input;
};

const render = ({
  input,
  variables,
  functions,
  returnArray,
}: {
  input: string;
  returnArray: boolean;
  variables: string[];
  functions: string[];
}): string => {
  if (!variables.length && !functions.length) {
    const plainText = input.replace(new RegExp('"', 'g'), '\\"');
    return returnArray ? `["${plainText}"]` : `"${plainText}"`;
  }

  const head = renderFnHead(variables, functions);
  const body = renderFnBody(input, returnArray);

  return `${head} => ${body}`;
};

export default render;
