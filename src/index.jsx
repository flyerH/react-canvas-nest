import React, { Component } from 'react';

class ReactCanvasNest extends Component {

    constructor(props) {

        super(props);
        const { style, config } = this.props;

        const canvasStyle = {
            zIndex : -1,
            opacity: 1,         // transparency of canvas     
            display: 'block',
            ...style
        }

        const canvasConfig = {
            count       : 99,          // count of points 
            dist        : 6000,        // maximum length of line segments between two points
            pointOpacity: 1,           // transparency of points
            lineColor   : '0,0,0',
            lineWidth   : 1,           // multiple of line width
            pointColor  : '255,0,0',
            pointR      : 3,           // radius of the point,
            follow      : true,
            ...config,
        };

        this.state = {
            outDivWidth : null,
            outDivHeight: null,
            canvasStyle,
            canvasConfig
        }

    }

    shouldComponentUpdate = (nextProps) => {
        if (nextProps.follow != undefined && this.props.follow !== nextProps.follow){
            this.mouseEvent(nextProps.follow);
        }
        return true;
    }

    componentDidMount = () => {
        const { canvasRef } = this;

        this.setState({
            outDivWidth : canvasRef.parentNode.clientWidth,
            outDivHeight: canvasRef.parentNode.clientHeight
        }, this.init);
    }

    randomPoints = () => {
        const { canvasConfig } = this.state;
        const { canvasRef }    = this;
        const points           = [];
        const width            = canvasRef.clientWidth;
        const height           = canvasRef.clientHeight;
        for (let index = 0; index < canvasConfig.count; ++index) {
            points.push({
                x    : Math.random() * width,
                y    : Math.random() * height,
                xStep: 2 * Math.random() - 1,    // step size of point movement 
                yStep: 2 * Math.random() - 1,
                max  : canvasConfig.dist
            })
        }
        return points;
    };

    setCanvas = element => {
        this.canvasRef = element;
    }

    init = () => {
        const { canvasRef } = this;

        const points = this.randomPoints();

        const mouseCoordinate = {    // mouse coordinate
            x  : null,
            y  : null,
            max: 20000
        };

        const pointsWithMouse = [...points, mouseCoordinate];
        this.setState({
            context: canvasRef.getContext('2d'),
            points,
            mouseCoordinate,
            pointsWithMouse
        }, () => {
            this.mouseEvent(this.state.canvasConfig.follow);
            requestAnimationFrame(this.drawNest);
        });
    }

    mouseEvent = (follow) => {

        const { canvasRef } = this;

        if (follow) {
            canvasRef.onmousemove = (e) => {
                const { mouseCoordinate, pointsWithMouse } = this.state;

                const x      = e.clientX - canvasRef.parentNode.offsetLeft + document.scrollingElement.scrollLeft;
                const y      = e.clientY - canvasRef.parentNode.offsetTop + document.scrollingElement.scrollTop;
                const points = [...pointsWithMouse];

                points[points.length - 1] = { ...points[points.length - 1], x, y }
                this.setState({
                    mouseCoordinate: Object.assign({}, mouseCoordinate, { x, y }),
                    pointsWithMouse: points
                });
            };

            canvasRef.onmouseout = () => {
                const { mouseCoordinate, pointsWithMouse } = this.state;
                const points                               = [...pointsWithMouse];

                points[points.length - 1] = { ...points[points.length - 1], x: null, y: null }

                this.setState({
                    mouseCoordinate: Object.assign({}, mouseCoordinate, { x: null, y: null }),
                    pointsWithMouse: points
                });

            }

        } else {
            const { mouseCoordinate, pointsWithMouse } = this.state;

            const points = [...pointsWithMouse];

            points[points.length - 1] = { ...points[points.length - 1], x:null, y:null }

            this.setState({
                mouseCoordinate: Object.assign({}, mouseCoordinate, { x: null, y: null }),
                pointsWithMouse: points
            });
            canvasRef.onmousemove = null;
            canvasRef.onmouseout  = null;
        }
    }

    drawNest = () => {
        const { context, outDivWidth, outDivHeight, points, pointsWithMouse, canvasConfig, mouseCoordinate } = this.state;
        const { pointColor, pointR, pointOpacity, lineWidth, lineColor }                                     = canvasConfig;

        context.clearRect(0, 0, outDivWidth, outDivHeight);

        for (let index = 0; index < points.length; ++index) {
            const point = points[index];
            context.beginPath();
            context.fillStyle = `rgba(${pointColor},${pointOpacity})`;
            context.arc(point.x, point.y, pointR, 0, 2 * Math.PI);
            context.fill();

            point.x     += point.xStep;                                                         // point movement
            point.y     += point.yStep;
            point.xStep *= (point.x + pointR > outDivWidth || point.x - pointR < 0) ? -1 : 1;
            point.yStep *= (point.y + pointR > outDivHeight || point.y - pointR < 0) ? -1 : 1;

            for (let nextIndex = 0; nextIndex < pointsWithMouse.length; ++nextIndex) {
                const nextPoint = pointsWithMouse[nextIndex];
                if (nextPoint.x) {
                    const xDist = point.x - nextPoint.x;
                    const yDist = point.y - nextPoint.y;
                    const dist  = xDist * xDist + yDist * yDist;  // the square of the distance between two points

                    if (dist < nextPoint.max) {

                        nextIndex + 1 === pointsWithMouse.length && dist >= nextPoint.max / 2 && (point.x -= 0.03 * xDist, point.y -= 0.03 * yDist);

                        const scale = (nextPoint.max - dist) / (nextPoint.max);
                        context.beginPath();
                        context.lineWidth   = (scale * lineWidth) / 2;
                        context.strokeStyle = `rgba(${lineColor},${scale})`;
                        context.moveTo(point.x, point.y);
                        context.lineTo(nextPoint.x, nextPoint.y);
                        context.stroke();
                    }
                }
            }
        }
        requestAnimationFrame(this.drawNest);
    }

    render() {
        const { canvasStyle, outDivWidth, outDivHeight } = this.state;
        return (
            <canvas ref = {this.setCanvas} style = {canvasStyle} width = {outDivWidth} height = {outDivHeight} className = {this.props.className || ''} />
        )
    }
}

export default ReactCanvasNest;