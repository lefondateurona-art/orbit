import { ICON_SVG, type IconName } from "./icon-svg";

export type { IconName };

/**
 * Faithful React port of the prototype's Tabler icon renderer (buildSvg).
 * Renders the exact inner SVG markup from window.__TI_ICONS__ (icon-svg.ts)
 * inside an svg matching the prototype attributes (viewBox 0 0 24 24, 1em,
 * stroke currentColor, class ti-svg). `name` is the Tabler name without the
 * "ti-" prefix (e.g. "adjustments", "alert-circle").
 */
export function Icon({
  name,
  size,
  className,
  style,
}: {
  name: IconName | string;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const inner = ICON_SVG[name as string] ?? "";
  const dim = size !== undefined ? (typeof size === "number" ? `${size}px` : size) : "1em";
  return (
    <svg
      viewBox="0 0 24 24"
      width={dim}
      height={dim}
      stroke="currentColor"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`ti-svg${className ? " " + className : ""}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
