"use client";

import { useParams } from "next/navigation";
import { useReportDetail } from "@/hooks/useReportDetail";
import { MarkdownContent } from "@/components/markdownContent";
import { AmbientBackground } from "@/components/ambientBackground";
import { ZIWEI_DISCLAIMER } from "@/lib/ai/disclaimer";
import { Sparkles, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { ReadingOutline } from "@/components/readingOutline";
import { BackToTop } from "@/components/backToTop";

const TOPIC_IMAGES: Record<string, string> = {
  health: "/topics/health.jpg",
  study: "/topics/study.jpg",
  business: "/topics/business.jpg",
  money: "/topics/money.jpg",
  relationship: "/topics/relationship.jpg",
  marriage: "/topics/marriage.jpg",
};

const SECTIONS = [
  { id: "chart-overview", label: "Chart Overview" },
  { id: "basic-structure", label: "Basic Structure" },
  { id: "four-transformations", label: "Four Transformations" },
  { id: "life-topics", label: "Life Topics" },
  { id: "decades", label: "Decade Timeline" },
  { id: "summary", label: "Summary" },
];

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { report, loading, timedOut } = useReportDetail(id);

  if (loading) {
    return (
      <PageShell>
        <p className="text-center py-16 text-muted-foreground">Loading...</p>
      </PageShell>
    );
  }
  if (!report) {
    return (
      <PageShell>
        <p className="text-center py-16 text-muted-foreground">
          Report not found.
        </p>
      </PageShell>
    );
  }

  if (report.status === "pending") {
    if (timedOut) {
      return (
        <PageShell>
          <div className="max-w-md mx-auto py-24 text-center space-y-4">
            <p className="text-amber-600 font-medium">
              This is taking longer than expected.
            </p>
            <p className="text-sm text-muted-foreground">
              Your reading may have been interrupted. Please contact support
              with order #{report.orderId}, or try refreshing this page.
            </p>
          </div>
        </PageShell>
      );
    }
    return (
      <PageShell>
        <div className="max-w-md mx-auto py-24 text-center space-y-4">
          <Sparkles className="h-8 w-8 mx-auto text-primary motion-safe:animate-pulse" />
          <p className="font-medium">Generating your reading...</p>
          <p className="text-sm text-muted-foreground">
            This usually takes about a minute. This page will update
            automatically.
          </p>
        </div>
      </PageShell>
    );
  }

  if (report.status === "failed") {
    return (
      <PageShell>
        <div className="max-w-md mx-auto py-24 text-center space-y-4">
          <p className="text-red-500 font-medium">
            Something went wrong generating this reading.
          </p>
          <p className="text-sm text-muted-foreground">
            Please contact support with order #{report.orderId}.
          </p>
        </div>
      </PageShell>
    );
  }

  const content = report.reportContent!;
  const summaryOnly = content.summary.replace(ZIWEI_DISCLAIMER, "").trim();

  return (
    <PageShell>
      <ReadingOutline sections={SECTIONS} />
      <div className="max-w-3xl mx-auto py-16 space-y-12">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Reading for</p>
          <h1 className="text-4xl font-bold">{report.name}</h1>
        </div>
        <div id="chart-overview">
          <SectionCard title="Chart Overview">
            <div className="overflow-x-auto">
              <MarkdownContent content={content.overview} />
            </div>
          </SectionCard>
        </div>
        <div id="basic-structure">
          <SectionCard title="Basic Structure">
            <MarkdownContent content={content.basic} />
          </SectionCard>
        </div>
        <div id="four-transformations">
          <SectionCard title="Four Transformations Analysis">
            <MarkdownContent content={content.analysis} />
          </SectionCard>
        </div>

        <div id="life-topics">
          <h2 className="text-2xl font-semibold mb-4">Life Topics</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(content.topics).map(([key, value]) => (
              <div
                key={key}
                className="overflow-hidden rounded-xl border bg-white transition-all hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
              >
                {TOPIC_IMAGES[key] && (
                  <div className="relative h-28 w-full">
                    <Image
                      src={TOPIC_IMAGES[key]}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-semibold capitalize mb-2">{key}</h3>
                  <MarkdownContent
                    content={value}
                    className="text-muted-foreground"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="decades">
          <h2 className="text-2xl font-semibold mb-4">
            Decade-by-Decade Timeline
          </h2>
          <div className="space-y-4">
            {content.details.map((text, i) => (
              <div
                key={i}
                className="rounded-xl border bg-white/70 backdrop-blur-sm p-6 transition-all hover:bg-white hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold">Decade {i + 1}</h3>
                </div>
                <MarkdownContent
                  content={stripLeadingDecadeHeading(text, i + 1)}
                  className="text-muted-foreground"
                />
              </div>
            ))}
          </div>
        </div>
        <div id="summary">
          <SectionCard title="Summary" highlight image="/topics/summary.jpg">
            <MarkdownContent content={summaryOnly} />
          </SectionCard>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-dashed bg-muted/40 px-5 py-4">
          <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {ZIWEI_DISCLAIMER}
          </p>
        </div>
      </div>
      <BackToTop />
    </PageShell>
  );
}

function stripLeadingDecadeHeading(text: string, decadeNumber: number): string {
  const lines = text.trim().split("\n");
  const firstLine = lines[0]?.trim() ?? "";
  const headingPattern = new RegExp(
    `^\\**\\s*Decade\\s+${decadeNumber}\\b`,
    "i",
  );
  if (headingPattern.test(firstLine.replace(/^#+\s*/, ""))) {
    return lines.slice(1).join("\n").trim();
  }
  return text;
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <AmbientBackground />
      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
}

function SectionCard({
  title,
  children,
  highlight,
  image,
}: {
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
  image?: string;
}) {
  return (
    <section
      className={`overflow-hidden rounded-xl border transition-all hover:shadow-sm ${
        highlight
          ? "bg-primary/5 border-primary/20"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      {image && (
        <div className="relative h-32 w-full">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        {children}
      </div>
    </section>
  );
}
