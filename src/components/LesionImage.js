import { useEffect, useRef, useState } from "react";

/**
 *
 * @param {{
 * lesions: {
 *  x: number,
 *  y: number,
 *  radius: number,
 *  id: number,
 *  bodyPart: number
 * }[];
 * imgSrc: string;
 * matchRes?: { a: number, b: number }[];
 * isA: boolean;
 * highlight?: boolean;
 * }} props
 */
export const LesionImage = ({ lesions, imgSrc, isA, matchRes, highlight }) => {
  /**
   * @type {import("react").MutableRefObject<HTMLCanvasElement | null>}
   */
  const canvasRef = useRef(null);

  /**
   * @type {[CanvasRenderingContext2D | null, any]}
   */
  const [ctx, setCtx] = useState(null);

  const [img, setImage] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setCtx(ctx);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      canvasRef.current.width = img.width;
      canvasRef.current.height = img.height;
      setImage(img);
    };
  }, [imgSrc]);

  useEffect(() => {
    if (!ctx || !img) return;

    /**
     * @type {CanvasRenderingContext2D}
     */
    const ctx2 = ctx;
    ctx.drawImage(img, 0, 0);
    ctx2.strokeStyle = "rgba(255,0,0,0.4)";
    ctx2.lineWidth = 2 * devicePixelRatio;
    if (highlight) {
      lesions.forEach((l) => {
        const id = matchRes?.findIndex((r) => (isA ? r.a : r.b) === l.id) || 0;

        ctx2.strokeStyle = getColorForId(id);
        ctx.beginPath();
        ctx.arc(l.x, l.y, l.radius, 0, 359.9999);
        ctx2.stroke();
      });
    }
  }, [img, lesions, highlight, ctx, isA, matchRes]);
  return <canvas className="lesion-canvas" ref={canvasRef}></canvas>;
};

const getColorForId = (id) => {
  //h(x)=ax^2+bx+c mod R
  const a = 924755240;
  const b = 374679788;
  const c = 568558853;
  const p = 1000001699;
  const h = a * (id * id) + b * id + c;
  return colors[(h % p) % colors.length];
};

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple"];
