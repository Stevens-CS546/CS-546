(function () {
    let calculatorMethods = {
        add: function (num1, num2) {
            if (typeof num1 !== "number") throw "Must provide a number";
            if (isNaN(num1)) throw "Must provide a number";
            if (typeof num2 !== "number") throw "Must provide a number";
            if (isNaN(num2)) throw "Must provide a number";

            return num1 + num2;
        },
        subtract: function (num1, num2) {
            if (typeof num1 !== "number") throw "Must provide a number";
            if (isNaN(num1)) throw "Must provide a number";
            if (typeof num2 !== "number") throw "Must provide a number";
            if (isNaN(num2)) throw "Must provide a number";

            return num1 - num2;
        },
        multiply: function (num1, num2) {
            if (typeof num1 !== "number") throw "Must provide a number";
            if (isNaN(num1)) throw "Must provide a number";
            if (typeof num2 !== "number") throw "Must provide a number";
            if (isNaN(num2)) throw "Must provide a number";

            return num1 * num2;
        },
        divide: function (num1, num2) {
            if (typeof num1 !== "number") throw "Must provide a number";
            if (isNaN(num1)) throw "Must provide a number";
            if (typeof num2 !== "number") throw "Must provide a number";
            if (isNaN(num2)) throw "Must provide a number";
            if (num2 <= 0) throw "Cannot divide by 0!";

            return num1 / num2;
        }
    };

    function operationStringToFunction(operation) {
        if (!operation) throw "No operation provided";
        var returnFunction = calculatorMethods[operation];

        if (returnFunction === undefined) throw "No such operation";

        return returnFunction;
    }
    
    var staticForm = document.getElementById("static-form");

    if (staticForm) {
        // We can store references to our elements; it's better to 
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
        var firstNumberElement = document.getElementById("number1");
        var secondNumberElement = document.getElementById("number2");
        var operationElement = document.getElementById("operation");

        var errorContainer = document.getElementById("error-container");
        var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        var resultContainer = document.getElementById("result-container");
        var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        staticForm.addEventListener("submit", function (event) {
            event.preventDefault();

            try {
                // hide containers by default
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");

                // Values come from inputs as strings, no matter what :(
                var firstNumberValue = firstNumberElement.value;
                var secondNumberValue = secondNumberElement.value;
                var operationValue = operationElement.value;

                var parsedFirstNumberValue = parseInt(firstNumberValue);
                var parsedSecondNumberValue = parseInt(secondNumberValue);
                var operation = operationStringToFunction(operationValue);

                var result = operation(parsedFirstNumberValue, parsedSecondNumberValue);
                resultTextElement.textContent = "The result is " + result;
                resultContainer.classList.remove("hidden");
            } catch (e) {
                var message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
})();