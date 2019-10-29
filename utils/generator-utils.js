function* getUsernames(string) {
    let match = null;

    do {
        match = UserRegex.exec(string);
        if (match) {
            yield match;
        }
    } while (match);
}

/*
const string = "this is a test with @swizec and @smith, maybe @jones"

for (const username of getUsernames(string)) {
  console.log(username)
}

["@smith", "smith"]
["@jones", "jones"]
*/