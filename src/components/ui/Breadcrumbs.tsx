import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-semibold text-[#6B5F4B] mb-4 tracking-widest uppercase">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2 text-gray-300">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#EA580C] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-[#EA580C]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
