type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** `wide` for full sections, `narrow` for text-heavy content. */
  size?: "wide" | "narrow";
};

/**
 * Single source of truth for page width + horizontal gutters.
 * Every section should wrap its content in this instead of setting its own
 * max-w/px values, so the whole site stays aligned on one grid.
 */
export default function Container({
  children,
  className = "",
  size = "wide",
}: ContainerProps) {
  const max = size === "narrow" ? "max-w-4xl" : "max-w-7xl";
  return (
    <div className={`mx-auto w-full ${max} px-5 sm:px-8 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}
