import NewsletterCta from "@/components/NewsletterCta";

/* Shared shell for every /calculators/* page: appends the weekly
   snapshot capture strip without touching any page's own content. */
export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-10 -mt-2">
        <NewsletterCta />
      </div>
    </>
  );
}
