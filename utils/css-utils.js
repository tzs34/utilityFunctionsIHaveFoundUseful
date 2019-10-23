import classNames from 'classnames'

const getClasses = (className, initialClasses, additionalClassObj) => {

        let classString = ''

        // Initialize the classString with the classNames that were passed in
        if (className) {

            classString += ' ' + className

        }

        // Add in initial classes
        if (typeof initialClasses === 'object') {

            classString += ' ' + classNames(initialClasses)

        } else {

            classString += ' ' + initialClasses

        }

        // Add in additional classes
        if (additionalClassObj) {

            classString += ' ' + classNames(additionalClassObj)

        }

        // Convert the class string into an object and run it through the class set
        return classNames(getClassSet(classString))

    }

function getClassSet (classString) {

    let classObj = {}

    if (classString) {

        classString.split(' ').forEach(function (className) {

            if (className) {

                classObj[className] = true

            }

        })

    }

    return classObj

}

export {getClasses}
