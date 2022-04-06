export class AnimationLinear {
    constructor(type, time, frequency, elements, attribute, value, from, to, hoverEffect, unitValue) {
        this.isActiveAnimation = false;
        this.type = type;
        this.time = time;
        this.frequency = frequency;
        this.elements = elements;
        this.attribute = attribute;
        this.value = value;
        this.from = from;
        this.to = to;
        this.hoverEffect = hoverEffect;
        this.unitValue = unitValue;
        this.part;
        this.x;
        this.changeForElement;
        this.helperForElement;
        this.percent;
        this.animation;
    }

    doAnimate = () => {
        if (this.type === 'linear' || this.type === 'ease' || this.type === 'own') {
            this.animationValue();
        }
        else {
            this.animationFromTo();
        }
    }

    checkHow = () => {
        if (this.helperForElement < this.to) {
            this.changeForElement = (this.to - this.helperForElement) / (this.part - this.x);
        } else {
            this.changeForElement = (this.helperForElement - this.to) / (this.part - this.x);
            this.changeForElement -= 2 * this.changeForElement;
        }
    }

    animate = () => {
        if (this.x == this.part) {
            this.helperForElement = this.to;
            this.checkUnitValue();
            clearInterval(this.animation);
            return null;
        }

        this.percent = (this.x / this.part) * 100;

        if (this.type === 'linear') {
            this.helperForElement += this.changeForElement;
        } else if (this.type === 'ease') {
            if (this.percent < 10) {
                this.helperForElement += this.changeForElement * 2;
            } else if (this.percent >= 10 && this.percent < 30) {
                this.helperForElement += this.changeForElement * 3;
            } else if (this.percent >= 30 && this.percent < 50) {
                this.helperForElement += this.changeForElement * 4;
            } else if (this.percent >= 50 && this.percent < 80) {
                this.helperForElement += this.changeForElement * 2;
            } else {
                this.helperForElement += this.changeForElement / 1.2;
            }
            this.checkHow();
        }

        this.x++;
        this.checkUnitValue();
    }

    checkUnitValue = function () {
        const lengthArray = this.elements.length;

        if (lengthArray === undefined) {
            if (this.unitValue != null) {
                this.elements.setAttribute('style', `${this.attribute}: ${this.helperForElement.toFixed(4) + this.unitValue};`);
            } else {
                this.elements.setAttribute('style', `${this.attribute}: ${this.helperForElement.toFixed(4)};`);
            }

        } else {
            if (this.unitValue != null) {
                this.elements.forEach(element => {
                    element.setAttribute('style', `${this.attribute}: ${this.helperForElement.toFixed(4) + this.unitValue};`);
                })
            } else {
                this.elements.forEach(element => {
                    element.setAttribute('style', `${this.attribute}: ${this.helperForElement.toFixed(4)};`);
                })
            }
        }
    }

    checkFromTo() {
        if (this.from <= this.to) {
            this.changeForElement = (this.to - this.from) / this.part;
            this.checkUnitValue();
        }
        else {
            this.changeForElement = (this.from - this.to) / this.part;
            this.checkUnitValue();
        }
    }

    checkHowFrom(){
        this.changeForElement = (this.from - this.helperForElement) / this.x; 
        this.changeForElement -= 2 * this.changeForElement;
    }

    hoverAnimation = (action) => {
        this.isActiveAnimation = false;
        if (action === 'enter') {
            if (this.x === this.part) this.x = 0;
            this.animation = setInterval(() => {
                if (this.x >= this.part) {
                    this.helperForElement = this.to;
                    this.checkUnitValue();
                    this.isActiveAnimation = false;
                    clearInterval(this.animation);
                    return null;
                }

                this.percent = (this.x / this.part) * 100;

                if (this.type === 'linear') {
                    this.helperForElement += this.changeForElement;
                } else if (this.type === 'ease') {
                    if (this.percent < 10) {
                        this.helperForElement += this.changeForElement * 2;
                    } else if (this.percent >= 10 && this.percent < 30) {
                        this.helperForElement += this.changeForElement * 3;
                    } else if (this.percent >= 30 && this.percent < 50) {
                        this.helperForElement += this.changeForElement * 4;
                    } else if (this.percent >= 50 && this.percent < 80) {
                        this.helperForElement += this.changeForElement * 2;
                    } else {
                        this.helperForElement += this.changeForElement / 1.2;
                    }
                    this.checkHow();
                }

                this.x++;
                if (this.x > this.part) this.x = this.part;
                this.checkUnitValue();
            }, this.frequency)

        } else {
            this.animation = setInterval(() => {
                if (this.x <= 0) {
                    this.helperForElement = this.from;
                    this.checkUnitValue();
                    this.isActiveAnimation = false;
                    clearInterval(this.animation);
                    return null;
                }

                this.percent = (this.x / this.part) * 100;

                if (this.type === 'linear') {
                    this.helperForElement -= this.changeForElement;
                } else if (this.type === 'ease') {
                    if (this.percent < 10) {
                        this.helperForElement -= this.changeForElement / 1.2;
                    } else if (this.percent >= 10 && this.percent < 30) {
                        this.helperForElement -= this.changeForElement * 2;
                    } else if (this.percent >= 30 && this.percent < 50) {
                        this.helperForElement -= this.changeForElement * 4;
                    } else if (this.percent >= 50 && this.percent < 90) {
                        this.helperForElement -= this.changeForElement * 3;
                    } else {
                        this.helperForElement -= this.changeForElement * 2;
                    }
                    this.checkHowFrom();
                }
                console.log(this.x)

                this.x--;
                if (this.x < 0) this.x = 0;
                this.checkUnitValue();
            }, this.frequency)
        }


    }

    animationValue = () => {

        if (typeof this.attribute === 'object') {

        } else {
            let elementStyles = window.getComputedStyle(this.elements);
            let from = [...elementStyles.getPropertyValue(this.attribute)];
            let helper = '';
            let notNumber = false;
            let z = 0;
            while (!notNumber && z != from.length) {
                if (from[z] != '0' && from[z] != '1' && from[z] != '2' && from[z] != '3' && from[z] != '4' && from[z] != '5' && from[z] != '6' && from[z] != '7' && from[z] != '8' && from[z] != '9') {
                    notNumber = true;
                } else {
                    helper += from[z];
                }
                z++;
            }

            helper = Number(helper);

            this.from = helper;
            this.to = helper + this.value;
        }

        this.animationFromTo();
    }

    animationFromTo = () => {
        this.x = 0;
        this.part = this.time / this.frequency;

        if (this.elements.length != undefined) {
            this.elements = [...this.elements];
        }

        this.helperForElement = this.from;
        this.checkFromTo();

        if (this.from > this.to) {
            this.changeForElement -= 2 * this.changeForElement;
        }

        if (this.elements.length == undefined && this.hoverEffect) {
            this.elements.addEventListener('mouseenter', () => {
                clearInterval(this.animation);
                this.hoverAnimation('enter');
            });
            this.elements.addEventListener('mouseleave', () => {
                clearInterval(this.animation);
                this.hoverAnimation('leave');
            });
        } else if (this.elements.length != undefined && this.hoverEffect) {
            this.elements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    clearInterval(this.animation);
                    this.hoverAnimation('enter');
                });
                element.addEventListener('mouseleave', () => {
                    clearInterval(this.animation);
                    this.hoverAnimation('leave');
                });
            })
        } else {
            this.animation = setInterval(() => this.animate(this.checkUnitValue), this.frequency);
        }



    }




}

