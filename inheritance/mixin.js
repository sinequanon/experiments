/**
 * Experimentation with functional mixins
 */

global.window = global;

function House () {};
House.prototype.getSigil = function () {
 return this.sigil;
};

asHouseLannister = (function () {
    function bribe () {
        console.log('A ' + this.sigil + ' bribing...');
    };

    return function () {
        this.sigil = 'Lion';
        this.bribe = bribe;
    };
})();


asHouseStark = (function () {
    function getBeheaded () {
        console.log('A ' + this.sigil + ' getting beheaded...');
    }

    return function () {
        this.sigil = 'Direwolf';
        this.getBeheaded = getBeheaded;
    };
})();

function lannistark () {};
asHouseLannister.call(lannistark.prototype);

var lannistark = new lannistark();
lannistark.bribe()

asHouseStark.call(lannistark);
lannistark.getBeheaded();
