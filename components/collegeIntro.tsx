export default function CollegeIntro() {
  return (
    <section className="w-full py-8 md:py-16 px-4 md:px-6 flex justify-center bg-background">
      <div className="max-w-5xl w-full border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-sm">
        
        {/* Responsive Heading */}
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-6 tracking-tight">
          Ramdev Sharda College
        </h2>
        
        <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-lg">
          <p className="text-justify md:text-left">
            Ramdev Sharda College is a premier educational institution dedicated to 
            fostering academic excellence and professional growth. Located in the heart 
            of the region, it has built a reputation for providing a robust learning 
            environment that blends traditional values with modern innovation.
          </p>
          
          <p className="text-justify md:text-left border-l-4 border-primary/20 pl-4 italic">
            The college is committed to empowering students through diverse 
            undergraduate and postgraduate programs, ensuring they are well-equipped 
            to navigate the challenges of the evolving global landscape.
          </p>

          <p className="text-justify md:text-left">
            With a focus on character building and technical proficiency, it stands as 
            a cornerstone of higher education for aspiring professionals. We strive 
            to create a space where intellectual curiosity meets practical application, 
            preparing our graduates for the 2026 job market and beyond.
          </p>
        </div>

        {/* Optimized Badges: Wrap on mobile, gap adjusted */}
        <div className="mt-8 flex flex-wrap gap-2 md:gap-3">
          <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full">
            Academic Excellence
          </span>
          <span className="px-4 py-1.5 bg-secondary/10 text-secondary-foreground text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full">
            Innovation
          </span>
          <span className="px-4 py-1.5 bg-blue-500/10 text-blue-600 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full">
            Purnea University
          </span>
        </div>
      </div>
    </section>
  );
}