export const CONFIG = {
  tries: 6, // This changes how many tries you get to finish the game
  author: "Erik Nystø Rahka", // Put your name here so people know who made this game!
  authorWebsite: "https://github.com/Weol", // Put a link to your website or social media here
  wordListSource: "Giellatekno", // Describe the source material for your words here
  wordListSourceLink: "https://gtweb.uit.no/webdict/", // Put a link to the source material for your words here
  shuffle: true,
  normalization: "NFC", // whether to apply Unicode normalization to words and orthography - options: 'NFC', 'NFD', 'NKFC', 'NKFD', false
  startDate: "January 1, 2022 00:00:00", // what date and time to start your game from
  defaultLang: "se", // the default interface language
  escapeSpecialCharacters: true, // whether to escape all characters in the orthography.
};
