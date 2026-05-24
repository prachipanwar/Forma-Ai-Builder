export default function FormSkeleton() {
    return (
      <div className="space-y-5 animate-pulse">
        
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="space-y-2"
          >
            <div className="h-4 w-32 rounded bg-white/10" />
  
            <div className="h-11 rounded-xl bg-white/5" />
          </div>
        ))}
  
        <div className="h-11 rounded-xl bg-gradient-to-r from-violet-500/20 to-cyan-500/20" />
      </div>
    );
  }