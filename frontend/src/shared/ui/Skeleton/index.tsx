import { Skeleton } from '@progress/kendo-react-indicators';
import type { SkeletonProps as KendoSkeletonProps } from '@progress/kendo-react-indicators';

export type SkeletonShape = 'text' | 'circle' | 'rectangle';

interface SkeletonProps extends Omit<KendoSkeletonProps, 'shape'> {
  shape?: SkeletonShape;
  className?: string;
}

export function SkeletonComponent({ shape = 'text', className = '', ...props }: SkeletonProps) {
  return <Skeleton shape={shape} className={className} {...props} />;
}

// 페이지 로딩용 스켈레톤
export function PageSkeleton() {
  return (
    <div className="flex h-screen flex-col bg-[#f3f4f7] p-6">
      {/* Header Skeleton */}
      <div className="mb-6 flex items-center justify-between">
        <SkeletonComponent shape="text" className="h-8 w-32" />
        <div className="flex gap-4">
          <SkeletonComponent shape="circle" className="h-10 w-10" />
          <SkeletonComponent shape="text" className="h-8 w-20" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 space-y-6">
        <div className="space-y-4">
          <SkeletonComponent shape="text" className="h-6 w-48" />
          <SkeletonComponent shape="rectangle" className="h-32 w-full" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <SkeletonComponent key={i} shape="rectangle" className="h-32 w-full" />
          ))}
        </div>
        <div className="space-y-2">
          <SkeletonComponent shape="text" className="h-4 w-full" />
          <SkeletonComponent shape="text" className="h-4 w-full" />
          <SkeletonComponent shape="text" className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

// 테이블 로딩용 스켈레톤
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full space-y-2">
      {/* Header */}
      <div className="flex gap-2">
        <SkeletonComponent shape="text" className="h-10 flex-1" />
        <SkeletonComponent shape="text" className="h-10 flex-1" />
        <SkeletonComponent shape="text" className="h-10 flex-1" />
        <SkeletonComponent shape="text" className="h-10 w-24" />
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-2">
          <SkeletonComponent shape="text" className="h-12 flex-1" />
          <SkeletonComponent shape="text" className="h-12 flex-1" />
          <SkeletonComponent shape="text" className="h-12 flex-1" />
          <SkeletonComponent shape="text" className="h-12 w-24" />
        </div>
      ))}
    </div>
  );
}

// 카드 로딩용 스켈레톤
export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <SkeletonComponent shape="text" className="mb-4 h-6 w-32" />
      <SkeletonComponent shape="rectangle" className="mb-2 h-4 w-full" />
      <SkeletonComponent shape="rectangle" className="mb-2 h-4 w-3/4" />
      <SkeletonComponent shape="rectangle" className="h-4 w-1/2" />
    </div>
  );
}

// 리스트 로딩용 스켈레톤
export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <SkeletonComponent shape="circle" className="h-12 w-12" />
          <div className="flex-1 space-y-2">
            <SkeletonComponent shape="text" className="h-4 w-3/4" />
            <SkeletonComponent shape="text" className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

