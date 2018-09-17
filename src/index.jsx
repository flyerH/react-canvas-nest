import React, { Component } from 'react';

class ReactCanvasNest extends Component {

    constructor(props) {

        super(props);
        const { style, config } = this.props;

        const canvasStyle = {
            zIndex: -1,
            opacity: 0.5,
            color: '0,0,0',
            display: 'block',
            ...style
        }

        const canvasConfig = {
            count: 99,
            dist: 6000,
            ...config,
        };

        this.state = {
            outDivWidth: null,
            outDivHeight: null,
            canvasStyle,
            canvasConfig,
            canvasRef: null
        }

    }

    componentDidMount = () => {
        const { canvasRef } = this;

        this.setState({
            outDivWidth: canvasRef.parentNode.clientWidth,
            outDivHeight: canvasRef.parentNode.clientHeight
        }, this.init);
    }


    randomPoints = () => {
        const { canvasConfig } = this.state;
        // const canvasRef = this.canvasRef.current;
        const { canvasRef } = this;
        const points = [];
        for (let index = 0; index < canvasConfig.count; ++index) {
            points.push({
                x: Math.random() * canvasRef.clientWidth,
                y: Math.random() * canvasRef.clientHeight,
                xStep: 2 * Math.random() - 1,       // step size of point movement 
                yStep: 2 * Math.random() - 1,
                max: canvasConfig.dist
            })
        }
        return points;
    };

    setCanvas = element => {
        this.canvasRef = element;
    }

    init = () => {
        const { canvasRef } = this

        const points = this.randomPoints();

        const mouseCoordinate = {    // mouse coordinate
            x: null,
            y: null,
            max: 20000
        };

        const pointsWithMouse = [...points, mouseCoordinate];

        this.setState({
            context: canvasRef.getContext('2d'),
            points,
            mouseCoordinate,
            pointsWithMouse
        });
        requestAnimationFrame(this.drawNest);
    }

    drawNest = () => {
        const { context, outDivWidth, outDivHeight, points, pointsWithMouse, canvasConfig, current } = this.state;
        context.clearRect(0, 0, outDivWidth, outDivHeight);
        for (let index = 0; index < points.length; ++index) {
            const point = points[index];
            context.beginPath();
            context.fillStyle = 'rgba(255,0,0,1)';
            context.arc(point.x, point.y, 1, 0, 2 * Math.PI);
            context.fill();
        }
    }

    render() {
        const { canvasStyle, outDivWidth, outDivHeight } = this.state;
        return (
            <canvas ref={this.setCanvas} style={canvasStyle} width={outDivWidth} height={outDivHeight} className={this.props.className || ''} />
        )
    }
}

export default ReactCanvasNest;