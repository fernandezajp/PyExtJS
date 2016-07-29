// numpy javascript equivalent
// https://github.com/fernandezajp/PyExtJS

(function() {

window.numpy = function numpy() {
}
numpy.linspace = function numpy$linspace(start, stop, num) {
    if (num == null) {
        num = 50;
    }
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
numpy.logspace = function numpy$logspace(start, stop, num, endpoint, numericBase) {
    if (endpoint == null) {
        endpoint = true;
    }
    if (numericBase == null) {
        numericBase = 10;
    }
    var y = numpy.linspace(start, stop, num);
    return numpy.power(numericBase, y);
}
numpy.power = function numpy$power(bases, exponents) {
    var basesType = Type.getInstanceType(bases).get_name();
    var exponentsType = Type.getInstanceType(exponents).get_name();
    if (basesType === 'Array' && exponentsType === 'Array') {
        var basesArray = bases;
        var ret = new Array(basesArray.length);
        var baseArray = exponents;
        for (var i = 0; i < basesArray.length; i++) {
            ret[i] = Math.pow(basesArray[i], baseArray[i]);
        }
        return ret;
    }
    if (basesType === 'Array' && exponentsType === 'Number') {
        var basesArray = bases;
        var ret = new Array(basesArray.length);
        var bbase = exponents;
        for (var i = 0; i < basesArray.length; i++) {
            ret[i] = Math.pow(basesArray[i], bbase);
        }
        return ret;
    }
    if (basesType === 'Number' && exponentsType === 'Number') {
        var bbase = bases;
        var exponent = exponents;
        return Math.pow(bbase, exponent);
    }
    if (basesType === 'Number' && exponentsType === 'Array') {
        var bbase = bases;
        var exponentsArray = exponents;
        var ret = new Array(exponentsArray.length);
        for (var i = 0; i < exponentsArray.length; i++) {
            ret[i] = Math.pow(bbase, exponentsArray[i]);
        }
        return ret;
    }
    return 0;
}
numpy.exp = function numpy$exp(x) {
    var type = Type.getInstanceType(x).get_name();
    switch (type) {
        case 'Array':
            var inputarray = x;
            var response = new Array(inputarray.length);
            for (var i = 0; i < inputarray.length; i++) {
                response[i] = Math.exp(inputarray[i]);
            }
            return response;
        default:
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
numpy.zeros = function numpy$zeros(shape) {
    var type = Type.getInstanceType(shape).get_name();
    switch (type) {
        case 'Array':
            var shapeArray = shape;
            var shapeObjectArray = shape;
            var mult = 1;
            for (var i = 0; i < shapeArray.length; i++) {
                mult *= shapeArray[i];
            }
            var retArray = new Array(mult);
            for (var i = 0; i < mult; i++) {
                retArray[i] = 0;
            }
            return numpy._grouparray(numpy._inversearray(shapeObjectArray), retArray);
        default:
            var input = shape;
            var ret = new Array(input);
            for (var i = 0; i < input; i++) {
                ret[i] = 0;
            }
            return ret;
    }
}
numpy.ones = function numpy$ones(shape) {
    var type = Type.getInstanceType(shape).get_name();
    switch (type) {
        case 'Array':
            var shapeArray = shape;
            var shapeObjectArray = shape;
            var mult = 1;
            for (var i = 0; i < shapeArray.length; i++) {
                mult *= shapeArray[i];
            }
            var retArray = new Array(mult);
            for (var i = 0; i < mult; i++) {
                retArray[i] = 1;
            }
            return numpy._grouparray(numpy._inversearray(shapeObjectArray), retArray);
        default:
            var input = shape;
            var ret = new Array(input);
            for (var i = 0; i < input; i++) {
                ret[i] = 1;
            }
            return ret;
    }
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
numpy.array = function numpy$array(a) {
    return a;
}
numpy.reshape = function numpy$reshape(a, shape) {
    if (shape == null) {
        shape = a;
        a = this;
    }
    var array = a;
    var objlist = [];
    numpy._plainarray(objlist, array);
    var plain = new Array(objlist.length);
    for (var i = 0; i < objlist.length; i++) {
        plain[i] = objlist[i];
    }
    var fixedshape = numpy._inversearray(shape);
    return numpy._grouparray(fixedshape, plain);
}
numpy.ravel = function numpy$ravel() {
    var array = this;
    var objlist = [];
    numpy._plainarray(objlist, array);
    var plain = new Array(objlist.length);
    for (var i = 0; i < objlist.length; i++) {
        plain[i] = objlist[i];
    }
    return plain;
}
numpy.gettype = function numpy$gettype(obj) {
    var paramType = Type.getInstanceType(obj).get_name();
    switch (paramType) {
        case 'Number':
            return paramType;
        case 'Array':
            var array = obj;
            var objlist = [];
            numpy._plainarray(objlist, array);
            return Type.getInstanceType(objlist[0]).get_name();
        default:
            return 'undefined';
    }
}
numpy._inversearray = function numpy$_inversearray(array) {
    var newarray = new Array(array.length);
    var j = array.length - 1;
    for (var i = 0; i < array.length; i++) {
        newarray[i] = array[j--];
    }
    return newarray;
}
numpy._plainarray = function numpy$_plainarray(list, a) {
    var $enum1 = ss.IEnumerator.getEnumerator(a);
    while ($enum1.moveNext()) {
        var item = $enum1.current;
        if (Type.getInstanceType(item).get_name() === 'Array') {
            numpy._plainarray(list, item);
        }
        else {
            list.add(item);
        }
    }
}
numpy._grouparray = function numpy$_grouparray(group, array) {
    if (group.length > 1) {
        var objlist = [];
        var size = group[0];
        for (var i = 0; i < array.length; ) {
            var tmp = new Array(size);
            for (var j = 0; j < size; j++) {
                tmp[j] = array[i++];
            }
            objlist.add(tmp);
        }
        var newgroupcount = new Array(group.length - 1);
        for (var i = 1; i < group.length; i++) {
            newgroupcount[i - 1] = group[i];
        }
        var newgroup = new Array(objlist.length);
        for (var i = 0; i < newgroup.length; i++) {
            newgroup[i] = objlist[i];
        }
        return numpy._grouparray(newgroupcount, newgroup);
    }
    else {
        var size = group[0];
        var newgroup = new Array(size);
        for (var i = 0; i < size; i++) {
            newgroup[i] = array[i];
        }
        return newgroup;
    }
}
numpy.getrandom = function numpy$getrandom(size) {
    if (size == null) {
        return Math.random();
    }
    var paramType = Type.getInstanceType(size).get_name();
    switch (paramType) {
        case 'Number':
            var singlesize = size;
            var retsinglearray = new Array(singlesize);
            for (var i = 0; i < singlesize; i++) {
                retsinglearray[i] = Math.random();
            }
            return retsinglearray;
            break;
        case 'Array':
            var sizeArray = size;
            var mult = 1;
            for (var i = 0; i < sizeArray.length; i++) {
                mult *= sizeArray[i];
            }
            var ret = new Array(mult);
            for (var i = 0; i < mult; i++) {
                ret[i] = Math.random();
            }
            return numpy._grouparray(sizeArray, ret);
            break;
    }
    return 0;
}

numpy.registerClass('numpy');
Object.defineProperty(Array.prototype, "size", {
  get: function () {
    __$$tmP = this.shape;

    var thesize=1;
    for(var i=0;i<__$$tmP.length;i++)
        thesize*=__$$tmP[i];
    return thesize;
  }
});
Object.defineProperty(Array.prototype, "shape", {
  get: function () {
    __$$tmP = this;
    var dim = [];
    for (;;) {
        dim.push(__$$tmP.length);

        if (Array.isArray(__$$tmP[0])) {
            __$$tmP = __$$tmP[0];
        } else {
            break;
        }
    }
    return dim;
  }
});
Object.defineProperty(Array.prototype, "strides", {
  get: function () {
    var shp = this.shape;
    var dim = [];
    for (var i=1;i<shp.length;i++) {
        var acum = 1;
        for(var j=i;j<shp.length;j++) {
            acum*=shp[j];
        }
        dim.push(acum);
    }
    dim.push(1);
    return dim;
  }
});
Object.defineProperty(Array.prototype, "ndim", {
  get: function () {
    __$$tmP = this;
    return __$$tmP.shape.length;
  }
});
Object.defineProperty(Array.prototype, "dtype", {
  get: function () {
    return numpy.gettype(this);
  }
});
Object.defineProperty(Array.prototype, "T", {
  get: function () {
    return this.transpose();
  }
});
Array.prototype.resize = function numpy$_resize(shape) {
    a = this;
    a = numpy.reshape(a,shape);
    this.clear();
    for(var i=0;i<a.length;i++)
        this.push(a[i]);
    return a;
};
Array.prototype.transpose = function numpy$_transpose() {
  var _data = this.ravel();
  var _dest = _data.clone();

  var recipient = new Array(this.size);
  var sh = this.shape.reverse();
  var dstStride = this.strides.reverse();

  generatelist(recipient,sh);
  transport(_data,_dest,recipient,dstStride);

  _dest=_dest.reshape(sh);
  return _dest;
};
function generatelist(recipient,sh)
{
    var start = new Array(sh.length);
    var size = sh.length;

    for(var i=0;i<sh.length;i++){
        start[i]=0;
    }

    for(var i=0;i<recipient.length;i++){
        recipient[i] = new Array(sh.length);
        for(var j=0;j<sh.length;j++)
            recipient[i][j] = start[j];

        increment(start,sh);
    }
};
function increment(start,sh){
    for(var i=sh.length-1;i>=0;i--){
        if (start[i]<sh[i]-1){
            start[i]++;
            return;
        }
        start[i]=0;
    }
};
function transport(data,dest,recipient,dstStride)
{
    for(var i=0;i<recipient.length;i++){
        var position;
        var positionArray = recipient[i];
        for(var j=0;j<dstStride.length;j++)
            positionArray[j] = recipient[i][j]*dstStride[j];
        var position = positionArray.reduce(function(a, b) { return a + b; }, 0);
        dest[i]=data[position];
    }
};
np = numpy;
numpy.range = numpy.arange;
Array.prototype.exp = numpy.exp;
Array.prototype.reshape = numpy.reshape;
Array.prototype.ravel = numpy.ravel;
Array.prototype.dtype = numpy.dtype;
Number.prototype.dtype = numpy.dtype;
numpy.random = numpy.getrandom;
numpy.random.random = numpy.getrandom;
})();
