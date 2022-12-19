export default class Validator {

    static xIsValid(x) {
        if (x === null || isNaN(x) || x === undefined) return {error: "X is undefined!", success: false}
        try {
            x = Number(x)
        } catch (error) {
            return {error: "Can not parse X, it must be a number!", success: false}
        }
        if (x > 3 || x < -5) return {error: "X must be in interval [-5, 3]!", success: false}
        return {error: '', success: true}
    }

    static yIsValid(y) {
        if (y === null || isNaN(y) || y === undefined) return {error: "Y is undefined!", success: false}
        try {
            y = parseFloat(y)
        } catch (error) {
            return {error: "Can not parse Y, it must be a number!", success: false}
        }
        if (y > 5 || y < -5) return {error: "Y must be in interval [-5, 5]!", success: false}
        return {error: '', success: true}
    }

    static rIsValid(r) {
        if (r === null || isNaN(r) || r === undefined) return {error: "R is undefined!", success: false}
        try {
            r = Number(r)
        } catch (error) {
            return {error: "Can not parse R, it must be a number!", success: false}
        }
        if (r > 3 || r <= 0) return  {error: "R must be in interval (0, 3]!", success: false}
        return {error: '', success: true}
    }

    static variablesIsValid(x, y, r) {
        let validationInfo = {
            error: '',
            success: true
        }
        if (!Validator.xIsValid(x).success || !Validator.yIsValid(y).success || !Validator.rIsValid(r).success) {
            validationInfo = {
                success: false,
                error: Validator.xIsValid(x).error + Validator.yIsValid(y).error + Validator.rIsValid(r).error
            }
        }

        return validationInfo;
    }
}



