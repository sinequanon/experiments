/**
 * Experimentation with prototypal inheritance
 */
global.window = global;

/**
 * Modification of goog.inherits
 */
function inherits (child, parent) {
    var originalChildProto,
        key;
    function f () {}
    f.prototype = parent.prototype;
    // Expose a reference to the parent prototype so subclasses can reference
    child._super = parent.prototype;
    // Save original child prototype
    originalChildProto = child.prototype;
    child.prototype = Object.create(f.prototype);
    // Restore existing keys in original child prototype, since
    // child.prototype was overwritten in previous statement
    for (key in originalChildProto) {
        child.prototype[key] = originalChildProto[key];
    }
    // Fix constructor pointer
    child.constructor = child;
}

function House () {};

House.prototype.getSigil = function () {
    return this.sigil;
};

House.prototype.setSigil = function (value) {
    this.sigil = value;
};

function Lannister () {
    this.sigil = 'Lion';
    Lannister._super.constructor.call(this);
};

function Stark () {
    this.sigil = 'Direwolf';
    Stark._super.constructor.call(this);

};

inherits(Lannister, House);
inherits(Stark, House);

var lannister = new Lannister();
console.log(lannister instanceof House);
console.log(lannister.getSigil());

var stark = new Stark();
console.log(stark instanceof House);
console.log(stark.getSigil());
