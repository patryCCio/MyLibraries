import { AnimationLinear } from "./AnimationElement/AnimationLinear.js";
import { AnimationData } from "./AnimationData.js";

export class AnimationExceptions{
    constructor(isGood){
        this._isGood = isGood;
    }

    setIsGood(isGood){
        this._isGood = isGood;
    }

    getIsGood(){
        return this._isGood;
    }

    setAndPrintMessage(message){
        alert(message);
        this.setIsGood(false);
        return null;
    }

    checkTime = (time) => {
        if(typeof time != 'number') this.setAndPrintMessage('Variable "time" only takes a one number!');
        if(time < 100)this.setAndPrintMessage('Minimum for time is 100!');
    }

    checkFrequency = (time, frequency) => {
        if(typeof frequency != 'number') this.setAndPrintMessage('Variable "frequency" only takes a one number!');
        if(frequency < 10) this.setAndPrintMessage('Minimum for frequency is 10!');
        if(frequency > time/2) this.setAndPrintMessage('Frequency must be less than half the time!');
    }

    checkValueAttribute(attribute){
        if(attribute != 'opacity' && attribute != 'transform' && attribute != 'width' && attribute != 'height' && attribute != 'margin' && attribute != 'font-size' && attribute != 'left' && attribute != 'right' && attribute != 'top' && attribute != 'bottom') this.setAndPrintMessage('Wrong attribute!');
    }
    
    checkCorrectUnitValue(element, index, unitValue){
        if(element === 'font-size'){
            if(typeof unitValue === 'string' || unitValue === null){
                if(unitValue != 'px' && unitValue != 'em' && unitValue != 'ex' && unitValue[index] != 'ch' && unitValue[index] != 'rem') this.setAndPrintMessage('Wrong unitValue for font-size!');
            }else{
                if(unitValue != 'px' && unitValue != 'em' && unitValue != 'ex' && unitValue != 'ch' && unitValue != 'rem') this.setAndPrintMessage('Wrong unitValue for font-size!');
            }
            
        }else if(element === 'opacity' ){
            if(typeof unitValue === 'string' || unitValue === null){
                if(unitValue != null) this.setAndPrintMessage('Wrong unitValue for opacity!');
            }else{
                if(unitValue[index] != null) this.setAndPrintMessage('Wrong unitValue for opacity!');
            }
            
        }else{
            if(typeof unitValue === 'string' || unitValue === null){
                if(unitValue != 'px' && unitValue != 'vh' && unitValue != 'vw' && unitValue != '%' && unitValue != 'cm' && unitValue != 'mm')this.setAndPrintMessage('Wrong unit value for ' + element + '!');
            }else{
                if(unitValue[index] != 'px' && unitValue[index] != 'vh' && unitValue[index] != 'vw' && unitValue[index] != '%' && unitValue[index] != 'cm' && unitValue[index] != 'mm')this.setAndPrintMessage('Wrong unit value for ' + element + '!');
            }
        }
    }

    checkAttribute = (attribute, unitValue) => {
        if(typeof attribute === 'string' && unitValue ==='string' || unitValue === null){
            this.checkValueAttribute(attribute);
            this.checkCorrectUnitValue(attribute, null, unitValue);
        }else if(typeof attribute === 'object' && typeof unitValue === 'object'){
            let z = 0;
            if(attribute.length === unitValue.length){
                attribute.forEach((element, index) => {
                    this.checkValueAttribute(element);
                    this.checkCorrectUnitValue(element, index, unitValue);
                    if(index > 0){
                        for(z = index - 1; z >= 0; z--){
                            if(element === attribute[z])this.setAndPrintMessage('Values ​​cannot be repeated!');
                        }
                    }
                })

            }else this.setAndPrintMessage('Wrong size of array for attributes or unitValues!');

        }

    }

    checkExceptions = (type, time, frequency, elements, attribute, value, hoverEffect, unitValue) => {
        this.checkTime(time);
        this.checkFrequency(time, frequency);
        this.checkAttribute(attribute, unitValue);
        
        if(typeof value != 'number')this.setAndPrintMessage('Only type number for value!');

        if(this.getIsGood() === true){
            this.choiceAnimation(type, time, frequency, elements, attribute, value, null, null, hoverEffect, unitValue);
        }else return null;
    }

    checkFromTo(from, to){
        if(typeof from === 'object'){
            from.forEach(element => {
                if(typeof element != 'number')this.setAndPrintMessage('Wrong type for "from"!')
            })
            to.forEach(element => {
                if(typeof element != 'number')this.setAndPrintMessage('Wrong type for "to"!');
            })
        }else{
            if(typeof from != 'number' || typeof to != 'number')this.setAndPrintMessage('Wrong type for "from" or "to"!');
        }


    }

    checkLengthFromTo(from, to, attribute){
        if(from.length != attribute.length || to.length != attribute.length)this.setAndPrintMessage('Wrong size for "from" or "to"!');
    }


    checkFromToExceptions = (type, time, frequency, elements, attribute, from, to, hoverEffect, unitValue) => {
        this.checkTime(time);
        this.checkFrequency(time, frequency);
        this.checkAttribute(attribute, unitValue);
        this.checkFromTo(from, to);

        if(typeof attribute === 'object')this.checkLengthFromTo(from, to, attribute);

        if((typeof from === 'object' || typeof to === 'object') && typeof attribute != 'object')this.setAndPrintMessage('Wrong size for attribute!');

        if(this.getIsGood() === true){
            const animationData = new AnimationData(time, frequency, elements, attribute, from, to, null, hoverEffect, unitValue);
            
            this.choiceAnimation(type, time, frequency, elements, attribute, null, from, to, hoverEffect, unitValue);
        }else return null;
    
    }

    checkScrollExceptions = (time, frequency, elements, addClass, nameAdded, elementsActive, elementsAddActive) => {
        // if(!this.correctTime(time))this.setAndPrintMessage('Wrong value of time!');

        // if(!this.correctFrequency(time, frequency))this.setAndPrintMessage('Wrong value of frequency!');

        // if(!this.correctAddClass(nameAdded, addClass))this.setAndPrintMessage('Only string for class!');

        // if(elements[0] == undefined)this.setAndPrintMessage('Elements not found!');

        // if(addClass != null){
        //     if(nameAdded === '')this.setAndPrintMessage('Name must have minimum 1 letter!');
        // }

        // if(!this.checkElementsActive(elementsActive, elementsAddActive))this.setAndPrintMessage('Set true for elementsActive and add elements to ElementsAddActive!');


        // if(this.getIsGood() === true)return true; 
        // else return false;
    }

    checkNavbarExceptions = (elements, navbarActive, navbar, liActive = false, liElements, scrollValue, burgerActive = false, burger = null) =>{

    }

    choiceAnimation = function(type, time, frequency, elements, attribute, value, from, to, hoverEffect, unitValue){
        const animation = new AnimationLinear(type, time, frequency, elements, attribute, value, from, to, hoverEffect, unitValue);
        animation.doAnimate();
    }

    checkElementsActive(elementsActive, elementsAddActive){
        if(elementsActive && elementsAddActive[0] != undefined)return true;
        else if(!elementsActive)return true;
        else return false;
    }

    // checkNavbarActive(elementsActive, navbarActive, navbarAddActive){
    //     if(navbarActive){
    //         if(elementsActive){
    //             if(navbarAddActive != undefined) return true;
    //             else return false;
    //         }else return false;
    //     }else if(!navbarActive)return true;
    //     else return true;
    // }



    //Common
    checkCommonExceptions = (time, frequency, attribute, unitValue, elements) => {

        const isCorrectAttribute = this.correctAttribute(attribute);
        const isCorrectTime = this.correctTime(time)
        const isCorrectFrequency = this.correctFrequency(time, frequency);
        const isCorrectDuo = this.correctDuo(attribute, unitValue);
        if(elements[0] == undefined)this.setAndPrintMessage('Elements not found!');    
        if(!isCorrectAttribute)this.setAndPrintMessage('Wrong attribute!');
        if(!isCorrectDuo)this.setAndPrintMessage('Wrong unit for ' +attribute+'!');

    }


    correctAttribute = function(attribute){
        if(attribute != 'opacity' && attribute != 'transform' && attribute != 'width' && attribute != 'height' && attribute != 'margin' && attribute != 'font-size' && attribute != 'left' && attribute != 'right' && attribute != 'top' && attribute != 'bottom')return false;
        else return true;
    }

    correctFrequency = function(time, frequency){
        if(typeof frequency == 'number' && time >= frequency)return true;
        else return false;
    }

    correctDuo = function(attribute, unitValue){
        if(attribute === 'font-size'){
            if(unitValue != 'px' && unitValue != 'em' && unitValue != 'ex' && unitValue != 'ch' && unitValue != 'rem') return false;
        }else if(attribute === 'opacity'){
            if(unitValue != null) return false;
        }
        return true;
    }

    correctAddClass(nameAdded, addClass){
        let result = true;
        if(addClass == null)return !result;

        if(addClass && typeof nameAdded === 'string')return result;
        else if(!addClass && nameAdded === null)return result;
        else return !result;
    }
    
}