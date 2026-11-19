import styles from "./home.module.css";
import { TakeoffPlane } from "./takeoff-plane";
import {
  LABEL_X,
  VIEW_H,
  VIEW_W,
  aimingPoint,
  centerLights,
  centerline,
  edgeLights,
  endLights,
  pianoKeys,
  sideStripes,
  stageGeometry,
  surface,
  thresholdLights,
  touchdownZone,
} from "./runway-geometry";

export function RunwayScene() {
  return (
    <div className={styles.runwayCard}>
      <div className={styles.runwayFigure}>
        <svg
          className={styles.runwaySvg}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            <linearGradient id="runvey-runway-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.12" stopColor="#fff" stopOpacity="0.35" />
              <stop offset="0.55" stopColor="#fff" stopOpacity="1" />
            </linearGradient>
            <mask id="runvey-runway-mask" maskUnits="userSpaceOnUse">
              <rect width={VIEW_W} height={VIEW_H} fill="url(#runvey-runway-fade)" />
            </mask>
          </defs>

          <g mask="url(#runvey-runway-mask)">
            <path className={styles.asphalt} d={surface} />
            <path className={styles.paint} d={sideStripes + centerline + touchdownZone} />
            <path className={styles.paintBold} d={pianoKeys + aimingPoint} />

            {edgeLights.map((l) => (
              <circle key={`e${l.cx}-${l.cy}`} className={styles.edgeLight} {...l} />
            ))}
            {endLights.map((l) => (
              <circle key={`x${l.cx}`} className={styles.endLight} {...l} />
            ))}
            {centerLights.map(({ pulsed, ...l }) => (
              <circle
                key={`c${l.cy}`}
                className={pulsed ? styles.centerLightPulse : styles.centerLight}
                {...l}
              />
            ))}
          </g>

          {thresholdLights.map((l) => (
            <circle key={`t${l.cx}`} className={styles.thresholdLight} {...l} />
          ))}

          {stageGeometry.map((s) => (
            <g key={s.name} className={"live" in s ? styles.stageLive : styles.stage}>
              <path className={styles.stageMark} d={s.mark} />
              <path className={styles.stageLeader} d={s.leader} />
            </g>
          ))}

          <TakeoffPlane />
        </svg>

        {stageGeometry.map((s, i) => (
          <div
            key={s.name}
            className={`${styles.stageLabel} ${"live" in s ? styles.stageLabelLive : ""}`}
            style={{
              left: `${(LABEL_X / VIEW_W) * 100}%`,
              top: `${(s.y / VIEW_H) * 100}%`,
            }}
          >
            <span className={styles.stageName}>
              <small>{String(i + 1).padStart(2, "0")}</small>
              {s.name}
            </span>
            <span className={styles.stageDetail}>{s.detail}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
