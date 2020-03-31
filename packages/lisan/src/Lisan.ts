import * as TSLisan from 'lisan-types';
import { err, defaultConditions, defaultConditionTags } from './helpers';

class Lisan {
  // dictionary entries
  private _e!: TSLisan.DictionaryEntries;

  private _c!: TSLisan.Conditions;

  private _f!: TSLisan.FormatFunctions;

  private _l?: string;

  public constructor() {
    this.reset();
  }

  public reset(): void {
    this._e = {};
    this._c = { ...defaultConditions };
    this._f = {};
  }

  public localeName(localeName?: string): string | undefined {
    if (localeName) {
      this._l = localeName;
    }

    return this._l;
  }

  public use(fn: TSLisan.Plugin<Lisan>): void {
    fn.call(null, this);
  }

  public add({ locale, entries }: TSLisan.Dictionary): this {
    const localeName = this._l;
    if (localeName && locale && locale !== localeName) {
      err(
        `Dictionary locale "${locale}" is different than selected locale "${localeName}"`,
      );
    }

    // @todo validate dictionary
    this._e = {
      ...this._e,
      ...entries,
    };

    return this;
  }

  public addConditions(conditions: TSLisan.Conditions): this {
    Object.keys(conditions).forEach((key): void => {
      if (defaultConditionTags.includes(key)) {
        return;
      }
      const conditionFn = conditions[key];
      if (typeof conditionFn !== 'function') {
        err(`Invalid condition function: "${key}"`);
      }

      this._c[key] = conditionFn;
    });

    return this;
  }

  public addFormatters(formatters: TSLisan.FormatFunctions): this {
    this._f = {
      ...this._f,
      ...formatters,
    };

    return this;
  }

  private r(
    dictionaryEntryKey: string,
    dictionaryEntry: TSLisan.DictionaryEntry,
    placeholders: TSLisan.Placeholders,
  ): string {
    if (typeof dictionaryEntry === 'undefined') {
      return dictionaryEntryKey;
    }
    if (typeof dictionaryEntry === 'function') {
      return dictionaryEntry(placeholders, {
        // @todo check bind performance impact
        ...this._f,
        t: this.t,
        c: this.c,
      });
    }

    return dictionaryEntry as string;
  }

  /**
   * Translate function is going to find the provided key
   * in loaded dictionaries and renders the template and returns a string.
   *
   * @param {string} dictionaryEntryKey identifier of dictionary entry
   * @param {Placeholders} placeholders
   * @returns {string} - rendered translation text
   */
  public t(
    dictionaryEntryKey: string,
    placeholders: TSLisan.Placeholders = {},
  ): string {
    const dictionaryEntry = this._e[
      dictionaryEntryKey
    ] as TSLisan.DictionaryEntry;
    return this.r(dictionaryEntryKey, dictionaryEntry, placeholders);
  }

  /**
   * Translate function is going to find the provided key
   * in loaded dictionaries and renders the template and returns a string.
   *
   * @param {string} entryKey identifier of dictionary entry
   * @param {Placeholders} placeholders
   * @returns {string} - rendered translation text
   */
  public c(
    conditionalGroupKey: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    placeholders: TSLisan.Placeholders = {},
  ): string {
    const conditionalGroup = this._e[
      conditionalGroupKey
    ] as TSLisan.ConditionalGroup;

    if (typeof conditionalGroup !== 'object') {
      return err(`Invalid conditional group key: "${conditionalGroupKey}"`);
    }

    let conditionalEntryKey = 'other';

    const keys = Object.keys(conditionalGroup);
    const keysLength = keys.length;
    for (let i = 0; i < keysLength; i += 1) {
      const conditionTag = keys[i];
      const conditionFn = this._c[conditionTag];

      if (
        conditionTag !== 'other' &&
        conditionFn &&
        conditionFn(value) === true
      ) {
        conditionalEntryKey = conditionTag;
        break;
      }
    }

    const dictionaryEntry = conditionalGroup[
      conditionalEntryKey
    ] as TSLisan.DictionaryEntry;

    return this.r(
      `${conditionalGroupKey}.${conditionalEntryKey}`,
      dictionaryEntry,
      placeholders,
    );
  }
}

export default Lisan;
