export default function CollegeIntro() {
    return (
      <section className="w-full py-12 px-6 flex justify-center bg-background">
        <div className="max-w-5xl w-full border border-border bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4 tracking-tight">
            Ramdev Sharda College
          </h2>
          
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Ramdev Sharda College is a premier educational institution dedicated to 
              fostering academic excellence and professional growth. Located in the heart 
              of the region, it has built a reputation for providing a robust learning 
              environment that blends traditional values with modern innovation.
            </p>
            
            <p>
              The college is committed to empowering students through diverse 
              undergraduate and postgraduate programs, ensuring they are well-equipped 
              to navigate the challenges of the evolving global landscape. With a 
              focus on character building and technical proficiency, it stands as 
              a cornerstone of higher education for aspiring professionals.
            </p>

            <p>
              The college is committed to empowering students through diverse 
              undergraduate and postgraduate programs, ensuring they are well-equipped 
              to navigate the challenges of the evolving global landscape. With a 
              focus on character building and technical proficiency, it stands as
              a cornerstone of higher education for aspiring professionals.
              The college is committed to empowering students through diverse 
              undergraduate and postgraduate programs, ensuring they are well-equipped 
              to navigate the challenges of the evolving global landscape. With a 
              focus on character building and technical proficiency, it stands as
              a cornerstone of higher education for aspiring professionals.
            </p>
          </div>
  
          <div className="mt-6 flex gap-3">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              Academic Excellence
            </span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary-foreground text-xs font-medium rounded-full">
              Innovation
            </span>
          </div>
        </div>
      </section>
    );
  }