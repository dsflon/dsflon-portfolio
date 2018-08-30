class BodyMessage {

    constructor(target) {

        this.target = target;
        this.flag = true;

    }

    AutoPlay(message,callback,callback2) {

        if(!message || !this.flag) return false;

        this.Set(message)
        setTimeout( () => {
            this.Remove(callback);
            if(callback2) callback2();
        }, 2000)

    }

    Set(message) {

        if(!message || !this.flag) return false;
        this.flag = false;
        this.target.dataset.message = "";
        this.target.dataset.message = message;

        setTimeout( () => {
            this.target.classList.add("show_message")
        }, 1)

    }

    Remove(callback) {

        const TransitionEnd = () => {
            this.flag = true;
            if(callback) callback();
            this.target.removeEventListener("transitionend", TransitionEnd.bind(this))
        }

        this.target.classList.remove("show_message");
        this.target.addEventListener("transitionend", TransitionEnd.bind(this), false)

    }

}


export default BodyMessage;
