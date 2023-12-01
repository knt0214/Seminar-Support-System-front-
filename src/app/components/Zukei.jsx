'use client'

import { useEffect, useRef } from 'react';

const Zukei = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // 描画ロジック
        context.beginPath();
        context.moveTo(0, 10); // 開始点 (x, y)
        context.lineTo(450, 10); // 終了点 (x, y)
        context.stroke();
    }, []);

    return (
        <canvas ref={canvasRef} width={450} height={10} />
    );
}

export default Zukei;