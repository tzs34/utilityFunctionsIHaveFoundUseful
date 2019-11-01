/*
Use proxies to make dat structure access easier 
Using an array
arr.findWhereNameEquals('Lily')
arr.findWhereSkillsIncludes('javascript')
arr.findWhereSkillsIsEmpty()
arr.findWhereAgeIsGreaterThan(40)

Other use cases 
query databases with an API
Or const id = await db.insertUserReturningId(userInfo)
// Runs an INSERT INTO user ... RETURNING id
*/


function camelCase(str){
    return str.split(' ').map(function(word,index){
        // If it is the first word make sure to lowercase all the chars.
        if(index == 0){
          return word.toLowerCase();
        }
        // If it is not the first word only upper case the first char and lowercase the rest.
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join('');
}

const prefix = 'findWhere'
const assertions = {
  Equals: (object, value) => object === value,
  IsNull: (object, value) => object === null,
  IsUndefined: (object, value) => object === undefined,
  IsEmpty: (object, value) => object.length === 0,
  Includes: (object, value) => object.includes(value),
  IsLowerThan: (object, value) => object === value,
  IsGreaterThan: (object, value) => object === value
}
const assertionNames = Object.keys(assertions)

const wrap = arr => {
    return new Proxy(arr, {
      get(target, propKey) {
        if (propKey in target) return target[propKey]
        const assertionName = assertionNames.find(assertion =>
          propKey.endsWith(assertion))
        if (propKey.startsWith(prefix)) {
          const field = camelcase(
            propKey.substring(prefix.length,
              propKey.length - assertionName.length)
          )
          const assertion = assertions[assertionName]
          return value => {
            return target.find(item => assertion(item[field], value))
          }
        }
      }
    })
  }
  const arr = wrap([
    { name: 'John', age: 23, skills: ['mongodb'] },
    { name: 'Lily', age: 21, skills: ['redis'] },
    { name: 'Iris', age: 43, skills: ['python', 'javascript'] }
  ])
  console.log(arr.findWhereNameEquals('Lily')) // finds Lily
  console.log(arr.findWhereSkillsIncludes('javascript')) // finds Iris