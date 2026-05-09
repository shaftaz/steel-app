import EmailCapture from "@/components/shared/EmailCapture";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-5 mt-5">
        <EmailCapture variant="inline" />
      </div>
    </>
  );
}
