import { ParsedDictionary, ParsedEntry } from '../../typings';

const TAB = (indent = 2): string => ' '.repeat(indent);
const renderEntry = (entry: ParsedEntry, indent: number): string => {
  const { key, output, functions, variables } = entry;
  let value = output;
  if (!functions.length && !variables.length) {
    // plain text must have double quotes around
    value = `"${value}"`;
  }
  return `\n${TAB(indent)}"${key}": ${value},`;
};

const render = ({ locale, entries }: ParsedDictionary): string => {
  let outputStr = `{\n${TAB()}"locale": "${locale}",\n${TAB()}"entries": {`;

  let lastGroupKey: string | null = null;
  let indent = 4;
  entries.forEach((entry, index): void => {
    const { groupKey } = entry;
    if (groupKey) {
      if (lastGroupKey !== groupKey) {
        outputStr += `\n${TAB(indent)}"${groupKey}": {`;
        indent += 2;
        lastGroupKey = groupKey;
      }
    }

    outputStr += renderEntry(entry, indent);

    const isLastEntry = index === entries.length - 1;
    const isGroupClosing =
      !isLastEntry && entries[index + 1].groupKey !== groupKey;

    if (groupKey && (isGroupClosing || isLastEntry)) {
      indent -= 2;
      outputStr += `\n${TAB(indent)}},`;
      lastGroupKey = null;
    }
  });
  outputStr += `\n${TAB()}},`;
  outputStr += '\n}';

  return outputStr;
};

export default render;
