const bindClassMethodsToClassScope = (classScope, methodsArray) =>{
    if (methodsArray) {

        methodsArray.forEach((func) => {

            classScope[func.name] = classScope[func.name].bind(classScope)

        })

    }

}

export {bindClassMethodsToClassScope}