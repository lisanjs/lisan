class ParseError extends Error {
  public index?: number;

  public endIndex?: number;

  /* istanbul ignore next */
  public constructor(message: string, range?: [number, number]) {
    super(message);

    const [index, endIndex] = range || [0, 0];
    // Typescript workaround,Set the prototype explicitly.
    Object.setPrototypeOf(this, ParseError.prototype);

    this.name = 'ParseError';
    this.index = index;
    this.endIndex = endIndex;
  }
}

export default ParseError;
