module.exports = {
    description: "This is a calculator for CS-546",    
    divideTwoNumbers: function (numerator, denominator) {
        if (numerator === undefined || typeof numerator !== "number") {
            throw "numerator is not a number";
        }

        if (denominator === undefined || typeof denominator !== "number") {
            throw "denominator is not a number";
        }

        if (denominator === 0) {
            throw "denominator cannot be 0";
        }

        return numerator / denominator;
    },
    addTwoNumbers: (num1, num2) => {
        if (num1 === undefined || typeof num1 !== "number") {
            throw "num1 is not a number";
        }

        if (num2 === undefined || typeof num2 !== "number") {
            throw "num2 is not a number";
        }

        return num1 + num2;
    },
    multiplyTwoNumbers: function (num1, num2) {
        if (num1 === undefined || typeof num1 !== "number") {
            throw "num1 is not a number";
        }

        if (num2 === undefined || typeof num2 !== "number") {
            throw "num2 is not a number";
        }

        return num1 * num2;
    },
    subtractTwoNumbers: (num1, num2) => {
        if (num1 === undefined || typeof num1 !== "number") {
            throw "num1 is not a number";
        }

        if (num2 === undefined || typeof num2 !== "number") {
            throw "num2 is not a number";
        }

        return num1 - num2;
    }
};

