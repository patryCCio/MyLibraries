import { AnimationExceptions } from "./AnimationExceptions.js";
import { AnimationScroll } from "./AnimationScroll/AnimationScroll.js";

//github.com/patryCCio

export class Animation {



 
    // Value
    value = (type, time, frequency, elements, attribute, value, hoverEffect = false, unitValue) => {
        const animateExceptions = new AnimationExceptions(true);
    
        if(type === 'linear'){
            animateExceptions.checkExceptions('linear', time, frequency, elements, attribute, value, hoverEffect, unitValue);
        }else if(type === 'ease'){
            animateExceptions.checkExceptions('ease', time, frequency, elements, attribute, value, hoverEffect, unitValue);
        }else if(type === 'own'){
            // animateExceptions.checkExceptions('own', time, frequency, elements, attribute, value, hoverEffect, unitValue);
        }
        
    }

    // FROM-TO
    fromTo = (type, time, frequency, elements, attribute, from, to, hoverEffect = false, unitValue = null) => {
        const animateExceptions = new AnimationExceptions(true);
        if(type === 'linear'){
            animateExceptions.checkFromToExceptions('linearFromTo', time, frequency, elements, attribute, from, to, hoverEffect, unitValue);
        }else if(type === 'ease'){
            animateExceptions.checkFromToExceptions('easeFromTo', time, frequency, elements, attribute, from, to, hoverEffect, unitValue);
        }else if(type === 'own'){
            // animateExceptions.checkFromToExceptions('linearFromTo', time, frequency, elements, attribute, from, to, hoverEffect, unitValue);
        }
        
    }

    //SCROLL
    static scroll = (type, timeForAnimation, frequencyForAnimation, addActiveToSection = false, isLiActive = false, isNavbarActive = false, scrollValue = 100, isBurgerActive = false) => {
        const liElements = document.querySelectorAll('[data-hrefps]');
        const navbarElement = document.querySelector('[data-navbarps]');
        const burgerElement = document.querySelector('[data-burgerps]');
        const elementsToScroll = document.querySelectorAll('[data-hrefposps]');
        const animateExceptions = new AnimationExceptions(true);
        const isGood = animateExceptions.checkScrollExceptions(timeForAnimation, frequencyForAnimation, elementsToScroll, addActiveToSection, isLiActive, liElements, isNavbarActive, navbarElement, scrollValue, isBurgerActive, burgerElement);

        if(isGood){
            if(type === 'linear'){
                AnimationScroll.scroll(type, timeForAnimation, frequencyForAnimation, elementsToScroll, addActiveToSection, isLiActive, liElements, isNavbarActive, navbarElement, scrollValue, isBurgerActive, burgerElement);
            }else if(type === 'ease'){
                AnimationScroll.scroll(type, timeForAnimation, frequencyForAnimation, elementsToScroll, addActiveToSection, isLiActive, liElements, isNavbarActive, navbarElement, scrollValue, isBurgerActive, burgerElement);
            }
            
        }else return null;


    }

    

}