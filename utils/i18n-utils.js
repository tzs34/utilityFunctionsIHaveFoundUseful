let getLanguageCode = () => {
    let nav = window.navigator
    let browserLanguagePropertyKeys = [
      'language',
      'browserLanguage',
      'systemLanguage',
      'userLanguage'
    ]
    let i = null
    let language = null
  
    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i]
        if (language && language.length) {
          return language
        }
      }
    }
  
    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]]
      if (language && language.length) {
        return language
      }
    }
  
    return null
  }
  
  const Locale = {
    languageCode: getLanguageCode(),
    dateOptions: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }
  
  export default Locale