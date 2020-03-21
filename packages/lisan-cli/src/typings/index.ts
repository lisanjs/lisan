import { GenerateOptions, ParseOptions } from 'lisan-compiler/dist/typings';

interface CompileCommandArgs extends GenerateOptions, ParseOptions {
  inputDir: string;
  outputDir: string;
  exclude: string[];
  watch: boolean;
}

export { CompileCommandArgs };
