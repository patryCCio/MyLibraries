export class AnimationEase {
    constructor(animationData, type) {
        this.animationData = animationData;
        this.isActiveAnimation = false;
        this.type = type;
    }

    doAnimate = () => {
        if(this.type === 'ease'){
            this.linear();
        }
        else if(this.type === 'easeFromTo'){
            this.linearFromTo();
        }
    }
}