import { useEffect, useRef, useState } from "react";
const padding = 1 * devicePixelRatio;

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
 * setHoverTarget(id: number): void;
 * hoverTarget: number | null;
 * }} props
 */
export const LesionImage = ({
  lesions,
  imgSrc,
  isA,
  matchRes,
  highlight,
  setHoverTarget,
  hoverTarget,
  onClick,
}) => {
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
    ctx2.lineWidth = 1 * devicePixelRatio;
    if (highlight && hoverTarget !== null && matchRes) {
      // lesions.forEach((l) => {
      //   const id = matchRes?.findIndex((r) => (isA ? r.a : r.b) === l.id) || 0;

      //   ctx2.strokeStyle = getColorForId(id);
      //   ctx.beginPath();
      //   ctx.arc(l.x, l.y, l.radius + padding, 0, 359.9999);
      //   ctx2.stroke();
      //   // ctx2.fillStyle = "white";
      //   // ctx2.font = "18px Arial";
      //   // ctx2.fillText(`${l.id}-${id}`, l.x, l.y - 14);
      // });
      //const l = lesions.find((le) => le.id === hoverTarget);
      const t = matchRes[hoverTarget];
      const l = lesions.find((le) => le.id === (isA ? t.a : t.b));
      if (!l) return;
      ctx2.strokeStyle = getColorForId(hoverTarget);
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.radius + padding, 0, 359.9999);
      ctx2.stroke();
    }
  }, [img, lesions, highlight, ctx, isA, matchRes, hoverTarget]);

  useEffect(() => {
    const r = canvasRef.current;
    if (!r) return;

    const handler = (e) => {
      const box = r.getBoundingClientRect();
      const scale = r.width / box.width;

      const adjustedX = (e.clientX - box.x) * scale;
      const adjustedY = (e.clientY - box.y) * scale;
      const isInside = (l) => {
        const dist = Math.sqrt(
          Math.pow(l.x - adjustedX, 2) + Math.pow(l.y - adjustedY, 2)
        );
        return dist < l.radius + padding;
      };

      const targ = lesions.find(isInside);
      if (targ) {
        // find the match
        const id = matchRes
          ? matchRes.findIndex((r) => (isA ? r.a : r.b) === targ.id)
          : -1;

        setHoverTarget(id === -1 ? null : id);
      } else {
        setHoverTarget(null);
      }
      r.style.cursor = targ ? "pointer" : "default";
    };

    r.addEventListener("mousemove", handler);

    return () => r.removeEventListener("mousemove", handler);
  }, [lesions]);

  return (
    <canvas
      className="lesion-canvas"
      ref={canvasRef}
      onClick={onClick}
    ></canvas>
  );
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
