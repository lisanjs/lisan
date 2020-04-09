/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;

function CodeMirror() {
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Try Lisan Compiler</h1>
            <p>
              <a href="/docs/what-is-lisan-compiler">Lisan Compiler</a> is a
              javascript library created to improve development experience with
              Lisan. It helps you to compile{' '}
              <a href="/docs/translations">Translations</a> into
              <a href="/docs/dictionary">Dictionaries</a>.
            </p>
          </header>
          <div id="lisan-option-container">
            <h2>Options</h2>
            <span>
              <input type="checkbox" name="lisan-returnArray" /> returnArray
            </span>
            <span>
              <input
                type="checkbox"
                name="lisan-sortEntryKeys"
                defaultChecked
              />
              sortEntryKeys
            </span>
            <span>
              <input
                type="checkbox"
                name="lisan-autoTrimValues"
                defaultChecked
              />{' '}
              autoTrimValues
            </span>
            <span>
              <input
                type="checkbox"
                name="lisan-allowNonExistingKeys"
                defaultChecked
              />{' '}
              allowNonExistingKeys
            </span>
            <span>
              <input type="radio" name="lisan-module" value="none" />
              none
              <input type="radio" name="lisan-module" value="esm" />
              esm
              <input
                type="radio"
                name="lisan-module"
                value="cjs"
                defaultChecked
              />{' '}
              cjs
              <input type="radio" name="lisan-module" value="lisan" /> lisan
            </span>
          </div>

          <div className="code-mirror">
            <div className="code-mirror__input">
              <textarea
                id="code-input"
                placeholder="Please put your valid json"
                defaultValue={JSON.stringify(
                  {
                    locale: 'en-US',
                    entries: {
                      helloWorld: '        Hello World',
                      anInterpolation: 'Hello ${name}',
                      nestedCall: "Hello ${t('non.existing.key')}",
                      conditional: {
                        one: 'a record',
                        many: '5 records',
                      },
                    },
                  },
                  null,
                  2,
                )}
              ></textarea>
            </div>
            <div className="code-mirror__output">
              <pre>
                <code id="code-output" />
              </pre>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>
              <input type="checkbox" name="auto-format" defaultChecked />
              {'auto format JSON on blur'}
            </span>
            <span id="execution-time"></span>
          </div>
        </div>
      </Container>
      <script
        src="https://unpkg.com/lisan-compiler/dist/index.umd.js"
        type="text/javascript"
      ></script>
      <script src="/js/code-mirror.js" type="text/javascript"></script>
    </div>
  );
}

module.exports = CodeMirror;
