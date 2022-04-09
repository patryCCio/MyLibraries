//github.com/patryCCio

export class AnimationScroll {
    constructor(isDeclared = false, isDeclarednavbarElement = false) {
        this.isDeclared = isDeclared;
        this.isDeclarednavbarElement = isDeclarednavbarElement;
    }

    static scroll(type, timeForAnimation, frequencyForAnimation, elementsToScroll, addClassToSectionScroll, setNameForClassSectionScroll, isLiActive, liElements, isNavbarActive, navbarElement, scrollValue, isBurgerActive, burgerElement) {
        if (!this.isDeclared) {
            this.isDeclared = true;
            let isMobile;
            let sizeSection = [];
            let activeAnimation = false;
            let part = timeForAnimation / frequencyForAnimation;
            let changeForElement;

            if(isBurgerActive){
                const spanWrapper = document.createElement('div');
                spanWrapper.classList='burger-span-wrapper';
                for(let x=0; x<3; x++){
                    const spanEl = document.createElement('span');
                    spanEl.dataset.burgerspanps = x;
                    spanWrapper.appendChild(spanEl);
                }
                burgerElement.appendChild(spanWrapper);
            }

            function deletePreload(){
                this.document.body.classList.remove('preload');
            }
            function addPreload(){
                this.document.body.classList.add('preload');
                setTimeout(deletePreload, 300);
                
            }
            window.addEventListener('load', addPreload);

            init();


            function checkMobile() {
                if (window.innerWidth > 1024) isMobile = false;
                else isMobile = true;
            }

            function checkLi() {
                let y = 0;
                for (let x = 0; x < sizeSection.length; x++) {
                    if (window.scrollY >= sizeSection[x]) {
                        y++;
                    }
                }
                    liElements.forEach((element, index) => {
                    if (index === y - 1) {
                        element.classList.add('active');
                    } else {
                        element.classList.remove('active');
                    }
                })
            }

            function addActiveToNavbar() {
                
                if(!isMobile){
                    if (window.scrollY >= scrollValue) navbarElement.classList.add('active'); 
                    else navbarElement.classList.remove('active');
                }
                else if(isMobile && !navbarElement.classList.contains('burger-nav'))navbarElement.classList.remove('active');
                
            }

            function init() {
                if (!activeAnimation) {
                    checkMobile();
                    checkSection();
                    if (isLiActive) {
                        checkLi();
                    }
                }
                if(isMobile && isBurgerActive)addBurger();
                else if(!isMobile && isBurgerActive)removeBurger();

                addActiveToNavbar();
            }

            function checkSection() {
                sizeSection = [];
                elementsToScroll.forEach(element => {
                    sizeSection.push(element.offsetTop);
                })
            }



            if (liElements != null) {
                liElements.forEach((element, index) => {
                    element.addEventListener('click', function () {

                        const text = element.dataset.hrefps;
                        let from = window.scrollY;
                        let to = sizeSection[index];

                        if (from === to) return null;

                        if (activeAnimation) return console.log('animacja w toku!');

                        if (isMobile){
                            burgerElement.classList.remove('active');
                            navbarElement.classList.remove('active');
                        }

                        if (isLiActive) {
                            liElements.forEach((elementLi, indexLi) => {
                                if (indexLi == index) elementLi.classList.add('active');
                                else elementLi.classList.remove('active');
                            })
                        }

                        if (type === 'linear') {
                            scrollLinear(from, to);
                        } else if (type === 'ease') {
                            scrollEase(from, to);
                        }
                    });
                })
            }


            function scrollLinear(from, to) {
                activeAnimation = true;
                changeForElement = checkFromTo(from, to);
                let x = 0;
                const timeForAnimationout = setInterval(() => {
                    x++;
                    if (x >= part) {
                        scrollTo(0, to);
                        activeAnimation = false;
                        clearInterval(timeForAnimationout);
                        return null;
                    }
                    from += changeForElement;
                    scrollTo(0, from);
                }, frequencyForAnimation);

            }

            function scrollEase(from, to) {
                activeAnimation = true;

                changeForElement = checkFromTo(from, to);
                let x = 0;
                let percent;
                const timeForAnimationout = setInterval(() => {
                    x++;
                    if (x === part) {
                        activeAnimation = false;
                        clearInterval(timeForAnimationout);
                        scrollTo(0, to);
                        return null;
                    }
                    percent = (x / part) * 100;

                    if (percent < 10) {
                        from += changeForElement * 2;
                    } else if (percent >= 10 && percent < 30) {
                        from += changeForElement * 3;
                    } else if (percent >= 30 && percent < 50) {
                        from += changeForElement * 4;
                    } else if (percent >= 50 && percent < 90) {
                        from += changeForElement * 2;
                    } else {
                        from += changeForElement / 1.2;
                    }
                    changeForElement = checkHow(from, to, x);
                    scrollTo(0, from);
                }, frequencyForAnimation);
            }

            function checkFromTo(from, to) {
                if (from < to) {
                    changeForElement = (to - from) / part;
                }
                else {
                    changeForElement = (from - to) / part;
                    changeForElement -= 2 * changeForElement;
                }
                return changeForElement;
            }

            function checkHow(from, to, x) {
                if (from < to) {
                    changeForElement = (to - from) / (part - x);
                } else {
                    changeForElement = (from - to) / (part - x);
                    changeForElement -= 2 * changeForElement;
                }
                return changeForElement;
            }

            function addBurger(){
                navbarElement.classList.add('burger-nav');
                if(!burgerElement.classList.contains('active'))navbarElement.classList.remove('active');
            }

            function removeBurger(){
                navbarElement.classList.remove('active');
                navbarElement.classList.remove('burger-nav');
                burgerElement.classList.remove('active');
            }

            if(isBurgerActive) burgerElement.addEventListener('click', function () {
                burgerElement.classList.toggle('active');
                navbarElement.classList.toggle('active');
            });

            window.addEventListener('resize', init);
            window.addEventListener('scroll', init);
        } else {
            alert('Function with scroll were declared!');
        }
    }

}