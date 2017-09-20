import staticRegister from './../../utils/staticRegister';
import {extendNotExistingKeys} from './../utils';
import enLanguage from './en-US';
import plLanguage from './pl-PL';

const {
  register: registerGloballyLanguage,
  getItem: getGlobalLanguage,
  hasItem: hasGlobalLanguage
} = staticRegister('languages');

export const DEFAULT_LANGUAGE_CODE = 'en-US';

/**
 * Register locale dictionary for specific language code.
 *
 * @param {string} languageCode Language code for specific locale i.e. 'en-US', 'pt-BR', 'de-DE'.
 * @param {Object} dictionary Dictionary for specific language.
 */
export function registerLocaleDictionary(languageCode, dictionary) {
  if (!hasGlobalLanguage(languageCode)) {
    extendDictionaryByDefaultLangBase(languageCode, dictionary);
    registerGloballyLanguage(languageCode, dictionary);
  }
};

/**
 * Get dictionary for specific language code.
 *
 * @param {String} languageCode Language code
 * @returns {Object}
 */
export function getLocaleDictionary(languageCode) {
  if (!hasGlobalLanguage(languageCode)) {
    throw Error(`Locale with "${languageCode}" language code is not defined.`);
  }

  return getGlobalLanguage(languageCode);
}

/**
 * Extend handled dictionary by default language dictionary. As result, if any dictionary key isn't defined
 * for specific language, it will be filled with default language value.
 *
 * @private
 * @param {String} languageCode Language code
 * @param {Object} dictionary Dictionary which is extended.
 */
function extendDictionaryByDefaultLangBase(languageCode, dictionary) {
  if (languageCode !== DEFAULT_LANGUAGE_CODE) {
    extendNotExistingKeys(dictionary, getGlobalLanguage(DEFAULT_LANGUAGE_CODE));
  }
}

registerLocaleDictionary('en-US', enLanguage);
registerLocaleDictionary('pl-PL', plLanguage);