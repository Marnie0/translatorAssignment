const form = document.querySelector(".form");
const formSelects = document.querySelectorAll(
  ".form-select",
);
const sourceText = document.querySelector(
  ".toTranslate",
);
const translatedText = document.querySelector(
  ".translated",
);
const fromLanguageSelect = document.querySelector(
  ".fromLanguage",
);
const toLanguageSelect = document.querySelector(
  ".toLanguage",
);
const translateButton = document.querySelector(
  ".translateBtn",
);
const swapButton = document.querySelector(
  ".swapBtn",
);

const languages = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",
};

formSelects.forEach((select) => {
  for (const [code, name] of Object.entries(languages)) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    select.appendChild(option);
  }
});


function translate(fromLanguage, toLanguage) {
  translatedText.value = "Translating...";
  translateButton.disabled = true;

  const text = sourceText.value.trim();
  fetch(
    `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLanguage}|${toLanguage}`,
  )
    .then((response) => response.json())
    .then((data) => {
      translatedText.value = data.responseData.translatedText;
    }).catch((error) => {
      translatedText.value = "Error translating text. Please try again.";
      console.log("Error translating text:", error);
    }).finally(() => {
      translateButton.disabled = false;
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if(fromLanguageSelect.value && toLanguageSelect.value && sourceText.value.trim() !== "") {
    const fromLanguage = fromLanguageSelect.value.slice(0, 2);
    const toLanguage = toLanguageSelect.value.slice(0, 2);
    translate(fromLanguage, toLanguage);
  }
});

swapButton.addEventListener("click", () => {
  [fromLanguageSelect.value, toLanguageSelect.value] = [toLanguageSelect.value, fromLanguageSelect.value];
})