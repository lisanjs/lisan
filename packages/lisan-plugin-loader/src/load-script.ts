const loadScript = (url: string, scriptId: string): Promise<string> =>
  new Promise(resolve => {
    const bodyElement = document.getElementsByTagName('body')[0];

    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const dictionaryRef = document.createElement('script');
    dictionaryRef.setAttribute('type', 'text/javascript');
    dictionaryRef.setAttribute('id', scriptId);
    dictionaryRef.setAttribute('src', url);

    bodyElement.appendChild(dictionaryRef);

    dictionaryRef.onload = (): void => {
      resolve(scriptId);
    };
  });

export default loadScript;
