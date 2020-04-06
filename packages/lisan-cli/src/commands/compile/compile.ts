/**
  // fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
    const sourceCode = readFileSync(argv.file as string, { encoding: 'utf-8' });
    const json = JSON.parse(sourceCode);
    const result = compile(json);
    console.log(result);
  */

import * as glob from 'glob';
import isGlob from 'is-glob';
import * as fs from 'fs';
import * as path from 'path';
import * as chokidar from 'chokidar';
import { parse, generate } from 'lisan-compiler';
import { ParseOptions, GenerateOptions } from 'lisan-compiler/dist/typings';
import { CompileCommandArgs } from '../../typings';

const validateGlobs = (globs: string[]): void => {
  globs.forEach(globStr => {
    if (!isGlob(globStr)) {
      throw new Error(`"${globStr}" is not a valid glob pattern!`);
    }
  });
};

const findJsonFilesToCompile = (
  includeGlob: string,
  exclude: string[],
): string[] =>
  glob.sync(includeGlob, {
    ignore: exclude,
  });

const compileFile = (
  jsonFile: string,
  {
    inputDir,
    outputDir,
    declaration,
    compilerOptions,
  }: {
    inputDir: string;
    outputDir: string;
    declaration: boolean;
    compilerOptions: GenerateOptions | ParseOptions;
  },
): void => {
  const file = fs.readFileSync(jsonFile, 'utf-8');

  let json;
  try {
    json = JSON.parse(file);
  } catch (err) {
    throw new Error(`${jsonFile} is not a valid JSON file!`);
  }
  const parsedDictionary = parse(json, compilerOptions as ParseOptions);
  const dictionarySource = generate(
    parsedDictionary,
    compilerOptions as GenerateOptions,
  );

  const relativePath = path.relative(inputDir, jsonFile);
  const targetPath = path.parse(path.join(outputDir, relativePath));
  const outFile = path.join(targetPath.dir, `${targetPath.name}.js`);

  // create outDir
  fs.mkdirSync(targetPath.dir, {
    recursive: true,
  });

  fs.writeFileSync(outFile, dictionarySource, 'utf-8');
  if (declaration) {
    const outDTSFile = path.join(targetPath.dir, `${targetPath.name}.d.ts`);
    fs.writeFileSync(
      outDTSFile,
      "import { Dictionary } from 'lisan-types';\n\ndeclare const _default: Dictionary;\nexport default _default;\n",
      'utf-8',
    );
  }
};

const compileCommand = (commandArgs: CompileCommandArgs): void => {
  const {
    inputDir,
    exclude,
    outputDir,
    declaration,
    watch,
    ...compilerOptions
  } = commandArgs;
  if (!fs.existsSync(inputDir) || !fs.lstatSync(inputDir).isDirectory()) {
    throw new Error(`inputDir "${inputDir}" does not exist!`);
  }
  if (!outputDir) {
    throw new Error('Please specify "outputDir" option!');
  }
  const includeGlob = `${inputDir}/**/*.json`;

  validateGlobs([includeGlob, ...exclude]);

  const files = findJsonFilesToCompile(includeGlob, exclude);

  if (watch) {
    const watcher = chokidar.watch(includeGlob, {
      cwd: '.',
      ignoreInitial: true,
      ignored: exclude,
    });

    watcher.on('ready', () => {
      console.log('Initial scan complete. Ready for changes');

      // Add event listeners.
      watcher
        .on('add', file => {
          console.log(`File ${file} has been added`);
          compileFile(file, {
            inputDir,
            outputDir,
            declaration,
            compilerOptions,
          });
        })
        .on('change', file => {
          console.log(`File ${file} has been changed`);
          compileFile(file, {
            inputDir,
            outputDir,
            declaration,
            compilerOptions,
          });
        });
    });
  }

  files.forEach(file =>
    compileFile(file, { inputDir, outputDir, declaration, compilerOptions }),
  );
};

export default compileCommand;
