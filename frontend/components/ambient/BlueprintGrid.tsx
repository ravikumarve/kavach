/**
 * Legal Blueprint Grid Overlay
 * Fixed background pattern with radial mask creating a vignette effect.
 */
export default function BlueprintGrid() {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 w-screen h-screen z-[1] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        WebkitMaskImage: "radial-gradient(circle at 50% 30%, black 10%, transparent 80%)",
        maskImage: "radial-gradient(circle at 50% 30%, black 10%, transparent 80%)",
      }}
    />
  )
}
