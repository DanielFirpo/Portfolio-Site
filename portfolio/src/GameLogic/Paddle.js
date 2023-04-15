class Paddle {

    constructor(position, size) {
        this.velocity = 0;
        this.size = size;
        this.position = position;
        console.log("new paddle pos:", position);
    }

    draw(context) {
        context.fillRect(this.position.x - this.size.width/2, this.position.y - this.size.height/2, this.size.width, this.size.height);
    }

    moveTowards(mouseX, windowWidth, deltaTime) {
        //console.log("Moving towards " , mouseX);
        //make sure mouseX isn't off the canvas
        if(mouseX < this.size.width / 2) {
            mouseX = this.size.width / 2 
        }
        if(mouseX > windowWidth - this.size.width / 2) {
            mouseX = windowWidth - this.size.width / 2
        }
        let distance = Math.abs(mouseX - (this.position.x));
        let distancePercentOfWindow = distance / windowWidth * 100;//get the percent of windowWidth that distance is, this makes the acceleration of the paddle more uniform on various window sizes
        this.velocity = distancePercentOfWindow/7;//7 is just an arbitrary number, adjust this to adjust paddle mouse follow speed
        if (this.position.x < mouseX) {//left of mouse, we need to add to position.x
            this.position.x += this.velocity * deltaTime;
        }
        else {
            this.position.x -= this.velocity * deltaTime;
        }
    }

    boundsInclude(position) {
        if (position.x > this.position.x - this.size.width / 2 && position.x < this.position.x + this.size.width / 2) {
            if (position.y > this.position.y - this.size.height / 2 && position.y < this.position.y + this.size.height / 2) {
                return true;
            }
        }
        return false;
    }

    distanceFromCenter(position) {
        let distance = position.x - this.position.x;
        return distance / window.innerWidth * 100;
    }

}

export default Paddle;