/**
 * Player class - standard run and jump mechanics (single jump only)
 */
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 36;
        this.height = 48;
        this.vx = 0;
        this.vy = 0;
        this.speed = 6;
        this.jumpForce = -14;
        this.gravity = 0.6;
        this.onGround = false;
        this.facingRight = true;
        this.animFrame = 0;
        this.animTimer = 0;
    }

    applyLevelGravity(g) {
        this.gravity = g;
    }

    moveLeft() {
        this.vx = -this.speed;
        this.facingRight = false;
    }

    moveRight() {
        this.vx = this.speed;
        this.facingRight = true;
    }

    stopX() {
        this.vx = 0;
    }

    jump() {
        if (this.onGround) {
            this.vy = this.jumpForce;
            this.onGround = false;
        }
    }

    update(platforms, levelHeight) {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;

        this.onGround = false;

        // Floor collision
        if (this.y + this.height >= levelHeight) {
            this.y = levelHeight - this.height;
            this.vy = 0;
            this.onGround = true;
        }

        // Platform collision
        for (const p of platforms) {
            if (this.intersectsPlatform(p)) {
                const overlapTop = (this.y + this.height) - p.y;
                const overlapBottom = (p.y + p.height) - this.y;
                const overlapLeft = (this.x + this.width) - p.x;
                const overlapRight = (p.x + p.width) - this.x;

                const minOverlap = Math.min(overlapTop, overlapBottom, overlapLeft, overlapRight);

                if (minOverlap === overlapTop && this.vy > 0) {
                    this.y = p.y - this.height;
                    this.vy = 0;
                    this.onGround = true;
                } else if (minOverlap === overlapBottom && this.vy < 0) {
                    this.y = p.y + p.height;
                    this.vy = 0;
                } else if (minOverlap === overlapLeft && this.vx > 0) {
                    this.x = p.x - this.width;
                    this.vx = 0;
                } else if (minOverlap === overlapRight && this.vx < 0) {
                    this.x = p.x + p.width;
                    this.vx = 0;
                }
            }
        }

        this.animTimer++;
        if (this.animTimer > 6) {
            this.animTimer = 0;
            this.animFrame = (this.animFrame + 1) % 4;
        }
    }

    intersectsPlatform(p) {
        return this.x < p.x + p.width &&
               this.x + this.width > p.x &&
               this.y < p.y + p.height &&
               this.y + this.height > p.y;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.onGround = true;
    }
}
