'use client'

import { useEffect, useRef } from 'react';

const Zukei = ({ className, delay }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let position = -450; // 初期位置を左側の外に設定

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(position, 10);
      context.lineTo(position + 450, 10);
      context.stroke();
    };

    const animate = () => {
      position += 10; // 移動速度

      draw();

      if (position < 0) {
        requestAnimationFrame(animate);
      }
    };

    const animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [canvasRef, delay]);

  return <canvas ref={canvasRef} className={`${className} slideInFromLeft`} width={450} height={10} />;
};

export default Zukei;
