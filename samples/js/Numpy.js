// numpy javascript equivalent
// https://github.com/fernandezajp/PyExtJS

(function() {

window.numpy = function numpy() {
}
numpy.linspace = function numpy$linspace(start, stop, num) {
    var tmp = [];
    var step = (stop - start) / (num - 1);
    var i = start;
    for (var c = 0; c < num - 1; c++) {
        tmp.add(i);
        i = i + step;
    }
    tmp.add(stop);
    var array = new Array(tmp.length);
    for (var c = 0; c < tmp.length; c++) {
        array[c] = tmp[c];
    }
    return array;
}
numpy.exp = function numpy$exp(x) {
    var type = Type.getInstanceType(x).get_name();
    if (type === 'Array') {
        var inputarray = x;
        var response = new Array(inputarray.length);
        for (var i = 0; i < inputarray.length; i++) {
            response[i] = Math.exp(inputarray[i]);
        }
        return response;
    }
    else {
        var input = x;
        return Math.exp(input);
    }
}
numpy.arange = function numpy$arange(start, stop, step) {
    var tmp = [];
    if (stop == null && step == null) {
        for (var i = 0; i < start; i++) {
            tmp.add(i);
        }
        var opt1 = new Array(tmp.length);
        for (var i = 0; i < tmp.length; i++) {
            opt1[i] = tmp[i];
        }
        return opt1;
    }
    if (step == null) {
        for (var i = start; i < stop; i++) {
            tmp.add(i);
        }
        var opt2 = new Array(tmp.length);
        for (var i = 0; i < tmp.length; i++) {
            opt2[i] = tmp[i];
        }
        return opt2;
    }
    for (var i = start; i < stop; i = i + step) {
        tmp.add(i);
    }
    var opt3 = new Array(tmp.length);
    for (var i = 0; i < tmp.length; i++) {
        opt3[i] = tmp[i];
    }
    return opt3;
}
numpy.zeros = function numpy$zeros(cols, rows) {
    if (rows == null) {
        var tmp = [];
        var array = new Array(cols);
        for (var i = 0; i < cols; i++) {
            array[i] = 0;
        }
        return array;
    }
    var matrix = new Array(cols);
    for (var i = 0; i < cols; i++) {
        matrix[i] = new Array(rows);
        for (var j = 0; j < rows; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}
numpy.polyfit = function numpy$polyfit(x, y, deg) {
    var data = new Array(x.length);
    for (var i = 0; i < x.length; i++) {
        data[i] = new PolyRegression.Pair(x[i], y[i]);
    }
    var polysolve = new PolyRegression.Matrix();
    var coefs = polysolve.computeCoefficients(data, deg);
    var left = 0;
    var right = coefs.length - 1;
    while (left < right) {
        var temp = coefs[left];
        coefs[left] = coefs[right];
        coefs[right] = temp;
        left++;
        right--;
    }
    return coefs;
}


numpy.registerClass('numpy');
})();
