import { useEffect, useState } from 'react';
import useTick from '../hooks/useTick';
import styles from './Walker.module.css';
import Image from 'next/image'

type Props = {
  startX: number;
  startY: number;
  width: number;
  height: number;
}

const Walker: React.FC<Props> = ({ startX, startY, width, height }) => {
  const tick = useTick(8, 0);
  const [data, setData] = useState({ x: startX, y: startY, vx: 2, vy: 0 });

  useEffect(() => {
    try {
      // console.log('tick:', tick);
      const x = data.x;
      const y = data.y;
      const yf = data.y + height;
      let vx = data.vx;
      let vy = data.vy;

      const gravity = 0.2;
      vy += gravity;

      const nextData = {
        x: x + vx,
        y: y + vy,
        vx: vx,
        vy: vy,
      };

      const elements = Array.from(document.querySelectorAll('*')).filter(element => window.getComputedStyle(element).backgroundColor !== 'rgba(0, 0, 0, 0)');
      // console.log('elements:', elements);
      const rects = elements.map(el => el.getClientRects()[0]);
      
      let grounded = false;
      for (const rect of rects) {
        if (rect.x === 0 && rect.y === 0) continue; // TODO: Properly exclude html element from the collision check
        if (rect.width === 32 && rect.height === 32) continue; // TODO: Properly exclude itself from the collision check
        // console.log('rect:', rect);
        if (
          data.y + height <= rect.top &&
          nextData.y + height > rect.top &&
          nextData.x + width > rect.left &&
          nextData.x < rect.right
        ) {
          grounded = true;
          nextData.vy = 0;
          nextData.y = rect.top - height;
          break;
        }
      }

      if (nextData.y > window.innerHeight) { // Detect real window size
        nextData.x = Math.random() * window.innerWidth
        nextData.y = -height;
        nextData.vy = 0;
      }
      
      if (nextData.x > window.innerWidth) { // Detect real window size
        nextData.x = -width;
      }
      
      setData(nextData)
    } catch (err) {
      // console.log('Failed to get walkable elements, error:', err);
    }
  }, [tick]);

  return (
    <div className={styles.container} style={{ left: data.x, top: data.y, width, height }}>
      <Image
        src="/logotype.png"
        alt="Picture of the Walker"
        width={128}
        height={128}
      />
    </div>
  );
}

export default Walker;
