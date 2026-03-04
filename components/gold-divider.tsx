export function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden="true">
      <div className="h-px w-12 bg-gold/40" />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold"
      >
        <path
          d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
      <div className="h-px w-12 bg-gold/40" />
    </div>
  )
}
