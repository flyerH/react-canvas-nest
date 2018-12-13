import React, { Component } from 'react';

class ReactCanvasNest extends Component {

    constructor(props) {

        super(props);
        const { style, config } = this.props;

        const canvasStyle = {
            zIndex  : -1,
            opacity : 1,            // transparency of canvas     
            display : 'block',
            position: 'absolute',
            ...style
        };

        const canvasConfig = {
            count       : 88,                // count of points 
            dist        : 6000,              // maximum length of line segments between two points
            pointOpacity: 1,                 // transparency of points
            lineColor   : '0, 0, 0',
            lineWidth   : 1,                 // multiple of line width
            pointColor  : '114, 114, 114',
            pointR      : 1,                 // radius of the point
            follow      : true,
            mouseDist   : 20000,             // mouse point dist
            ...config
        };

        this.state = {
            outDivWidth : null,
            outDivHeight: null,
            canvasStyle,
            canvasConfig
        };

    }

    shouldComponentUpdate = (nextProps) => {

        const { config } = nextProps;

        if (config && config.follow != undefined && this.props.config.follow !== config.follow) {
            this.mouseEvent(config.follow);
        }

        return true;

    }

    componentDidMount = () => {

        const parent    = this.canvasRef.parentNode;
        const { style } = parent;

        if (!style.position || style.positon === 'static')
            style.position = 'relative';

        this.setSize(this.init);

        window.addEventListener('resize', this.setSize);

    }

    componentWillUnmount() {

        window.removeEventListener('resize', this.setSize);
        cancelAnimationFrame(this.raf);
        this.canvasRef.parentNode.removeChild(this.canvasRef);

    }

    setSize = fn => {

        const parent = this.canvasRef.parentNode;

        this.setState({

            outDivWidth : parent.clientWidth,
            outDivHeight: parent.clientHeight

        }, typeof fn === 'function' ? fn : null);

    }

    randomPoints = () => {

        const { count, dist } = this.state.canvasConfig;
        const { canvasRef }   = this;
        const points          = [];
        const width           = canvasRef.clientWidth;
        const height          = canvasRef.clientHeight;

        for (let index = 0; index < count; ++index) {
            points.push({
                x    : Math.random() * width,
                y    : Math.random() * height,
                xStep: 2 * Math.random() - 1,    // step size of point movement 
                yStep: 2 * Math.random() - 1,
                max  : dist
            });
        }

        return points;

    }

    setCanvas = element => {

        this.canvasRef = element;

    }

    init = () => {

        const { mouseDist, follow } = this.state.canvasConfig;
        const points                = this.randomPoints();
        const mouseCoordinate       = {    // mouse coordinate
            x  : null,
            y  : null,
            max: mouseDist
        };
        const pointsWithMouse = [...points, mouseCoordinate];

        this.setState({

            context: this.canvasRef.getContext('2d'),
            points,
            pointsWithMouse

        }, () => {

            this.mouseEvent(follow);
            requestAnimationFrame(this.drawNest);

        });

    }



    mouseEvent = (follow) => {

        const parent = this.canvasRef.parentNode;

        const setMouseCoordinate = (x, y) => {

            const { pointsWithMouse, canvasConfig } = this.state;
            const points                            = [...pointsWithMouse];

            points[points.length - 1] = { x, y, max: canvasConfig.mouseDist };

            this.setState({
                pointsWithMouse: points
            });

        };

        const followMouse = e => {

            const x = e.clientX - parent.offsetLeft + document.scrollingElement.scrollLeft;
            const y = e.clientY - parent.offsetTop + document.scrollingElement.scrollTop;
            setMouseCoordinate(x, y);

        };

        const clearMouse = () => {

            setMouseCoordinate(null, null);

        };

        if (follow) {

            parent.onmousemove = followMouse;
            parent.onmouseout  = clearMouse;

        } else {

            parent.onmousemove = null;
            parent.onmouseout  = null;
            clearMouse();

        }

    }

    drawNest = () => {

        const { context, outDivWidth, outDivHeight, points, pointsWithMouse, canvasConfig } = this.state;
        const { pointColor, pointR, pointOpacity, lineWidth, lineColor }                    = canvasConfig;

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

                    if (dist < nextPoint.max)
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
        this.raf = requestAnimationFrame(this.drawNest);
    }

    render() {

        const { canvasStyle, outDivWidth, outDivHeight } = this.state;

        return (
            <canvas ref = {this.setCanvas} style = {canvasStyle} width = {outDivWidth} height = {outDivHeight} className = {this.props.className || ''} />
        )

    }
}

export default ReactCanvasNest;