import { Box, Skeleton } from "@mui/material"

export function QuestionDetailSkeleton() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Skeleton className="text-2xl" />
      <div className="mt-5 flex gap-4 text-lg">
        <Skeleton width="20%" />
        <Skeleton width="20%" />
      </div>
      <Skeleton className="text-lg" height="30%" />
      <div className="mt-5 flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton width={80} height={50} key={i} />
        ))}
      </div>
    </Box>

  )
}
