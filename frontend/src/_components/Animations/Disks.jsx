import React, { useRef, useEffect } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const circles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 50 + 20,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    }));

    const drawCircle = (circle) => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fillStyle = circle.color;
      ctx.fill();
    };

    const updateCircles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circles.forEach((circle) => {
        // Update position
        circle.x += circle.dx;
        circle.y += circle.dy;

        // Update color over time
        const hue = (parseInt(circle.color.match(/\d+/)[0]) + 1) % 360;
        circle.color = `hsl(${hue}, 70%, 50%)`;

        // Bounce off walls
        if (
          circle.x + circle.radius > canvas.width ||
          circle.x - circle.radius < 0
        ) {
          circle.dx *= -1;
        }
        if (
          circle.y + circle.radius > canvas.height ||
          circle.y - circle.radius < 0
        ) {
          circle.dy *= -1;
        }

        drawCircle(circle);
      });

      requestAnimationFrame(updateCircles);
    };

    updateCircles();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default AnimatedBackground;
