class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        let bl = new Point(100,100);
        let tr = new Point(600,400);
        
        this.drawRectangle(bl,tr,[255,0,0,255],this.ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        let c = new Point(250,250);
        this.drawCircle(c,50,[255,0,0,255],this.ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        let startPoint = new Point(100,100);
        let endPoint = new Point(400,120);
        let adj1 = new Point(130,300);
        let adj2 = new Point(390,300);
        
        this.drawBezierCurve(startPoint,adj1,adj2,endPoint,[255,0,0,255],this.ctx);

        if (this.show_points){
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(adj1.x-2.5,adj1.y-2.5,5,5);
            ctx.fillRect(adj2.x-2.5,adj2.y-2.5,5,5);
        }

        
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        let col = [200,0,255,255];
        let np1 = new Point(100,100);
        let np2 = new Point(100,200);
        let np3 = new Point(175,100);
        let np4 = new Point(175,200);
        this.drawLine(np1,np2,col,this.ctx);
        this.drawLine(np2,np3,col,this.ctx);
        this.drawLine(np3,np4,col,this.ctx);

        let op = new Point(230,130);
        this.drawCircle(op,25,col,this.ctx);

        let lp1 = new Point(275,200);
        let lp2 = new Point(275,100);
        this.drawLine(lp1,lp2,col,this.ctx);

        let ap1 = new Point(320,130);
        this.drawCircle(ap1,25,col,this.ctx);

        let ap2 = new Point(345,130);
        let ap3 = new Point(360,100);
        this.drawLine(ap2,ap3,col,this.ctx);

        let lnp1 = new Point(385,150);
        let lnp2 = new Point(385,100);
        this.drawLine(lnp1,lnp2,col,this.ctx);

        let lnp3 = new Point(385,130);
        let lnp4 = new Point(435,80);
        let lnp5 = new Point(390,150);
        let lnp6 = new Point(420,160);
        this.drawBezierCurve(lnp3,lnp5,lnp6,lnp4,col,this.ctx);

        if (this.show_points){
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(lnp5.x-2.5,lnp5.y-2.5,5,5);
            ctx.fillRect(lnp6.x-2.5,lnp6.y-2.5,5,5);
            ctx.fillStyle = '#0000ff';
            ctx.fillRect(np1.x-2.5,np1.y-2.5,5,5);
            ctx.fillRect(np2.x-2.5,np2.y-2.5,5,5);
            ctx.fillRect(np3.x-2.5,np3.y-2.5,5,5);
            ctx.fillRect(np4.x-2.5,np4.y-2.5,5,5);
            ctx.fillRect(lp1.x-2.5,lp1.y-2.5,5,5);
            ctx.fillRect(lp2.x-2.5,lp2.y-2.5,5,5);
            
        }
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        let tl = new Point(left_bottom.x,right_top.y);
        let br = new Point(right_top.x,left_bottom.y);
        
        this.drawLine(left_bottom,tl,color,this.ctx);
        this.drawLine(tl,right_top,color,this.ctx);
        this.drawLine(right_top,br,color,this.ctx);
        this.drawLine(br,left_bottom,color,this.ctx);

        if(this.show_points){
            ctx.fillStyle = '#0000ff';
            ctx.fillRect(left_bottom.x-2.5,left_bottom.y-2.5,5,5);
            ctx.fillRect(right_top.x-2.5,right_top.y-2.5,5,5);
            ctx.fillRect(tl.x-2.5,tl.y-2.5,5,5);
            ctx.fillRect(br.x-2.5,br.y-2.5,5,5);
        }
        //this.drawLine()
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let p1;
        let points = [];
        let x;
        let y;

        for (let i=0; i<this.num_curve_sections; i++){
            
            x = center.x + radius * Math.cos(i * 2 * Math.PI / this.num_curve_sections);
            y = center.y + radius * Math.sin(i * 2 * Math.PI / this.num_curve_sections);
            p1 = new Point(x,y);
            points[i] = p1;
            
        }
        for (let i=0; i<points.length; i++){
            if (i == points.length-1){
                this.drawLine(points[i],points[0],color,this.ctx);
            }else{
                this.drawLine(points[i],points[i+1],color,this.ctx);
            }
            
        }

        if (this.show_points){
            ctx.fillStyle = '#0000ff';
            for (let i=0; i<points.length; i++){
                ctx.fillRect(points[i].x-2.5, points[i].y-2.5, 5, 5);
            }
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let points = [];
        let x;
        let y;
        let p1;
        let t = 0.0;
        let divisor = 1/this.num_curve_sections;

        for (let i=0; i<this.num_curve_sections; i++){
            
            x = ((1-t)**3) * pt0.x + 3 * ((1-t)**2) * t * pt1.x + 3*(1-t) * (t**2) * pt2.x + (t**3) * pt3.x; 
            y = ((1-t)**3) * pt0.y + 3 * ((1-t)**2) * t * pt1.y + 3*(1-t) * (t**2) * pt2.y + (t**3) * pt3.y;
            p1 = new Point(x,y);
            points[i] = p1;
            t += divisor;
            
        }

        for (let i=0; i<this.num_curve_sections-1; i++){
            this.drawLine(points[i],points[i+1],color,this.ctx);
        }

        if (this.show_points){
            ctx.fillStyle = '#0000ff';
            for (let i=0; i<points.length; i++){
                ctx.fillRect(points[i].x-2.5, points[i].y-2.5, 5, 5);
            }
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }

    


}

class Point{

    constructor(x,y){
        this.x = x;
        this.y = y;
        
    }
}

