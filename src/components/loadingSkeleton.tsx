export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-5 gap-4 m-8">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-200 h-32 rounded-lg"
        ></div>
      ))}
    </div>
  );
}
