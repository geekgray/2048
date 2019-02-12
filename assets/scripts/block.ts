import colors from "./colors";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    number: cc.Label = null;

    start () {

    }

    setNumber(value) {
        if (value == 0) {
            this.number.node.active = false;
        }
        this.number.string = value;
        if (colors[value]) {
            this.node.color = colors[value];
        }
    }

    // update (dt) {}
}
