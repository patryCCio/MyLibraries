//github.com/patryCCio

export class AnimationData{
    constructor(time, frequency, elements, attribute, from, to, value = null, hoverEffect = false, unitValue = null){
        this.time = time;
        this.frequency = frequency;
        this.elements = elements;
        this.attribute = attribute;
        this.from = from;
        this.to = to;
        this.value = value;
        this.hoverEffect = hoverEffect;
        this.unitValue = unitValue;


        this.getTime = function(){return this.time;}
        this.setTime = function(time){this.time = time;}

        this.getFrequency = function(){return this.frequency;}
        this.setFrequency = function(frequency){this.frequency = frequency;}

        this.getElements = function(){return this.elements;}
        this.setElements = function(elements){this.elements = elements;}

        this.getAttribute = function(){return this.attribute;}
        this.setAttribute = function(attribute){this.attribute = attribute;}

        this.getFrom = function(){return this.from;}
        this.setFrom = function(from){this.from = from;}

        this.getTo = function(){return this.to;}
        this.setTo = function(to){this.to = to;}

        this.getValue = function(){return this.value;}
        this.setValue = function(value){this.value = value;}

        this.getHoverEffect = function(){return this.hoverEffect;}
        this.setHoverEffect = function(){this.hoverEffect = hoverEffect;}
        
        this.getUnitValue = function(){return this.unitValue;}
        this.setUnitValue = function(unitValue){this.unitValue = unitValue;}
    }
}