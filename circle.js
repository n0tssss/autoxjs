const PI = Math.PI;

exports.area = function (r) {
    return PI * r * r;
};

exports.circumference = (r) => 2 * PI * r;
