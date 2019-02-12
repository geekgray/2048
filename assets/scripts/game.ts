const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property
    score: number = 0;

    @property(cc.Prefab)
    blockPrefab: cc.Prefab = null;

    @property
    gap: number = 20;

    private blockSize: number;
    private positions: any[number];

    private data: any[number];
    private blocks: any[];

    private startPoint: Object;
    private endPoint: Object;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.drawBlocks();
        this.init();

        this.addEventHandler();
    }

    drawBlocks() {
        // 计算black size
        this.blockSize = (cc.winSize.width - this.gap * 5) / 4;
        let x = this.gap + this.blockSize / 2;
        let y = this.blockSize;
        this.positions = [];
        for (let i = 0; i < 4; ++i) {
            this.positions.push([0, 0, 0, 0]);
            for (let j = 0; j < 4; ++j) {
                const block = cc.instantiate(this.blockPrefab);
                block.width = this.blockSize;
                block.height = this.blockSize;
                this.bg.addChild(block);
                block.setPosition(cc.p(x, y));
                this.positions[i][j] = cc.p(x, y);
                x += this.gap + this.blockSize;
                block.getComponent('block').setNumber(0);
            }
            // cc.log(this.positions);
            y += this.gap + this.blockSize;
            x = this.gap + this.blockSize / 2;
        }
    }

    init() {
        this.updateScore(0);

        if (this.blocks) {
            for (let i = 0; i < this.blocks.length; i++) {
                for (let j = 0; j < this.blocks[i].length; j++) {
                    if (this.blocks[i][j] != null) {
                        this.blocks[i][j].destory();
                    }
                }
            }
        }

        this.data = [];
        this.blocks = [];

        for (let i = 0; i < 4; ++i) {
            this.data.push([0, 0, 0, 0]);
            this.blocks.push([null, null, null, null]);
        }

        this.addBlock();
        this.addBlock();
        this.addBlock();
    }

    getEmptyLocation() {
        const locations = [];
        for (let i = 0; i < this.blocks.length; i++) {
            for (let j = 0; j < this.blocks[i].length; j++) {
                if (this.blocks[i][j] == null) {
                    locations.push({x: i, y: j});
                }
            }
        }
        return locations;
    }

    addBlock() {
        const locations = this.getEmptyLocation();
        if (locations.length) {
            const {x, y} = locations[Math.floor(cc.random0To1() * locations.length)];
            const position = this.positions[x][y];
            const block = cc.instantiate(this.blockPrefab);
            block.width = this.blockSize;
            block.height = this.blockSize;
            this.bg.addChild(block);
            block.setPosition(position);
            const number = cc.random0To1() > 0.5 ? 2 : 4;
            block.getComponent('block').setNumber(number);
            this.blocks[x][y] = block;
            this.data[x][y] = number;
        }
    }

    updateScore(value) {
        this.score = value;
        this.scoreLabel.string = `分数: ${value}`;
    }

    addEventHandler() {
        this.bg.on('touchstart', (event) => {
            this.startPoint = event.getLocation();
        });
        this.bg.on('touchend', (event: cc.Event) => {
            this.endPoint = event.getLocation();
            const vec = cc.pSub(this.endPoint, this.startPoint);
            if (cc.pLength(vec) > 50) {
                if (Math.abs(vec.x) > Math.abs(vec.y)) {
                    // 水平方向
                    if (vec.x > 0) {
                        this.moveRight();
                    } else {
                        this.moveLeft();
                    }
                } else {
                    // 垂直方向
                    if (vec.y > 0) {
                        this.moveUp();
                    } else {
                        this.moveDown();
                    }
                }
            }
        });
    }

    // update (dt) {}

    moveLeft() {
        cc.log('move left');
        cc.log(this.data);
    }

    moveRight() {
        cc.log('move right');
    }

    moveUp() {
        cc.log('move up');
    }

    moveDown() {
        cc.log('move down');
    }
}
