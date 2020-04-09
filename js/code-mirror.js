(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const codeMirrorInput = document.getElementById('code-input');
    const codeMirrorOutput = document.getElementById('code-output');
    const executionTimeContainer = document.getElementById('execution-time');

    const lisanReturnArrayInput = document.querySelector(
      '[name="lisan-returnArray"]',
    );
    const lisanAllowNonExistingEntryKeysInput = document.querySelector(
      '[name="lisan-allowNonExistingKeys"]',
    );
    const lisanSortEntryKeysInput = document.querySelector(
      '[name="lisan-sortEntryKeys"]',
    );
    const lisanAutoTrimValues = document.querySelector(
      '[name="lisan-autoTrimValues"]',
    );

    const isHljsExist = typeof hljs !== 'undefined';

    if (isHljsExist) {
      function update(value) {
        const targetModule = document.querySelector(
          '[name="lisan-module"]:checked',
        ).value;

        const options = {
          module: targetModule,
          sortEntryKeys: lisanSortEntryKeysInput.checked,
          allowNonExistingKeys: lisanAllowNonExistingEntryKeysInput.checked,
          autoTrimValues: lisanAutoTrimValues.checked,
          returnArray: lisanReturnArrayInput.checked,
        };

        var obj = null;
        var timePassed = 0;
        try {
          obj = JSON.parse(value);
        } catch (err) {
          codeMirrorOutput.innerText = err.message;
        }

        if (obj) {
          var startTime = new Date().getTime();
          try {
            const parsedDictionary = lisanCompiler.parse(obj, options);
            codeMirrorOutput.innerText = lisanCompiler.generate(
              parsedDictionary,
              options,
            );
          } catch (err) {
            codeMirrorOutput.innerText = err.message;
          }
          timePassed = new Date().getTime() - startTime;
          hljs.highlightBlock(codeMirrorOutput);
        }

        executionTimeContainer.innerHTML =
          'Execution Time: ' + timePassed.toString() + 'ms';

        // end of update function
      }

      var timer;
      update(codeMirrorInput.value);

      document
        .getElementById('lisan-option-container')
        .addEventListener('click', function() {
          update(codeMirrorInput.value);
        });

      const autoFormat = document.querySelector('[name="auto-format"]');
      codeMirrorInput.addEventListener('blur', function() {
        if (autoFormat.checked) {
          codeMirrorInput.value = JSON.stringify(
            JSON.parse(codeMirrorInput.value),
            null,
            2,
          );
        }
      });

      codeMirrorInput.addEventListener('input', function(e) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function() {
          update(e.target.value);
        }, 150);
      });
    }
  });
})();
